# Webhook Testing Commands

Use these PowerShell commands to test each of your 6 Zapier webhooks.

**Before testing:**
1. Make sure your Zap is **turned ON**
2. Copy your actual webhook URL from Zapier
3. After sending, check https://zapier.com/app/history for results

---

## 1. Booking Confirmation Webhook

**API Endpoint:** `/api/bookings/create`

```powershell
$body = @{
    bookingId = "rec123456"
    userEmail = "test@example.com"
    userName = "John Doe"
    userPhone = "555-1234"
    serviceName = "Lane Rental"
    date = "2025-11-15"
    timeSlot = "2:00 PM - 4:00 PM"
    numberOfLanes = 2
    numberOfPeople = 8
    price = 50.00
    status = "Confirmed"
    specialRequests = "Birthday party setup"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uittcv4/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `bookingId`
- `userEmail`
- `userName`
- `userPhone`
- `serviceName`
- `date`
- `timeSlot`
- `numberOfLanes`
- `numberOfPeople`
- `price`
- `status`
- `specialRequests`

---

## 2. Contact Form Webhook

**API Endpoint:** `/api/contact/submit`

```powershell
$body = @{
    recordId = "rec789012"
    name = "Jane Smith"
    email = "jane.smith@example.com"
    phone = "555-5678"
    subject = "General Inquiry"
    message = "I would like to know more about your league programs."
    submittedAt = "2025-10-27T14:30:00Z"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uitkhr5/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `recordId`
- `name`
- `email`
- `phone`
- `subject`
- `message`
- `submittedAt`

---

## 3. Newsletter Subscription Webhook

**API Endpoint:** `/api/newsletter/subscribe`

**Note:** This webhook triggers Mailchimp actions, not email sends.

```powershell
$body = @{
    email = "newsletter@example.com"
    firstName = "Mike"
    lastName = "Johnson"
    source = "website footer"
    subscribedAt = "2025-10-27T14:35:00Z"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uitglmp/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `email`
- `firstName`
- `lastName`
- `source`
- `subscribedAt`

---

## 4. User Signup Webhook

**API Endpoint:** `/api/users/signup`

```powershell
$body = @{
    userId = "rec345678"
    email = "isaacgnzlz04@outlook.com"
    firstName = "Sarah"
    lastName = "Williams"
    phone = "555-9012"
    signupDate = "2025-10-27"
    marketingConsent = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uiteuqe/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `userId`
- `email`
- `firstName`
- `lastName`
- `phone`
- `signupDate`
- `marketingConsent`

---

## 5. League Signup Webhook

**API Endpoint:** `/api/leagues/signup`

```powershell
$body = @{
    signupId = "rec901234"
    leagueName = "Monday Night Mixed League"
    userEmail = "isaacgnzlz04@outlook.com"
    userName = "Tom Anderson"
    userPhone = "555-3456"
    teamName = "Strike Force"
    skillLevel = "Intermediate"
    preferredNight = "Monday"
    signupDate = "2025-10-27"
    notes = "Prefer early time slot"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uit0hbv/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `signupId`
- `leagueName`
- `userEmail`
- `userName`
- `userPhone`
- `teamName`
- `skillLevel`
- `preferredNight`
- `signupDate`
- `notes`

---

## 6. Event Booking Webhook

**API Endpoint:** `/api/events/book`

```powershell
$body = @{
    bookingId = "rec567890"
    eventName = "Corporate Team Building"
    contactName = "Lisa Chen"
    contactEmail = "lisa.chen@company.com"
    contactPhone = "555-7890"
    eventDate = "2025-12-01"
    eventTime = "6:00 PM"
    numberOfGuests = 50
    eventType = "Corporate Event"
    specialRequests = "Need projector and sound system"
    estimatedBudget = 2000.00
    status = "Inquiry"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://hooks.zapier.com/hooks/catch/25125054/uitxnwk/" -Method POST -Body $body -ContentType "application/json"
```

**Expected Fields in Zapier:**
- `bookingId`
- `eventName`
- `contactName`
- `contactEmail`
- `contactPhone`
- `eventDate`
- `eventTime`
- `numberOfGuests`
- `eventType`
- `specialRequests`
- `estimatedBudget`
- `status`

---

## How to Test

### Method 1: Copy & Paste Individual Tests

1. **Copy the PowerShell command** for the webhook you want to test
2. **Replace** `YOUR_WEBHOOK_URL` with your actual webhook URL from `.env.local`
3. **Open PowerShell** in your project directory
4. **Paste and run** the command
5. **Check Zapier** at https://zapier.com/app/history
6. You should see a new task with "Success" status

### Method 2: Test All At Once

Create a file called `test-webhooks.ps1`:

```powershell
# Load environment variables
$envContent = Get-Content .env.local
$webhooks = @{}
foreach ($line in $envContent) {
    if ($line -match '^ZAPIER_(.+)_WEBHOOK=(.+)$') {
        $webhooks[$matches[1]] = $matches[2]
    }
}

# Test 1: Booking Confirmation
Write-Host "Testing Booking Webhook..." -ForegroundColor Cyan
$bookingBody = @{
    bookingId = "rec123456"
    userEmail = "test@example.com"
    userName = "John Doe"
    serviceName = "Lane Rental"
    date = "2025-11-15"
    timeSlot = "2:00 PM - 4:00 PM"
    status = "Confirmed"
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["BOOKING"] -Method POST -Body $bookingBody -ContentType "application/json"

# Test 2: Contact Form
Write-Host "Testing Contact Webhook..." -ForegroundColor Cyan
$contactBody = @{
    recordId = "rec789012"
    name = "Jane Smith"
    email = "jane.smith@example.com"
    subject = "General Inquiry"
    message = "Test message"
    submittedAt = (Get-Date).ToString("o")
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["CONTACT"] -Method POST -Body $contactBody -ContentType "application/json"

# Test 3: Newsletter
Write-Host "Testing Newsletter Webhook..." -ForegroundColor Cyan
$newsletterBody = @{
    email = "newsletter@example.com"
    firstName = "Mike"
    lastName = "Johnson"
    source = "website footer"
    subscribedAt = (Get-Date).ToString("o")
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["NEWSLETTER"] -Method POST -Body $newsletterBody -ContentType "application/json"

# Test 4: User Signup
Write-Host "Testing User Signup Webhook..." -ForegroundColor Cyan
$userBody = @{
    userId = "rec345678"
    email = "newuser@example.com"
    firstName = "Sarah"
    lastName = "Williams"
    phone = "555-9012"
    signupDate = (Get-Date).ToString("yyyy-MM-dd")
    marketingConsent = $true
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["USER_SIGNUP"] -Method POST -Body $userBody -ContentType "application/json"

# Test 5: League Signup
Write-Host "Testing League Signup Webhook..." -ForegroundColor Cyan
$leagueBody = @{
    signupId = "rec901234"
    leagueName = "Monday Night Mixed League"
    userEmail = "bowler@example.com"
    userName = "Tom Anderson"
    teamName = "Strike Force"
    skillLevel = "Intermediate"
    signupDate = (Get-Date).ToString("yyyy-MM-dd")
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["LEAGUE_SIGNUP"] -Method POST -Body $leagueBody -ContentType "application/json"

# Test 6: Event Booking
Write-Host "Testing Event Booking Webhook..." -ForegroundColor Cyan
$eventBody = @{
    bookingId = "rec567890"
    eventName = "Corporate Team Building"
    contactName = "Lisa Chen"
    contactEmail = "lisa.chen@company.com"
    eventDate = "2025-12-01"
    numberOfGuests = 50
    status = "Inquiry"
} | ConvertTo-Json
Invoke-WebRequest -Uri $webhooks["EVENT_BOOKING"] -Method POST -Body $eventBody -ContentType "application/json"

Write-Host "`nAll tests sent! Check https://zapier.com/app/history" -ForegroundColor Green
```

Run with:
```powershell
.\test-webhooks.ps1
```

---

## Troubleshooting

### ❌ "No response" or Empty Response
- **Normal!** Zapier webhooks return 200 OK with empty body
- Check https://zapier.com/app/history for actual results

### ❌ "404 Not Found"
- Double-check your webhook URL
- Make sure there are no extra spaces or characters
- Verify the Zap is turned ON

### ❌ "Task shows as Error" in Zapier
- Click on the failed task to see details
- Common issues:
  - Gmail not connected
  - Missing required fields
  - Field mapping incorrect

### ❌ "Task never appears" in Zapier
- Webhook URL is wrong
- Zap is not published/turned on
- Wait 30-60 seconds and refresh

### ✅ Success Indicators
- Zapier history shows "Success"
- Email appears in inbox (for email zaps)
- Mailchimp shows new subscriber (for newsletter)

---

## Quick Reference: Webhook URLs

Your `.env.local` should have:

```env
ZAPIER_BOOKING_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
ZAPIER_CONTACT_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
ZAPIER_NEWSLETTER_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
ZAPIER_USER_SIGNUP_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
ZAPIER_LEAGUE_SIGNUP_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
ZAPIER_EVENT_BOOKING_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/
```
