# Pricing Section Update

**Date:** October 16, 2025  
**Updated Component:** PricingSection.jsx

## Changes Made

### 1. **Real Pricing from Main Lee Strikers**

Updated all pricing cards with actual prices from www.mainleestrikers.com:

| Category | Price | Details |
|----------|-------|---------|
| **Adults** | $5.50/game | 13+ years, $3.50 shoe fee |
| **Children** | $4.50/game | 12 and under, shoes included ✓ |
| **College** | $5.00/game | With ANY college ID, shoes included ✓ |
| **League** | $4.75/game | For regular league bowlers, $3.00 shoe fee |
| **Hourly** | $40/hour | Up to 6 people, shoes included ✓ |

### 2. **Compact Card Design**

- **Smaller cards** - Changed from large feature cards to compact price cards
- **Grid layout** - Uses `repeat(auto-fit, minmax(220px, 1fr))` for responsive design
- **Icons** - Each card has an emoji icon (👨👶🎓🏆⏰)
- **Height** - Minimal vertical space with fixed content structure
- **Highlights** - "DEAL" badges for Children, College, and Hourly rates

### 3. **Price Calculator Feature** 🧮

Added interactive calculator with:

**Two Calculation Modes:**
- **Per Game** - Calculate by adults, children, and number of games
- **Hourly** - Calculate hourly rate with automatic lane calculation

**Features:**
- Live calculation as you type
- Breakdown showing:
  - Adult pricing ($5.50/game + $3.50 shoes)
  - Children pricing ($4.50/game, shoes included)
  - Hourly pricing ($40/hour for up to 6 people)
  - Automatic multi-lane calculation for groups over 6
- Toggle between Per Game and Hourly modes
- Visual total display in large font
- "Book Now" button to proceed with booking

**Calculator Formulas:**

```javascript
// Per Game Mode:
adultCost = adults × $5.50 × games
adultShoes = adults × $3.50
childCost = children × $4.50 × games
total = adultCost + adultShoes + childCost

// Hourly Mode:
lanes = Math.ceil(totalPeople / 6)  // 6 people max per lane
total = lanes × hours × $40
// Shoes included!
```

### 4. **Visual Design**

**Card Styling:**
- Background: `var(--bg-secondary)`
- Border: Highlighted cards have 2px red border
- Hover effect: Lift up 5px with shadow
- Icons: 2.5rem emoji at top
- Price: Large 2.5rem bold font in accent color
- Note: Highlighted in green (#4ade80) if includes "Included"

**Calculator Modal:**
- Fixed overlay with backdrop blur
- Clean white card design
- Pill-shaped toggle buttons
- Number inputs with focus states
- Live breakdown section
- Large total display
- MagicButton for booking

### 5. **Animations**

- GSAP scroll animations for cards
- Stagger effect (0.1s delay between cards)
- Hover transforms and shadows
- Smooth transitions on all interactions

### 6. **Responsive Design**

**Desktop:**
- 5 columns auto-fit grid
- Side-by-side cards
- Calculator modal centered

**Mobile:**
- 1 column layout
- Stacked cards
- Full-width calculator
- Touch-friendly inputs

## Component Structure

```jsx
PricingSection
├── Header
│   ├── PRICING badge
│   ├── "Affordable Bowling Fun" title
│   ├── Subtitle
│   └── 🧮 Price Calculator button
├── Pricing Cards Grid
│   ├── Adults card
│   ├── Children card (DEAL)
│   ├── College card (DEAL)
│   ├── League card
│   └── Hourly card (DEAL)
├── Book Your Lane Now button
└── PriceCalculatorModal (conditional)
    ├── Close button
    ├── Title
    ├── Per Game / Hourly toggle
    ├── Input fields
    │   ├── Adults
    │   ├── Children
    │   └── Games or Hours
    ├── Breakdown section
    ├── Total display
    ├── Book Now button
    └── Disclaimer note
```

## Usage

### Opening Calculator
```javascript
// Button in pricing section
<MagicButton onClick={() => setShowCalculator(true)}>
  🧮 Price Calculator
</MagicButton>
```

### Calculator State
```javascript
const [showCalculator, setShowCalculator] = useState(false);
const [adults, setAdults] = useState(0);
const [children, setChildren] = useState(0);
const [games, setGames] = useState(1);
const [useHourly, setUseHourly] = useState(false);
const [hours, setHours] = useState(1);
```

### Example Calculations

**Example 1: Family of 4 (2 adults, 2 kids, 3 games)**
```
2 adults × 3 games × $5.50 = $33.00
2 adult shoes × $3.50 = $7.00
2 children × 3 games × $4.50 = $27.00
-----------------------------------
Total: $67.00
```

**Example 2: Small group hourly (5 people, 2 hours)**
```
5 people (up to 6 per lane) = 1 lane
1 lane × 2 hours × $40 = $80.00
Shoes included ✓
-----------------------------------
Total: $80.00
```

**Example 3: Large group hourly (15 people, 1 hour)**
```
15 people (up to 6 per lane) = 3 lanes
3 lanes × 1 hour × $40 = $120.00
Shoes included ✓
-----------------------------------
Total: $120.00
```

## Benefits

✅ **Real pricing** - Matches actual bowling alley rates  
✅ **Compact design** - Cards use minimal space  
✅ **Interactive calculator** - Helps customers plan visit  
✅ **Clear breakdowns** - Shows exactly what they pay for  
✅ **Responsive** - Works on all devices  
✅ **Consistent styling** - Matches existing component design  
✅ **Professional** - Clean, modern look  

## Files Modified

- `src/components/PricingSection.jsx` - Complete rewrite

## Dependencies Used

- React hooks (useState, useEffect, useRef)
- GSAP + ScrollTrigger
- MagicButton component
- CSS variables for theming

## Next Steps

Consider adding:
- Save/share calculation link
- Print pricing breakdown
- Group discount indicator
- Special offers section
- Email quote feature
