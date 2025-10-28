# Adding New Leagues - Visual Guide

## How It Works

When you add a new league through the admin panel, it automatically appears on the website with **identical styling** to existing cards.

## Step-by-Step Example

### Step 1: Add a New League

Go to `/admin-leagues.html` and add:
```
Name: Summer Special
Day: Friday  
Time: 8:00 PM
Format: Mixed
Total Weeks: 12
Description: Summer fun league for all!
Active: ✓ Checked
```

### Step 2: Automatic Card Generation

The website will automatically create a new card with:

**Visual Elements:**
- 👥 Emoji (based on "Mixed" format)
- Card title: "Summer Special"
- Description: "Summer fun league for all!"

**Card Details (Back):**
- Schedule: Every Friday, 8:00 PM
- Season: 12 weeks
- Format: Mixed

**Styling (Same as Other Cards):**
- ✅ Same rounded corners (20px radius)
- ✅ Same background color (var(--bg-secondary))
- ✅ Same padding (2.5rem)
- ✅ Same height (400px)
- ✅ Same flip animation
- ✅ Same hover effects (tilt, scale)
- ✅ Same "Join League" button style
- ✅ Same GSAP entrance animations
- ✅ Same border glow effects

## Grid Layout System

The cards use a **responsive CSS Grid** that automatically adjusts:

### Desktop View:
```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
```

**What This Means:**
- Cards automatically fit across the screen
- Each card minimum width: 280px
- All cards same width in each row
- Wraps to new rows as needed

### Examples:

**3 Leagues:**
```
┌────────┐  ┌────────┐  ┌────────┐
│ Monday │  │Tuesday │  │Wednesday│
└────────┘  └────────┘  └────────┘
```

**5 Leagues (Current):**
```
┌────────┐  ┌────────┐  ┌────────┐
│ Monday │  │Tuesday │  │Wednesday│
└────────┘  └────────┘  └────────┘

┌────────┐  ┌────────┐
│ Church │  │ Youth  │
└────────┘  └────────┘
```

**6 Leagues (Add Summer):**
```
┌────────┐  ┌────────┐  ┌────────┐
│ Monday │  │Tuesday │  │Wednesday│
└────────┘  └────────┘  └────────┘

┌────────┐  ┌────────┐  ┌────────┐
│ Church │  │ Youth  │  │ Summer │
└────────┘  └────────┘  └────────┘
```

**8 Leagues:**
```
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│League 1│  │League 2│  │League 3│  │League 4│
└────────┘  └────────┘  └────────┘  └────────┘

┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│League 5│  │League 6│  │League 7│  │League 8│
└────────┘  └────────┘  └────────┘  └────────┘
```

### Mobile View:
```css
grid-template-columns: 1fr;
```

**Stacks vertically:**
```
┌────────┐
│ Monday │
└────────┘
┌────────┐
│Tuesday │
└────────┘
┌────────┐
│Wednesday│
└────────┘
... etc
```

## Emoji Mapping

The card automatically selects the correct emoji based on format:

| Format  | Emoji | Example League       |
|---------|-------|---------------------|
| Open    | 🎳    | Monday Night Open   |
| Men's   | 👨    | Men's League        |
| Ladies  | 👩    | Tuesday Ladies      |
| Mixed   | 👥    | Mixed Doubles       |
| Youth   | 👦    | Junior Bowlers      |
| Seniors | 👴    | Senior League       |
| Other   | 🎯    | Special Events      |

## Card Component Structure

Every card uses the same component with these features:

```jsx
<LeagueCard
  emoji={emoji}              // Auto-selected
  title={league.name}        // From database
  description={league.description}
  details={{
    'Schedule': `Every ${league.day}, ${league.time}`,
    'Season': `${league.totalWeeks} weeks`,
    'Format': league.format,
  }}
  onClick={() => openLeagueSignup(league.name)}
  cardRef={(el) => (cardsRef.current[index] = el)}
/>
```

## Styling Consistency

All cards share:

### Front of Card:
- Background: `var(--bg-secondary)`
- Border radius: `20px`
- Padding: `2.5rem`
- Height: `400px`
- Emoji size: `4rem`
- Title: `var(--font-header)`, `1.8rem`
- Description: `var(--font-body)`, `1rem`

### Back of Card:
- Same background, radius, padding, height
- Detail rows with consistent spacing
- "Join League" button with:
  - Background: `var(--accent-primary)`
  - Color: `#ffffff`
  - Padding: `12px 30px`
  - Border radius: `25px`
  - Hover effects

### Animations:
- Entrance: GSAP scroll trigger
  - Opacity: 0 → 1
  - Y position: 60 → 0
  - Scale: 0.9 → 1
  - Stagger: 0.15s per card
- Hover: TiltedCard component
  - Scale: 1.03x
  - 3D tilt effect
- Flip: CSS 3D transform
  - Rotation: 0deg → 180deg
  - Duration: 0.6s

## Testing the System

### Test 1: Add 6th League
1. Go to `/admin-leagues.html`
2. Click "➕ Add New League"
3. Fill in details
4. Save
5. Go to homepage
6. **Result**: 6 cards in 2 rows of 3, all identical styling

### Test 2: Add 10 Leagues
1. Add multiple leagues
2. **Result**: Cards wrap to multiple rows
3. All maintain same size and spacing
4. Grid adjusts automatically

### Test 3: Mobile View
1. Add any number of leagues
2. View on mobile
3. **Result**: All cards stack vertically
4. Full width, same styling

### Test 4: Deactivate Leagues
1. Deactivate some leagues
2. **Result**: Cards disappear
3. Remaining cards reflow automatically
4. No gaps or spacing issues

## CSS Variables Used

All cards use theme variables for consistency:

```css
--bg-primary: Main background
--bg-secondary: Card background
--bg-tertiary: Alternate sections
--accent-primary: Red (#96333C)
--accent-secondary: Blue (#4E98D5)
--text-primary: Main text
--text-secondary: Subtle text
--border-color: Borders
--font-header: 'Orbitron'
--font-body: 'Roboto'
```

**This ensures:**
- All cards match current theme
- Dark/light mode compatible
- Consistent branding
- Easy maintenance

## Animation Timing

Cards animate in sequence:

```javascript
Card 1: Delay 0.30s
Card 2: Delay 0.45s (0.30 + 0.15)
Card 3: Delay 0.60s (0.45 + 0.15)
Card 4: Delay 0.75s
Card 5: Delay 0.90s
Card N: Delay 0.30 + (N-1) * 0.15s
```

**Creates smooth cascade effect** regardless of number of cards.

## Summary

✅ **Same styling guaranteed** - All cards use LeagueCard component  
✅ **Automatic layout** - CSS Grid handles any number of cards  
✅ **Responsive design** - Works on all screen sizes  
✅ **Consistent animations** - GSAP timeline for all cards  
✅ **Theme integration** - CSS variables ensure matching colors  
✅ **No manual adjustments** - Add unlimited leagues, all look perfect  

## Quick Test

**To verify everything works:**

1. Add a new league with unique name
2. Set it to Active
3. Save
4. Go to homepage
5. Scroll to "Join Our Leagues"
6. **You should see:**
   - New card appears
   - Matches existing cards exactly
   - Animates in with others
   - Same hover/flip effects
   - Same button styling
   - Grid reflows beautifully

🎳 **It just works!**
