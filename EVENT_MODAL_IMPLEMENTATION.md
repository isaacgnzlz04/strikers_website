# Event Modal Implementation

## Overview
Created a dedicated `EventModal` component for event booking inquiries, separating it from the general lane booking flow. The modal provides a tailored experience for customers planning events like birthday parties, corporate gatherings, fundraisers, and more.

## Features Implemented

### 1. EventModal Component (`src/components/EventModal.jsx`)
- **Consistent Animations**: Uses GSAP timeline-based animations matching `BookingModal` and `LeagueSignupModal`
  - Backdrop fade in (0.3s)
  - Modal scale and slide with back.out easing (0.5s)
  - Title slide in (0.35s)
  - Content fade in (0.35s)
  - Reverse timeline for smooth closing

- **Event-Specific Form Fields**:
  - Full Name (required)
  - Email (required)
  - Phone (required)
  - Company/Organization (optional)
  - Event Type dropdown (required):
    - Birthday Party
    - Corporate Event
    - Fundraiser
    - School/Youth Group
    - Wedding Reception
    - Team Building
    - Other Celebration
  - Preferred Date (required, future dates only)
  - Preferred Time (required)
  - Expected Number of Guests (required)
  - Special Requests/Questions (optional textarea)

- **Responsive Design**:
  - Mobile breakpoint at 768px
  - Adjusts grid layouts for small screens
  - Optimized padding and font sizes

- **Theme Integration**:
  - Uses CSS variables for colors
  - Focus states with `--accent-primary`
  - Hover effects on submit button with color transition
  - Consistent border and background styling

### 2. App.jsx Integration
- Added `isEventModalOpen` state
- Imported and rendered `EventModal` component
- Updated `modalOpen` prop to include `isEventModalOpen`
- "Plan an Event" navigation link navigates to `/events` page
- EventsPackagesPage receives `openBooking` prop that opens EventModal

### 3. Navigation Structure
**Get Started Dropdown**:
- Join a League → `/leagues` page
- **Plan an Event** → `/events` page (browse packages)
- Hours & Pricing → Home page section
- League Standings → Standings page

## Usage Flow

1. **User clicks "Plan an Event"** from the Get Started dropdown
   - Navigates to `/events` page
   - User sees all available event packages (Birthday, Corporate, etc.)
   - Each package shows features, pricing, and details

2. **User selects a package**:
   - Can view package details by clicking "View Details"
   - Can click "Book Now" on any package card
   - EventModal opens with smooth animation

3. **User fills out event details**:
   - Provides contact information
   - Selects event type from dropdown (matches package category)
   - Chooses preferred date and time
   - Specifies number of guests
   - Adds any special requests

4. **User submits form**:
   - Console logs form data (ready for backend integration)
   - Shows success alert
   - Form resets
   - Modal closes with reverse animation

5. **Alternative entry points**:
   - Hero section "Book Now" button on Events page
   - Package detail modal "Book Now" button
   - Any custom links configured to call `setIsEventModalOpen(true)`

## Technical Details

### Animation Timeline
```javascript
// Opening sequence
tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  .fromTo(modal, { scale: 0.8, opacity: 0, y: -50 }, { scale: 1, opacity: 1, y: 0, duration: 0.5 }, '-=0.15')
  .fromTo(title, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.25')
  .fromTo(content, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, '-=0.2')
```

### Form Validation
- HTML5 required attributes
- Email type validation
- Tel type for phone formatting
- Date picker with min value set to today
- Number input for guests with min="1"

## Future Enhancements

### Backend Integration
- Replace `console.log` with API call
- Add loading state during submission
- Implement error handling
- Email confirmation to user and admin

### Enhanced Features
- **Pre-populate package information**: Pass selected package details to modal
- **Package-specific pricing**: Show selected package price in modal
- Add-ons checkboxes (as seen in EventsPackagesPage data structure)
- Calendar availability checking
- Real-time form validation with feedback
- File upload for event inspiration images
- **Auto-select event type**: Based on package category (Birthday/Corporate)

### UX Improvements
- Save form progress to localStorage
- Pre-fill fields for returning users
- Multi-step wizard for complex events
- Inline validation messages
- Success animation on submission
- **Package preview in modal**: Show which package was selected

## Files Modified

1. **src/components/EventModal.jsx** (NEW)
   - Complete modal component with form and animations

2. **src/App.jsx**
   - Added EventModal import
   - Added `isEventModalOpen` state
   - "Plan an Event" navigation goes to `/events` page
   - Rendered EventModal component
   - Updated modalOpen prop
   - EventsPackagesPage openBooking prop opens EventModal

## Testing Checklist

- [ ] Modal opens smoothly with timeline animation
- [ ] All form fields render correctly
- [ ] Event type dropdown shows all options
- [ ] Date picker only allows future dates
- [ ] Required field validation works
- [ ] Submit button changes color on hover
- [ ] Form submits and shows success message
- [ ] Form resets after submission
- [ ] Modal closes with reverse animation
- [ ] X button works and closes modal
- [ ] Click outside modal (backdrop) closes it
- [ ] Responsive design works on mobile
- [ ] Theme toggle doesn't break styling
- [ ] Navigation "Plan an Event" link opens modal
- [ ] EventsPackagesPage "Book Now" opens modal
- [ ] Multiple modals don't interfere with each other

## Notes

- The modal uses the same animation pattern as `BookingModal` and `LeagueSignupModal` for consistency
- Form data is currently logged to console - ready for backend integration
- Event type options align with packages shown in EventsPackagesPage
- Special requests field allows for flexibility in customer needs
