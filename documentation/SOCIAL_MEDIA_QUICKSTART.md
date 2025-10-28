# Social Media Integration - Quick Start

## ⚡ Quick Setup (5 Minutes)

### 1. Create `.env.local` file

```bash
# Copy the example file
cp .env.example .env.local
```

### 2. Enable the feature

```env
VITE_ENABLE_SOCIAL_MEDIA=true
```

### 3. Get Instagram Access Token

**Easiest Method** (for testing):
1. Go to https://developers.facebook.com/tools/explorer/
2. Select your app
3. Generate token with `instagram_basic` permission
4. Copy the token

**Get User ID**:
1. Use Graph API Explorer
2. Run: `me/accounts`
3. Find your Instagram Business Account ID

### 4. Get Facebook Access Token

1. Go to https://developers.facebook.com/tools/explorer/
2. Generate token with `pages_read_engagement` permission
3. Copy the token and Page ID

### 5. Update `.env.local`

```env
VITE_ENABLE_SOCIAL_MEDIA=true

VITE_INSTAGRAM_ACCESS_TOKEN=paste_token_here
VITE_INSTAGRAM_USER_ID=paste_user_id_here
VITE_INSTAGRAM_HASHTAG=MainleeStrikers

VITE_FACEBOOK_ACCESS_TOKEN=paste_token_here
VITE_FACEBOOK_PAGE_ID=paste_page_id_here
VITE_FACEBOOK_HASHTAG=MainleeStrikers
```

### 6. Restart Dev Server

```bash
npm run dev
```

### 7. Test

Navigate to the gallery section and check the console for messages.

## 🔑 Getting Long-Lived Tokens

### Instagram/Facebook
Use this URL format:
```
https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN
```

## 📌 Common Issues

| Issue | Solution |
|-------|----------|
| No posts showing | Check console for errors, verify hashtag exists |
| "Invalid token" error | Generate new access token |
| Instagram not working | Must use Business/Creator account |
| Facebook not working | Verify Page ownership and permissions |

## 🔍 Debug Commands

```javascript
// In browser console

// Check configuration
console.log(import.meta.env);

// Clear cache
indexedDB.deleteDatabase('StrikersGalleryDB');

// Test API manually
fetch('https://graph.facebook.com/v18.0/PAGE_ID/posts?access_token=TOKEN')
  .then(r => r.json())
  .then(console.log);
```

## 📱 User Instructions

Tell your community:

> **Share your Strikers moments!**
> 
> 1. Post your photo on Instagram or Facebook
> 2. Use hashtag **#MainleeStrikers**
> 3. Make it public
> 4. Your photo will appear in our gallery within 30 minutes!

## 🎯 Next Steps

- Read full documentation: `SOCIAL_MEDIA_INTEGRATION.md`
- Customize hashtag categorization
- Adjust cache duration
- Add more social platforms
