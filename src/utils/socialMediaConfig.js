/**
 * Configuration for Social Media Integration
 * Reads from environment variables
 */

export const socialMediaConfig = {
  enabled: import.meta.env.VITE_ENABLE_SOCIAL_MEDIA === 'true',
  
  instagram: {
    accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
    userId: import.meta.env.VITE_INSTAGRAM_USER_ID || '',
    hashtag: import.meta.env.VITE_INSTAGRAM_HASHTAG || 'MainleeStrikers',
  },
  
  facebook: {
    accessToken: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN || '',
    pageId: import.meta.env.VITE_FACEBOOK_PAGE_ID || '',
    hashtag: import.meta.env.VITE_FACEBOOK_HASHTAG || 'MainleeStrikers',
  },
};

// Validate configuration
export function validateConfig() {
  if (!socialMediaConfig.enabled) {
    return { valid: false, message: 'Social media integration is disabled' };
  }

  const hasInstagram = !!(
    socialMediaConfig.instagram.accessToken &&
    socialMediaConfig.instagram.userId &&
    socialMediaConfig.instagram.hashtag
  );

  const hasFacebook = !!(
    socialMediaConfig.facebook.accessToken &&
    socialMediaConfig.facebook.pageId &&
    socialMediaConfig.facebook.hashtag
  );

  if (!hasInstagram && !hasFacebook) {
    return {
      valid: false,
      message: 'No social media platforms configured. Please set up Instagram or Facebook credentials.',
    };
  }

  return {
    valid: true,
    platforms: {
      instagram: hasInstagram,
      facebook: hasFacebook,
    },
  };
}

export default socialMediaConfig;
