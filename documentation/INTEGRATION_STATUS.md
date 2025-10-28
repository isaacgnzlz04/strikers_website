# Airtable Backend Integration Status

## Summary

✅ **Backend Infrastructure**: Complete  
⚠️ **Form Integration**: Needs to be wired up

---

## Created Components

### API Endpoints (Vercel Serverless Functions)

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `/api/bookings/create` | Lane/facility bookings | ✅ Created |
| `/api/bookings/availability` | Check available time slots | ✅ Created |
| `/api/contact/submit` | General contact form | ✅ Created |
| `/api/users/signup` | User registration | ✅ Created |
| `/api/newsletter/subscribe` | Newsletter subscriptions | ✅ Created |
| `/api/leagues/signup` | League registrations | ✅ Created |
| `/api/events/book` | Event/party bookings | ✅ Created |

### React Hooks

| Hook | Purpose | Status |
|------|---------|--------|
| `useAirtableContent` | Fetch page content | ✅ Created |
| `useBooking` | Handle bookings | ✅ Created |
| `useContactForm` | Handle contact forms | ✅ Created |
| Custom hooks (usePageContent, useEvents, etc.) | Specialized content fetching | ✅ Created |

### Services

| Service | Purpose | Status |
|---------|---------|--------|
| `contentService` | Content operations | ✅ Created |
| `bookingService` | Booking operations | ✅ Created |
| `userService` | User operations | ✅ Created |

---

## Forms That Need Integration

### 1. BookingModal.jsx
**Location**: `src/components/BookingModal.jsx`  
**Current**: Console logs and alert  
**Needs**: Connect to `/api/bookings/create`  
**API Endpoint**: ✅ Ready  
**Hook to Use**: `useBooking` from `src/hooks/useBooking.js`

**Form Fields**:
- name, email, phone
- date, time, lanes
- people, eventType
- specialRequests

---

### 2. EventModal.jsx
**Location**: `src/components/EventModal.jsx`  
**Current**: Console logs and alert  
**Needs**: Connect to `/api/events/book`  
**API Endpoint**: ✅ Ready  
**Hook Needed**: Create `useEventBooking` hook

**Form Fields**:
- name, email, phone
- company, eventType
- eventDate, eventTime
- guests, specialRequests

---

### 3. LeagueSignupModal.jsx
**Location**: `src/components/LeagueSignupModal.jsx`  
**Current**: Console logs and alert  
**Needs**: Connect to `/api/leagues/signup`  
**API Endpoint**: ✅ Ready  
**Hook Needed**: Create `useLeagueSignup` hook

**Form Fields**:
- name, email, phone
- league, usbcMembership
- average, teamName
- additionalInfo

---

### 4. ContactSection.jsx
**Location**: `src/components/ContactSection.jsx`  
**Current**: Console logs and alert  
**Needs**: Connect to `/api/contact/submit`  
**API Endpoint**: ✅ Ready  
**Hook to Use**: `useContactForm` from `src/hooks/useContactForm.js`

**Form Fields**:
- name, email, phone
- message

---

### 5. Footer.jsx (Newsletter)
**Location**: `src/components/Footer.jsx`  
**Current**: Console logs and alert  
**Needs**: Connect to `/api/newsletter/subscribe`  
**API Endpoint**: ✅ Ready  
**Service to Use**: `userService.subscribeNewsletter` from `src/services/userService.js`

**Form Fields**:
- email

---

## Airtable Tables Required

### Existing Tables (from original plan)
1. ✅ Users
2. ✅ Bookings
3. ✅ Booking Types
4. ✅ Availability
5. ✅ Email Logs
6. ✅ Website Content
7. ✅ News
8. ✅ Events
9. ✅ Contact Inquiries
10. ✅ Testimonials
11. ✅ Staff
12. ✅ Pricing
13. ✅ **Leagues** - League configurations and schedules
14. ✅ Gallery
15. ✅ Waitlist
16. ✅ Settings

### New Tables (for league/event bookings)
17. ✅ **League Signups** - For league registrations (links to Leagues table)
18. ✅ **Event Bookings** - For party/event inquiries

**Total Tables**: 18

---

## Next Steps to Wire Up Forms

### Step 1: Create Missing Hooks

Create these two new hooks in `src/hooks/`:

**useEventBooking.js**:
```javascript
import { useState } from 'react';

export function useEventBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const bookEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/events/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book event');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookEvent, loading, error, success };
}
```

**useLeagueSignup.js**:
```javascript
import { useState } from 'react';

export function useLeagueSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupForLeague = async (signupData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/leagues/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sign up for league');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signupForLeague, loading, error, success };
}
```

### Step 2: Update Each Component

For each form component, replace the `handleSubmit` function to use the appropriate hook/service.

**Example for ContactSection.jsx**:
```javascript
// Add at top
import { useContactForm } from '../hooks/useContactForm';

// Inside component
const { submitForm, loading, error, success } = useContactForm();

// Replace handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await submitForm(formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  } catch (err) {
    console.error('Failed to submit:', err);
  }
};
```

### Step 3: Add Loading States & Error Handling

Update each form to show:
- Loading spinner while submitting
- Success message on completion
- Error message on failure

---

## Testing Checklist

Once forms are wired up:

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add your Airtable credentials
- [ ] Run `vercel dev` to test locally
- [ ] Test each form submission
- [ ] Verify records appear in Airtable
- [ ] Set up Zapier webhooks
- [ ] Test email notifications
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel Dashboard
- [ ] Test in production

---

## Environment Variables Summary

**Required**:
- `AIRTABLE_API_KEY` (server-side)
- `AIRTABLE_BASE_ID` (server-side)
- `VITE_AIRTABLE_API_KEY` (client-side, for read-only content)
- `VITE_AIRTABLE_BASE_ID` (client-side, for read-only content)

**Optional** (Zapier Webhooks):
- `ZAPIER_BOOKING_WEBHOOK`
- `ZAPIER_CONTACT_WEBHOOK`
- `ZAPIER_SIGNUP_WEBHOOK`
- `ZAPIER_NEWSLETTER_WEBHOOK`
- `ZAPIER_LEAGUE_WEBHOOK`
- `ZAPIER_EVENT_WEBHOOK`

---

## Documentation

- Full setup guide: `documentation/AIRTABLE_BACKEND_SETUP.md`
- Quick start: `AIRTABLE_QUICKSTART.md`
- This file: `INTEGRATION_STATUS.md`
