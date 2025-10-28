# Complete Zapier Integration Guide

## Overview

You'll create **6 Zaps** to handle all automated workflows for your website:

1. **Booking Confirmation** - Lane/facility bookings
2. **Contact Form Notification** - Contact inquiries
3. **Newsletter Subscription** - Newsletter signups
4. **User Signup** - New user registrations
5. **League Signup** - League registrations
6. **Event Booking** - Party/event inquiries

---

## Pre-Setup: What You Need

- ✅ Zapier account (free or paid)
- ✅ Airtable account with your base created
- ✅ Mailchimp account (for newsletter)
- ✅ Gmail account (for sending emails - **no sending limits with Zapier integration!**)

---

## Zap 1: Booking Confirmation (Lane Rentals)

### Step 1: Create New Zap
1. Go to https://zapier.com/app/zaps
2. Click **"Create Zap"** (orange button)
3. Name it: "Booking Confirmation - Lane Rentals"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL** that appears
   - Example: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`
   - ⚠️ **SAVE THIS** as `ZAPIER_BOOKING_WEBHOOK` in your `.env.local`
5. Click **"Continue"**
6. Click **"Skip test"** (we'll test later)

### Step 3: Add Action - Send Confirmation Email to Customer
1. Click the **"+" button**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**
5. **Sign in to Gmail** and authorize Zapier
6. Click **"Continue"**

7. **Fill in email template**:
   ```
   To: [1. User Email]
   (Click the field and select from the dropdown from Step 1 data)
   
   Subject: Booking Confirmation - Strikers Bowling Alley
   
   Body:
   Hi [1. User Name],

   Thank you for booking with Strikers Bowling Alley!

   BOOKING DETAILS:
   ────────────────────────────
   Service: [1. Service Name]
   Date: [1. Date]
   Time: [1. Time Slot]
   Status: Pending Confirmation
   Booking ID: [1. Booking Id]

   We'll confirm your booking shortly and send you any additional details.

   If you have any questions, please don't hesitate to contact us:
   📞 Phone: (479) 968-9996
   📧 Email: info@mainleestrikers.com

   Thank you for choosing Strikers!
   
   ────────────────────────────
   Strikers Bowling Alley
   3700 W. Main St.
   Russellville, AR 72801
   www.mainleestrikers.com
   ```

6. Click **"Continue"**
7. Click **"Test action"**
8. Click **"Continue"**

### Step 4: Add Action - Send Notification to Staff
1. Click **"+" button** again
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in staff notification**:
   ```
   To: youremail@mainleestrikers.com
   (Replace with your actual staff email)
   
   Subject: 🎳 New Booking - [1. Service Name] on [1. Date]
   
   Body:
   NEW BOOKING RECEIVED
   ────────────────────────────
   
   Customer: [1. User Name]
   Email: [1. User Email]
   Phone: [1. User Phone]
   
   Service: [1. Service Name]
   Date: [1. Date]
   Time: [1. Time Slot]
   
   Status: [1. Status]
   Booking ID: [1. Booking Id]
   
   Notes: [1. Notes]
   
   ────────────────────────────
   View in Airtable: https://airtable.com/appgCxcdSsgnVK0Wj
   ```

6. Click **"Continue"**
7. Click **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"** (top right)
2. Toggle it **ON**
3. ✅ Done! Copy the webhook URL to your `.env.local`

---

## Zap 2: Contact Form Notification

### Step 1: Create New Zap
1. Click **"Create Zap"**
2. Name it: "Contact Form Notifications"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL**
   - ⚠️ **SAVE THIS** as `ZAPIER_CONTACT_WEBHOOK`
5. Click **"Continue"**
6. Click **"Skip test"**

### Step 3: Add Action - Notify Staff
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in email**:
   ```
   To: youremail@mainleestrikers.com
   
   Subject: 📧 New Contact Form - [1. Subject]
   
   Body:
   NEW CONTACT FORM SUBMISSION
   ────────────────────────────
   
   From: [1. Name]
   Email: [1. Email]
   Phone: [1. Phone]
   Subject: [1. Subject]
   
   MESSAGE:
   [1. Message]
   
   ────────────────────────────
   Submitted: [1. Inquiry Id]
   
   Reply to this customer as soon as possible!
   View in Airtable: https://airtable.com/appgCxcdSsgnVK0Wj
   ```

6. Click **"Continue"** → **"Test action"**

### Step 4: Add Action - Auto-Reply to Customer
1. Click **"+"** again
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in auto-reply**:
   ```
   To: [1. Email]
   
   Subject: We received your message - Strikers Bowling Alley
   
   Body:
   Hi [1. Name],

   Thank you for contacting Strikers Bowling Alley!

   We have received your message regarding: [1. Subject]

   Our team will review your inquiry and get back to you within 24 hours.

   In the meantime, feel free to call us at (479) 968-9996 if you need immediate assistance.

   Best regards,
   The Strikers Team
   
   ────────────────────────────
   Strikers Bowling Alley
   3700 W. Main St.
   Russellville, AR 72801
   Phone: (479) 968-9996
   www.mainleestrikers.com
   ```

6. Click **"Continue"** → **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"**
2. Toggle it **ON**
3. ✅ Done! Save webhook URL to `.env.local`

---

## Zap 3: Newsletter Subscription

### Step 1: Create New Zap
1. Click **"Create Zap"**
2. Name it: "x"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL**
   - ⚠️ **SAVE THIS** as `ZAPIER_NEWSLETTER_WEBHOOK`
5. Click **"Continue"**
6. Click **"Skip test"**

### Step 3: Add Action - Add to Mailchimp
1. Click **"+"**
2. Search for **"Mailchimp"**
3. Select event: **"Add/Update Subscriber"**
4. Click **"Continue"**
5. **Sign in to Mailchimp** (authorize Zapier)
6. Click **"Continue"**

7. **Configure subscriber**:
   ```
   Audience: [Select your newsletter list]
   Subscriber Email: [1. Email]
   Subscriber Status: subscribed
   First Name: [1. First Name] (optional)
   Last Name: [1. Last Name] (optional)
   Tags: Website Signup (optional)
   ```

8. Click **"Continue"** → **"Test action"**

### Step 4: Add Action - Log in Airtable
1. Click **"+"**
2. Search for **"Airtable"**
3. Select event: **"Create Record"**
4. Click **"Continue"**
5. **Connect Airtable** (sign in and authorize)
6. Click **"Continue"**

7. **Configure record**:
   ```
   Base: Strikers Website Backend
   Table: Email Logs
   
   Fields:
   Email: [1. Email]
   Email Type: Newsletter
   Status: Sent
   ```

8. Click **"Continue"** → **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"**
2. Toggle it **ON**
3. ✅ Done! Save webhook URL

---

## Zap 4: User Signup / Welcome Email

### Step 1: Create New Zap
1. Click **"Create Zap"**
2. Name it: "New User Welcome Email"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL**
   - ⚠️ **SAVE THIS** as `ZAPIER_SIGNUP_WEBHOOK`
5. Click **"Continue"**
6. Click **"Skip test"**

### Step 3: Add Action - Send Welcome Email
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in welcome email**:
   ```
   To: [1. Email]
   
   Subject: Welcome to Strikers Bowling Alley! 🎳
   
   Body:
   Hi [1. First Name],

   Welcome to the Strikers Bowling Alley family!

   We're thrilled to have you join us. Your account has been successfully created.

   WHAT'S NEXT?
   ────────────────────────────
   ✓ Book lanes online
   ✓ Join a league
   ✓ Book events and parties
   ✓ Stay updated on special offers
   
   CONTACT US:
   📞 Phone: (479) 968-9996
   📧 Email: info@mainleestrikers.com
   📍 Address: 3700 W. Main St., Russellville, AR 72801
   
   We can't wait to see you at the lanes!
   
   Best regards,
   The Strikers Team
   
   ────────────────────────────
   www.mainleestrikers.com
   ```

6. Click **"Continue"** → **"Test action"**

### Step 4: (Optional) Add to Mailchimp if opted in
1. Click **"+"**
2. Search for **"Filter by Zapier"**
3. Click **"Continue"**
4. Set condition:
   ```
   (Text) Newsletter Opt In | (Text) Exactly matches | true
   ```
5. Click **"Continue"**

6. Click **"+"** again
7. Search for **"Mailchimp"**
8. Select **"Add/Update Subscriber"**
9. Configure as in Zap 3
10. Click **"Continue"** → **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"**
2. Toggle it **ON**
3. ✅ Done! Save webhook URL

---

## Zap 5: League Signup Notification

### Step 1: Create New Zap
1. Click **"Create Zap"**
2. Name it: "League Signup Confirmation"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL**
   - ⚠️ **SAVE THIS** as `ZAPIER_LEAGUE_WEBHOOK`
5. Click **"Continue"**
6. Click **"Skip test"**

### Step 3: Add Action - Email to Customer
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in email**:
   ```
   To: [1. Email]
   
   Subject: League Registration Received - [1. League]
   
   Body:
   Hi [1. Name],

   Thank you for signing up for [1. League]!

   REGISTRATION DETAILS:
   ────────────────────────────
   League: [1. League]
   Team Name: [1. Team Name]
   USBC Membership: [1. Usbc Membership]
   Average: [1. Average]
   
   STATUS: Pending Confirmation
   
   Our league coordinator will review your registration and contact you within 2 business days with:
   • Confirmation of your spot
   • League schedule
   • Payment information
   • Team assignments (if applicable)
   
   QUESTIONS?
   Contact our league coordinator at:
   📞 (479) 968-9996
   📧 leagues@mainleestrikers.com
   
   We look forward to seeing you on the lanes!
   
   Best regards,
   Strikers League Team
   
   ────────────────────────────
   Strikers Bowling Alley
   3700 W. Main St., Russellville, AR 72801
   ```

6. Click **"Continue"** → **"Test action"**

### Step 4: Add Action - Notify Staff
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in staff notification**:
   ```
   To: youremail@mainleestrikers.com
   
   Subject: 🎳 New League Signup - [1. League]
   
   Body:
   NEW LEAGUE REGISTRATION
   ────────────────────────────
   
   Name: [1. Name]
   Email: [1. Email]
   Phone: [1. Phone]
   
   League: [1. League]
   Team Name: [1. Team Name]
   USBC #: [1. Usbc Membership]
   Average: [1. Average]
   
   Additional Info:
   [1. Additional Info]
   
   ────────────────────────────
   Signup ID: [1. Signup Id]
   
   Action Required: Contact bowler to confirm spot
   View in Airtable: https://airtable.com/appgCxcdSsgnVK0Wj
   ```

6. Click **"Continue"** → **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"**
2. Toggle it **ON**
3. ✅ Done! Save webhook URL

---

## Zap 6: Event Booking Inquiry

### Step 1: Create New Zap
1. Click **"Create Zap"**
2. Name it: "Event Booking Inquiry"

### Step 2: Set Up Trigger (Webhook)
1. Search for **"Webhooks by Zapier"**
2. Select event: **"Catch Hook"**
3. Click **"Continue"**
4. **COPY THE WEBHOOK URL**
   - ⚠️ **SAVE THIS** as `ZAPIER_EVENT_WEBHOOK`
5. Click **"Continue"**
6. Click **"Skip test"**

### Step 3: Add Action - Email to Customer
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in email**:
   ```
   To: [1. Email]
   
   Subject: Event Inquiry Received - Strikers Bowling Alley
   
   Body:
   Hi [1. Name],

   Thank you for your event inquiry!

   EVENT DETAILS:
   ────────────────────────────
   Event Type: [1. Event Type]
   Date: [1. Event Date]
   Time: [1. Event Time]
   Number of Guests: [1. Guests]
   Company: [1. Company]
   
   Special Requests:
   [1. Special Requests]
   
   WHAT'S NEXT?
   Our events team will review your request and contact you within 24 hours to discuss:
   • Availability for your date
   • Package options and pricing
   • Food and beverage options
   • Custom arrangements
   
   CONTACT US:
   For immediate assistance, call our events team:
   📞 (479) 968-9996
   📧 events@mainleestrikers.com
   
   We can't wait to help make your event amazing!
   
   Best regards,
   Strikers Events Team
   
   ────────────────────────────
   Strikers Bowling Alley
   3700 W. Main St., Russellville, AR 72801
   www.mainleestrikers.com
   ```

6. Click **"Continue"** → **"Test action"**

### Step 4: Add Action - Notify Events Team
1. Click **"+"**
2. Search for **"Gmail"**
3. Select event: **"Send Email"**
4. Click **"Continue"**

5. **Fill in staff notification**:
   ```
   To: youremail@mainleestrikers.com
   
   Subject: 🎉 New Event Inquiry - [1. Event Type] on [1. Event Date]
   
   Body:
   NEW EVENT BOOKING INQUIRY
   ────────────────────────────
   
   Contact: [1. Name]
   Email: [1. Email]
   Phone: [1. Phone]
   Company: [1. Company]
   
   EVENT DETAILS:
   Type: [1. Event Type]
   Date: [1. Event Date]
   Time: [1. Event Time]
   Guests: [1. Guests]
   
   Special Requests:
   [1. Special Requests]
   
   ────────────────────────────
   Booking ID: [1. Booking Id]
   
   Action Required: Contact customer within 24 hours
   View in Airtable: https://airtable.com/appgCxcdSsgnVK0Wj
   ```

6. Click **"Continue"** → **"Test action"**

### Step 5: Publish Zap
1. Click **"Publish"**
2. Toggle it **ON**
3. ✅ Done! Save webhook URL

---

## Final Setup: Update Environment Variables

Now that you have all 6 webhook URLs, update your `.env.local` file:

```env
# Zapier Webhook URLs
ZAPIER_BOOKING_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
ZAPIER_CONTACT_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
ZAPIER_SIGNUP_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
ZAPIER_NEWSLETTER_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
ZAPIER_LEAGUE_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
ZAPIER_EVENT_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXXX/
```

**Also add them to Vercel** (for production):
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add each webhook URL
4. Select: Production, Preview, Development

---

## Testing Your Zaps

### Test Locally:
```bash
vercel dev
```

Then test each form on your website. Check:
- ✅ Zapier task history shows the webhook was received
- ✅ Customer receives email
- ✅ Staff receives notification email
- ✅ Data appears in Airtable (if applicable)

### Troubleshooting:
- **Zap not triggering**: Check webhook URL is correct in `.env.local`
- **Email not sending**: Check Zapier task history for errors
- **Wrong data**: Re-test the trigger to capture latest webhook data

---

## Summary Checklist

- [ ] Zap 1: Booking Confirmation ✅
- [ ] Zap 2: Contact Form ✅
- [ ] Zap 3: Newsletter ✅
- [ ] Zap 4: User Signup ✅
- [ ] Zap 5: League Signup ✅
- [ ] Zap 6: Event Booking ✅
- [ ] All webhook URLs added to `.env.local`
- [ ] All webhook URLs added to Vercel
- [ ] All Zaps are turned ON
- [ ] Tested each form locally
- [ ] Verified emails are being sent

🎉 **You're all set!** Your automated workflow is ready to handle all customer interactions.
