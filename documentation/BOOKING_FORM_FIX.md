# Booking Form Fix

## Problem
The booking form was showing "Missing required fields" error even when all fields were filled because:
1. API required `serviceId` (linked record) that the form wasn't sending
2. Form was sending `numberOfLanes`, `numberOfPeople`, and `specialRequests` that the API wasn't handling

## Solution Applied

### Updated `/api/bookings/create.js`
- ✅ Made `serviceId` optional (not required anymore)
- ✅ Added support for `numberOfLanes` field
- ✅ Added support for `numberOfPeople` field  
- ✅ Added support for `specialRequests` field (maps to Notes)
- ✅ Updated Zapier webhook to include all fields

### How It Works Now

**Form sends:**
```javascript
{
  userName: "John Doe",
  userEmail: "john@example.com",
  userPhone: "555-1234",
  date: "2025-10-30",
  timeSlot: "6:00 PM",
  numberOfLanes: 2,
  numberOfPeople: 8,
  serviceName: "Lane Rental",
  specialRequests: "Need bumpers"
}
```

**API accepts and saves to Airtable:**
```javascript
{
  "User Email": "john@example.com",
  "User Name": "John Doe",
  "User Phone": "555-1234",
  "Service Name": "Lane Rental",
  "Date": "2025-10-30",
  "Time Slot": "6:00 PM",
  "Number of Lanes": 2,
  "Number of People": 8,
  "Status": "Pending",
  "Payment Status": "Pending",
  "Notes": "Need bumpers"
}
```

## Airtable Bookings Table Schema

Make sure your Airtable "Bookings" table has these fields:

### Required Fields (that the API sends):
- `User Email` - Single line text
- `User Name` - Single line text
- `User Phone` - Phone number or Single line text
- `Service Name` - Single line text
- `Date` - Date field
- `Time Slot` - Single line text
- `Status` - Single select (Pending, Confirmed, Cancelled)
- `Payment Status` - Single select (Pending, Paid, Refunded)
- `Notes` - Long text

### Optional Fields (sent if provided):
- `Number of Lanes` - Number field
- `Number of People` - Number field
- `Service` - Linked record to "Booking Types/Services" table (optional)

### Notes:
- If `Service` field doesn't exist or is empty, that's fine - booking still works
- The API now prioritizes `specialRequests` over `notes` for backward compatibility
- All webhook notifications include complete booking information

## Testing

1. Open the booking form
2. Fill in all fields:
   - Name
   - Email
   - Phone
   - Date
   - Time
   - Number of lanes
   - Number of people
   - Special requests (optional)
3. Submit

Should now work without "Missing required fields" error!

## If Still Getting Errors

Check Airtable field names match exactly:
- Field names are case-sensitive
- Spaces must match exactly
- Use single line text for text fields, not formula fields

You can verify your Airtable schema at:
https://airtable.com/api (select your base and check field names)
