/**
 * IndexedDB Manager for Social Media Posts
 * Provides persistent storage for social media feed data
 */

const DB_NAME = 'StrikersGalleryDB';
const STORE_NAME = 'socialPosts';
const DB_VERSION = 1;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

class IndexedDBCache {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize the database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('source', 'source', { unique: false });
          objectStore.createIndex('category', 'category', { unique: false });
        }
      };
    });
  }

  /**
   * Save posts to IndexedDB
   */
  async savePosts(posts) {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);

      // Clear old data
      objectStore.clear();

      // Add new posts with metadata
      const timestamp = Date.now();
      posts.forEach(post => {
        objectStore.add({
          ...post,
          cachedAt: timestamp,
          timestamp: post.timestamp instanceof Date ? post.timestamp.toISOString() : post.timestamp
        });
      });

      // Save metadata about the cache
      const metaStore = this.db.transaction([STORE_NAME], 'readwrite').objectStore(STORE_NAME);
      metaStore.add({
        id: '__cache_metadata__',
        timestamp: timestamp,
        count: posts.length,
        cachedAt: timestamp
      });

      transaction.oncomplete = () => {
        resolve(true);
      };

      transaction.onerror = () => {
        console.error('Transaction error:', transaction.error);
        reject(transaction.error);
      };
    });
  }

  /**
   * Get posts from IndexedDB
   */
  async getPosts() {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);

      // First, check cache metadata
      const metaRequest = objectStore.get('__cache_metadata__');

      metaRequest.onsuccess = () => {
        const metadata = metaRequest.result;

        if (!metadata) {
          resolve(null);
          return;
        }

        const now = Date.now();
        const cacheAge = now - metadata.timestamp;

        // Check if cache is expired
        if (cacheAge > CACHE_DURATION) {
          console.log('Cache expired, age:', cacheAge / 1000, 'seconds');
          resolve(null);
          return;
        }

        // Get all posts
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => {
          const posts = getAllRequest.result.filter(post => post.id !== '__cache_metadata__');
          
          // Reconstruct Date objects
          const processedPosts = posts.map(post => ({
            ...post,
            timestamp: new Date(post.timestamp)
          }));

          console.log(`Retrieved ${processedPosts.length} posts from IndexedDB cache`);
          resolve(processedPosts);
        };

        getAllRequest.onerror = () => {
          reject(getAllRequest.error);
        };
      };

      metaRequest.onerror = () => {
        reject(metaRequest.error);
      };
    });
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category) {
    const posts = await this.getPosts();
    if (!posts) return null;
    return posts.filter(post => post.category === category);
  }

  /**
   * Get posts by source
   */
  async getPostsBySource(source) {
    const posts = await this.getPosts();
    if (!posts) return null;
    return posts.filter(post => post.source === source);
  }

  /**
   * Clear all cached data
   */
  async clearCache() {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.clear();

      request.onsuccess = () => {
        console.log('IndexedDB cache cleared');
        resolve(true);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      
      const metaRequest = objectStore.get('__cache_metadata__');

      metaRequest.onsuccess = () => {
        const metadata = metaRequest.result;

        if (!metadata) {
          resolve({
            exists: false,
            count: 0,
            age: null,
            expired: true
          });
          return;
        }

        const now = Date.now();
        const age = now - metadata.timestamp;
        const expired = age > CACHE_DURATION;

        resolve({
          exists: true,
          count: metadata.count,
          age: age,
          ageMinutes: Math.floor(age / 60000),
          expired: expired,
          cachedAt: new Date(metadata.timestamp)
        });
      };

      metaRequest.onerror = () => {
        reject(metaRequest.error);
      };
    });
  }
}

// Create and export a singleton instance
const dbCache = new IndexedDBCache();

export default dbCache;
