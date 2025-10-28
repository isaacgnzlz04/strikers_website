/**
 * Social Media Feed Integration
 * Fetches posts from Instagram and Facebook using their respective APIs
 */

import dbCache from './socialMediaDB.js';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Instagram Graph API Integration
 * Uses Instagram Basic Display API or Instagram Graph API
 * Fetches media with specific hashtag
 */
class InstagramService {
  constructor(accessToken, hashtag) {
    this.accessToken = accessToken;
    this.hashtag = hashtag;
    this.baseUrl = 'https://graph.instagram.com';
  }

  /**
   * Fetch recent media from Instagram with the specified hashtag
   * Note: Instagram Basic Display API doesn't support hashtag search directly
   * You'll need Instagram Graph API (Business/Creator account) for hashtag search
   */
  async fetchPosts(limit = 12) {
    try {
      // For Instagram Business accounts with Graph API
      const hashtagId = await this.getHashtagId();
      if (!hashtagId) return [];

      const response = await fetch(
        `${this.baseUrl}/${hashtagId}/recent_media?user_id=${this.userId}&fields=id,media_type,media_url,permalink,caption,timestamp,thumbnail_url&limit=${limit}&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        console.error('Instagram API error:', response.status);
        return [];
      }

      const data = await response.json();
      return this.formatPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  }

  async getHashtagId() {
    try {
      const response = await fetch(
        `${this.baseUrl}/ig_hashtag_search?user_id=${this.userId}&q=${this.hashtag}&access_token=${this.accessToken}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data.data?.[0]?.id || null;
    } catch (error) {
      console.error('Error getting hashtag ID:', error);
      return null;
    }
  }

  formatPosts(posts) {
    return posts.map(post => ({
      id: post.id,
      source: 'instagram',
      type: post.media_type.toLowerCase(),
      imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      caption: post.caption || '',
      timestamp: new Date(post.timestamp),
      category: this.categorizePost(post.caption || '')
    }));
  }

  categorizePost(caption) {
    const lower = caption.toLowerCase();
    if (lower.includes('party') || lower.includes('birthday') || lower.includes('celebration')) {
      return 'Parties';
    } else if (lower.includes('league') || lower.includes('tournament') || lower.includes('competition')) {
      return 'Leagues';
    } else if (lower.includes('event') || lower.includes('fundraiser') || lower.includes('corporate')) {
      return 'Events';
    }
    return 'Fun Times';
  }

  setUserId(userId) {
    this.userId = userId;
  }
}

/**
 * Facebook Graph API Integration
 * Fetches posts from a Facebook Page with specific hashtag
 */
class FacebookService {
  constructor(accessToken, pageId, hashtag) {
    this.accessToken = accessToken;
    this.pageId = pageId;
    this.hashtag = hashtag;
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  async fetchPosts(limit = 12) {
    try {
      // Fetch posts from the page
      const response = await fetch(
        `${this.baseUrl}/${this.pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,attachments{media,type,url}&limit=100&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        console.error('Facebook API error:', response.status);
        return [];
      }

      const data = await response.json();
      const posts = data.data || [];

      // Filter posts by hashtag
      const hashtagPosts = posts.filter(post => 
        post.message && post.message.toLowerCase().includes(`#${this.hashtag.toLowerCase()}`)
      );

      return this.formatPosts(hashtagPosts.slice(0, limit));
    } catch (error) {
      console.error('Error fetching Facebook posts:', error);
      return [];
    }
  }

  formatPosts(posts) {
    return posts.map(post => ({
      id: post.id,
      source: 'facebook',
      type: 'image',
      imageUrl: this.extractImageUrl(post),
      permalink: post.permalink_url,
      caption: post.message || '',
      timestamp: new Date(post.created_time),
      category: this.categorizePost(post.message || '')
    })).filter(post => post.imageUrl); // Only include posts with images
  }

  extractImageUrl(post) {
    if (post.full_picture) {
      return post.full_picture;
    }
    if (post.attachments?.data?.[0]?.media?.image?.src) {
      return post.attachments.data[0].media.image.src;
    }
    return null;
  }

  categorizePost(message) {
    const lower = message.toLowerCase();
    if (lower.includes('party') || lower.includes('birthday') || lower.includes('celebration')) {
      return 'Parties';
    } else if (lower.includes('league') || lower.includes('tournament') || lower.includes('competition')) {
      return 'Leagues';
    } else if (lower.includes('event') || lower.includes('fundraiser') || lower.includes('corporate')) {
      return 'Events';
    }
    return 'Fun Times';
  }
}

/**
 * Cache Manager for storing fetched posts using IndexedDB
 */
class CacheManager {
  static async get() {
    try {
      return await dbCache.getPosts();
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  static async set(data) {
    try {
      await dbCache.savePosts(data);
    } catch (error) {
      console.error('Error writing cache:', error);
    }
  }

  static async clear() {
    try {
      await dbCache.clearCache();
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  static async getStats() {
    try {
      return await dbCache.getCacheStats();
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return null;
    }
  }
}

/**
 * Main Social Media Feed Manager
 * Combines posts from Instagram and Facebook
 */
export class SocialMediaFeed {
  constructor(config) {
    this.config = config;
    this.instagramService = null;
    this.facebookService = null;

    // Initialize services if credentials are provided
    if (config.instagram?.accessToken && config.instagram?.hashtag) {
      this.instagramService = new InstagramService(
        config.instagram.accessToken,
        config.instagram.hashtag
      );
      if (config.instagram.userId) {
        this.instagramService.setUserId(config.instagram.userId);
      }
    }

    if (config.facebook?.accessToken && config.facebook?.pageId && config.facebook?.hashtag) {
      this.facebookService = new FacebookService(
        config.facebook.accessToken,
        config.facebook.pageId,
        config.facebook.hashtag
      );
    }
  }

  /**
   * Fetch posts from all enabled social media platforms
   * @param {boolean} forceRefresh - Skip cache and fetch fresh data
   * @returns {Promise<Array>} Array of formatted posts
   */
  async fetchAllPosts(forceRefresh = false) {
    // Try cache first
    if (!forceRefresh) {
      const cachedPosts = await CacheManager.get();
      if (cachedPosts) {
        return cachedPosts;
      }
    }

    const promises = [];

    if (this.instagramService) {
      promises.push(this.instagramService.fetchPosts());
    }

    if (this.facebookService) {
      promises.push(this.facebookService.fetchPosts());
    }

    if (promises.length === 0) {
      console.warn('No social media services configured');
      return [];
    }

    try {
      const results = await Promise.all(promises);
      const allPosts = results.flat();

      // Sort by timestamp (newest first)
      allPosts.sort((a, b) => b.timestamp - a.timestamp);

      // Cache the results
      await CacheManager.set(allPosts);

      return allPosts;
    } catch (error) {
      console.error('Error fetching social media posts:', error);
      return [];
    }
  }

  /**
   * Clear the cache
   */
  async clearCache() {
    await CacheManager.clear();
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    return await CacheManager.getStats();
  }
}

/**
 * Helper function to create a configured instance
 */
export function createSocialMediaFeed(config) {
  return new SocialMediaFeed(config);
}

export default SocialMediaFeed;
