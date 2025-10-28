# Social Media Gallery Integration

This feature automatically displays pictures posted with a specific hashtag on Facebook or Instagram in the community gallery section.

## 🎯 Features

- **Instagram Integration**: Fetch posts with a specific hashtag from Instagram Business/Creator accounts
- **Facebook Integration**: Fetch posts with a specific hashtag from Facebook Pages
- **Smart Caching**: Uses IndexedDB for persistent caching (30-minute cache duration)
- **Automatic Categorization**: Posts are categorized based on keywords in captions
- **Seamless Fallback**: Shows sample images when social media is disabled or unavailable
- **Loading States**: Shows loading spinner while fetching data
- **External Links**: Users can click to view posts on the original social media platform

## 📋 Prerequisites

### For Instagram Integration

1. **Facebook Developer Account**: Create an account at [developers.facebook.com](https://developers.facebook.com)
2. **Instagram Business or Creator Account**: Regular Instagram accounts don't support hashtag search via API
3. **Facebook App**: Create a Facebook app with Instagram Basic Display API or Instagram Graph API enabled
4. **Access Token**: Generate a long-lived access token

### For Facebook Integration

1. **Facebook Page**: Must have a Facebook Page (not personal profile)
2. **Facebook Developer Account**: Create an account at [developers.facebook.com](https://developers.facebook.com)
3. **Page Access Token**: Generate a page access token with appropriate permissions

## 🚀 Setup Instructions

### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and configure your credentials:

   ```env
   # Enable social media integration
   VITE_ENABLE_SOCIAL_MEDIA=true

   # Instagram Configuration
   VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
   VITE_INSTAGRAM_USER_ID=your_instagram_user_id
   VITE_INSTAGRAM_HASHTAG=MainleeStrikers

   # Facebook Configuration
   VITE_FACEBOOK_ACCESS_TOKEN=your_facebook_page_access_token
   VITE_FACEBOOK_PAGE_ID=your_facebook_page_id
   VITE_FACEBOOK_HASHTAG=MainleeStrikers
   ```

### Step 2: Get Instagram Credentials

#### Option A: Using Facebook Graph API Explorer

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Generate an access token with these permissions:
   - `instagram_basic`
   - `pages_show_list`
   - `instagram_manage_insights` (for Business accounts)
4. Convert to a long-lived token:
   ```
   https://graph.facebook.com/v18.0/oauth/access_token?
     grant_type=fb_exchange_token&
     client_id={app-id}&
     client_secret={app-secret}&
     fb_exchange_token={short-lived-token}
   ```

5. Get your Instagram User ID:
   ```
   https://graph.facebook.com/v18.0/me/accounts?access_token={access-token}
   ```
   Then use the Instagram Business Account ID from the response.

#### Option B: Using Instagram Basic Display API

1. Create an app in [Facebook Developers](https://developers.facebook.com/apps)
2. Add Instagram Basic Display product
3. Configure OAuth redirect URIs
4. Follow the authentication flow to get user access token
5. Note: This method has limitations and doesn't support hashtag search directly

### Step 3: Get Facebook Credentials

1. Go to [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Click "Generate Access Token"
4. Select required permissions:
   - `pages_read_engagement`
   - `pages_show_list`
5. Get your Page ID from your Facebook Page settings or:
   ```
   https://graph.facebook.com/v18.0/me/accounts?access_token={access-token}
   ```

### Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the gallery section
3. You should see a loading indicator, then social media posts
4. Check the browser console for any errors or success messages

## 🔧 Configuration Options

### Hashtag Customization

Change the hashtag in `.env.local`:
```env
VITE_INSTAGRAM_HASHTAG=YourCustomHashtag
VITE_FACEBOOK_HASHTAG=YourCustomHashtag
```

### Cache Duration

Edit `src/utils/socialMediaFeed.js` to change cache duration:
```javascript
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes (in milliseconds)
```

### Post Categorization

Modify the categorization logic in `src/utils/socialMediaFeed.js`:
```javascript
categorizePost(caption) {
  const lower = caption.toLowerCase();
  if (lower.includes('party') || lower.includes('birthday')) {
    return 'Parties';
  }
  // Add more categories...
  return 'Fun Times';
}
```

## 🐛 Troubleshooting

### No Posts Appearing

1. **Check Console**: Open browser developer tools and check for error messages
2. **Verify Credentials**: Ensure all access tokens and IDs are correct
3. **Check Permissions**: Verify your access tokens have the required permissions
4. **Token Expiration**: Access tokens may expire; generate new ones if needed
5. **Hashtag Posts**: Ensure there are actual posts with the specified hashtag

### Instagram Not Working

- **Account Type**: Verify you're using an Instagram Business or Creator account
- **Connected to Facebook**: Ensure the Instagram account is connected to a Facebook Page
- **Hashtag Search**: Instagram Basic Display API doesn't support hashtag search; use Graph API

### Facebook Not Working

- **Page Ownership**: Verify you have admin access to the Facebook Page
- **Public Posts**: Ensure posts are public and contain the hashtag
- **Token Permissions**: Check that the access token has `pages_read_engagement` permission

### Cache Issues

Clear the cache manually:
```javascript
// In browser console
indexedDB.deleteDatabase('StrikersGalleryDB');
localStorage.clear();
```

Or use the cache stats method to debug:
```javascript
import { createSocialMediaFeed } from './utils/socialMediaFeed';
const feed = createSocialMediaFeed(config);
const stats = await feed.getCacheStats();
console.log(stats);
```

## 📊 API Rate Limits

### Instagram Graph API
- Rate limit: 200 calls per user per hour
- Caching helps minimize API calls

### Facebook Graph API
- Rate limit: 200 calls per user per hour per app
- Page-level rate limits may apply

## 🔒 Security Best Practices

1. **Never commit `.env.local`**: This file contains sensitive credentials
2. **Use Environment Variables**: Never hardcode access tokens in source code
3. **Rotate Tokens**: Regularly generate new access tokens
4. **Limit Permissions**: Only request necessary permissions
5. **Monitor Usage**: Check API usage in Facebook Developer Dashboard

## 📱 Social Media Best Practices

### For Users

Encourage your community to:
1. Use the designated hashtag (#MainleeStrikers)
2. Make posts public (for Facebook)
3. Tag your Instagram Business account
4. Post high-quality, relevant photos

### For Administrators

1. **Monitor Content**: Regularly check posts for appropriateness
2. **Engage**: Like and comment on community posts
3. **Promote**: Remind users to use the hashtag in announcements
4. **Update**: Keep access tokens fresh to avoid interruptions

## 🎨 Customization

### Styling the Gallery

The gallery inherits styles from the theme. Customize in `src/components/GallerySection.jsx`:

```javascript
// Change loading spinner color
border: '4px solid var(--accent-primary)',

// Adjust social media badge
<span style={{ color: 'var(--accent-primary)' }}>
  📱 Now featuring posts from Instagram & Facebook
</span>
```

### Adding More Social Platforms

To add Twitter, TikTok, or other platforms:

1. Create a new service class in `src/utils/socialMediaFeed.js`:
   ```javascript
   class TwitterService {
     // Implement similar to InstagramService
   }
   ```

2. Add configuration in `src/utils/socialMediaConfig.js`
3. Update the `SocialMediaFeed` class to include the new service

## 📈 Performance

- **IndexedDB Caching**: Reduces API calls and improves load times
- **30-Minute Cache**: Balances freshness with performance
- **Lazy Loading**: Images load as needed in the carousel
- **Parallel Fetching**: Instagram and Facebook API calls run concurrently

## 🧪 Testing

Test the integration:

```javascript
// Test configuration
import { validateConfig } from './utils/socialMediaConfig';
const validation = validateConfig();
console.log(validation);

// Test feed fetching
import { createSocialMediaFeed } from './utils/socialMediaFeed';
import socialMediaConfig from './utils/socialMediaConfig';

const feed = createSocialMediaFeed(socialMediaConfig);
const posts = await feed.fetchAllPosts(true); // Force refresh
console.log('Fetched posts:', posts);
```

## 📝 License

This integration is part of the Strikers Website project.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Facebook/Instagram API documentation
3. Check browser console for detailed error messages

## 🔄 Updates

To update to newer API versions:
1. Update the API version in service URLs (e.g., `v18.0` → `v19.0`)
2. Review Facebook's changelog for breaking changes
3. Test thoroughly before deploying
