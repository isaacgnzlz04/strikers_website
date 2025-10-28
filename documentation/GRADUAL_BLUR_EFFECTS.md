# GradualBlur Scroll Effects

## Overview
Integrated the GradualBlur component from reactbits to create cinematic scroll blur effects throughout the website. The blur effect creates a frosted glass masking effect at the edges of sections, with content appearing to fade in/out as it scrolls.

## Component Details

### Source
- Component: `GradualBlur` from reactbits
- Location: `src/components/GradualBlur.jsx`
- CSS: `src/components/GradualBlur.css`
- Dependency: `mathjs` (for calculations)

### Features
- **Parent-Targeted Blur**: Blurs edges of parent containers (not page-level)
- **Persistent Effect**: Always visible, not scroll-triggered
- **Position Control**: Top, bottom, left, or right positioning
- **Customizable**: Adjustable strength, height, and curve
- **Performance Optimized**: Uses backdrop-filter and CSS masks

## Implementation Pattern

### Required Setup
Every parent container needs:
1. `position: 'relative'` - For absolute positioning of blur
2. `overflow: 'hidden'` - To contain the blur effect within bounds

### Basic Usage
```jsx
<div style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="4rem" strength={1} />
  <YourContent />
  <GradualBlur position="bottom" height="4rem" strength={1} />
</div>
```

## Implementation Locations

### HomePage (`src/pages/HomePage.jsx`)
```jsx
// Hours & Pricing Section
<div style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="4rem" strength={1} />
  <HoursAndPricingSection />
  <GradualBlur position="bottom" height="4rem" strength={1} />
</div>

// Services Overview
<div style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  <ServicesOverview />
  <GradualBlur position="bottom" height="4rem" strength={1} />
</div>

// Gallery Section  
<div style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  <GallerySection />
  <GradualBlur position="bottom" height="5rem" strength={1.5} />
</div>
```

### LeaguePage (`src/pages/LeaguePage.jsx`)
```jsx
// Hero Section
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="6rem" strength={1.5} />
  {/* Hero content */}
</section>

// Leagues Section
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  {/* League cards */}
  <GradualBlur position="bottom" height="5rem" strength={1.5} />
</section>
```

### AboutPage (`src/pages/AboutPage.jsx`)
```jsx
// Our Story
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="6rem" strength={1.5} />
  {/* Story content */}
</section>

// Facilities
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  {/* Facilities cards */}
  <GradualBlur position="bottom" height="5rem" strength={1.5} />
</section>

// Meet the Team
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="4rem" strength={1} />
  {/* Team profiles */}
</section>
```

### EventsPackagesPage (`src/pages/EventsPackagesPage.jsx`)
```jsx
// Hero
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  {/* Hero content */}
</section>

// Packages Grid
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  {/* Package cards */}
  <GradualBlur position="bottom" height="5rem" strength={1.5} />
</section>
```

## Technical Details

### How It Works
1. **Parent Container**: Must have `position: relative` and `overflow: hidden`
2. **Absolute Positioning**: Blur overlay positioned absolutely within parent
3. **Backdrop Filter**: Applies progressive blur using CSS backdrop-filter
4. **CSS Masks**: Linear gradients create transparency for smooth transitions
5. **Math Calculations**: Uses mathjs for precise blur value curves

### Default Configuration
```javascript
{
  position: 'bottom',    // top, bottom, left, right
  strength: 2,           // Blur intensity
  height: '6rem',        // Blur zone height
  divCount: 5,           // Number of blur layers
  exponential: false,    // Linear vs exponential curve
  zIndex: 1000,          // Stacking order
  animated: false,       // No scroll-based animation
  target: 'parent',      // Target parent container (not page)
  curve: 'linear',       // Blur progression curve
  opacity: 1             // Effect opacity
}
```

### Common Configurations

**Subtle Edge Blur** (gentle transitions)
```jsx
<GradualBlur position="top" height="4rem" strength={1} />
```
- Small 4rem zone
- Low strength (1)
- Perfect for section borders

**Medium Blur** (standard sections)
```jsx
<GradualBlur position="top" height="5rem" strength={1.5} />
```
- Medium 5rem zone
- Moderate strength (1.5)
- Good balance for most content

**Strong Blur** (dramatic headers)
```jsx
<GradualBlur position="top" height="6rem" strength={1.5} />
```
- Larger 6rem zone
- Moderate-strong strength
- Great for hero sections

## Best Practices

### 1. **Always Set Parent Styles**
```jsx
// ✅ CORRECT
<div style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="4rem" strength={1} />
  <Content />
</div>

// ❌ WRONG - Missing overflow: hidden
<div style={{ position: 'relative' }}>
  <GradualBlur position="top" height="4rem" strength={1} />
  <Content />
</div>
```

### 2. **Top & Bottom Pairing**
For complete section framing:
```jsx
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <GradualBlur position="top" height="5rem" strength={1.5} />
  <YourContent />
  <GradualBlur position="bottom" height="5rem" strength={1.5} />
</section>
```

### 3. **Adjust Height & Strength Together**
- **Subtle**: height="4rem" strength={1}
- **Medium**: height="5rem" strength={1.5}
- **Strong**: height="6rem" strength={1.5}

### 4. **Don't Overuse**
- Not every section needs blur
- Use for visual hierarchy
- Skip blur on small sections

### 5. **Match Section Padding**
If section has padding: '40px 20px', blur should be smaller than padding to avoid cutting off content.

## Browser Support
- Modern browsers with `backdrop-filter` support (Chrome 76+, Safari 9+, Firefox 103+)
- Fallback: Semi-transparent overlay for unsupported browsers
- Requires CSS mask support for gradient effects

## Performance Considerations
- **Minimal Impact**: Uses GPU-accelerated backdrop-filter
- **Lightweight**: Only 5 blur divs by default (divCount: 5)
- **Static**: No scroll listeners or JavaScript animations
- **Optimized**: CSS-only after initial render

## Customization Examples

### Horizontal Blur (Sidebar)
```jsx
<GradualBlur 
  position="left" 
  height="6rem" 
  strength={2.5} 
  animated="scroll" 
/>
```

### Intense Reveal
```jsx
<GradualBlur 
  preset="intense" 
  animated="scroll" 
  exponential={true} 
/>
```

### Responsive Height
```jsx
<GradualBlur 
  preset="smooth" 
  responsive={true}
  mobileHeight="4rem"
  tabletHeight="6rem"
  desktopHeight="8rem"
/>
```

## Future Enhancements

1. **Dynamic Triggers**
   - Add hover intensity effects
   - Trigger on user interactions

2. **Page-Level Blurs**
   - Full-page blur overlays
   - Modal backdrop effects

3. **Color Tinting**
   - Add color gradients to blur
   - Theme-aware blur colors

4. **Performance Optimization**
   - Lazy load blur effects
   - Reduce calculations on mobile

## Notes
- Effects are subtle and enhance user experience without being distracting
- All animations respect user's motion preferences (prefers-reduced-motion)
- Blur effects work best with high-contrast content
- Test on different devices for optimal strength values
