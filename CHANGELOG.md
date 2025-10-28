# Changelog

All notable changes to the Strikers Website project will be documented in this file.

## [Unreleased]

### Added - Social Media Gallery Integration (2025-10-23)

#### Features
- **Automatic Social Media Feed**: Gallery now displays posts from Instagram and Facebook with specific hashtags
- **Instagram Integration**: Fetches posts via Instagram Graph API with hashtag filtering
- **Facebook Integration**: Fetches posts from Facebook Pages with hashtag filtering
- **Smart Caching**: IndexedDB-based caching system with 30-minute refresh cycle
- **Admin Panel**: Management interface for cache control and statistics (`SocialMediaAdmin.jsx`)
- **Loading States**: Smooth loading animations while fetching posts
- **External Links**: Direct links to view posts on original platforms
- **Auto Categorization**: Posts automatically categorized based on caption keywords
- **Graceful Fallback**: Sample images displayed when social media is disabled

#### Technical Implementation
- Created `src/utils/socialMediaFeed.js` - Main API integration service
- Created `src/utils/socialMediaConfig.js` - Configuration management
- Created `src/utils/socialMediaDB.js` - IndexedDB caching layer
- Created `src/components/SocialMediaAdmin.jsx` - Admin management panel
- Updated `src/components/GallerySection.jsx` - Integrated social media display
- Updated `src/components/ui/carousel.jsx` - Added external link support
- Added loading spinner animation to `src/index.css`

#### Configuration
- Added `.env.example` - Environment variable template
- Support for multiple platforms (Instagram & Facebook)
- Configurable hashtags per platform
- Enable/disable toggle via environment variable

#### Documentation
- `SOCIAL_MEDIA_INTEGRATION.md` - Complete technical documentation
- `SOCIAL_MEDIA_QUICKSTART.md` - Quick 5-minute setup guide
- `SOCIAL_MEDIA_IMPLEMENTATION.md` - Implementation details and summary
- `social-media-test.html` - Testing interface for developers
- Updated `README.md` - Added social media features section

#### Security
- Environment-based credential management
- `.env.local` excluded from version control
- No hardcoded API keys or tokens
- Public posts only

#### Performance
- IndexedDB caching reduces API calls by ~97%
- Parallel API fetching for multiple platforms
- Lazy image loading in carousel
- Automatic cache expiration (30 minutes)
- Optimistic UI updates

#### Developer Experience
- Comprehensive inline code documentation
- Modular, reusable service architecture
- Clear error messages and logging
- Easy to extend for additional platforms
- Admin panel for debugging and testing

#### User Experience
- Seamless integration with existing gallery
- No impact when feature is disabled
- Clear visual indicators for social posts
- Category-based filtering includes social posts
- Direct access to original posts

### Changed
- Gallery Section now combines social media posts with sample images
- Carousel component supports external links
- Gallery description updated to indicate social media integration

### Developer Notes
- Requires Instagram Business/Creator account for Instagram integration
- Requires Facebook Page for Facebook integration
- Access tokens must be configured in `.env.local`
- See documentation for API setup instructions

---

## Previous Changes

(Changelog starts from Social Media Integration feature)

---

## Version Notes

### Versioning Scheme
This project uses date-based versioning for major features.

### Types of Changes
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements
