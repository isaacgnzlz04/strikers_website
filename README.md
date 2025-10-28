# Strikers Website

A modern, interactive bowling alley website built with React and Vite.

## 🎯 Features

- **Interactive Gallery**: Community photo gallery with social media integration
- **League Management**: Complete league standings and management system
- **Booking System**: Event and party booking with modal interfaces
- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark/Light Themes**: Toggle between themes with persistent preferences
- **Social Media Integration**: Automatic display of Instagram & Facebook posts with hashtags

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- (Optional) Instagram Business/Creator account for social media features
- (Optional) Facebook Page for social media features

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/isaacgnzlz04/strikers_website.git
   cd strikers_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure social media integration:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## 📱 Social Media Integration

The community gallery can automatically display photos from Instagram and Facebook posts with a specific hashtag.

### Quick Setup

See [SOCIAL_MEDIA_QUICKSTART.md](SOCIAL_MEDIA_QUICKSTART.md) for a 5-minute setup guide.

### Full Documentation

See [SOCIAL_MEDIA_INTEGRATION.md](SOCIAL_MEDIA_INTEGRATION.md) for complete documentation.

### Testing

Open `social-media-test.html` in your browser to test the integration.

## 🛠️ Tech Stack

- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **GSAP**: Animations
- **Tailwind CSS v4**: Styling
- **IndexedDB**: Client-side caching
- **Instagram/Facebook Graph API**: Social media integration

## 📂 Project Structure

```
strikers_website/
├── src/
│   ├── components/       # React components
│   │   ├── GallerySection.jsx
│   │   ├── SocialMediaAdmin.jsx
│   │   └── ...
│   ├── utils/           # Utility functions
│   │   ├── socialMediaFeed.js
│   │   ├── socialMediaConfig.js
│   │   ├── socialMediaDB.js
│   │   └── standingsDB.js
│   ├── pages/           # Page components
│   └── assets/          # Static assets
├── public/              # Public files
├── .env.example         # Environment template
└── *.md                 # Documentation files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Documentation

- [Social Media Integration](SOCIAL_MEDIA_INTEGRATION.md) - Complete guide
- [Social Media Quick Start](SOCIAL_MEDIA_QUICKSTART.md) - 5-minute setup
- [Implementation Summary](SOCIAL_MEDIA_IMPLEMENTATION.md) - Technical details
- [League Configuration](LEAGUE_CONFIG_SYSTEM.md) - League setup
- [Standings Guide](STANDINGS_GUIDE.md) - Standings management

## 🎨 Customization

### Themes

Edit CSS variables in `src/index.css`:

```css
:root {
  --accent-primary: #96333C;
  --accent-secondary: #4E98D5;
  /* ... */
}
```

### Social Media Hashtags

Edit `.env.local`:

```env
VITE_INSTAGRAM_HASHTAG=YourHashtag
VITE_FACEBOOK_HASHTAG=YourHashtag
```

## 🐛 Troubleshooting

### Social Media Posts Not Showing

1. Check browser console for errors
2. Verify `.env.local` configuration
3. Ensure access tokens are valid
4. Check that posts exist with the specified hashtag
5. See troubleshooting section in [SOCIAL_MEDIA_INTEGRATION.md](SOCIAL_MEDIA_INTEGRATION.md)

### Build Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the troubleshooting guides
3. Open an issue on GitHub

---

Built with ❤️ for Mainlee Strikers Bowling Alley
