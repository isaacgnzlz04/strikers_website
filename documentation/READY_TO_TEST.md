# Airtable Backend Integration - READY TO TEST

**Last Updated:** October 27, 2025  
**Status:** ✅ All forms integrated and ready for testing

---

## ✅ COMPLETED - Backend Infrastructure

### Core Library
- ✅ `src/lib/airtable.js` - Full CRUD operations with caching

### API Endpoints (7)
- ✅ `/api/bookings/create` - Lane bookings
- ✅ `/api/bookings/availability` - Time slot checking
- ✅ `/api/contact/submit` - Contact form
- ✅ `/api/users/signup` - User registration
- ✅ `/api/newsletter/subscribe` - Newsletter
- ✅ `/api/leagues/signup` - League registration
- ✅ `/api/events/book` - Event inquiries

### React Hooks (5)
- ✅ `useAirtableContent` - Content fetching
- ✅ `useBooking` - Booking operations
- ✅ `useContactForm` - Contact submissions
- ✅ `useEventBooking` - Event bookings
- ✅ `useLeagueSignup` - League signups

### Services (3)
- ✅ `contentService` - Content management
- ✅ `bookingService` - Booking logic
- ✅ `userService` - User operations

---

## ✅ COMPLETED - Form Integration

All forms are now connected to the Airtable backend:

### 1. ✅ BookingModal.jsx
- **Wired to:** `useBooking()` hook
- **API:** `/api/bookings/create`
- **Features:** Creates booking + triggers confirmation email via Zapier

### 2. ✅ ContactSection.jsx
- **Wired to:** `useContactForm()` hook
- **API:** `/api/contact/submit`
- **Features:** Submits inquiry + triggers notification email via Zapier

### 3. ✅ EventModal.jsx
- **Wired to:** `useEventBooking()` hook
- **API:** `/api/events/book`
- **Features:** Books event + triggers inquiry email via Zapier

### 4. ✅ LeagueSignupModal.jsx
- **Wired to:** `useLeagueSignup()` hook
- **API:** `/api/leagues/signup`
- **Features:** Registers for league + triggers confirmation email via Zapier

### 5. ✅ Footer.jsx (Newsletter)
- **Wired to:** `subscribeNewsletter()` service
- **API:** `/api/newsletter/subscribe`
- **Features:** Subscribes to newsletter + adds to Mailchimp via Zapier

---

## ✅ COMPLETED - Configuration

### Zapier Integration
- ✅ 6 Zaps created
- ✅ Gmail integration configured
- ✅ Webhooks tested and working

### Airtable Database
- ✅ 18 tables created
- ✅ Base ID configured

---

## 🧪 TESTING GUIDE

### Start Local Development
```powershell
vercel dev
```

### Test Each Form

#### 1. Lane Booking
1. Navigate to homepage
2. Click "Book Now" button
3. Fill out booking form:
   - Name, email, phone
   - Select date and time
   - Choose lanes and number of people
   - Add special requests
4. Click Submit
5. **Verify:**
   - Success message appears
   - Record in Airtable `Bookings` table
   - Email received (check spam)
   - Zapier task shows "Success"

#### 2. Contact Form
1. Scroll to contact section
2. Fill out form:
   - Name, email, phone, message
3. Click Submit
4. **Verify:**
   - Success message appears
   - Record in Airtable `Contact_Inquiries` table
   - Email received
   - Zapier task shows "Success"

#### 3. Event Booking
1. Navigate to Events page
2. Click "Book Event" button
3. Fill out form:
   - Name, email, phone
   - Event type, date, time
   - Number of guests
   - Special requests
4. Click Submit
5. **Verify:**
   - Success message appears
   - Record in Airtable `Event_Bookings` table
   - Email received
   - Zapier task shows "Success"

#### 4. League Signup
1. Navigate to Leagues page
2. Click "Sign Up" button
3. Fill out form:
   - Name, email, phone
   - Select league
   - USBC membership, average, team name
4. Click Submit
5. **Verify:**
   - Success message appears
   - Record in Airtable `League_Signups` table
   - Email received
   - Zapier task shows "Success"

#### 5. Newsletter
1. Scroll to footer
2. Enter email address
3. Click Subscribe
4. **Verify:**
   - Success message appears
   - Email added to Mailchimp
   - Zapier task shows "Success"

---

## 🔍 Verification Checklist

### Airtable Records
Check these tables for new records:
- [ ] `Bookings` - Lane bookings
- [ ] `Contact_Inquiries` - Contact form submissions
- [ ] `Event_Bookings` - Event inquiries
- [ ] `League_Signups` - League registrations
- [ ] Check Mailchimp for newsletter subscribers

### Zapier Task History
Visit: https://zapier.com/app/history
- [ ] All tasks show "Success" status
- [ ] No errors or warnings
- [ ] Timestamps match your test submissions

### Email Delivery
Check your inbox (and spam folder):
- [ ] Booking confirmation received
- [ ] Contact inquiry notification received
- [ ] Event inquiry notification received
- [ ] League signup confirmation received
- [ ] Newsletter welcome email received (if configured)

---

## 🚀 NEXT: Production Deployment

### 1. Add Environment Variables to Vercel
Go to your Vercel project settings → Environment Variables

Add these for **Production**:
```
AIRTABLE_API_KEY=your_airtable_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
ZAPIER_BOOKING_WEBHOOK=your_zapier_webhook_url
ZAPIER_CONTACT_WEBHOOK=your_zapier_webhook_url
ZAPIER_SIGNUP_WEBHOOK=your_zapier_webhook_url
ZAPIER_NEWSLETTER_WEBHOOK=your_zapier_webhook_url
ZAPIER_LEAGUE_WEBHOOK=your_zapier_webhook_url
ZAPIER_EVENT_WEBHOOK=your_zapier_webhook_url
```

### 2. Deploy
```powershell
git add .
git commit -m "Add Airtable backend integration"
git push
```

### 3. Test in Production
Repeat all form tests on your production site.

---

## 📊 Data Flow

```
User submits form
    ↓
React Component (with hook)
    ↓
API Endpoint (/api/...)
    ↓
Creates record in Airtable
    ↓
Triggers Zapier Webhook
    ↓
Zapier sends email via Gmail
    ↓
User receives confirmation
```

---

## 🐛 Troubleshooting

### Form won't submit
- Check browser console for errors
- Verify `VITE_ENABLE_AIRTABLE=true` in `.env.local`
- Restart dev server after changing `.env.local`

### Record not in Airtable
- Verify API key has write permissions
- Check Base ID is correct: `appgCxcdSsgnVK0Wj`
- Check Airtable table names match code

### No email received
- Check spam/junk folder
- Check Zapier task history for errors
- Verify Zaps are turned ON
- Verify Gmail connection in Zapier

### Webhook errors
- Test webhooks manually using `documentation/WEBHOOK_TESTS.md`
- Check webhook URLs have no typos
- Verify data format matches expected structure

---

## 📚 Documentation

- `AIRTABLE_BACKEND_SETUP.md` - Complete setup guide with 18 table schemas
- `AIRTABLE_QUICKSTART.md` - Quick start guide
- `ZAPIER_COMPLETE_SETUP.md` - Step-by-step Zapier configuration
- `WEBHOOK_TESTS.md` - PowerShell commands to test webhooks

---

## ✨ All Systems Ready!

Everything is configured and ready to test. Start with:

```powershell
vercel dev
```

Then test each form and verify records in Airtable! 🎉
