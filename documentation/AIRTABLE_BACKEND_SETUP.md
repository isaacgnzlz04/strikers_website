# Airtable Backend Setup Guide

## Overview

This document provides complete instructions for setting up your Airtable backend for the Strikers Bowling Alley website.

## Table of Contents

1. [Airtable Base Structure](#airtable-base-structure)
2. [Environment Configuration](#environment-configuration)
3. [Zapier Integration](#zapier-integration)
4. [Usage Examples](#usage-examples)
5. [Deployment](#deployment)

---

## Airtable Base Structure

Create a new Airtable base called **"Strikers Website Backend"** with the following **20 tables**:

### 1. Users/Members

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| User ID | Auto-number | Primary field |
| Email | Email | Required, unique |
| First Name | Single line text | Required |
| Last Name | Single line text | Required |
| Phone Number | Phone number | Optional |
| Date Joined | Created time | Auto-populated |
| Member Status | Single select | Options: Active, Inactive, Pending |
| Mailchimp Subscriber ID | Single line text | Populated by Zapier |
| Newsletter Opted In | Checkbox | Default: unchecked |

### 2. Bookings

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Booking ID | Auto-number | Primary field |
| User Email | Email | Required |
| User Name | Single line text | Required |
| User Phone | Phone number | Optional |
| Service | Linked record | Link to Booking Types table |
| Service Name | Single line text | For display |
| Date | Date | Required |
| Time Slot | Single line text | e.g., "2:00 PM - 3:00 PM" |
| Status | Single select | Options: Confirmed, Pending, Cancelled, Completed |
| Payment Status | Single select | Options: Paid, Pending, Refunded |
| Notes | Long text | Optional |
| Created Date | Created time | Auto-populated |
| Modified Date | Last modified time | Auto-populated |

### 3. Booking Types/Services

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Service ID | Auto-number | Primary field |
| Service Name | Single line text | Required (e.g., "Lane Rental", "Birthday Party") |
| Description | Long text | Detailed description |
| Duration | Number | Duration in minutes |
| Price | Currency | Base price |
| Capacity | Number | Max people/lanes |
| Active | Checkbox | Whether service is available |

### 4. Availability/Schedule

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Slot ID | Auto-number | Primary field |
| Service | Linked record | Link to Booking Types |
| Date | Date | Required |
| Start Time | Single line text | e.g., "2:00 PM" |
| End Time | Single line text | e.g., "3:00 PM" |
| Available Spots | Number | Total capacity |
| Booked Spots | Rollup | Count from Bookings |
| Status | Formula | IF(Booked Spots >= Available Spots, "Full", "Available") |

### 5. Email Logs

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Log ID | Auto-number | Primary field |
| Email | Email | Recipient email |
| Email Type | Single select | Options: Welcome, Booking Confirmation, Reminder, Newsletter |
| Sent Date | Created time | Auto-populated |
| Status | Single select | Options: Sent, Failed, Pending |
| Mailchimp Campaign ID | Single line text | Optional |

### 6. Website Content

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Content ID | Auto-number | Primary field |
| Page Name | Single select | Options: Home, About, Services, Contact, etc. |
| Section Name | Single line text | e.g., "Hero", "Features", "CTA" |
| Content Type | Single select | Options: Text, Image, Video, Banner |
| Content Body | Long text | Main content |
| Media URL | URL or Attachment | For images/videos |
| Display Order | Number | Sorting order |
| Active | Checkbox | Whether to display |
| Last Updated | Last modified time | Auto-populated |

### 7. News/Announcements

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Post ID | Auto-number | Primary field |
| Title | Single line text | Required |
| Body | Long text | Full post content |
| Featured Image | Attachment | Optional |
| Author | Single line text | Author name |
| Published Date | Date | When to publish |
| Status | Single select | Options: Draft, Published, Archived |
| Category | Multiple select | Options: News, Events, Updates, Promotions |

### 8. Events/Programs

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Event ID | Auto-number | Primary field |
| Event Name | Single line text | Required |
| Description | Long text | Full description |
| Start Date | Date | Event start |
| End Date | Date | Event end |
| Location | Single line text | Where it takes place |
| Capacity | Number | Max participants |
| Registered Count | Rollup | Count from registrations |
| Price | Currency | Ticket/registration price |
| Images | Attachments | Event photos |
| Status | Single select | Options: Upcoming, Ongoing, Completed, Cancelled |

### 9. Contact/Inquiry Forms

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Inquiry ID | Auto-number | Primary field |
| Name | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Optional |
| Subject | Single select | Options: General, Booking, Membership, Complaint, Other |
| Message | Long text | Required |
| Status | Single select | Options: New, In Progress, Resolved, Closed |
| Assigned To | Single line text | Staff member name |
| Submitted Date | Created time | Auto-populated |

### 10. Testimonials/Reviews

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Review ID | Auto-number | Primary field |
| User Email | Email | Optional |
| User Name | Single line text | Required |
| Rating | Number | 1-5 stars |
| Review Text | Long text | Customer review |
| Service/Event | Linked record | What they're reviewing |
| Status | Single select | Options: Pending, Approved, Rejected |
| Display on Website | Checkbox | Whether to show publicly |
| Submitted Date | Created time | Auto-populated |

### 11. Staff/Instructors

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Staff ID | Auto-number | Primary field |
| Name | Single line text | Required |
| Role | Single select | Options: Manager, Staff, Instructor, Admin |
| Email | Email | Contact email |
| Phone | Phone number | Contact phone |
| Bio | Long text | Staff biography |
| Photo | Attachment | Profile photo |
| Availability | Long text | Schedule notes |
| Active | Checkbox | Currently employed |

### 12. Pricing/Packages

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Package ID | Auto-number | Primary field |
| Package Name | Single line text | e.g., "Family Package" |
| Description | Long text | What's included |
| Price | Currency | Package price |
| Duration | Single line text | e.g., "3 months", "10 sessions" |
| Features | Long text | Bulleted list of features |
| Active | Checkbox | Currently offered |
| Display Order | Number | Sorting order |

### 13. Leagues

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| League ID | Auto-number | Primary field |
| League Name | Single line text | Required, unique (e.g., "Monday Night Mixed") |
| Format | Single select | Options: Mixed, Ladies, Seniors, Youth, Open, Scratch, Handicap |
| Day | Single select | Options: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday |
| Time | Single line text | Start time (e.g., "6:30 PM") |
| Total Weeks | Number | Season length |
| Current Week | Number | Track progress |
| Season | Single line text | e.g., "Fall 2025" |
| Active | Checkbox | Currently accepting signups |
| Description | Long text | League details |
| Entry Fee | Currency | Cost per team/bowler |
| Max Teams | Number | League capacity |
| Photo | Attachment | League image |

### 14. Gallery/Media

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Media ID | Auto-number | Primary field |
| Title | Single line text | Image/video title |
| Description | Long text | Optional caption |
| Media File | Attachments | The actual media |
| Category | Multiple select | Options: Facility, Events, Leagues, Parties, Staff |
| Upload Date | Created time | Auto-populated |
| Display on Website | Checkbox | Whether to show |
| Display Order | Number | Sorting order |

### 15. Waitlist
| Price | Currency | Package price |
| Duration | Single line text | e.g., "3 months", "10 sessions" |
| Features | Long text | Bulleted list of features |
| Active | Checkbox | Currently offered |
| Display Order | Number | Sorting order |

### 14. Gallery/Media

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Media ID | Auto-number | Primary field |
| Title | Single line text | Image/video title |
| Description | Long text | Optional caption |
| Media File | Attachments | The actual media |
| Category | Multiple select | Options: Facility, Events, Leagues, Parties, Staff |
| Upload Date | Created time | Auto-populated |
| Display on Website | Checkbox | Whether to show |
| Display Order | Number | Sorting order |

### 15. Waitlist

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Waitlist ID | Auto-number | Primary field |
| User Email | Email | Required |
| User Name | Single line text | Required |
| Service/Event | Linked record | What they're waiting for |
| Requested Date | Date | Preferred date |
| Priority | Number | 1-5, higher = more urgent |
| Status | Single select | Options: Active, Notified, Converted, Cancelled |
| Added Date | Created time | Auto-populated |

### 16. League Signups

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Signup ID | Auto-number | Primary field |
| Name | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Optional |
| League | Linked record | Link to Leagues table (Required) |
| League Name | Single line text | For display/backward compatibility |
| USBC Membership | Single line text | Membership number |
| Average Score | Number | Bowler's average |
| Team Name | Single line text | If joining with a team |
| Additional Info | Long text | Any special requests/notes |
| Status | Single select | Options: Pending, Confirmed, Waitlist, Cancelled |
| Registration Date | Date | Auto-populated |

### 17. Event Bookings

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Booking ID | Auto-number | Primary field |
| Contact Name | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Optional |
| Company | Single line text | For corporate events |
| Event Type | Single select | Options: Birthday, Corporate, Fundraiser, Team Building, Other |
| Event Date | Date | Required |
| Event Time | Single line text | Preferred time |
| Number of Guests | Number | Required |
| Special Requests | Long text | Food, decorations, etc. |
| Status | Single select | Options: Pending, Confirmed, Cancelled, Completed |
| Inquiry Date | Date | Auto-populated |

### 18. League Weeks

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Week ID | Auto-number | Primary field |
| League | Linked record | Link to Leagues table (Required) |
| League Name | Single line text | For display/queries |
| Week Number | Number | Week number (e.g., 1, 2, 3...) |
| Week Date | Date | Date of the week |
| PDF File | Attachment | Standings PDF file |
| PDF URL | URL | Direct link to PDF if hosted externally |
| Notes | Long text | Any notes for this week |
| Created Date | Created time | Auto-populated |
| Last Modified | Last modified time | Auto-populated |

### 19. League Standings

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Standing ID | Auto-number | Primary field |
| League | Linked record | Link to Leagues table (Required) |
| League Name | Single line text | For display/queries |
| Week | Linked record | Link to League Weeks table |
| Week Number | Number | Week number for this standing |
| Team Name | Single line text | Required |
| Team Position | Number | Current position/rank |
| Games Played | Number | Total games played |
| Wins | Number | Total wins |
| Losses | Number | Total losses |
| Points | Number | Total points |
| Pins | Number | Total pins |
| High Game | Number | Highest game score |
| High Series | Number | Highest series score |
| Average | Number | Team/player average |
| Notes | Long text | Additional information |
| Last Updated | Last modified time | Auto-populated |

### 20. Settings/Configuration

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Setting Key | Single line text | Primary field (unique) |
| Setting Value | Long text | The actual value |
| Category | Single select | Options: General, Email, Booking, Payments, Social |
| Description | Long text | What this setting does |
| Last Modified | Last modified time | Auto-populated |

### 15. League Signups

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Signup ID | Auto-number | Primary field |
| Name | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Optional |
| League | Linked record | Link to Leagues table (Required) |
| League Name | Single line text | For display/backward compatibility |
| USBC Membership | Single line text | Membership number |
| Average Score | Number | Bowler's average |
| Team Name | Single line text | If joining with a team |
| Additional Info | Long text | Any special requests/notes |
| Status | Single select | Options: Pending, Confirmed, Waitlist, Cancelled |
| Registration Date | Date | Auto-populated |

### 16. Event Bookings

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Booking ID | Auto-number | Primary field |
| Contact Name | Single line text | Required |
| Email | Email | Required |
| Phone | Phone number | Optional |
| Company | Single line text | For corporate events |
| Event Type | Single select | Options: Birthday, Corporate, Fundraiser, Team Building, Other |
| Event Date | Date | Required |
| Event Time | Single line text | Preferred time |
| Number of Guests | Number | Required |
| Special Requests | Long text | Food, decorations, etc. |
| Status | Single select | Options: Pending, Confirmed, Cancelled, Completed |
| Inquiry Date | Date | Auto-populated |

### 17. Settings/Configuration

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Setting Key | Single line text | Primary field (unique) |
| Setting Value | Long text | The actual value |
| Category | Single select | Options: General, Email, Booking, Payments, Social |
| Description | Long text | What this setting does |
| Last Modified | Last modified time | Auto-populated |

**Example Settings:**
- `business_hours_override` - JSON object for holiday hours
- `booking_lead_time` - Minimum hours before booking
- `max_bookings_per_user` - Booking limits
- `maintenance_mode` - Enable/disable bookings

---

## Environment Configuration

### For Development (.env.local)

```env
# Airtable Configuration
VITE_AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
VITE_ENABLE_AIRTABLE=true

# Server-side (for Vercel Functions - no VITE_ prefix)
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# Zapier Webhooks (optional)
ZAPIER_BOOKING_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
ZAPIER_CONTACT_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
ZAPIER_SIGNUP_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
ZAPIER_NEWSLETTER_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
ZAPIER_LEAGUE_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
ZAPIER_EVENT_WEBHOOK=https://hooks.zapier.com/hooks/catch/...
```

### Getting Your Airtable Credentials

1. **API Key**:
   - Go to https://airtable.com/create/apikey
   - Create a new personal access token
   - Grant scopes: `data.records:read`, `data.records:write`
   - Copy the token (starts with `pat...` for new tokens or `key...` for legacy)

2. **Base ID**:
   - Open your Airtable base
   - Go to Help > API documentation
   - The Base ID is shown (starts with `app...`)

### For Production (Vercel)

Add environment variables in Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add all the variables above
3. Select environments: Production, Preview, Development

---

## Zapier Integration

### Zap 1: New User Signup
**Trigger:** New record in Airtable (Users table)  
**Actions:**
1. Add subscriber to Mailchimp audience
2. Send welcome email via Gmail/email service
3. Update Airtable record with Mailchimp Subscriber ID

### Zap 2: Booking Confirmation
**Trigger:** Webhook catch hook (from `/api/bookings/create`)  
**Actions:**
1. Send booking confirmation email
2. Create calendar event (Google Calendar)
3. Update booking status in Airtable to "Confirmed"

### Zap 3: Contact Form Notification
**Trigger:** Webhook catch hook (from `/api/contact/submit`)  
**Actions:**
1. Send notification email to staff
2. Send auto-reply to customer
3. Create task in project management tool (optional)

### Zap 4: Newsletter Subscription
**Trigger:** Webhook catch hook (from `/api/newsletter/subscribe`)  
**Actions:**
1. Add to Mailchimp audience
2. Log in Airtable Email Logs table
3. Send welcome email

---

## Usage Examples

### Example 1: Fetch Page Content

```javascript
import { usePageContent } from './hooks/useAirtableContent';

function AboutPage() {
  const { data: content, loading, error } = usePageContent('About');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {content.map(section => (
        <div key={section.id}>
          <h2>{section['Section Name']}</h2>
          <p>{section['Content Body']}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Create Booking

```javascript
import { useBooking } from './hooks/useBooking';

function BookingForm() {
  const { createBooking, loading, error, success } = useBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      userEmail: 'customer@example.com',
      userName: 'John Doe',
      userPhone: '555-1234',
      serviceId: 'recXXXXXXXXXX',
      serviceName: 'Lane Rental',
      date: '2025-11-01',
      timeSlot: '2:00 PM - 3:00 PM',
      notes: 'Birthday party'
    };

    try {
      await createBooking(bookingData);
      alert('Booking created successfully!');
    } catch (err) {
      alert('Failed to create booking');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Booking confirmed!</p>}
    </form>
  );
}
```

### Example 3: Contact Form

```javascript
import { useContactForm } from './hooks/useContactForm';

function ContactSection() {
  const { submitForm, loading, error, success } = useContactForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      await submitForm(data);
      e.target.reset();
    } catch (err) {
      console.error('Form submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Message sent!</p>}
    </form>
  );
}
```

---

## Deployment

### Local Testing

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Run locally:**
   ```bash
   vercel dev
   ```
   This will start both your Vite dev server and API functions.

3. **Test API endpoints:**
   - http://localhost:3000/api/bookings/create
   - http://localhost:3000/api/contact/submit
   - etc.

### Production Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Airtable backend"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Vercel will auto-deploy on push
   - Or manually: `vercel --prod`

3. **Verify environment variables in Vercel Dashboard**

### Post-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Airtable base created with all tables
- [ ] API endpoints responding correctly
- [ ] Zapier webhooks configured
- [ ] Test booking creation
- [ ] Test contact form
- [ ] Test newsletter signup
- [ ] Check email notifications working
- [ ] Verify Mailchimp integration

---

## Troubleshooting

### Common Issues

**Issue: API returns 401 Unauthorized**
- Check that AIRTABLE_API_KEY is set correctly in Vercel
- Verify API key has proper scopes

**Issue: No data showing up**
- Check that table names match exactly (case-sensitive)
- Verify VITE_ENABLE_AIRTABLE=true in .env.local
- Clear cache: `localStorage.clear()` in browser console

**Issue: CORS errors**
- Vercel functions automatically handle CORS
- If testing locally, ensure `vercel dev` is running

**Issue: Zapier not triggering**
- Verify webhook URLs are correct
- Check Zapier task history for errors
- Test webhooks manually with curl

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use separate API keys** for development and production
3. **Limit Airtable API key scopes** to only what's needed
4. **Validate all user input** on the server side
5. **Rate limit API endpoints** to prevent abuse
6. **Use HTTPS** for all production traffic
7. **Rotate API keys** periodically

---

## Next Steps

1. Create your Airtable base with the tables above
2. Copy `.env.example` to `.env.local` and fill in credentials
3. Test locally with `vercel dev`
4. Set up Zapier integrations
5. Deploy to Vercel
6. Migrate existing content to Airtable
7. Update React components to use new hooks

For questions or issues, refer to:
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Zapier Documentation](https://zapier.com/app/getting-started)
