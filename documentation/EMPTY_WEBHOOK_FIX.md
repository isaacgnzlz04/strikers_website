# Empty Webhook Requests - Issue & Fix

## Problem Summary

Empty requests were triggering Zapier webhooks, causing Zap errors because the webhooks received payloads with missing/undefined fields.

## Root Causes Identified

### 1. **Insufficient Request Body Validation**
All API endpoints had this pattern:
```javascript
const { email, firstName } = req.body || {};
```

While validation checks existed, they happened AFTER destructuring, which meant:
- Empty POST requests could pass through method validation
- Bots/crawlers hitting endpoints with empty bodies
- The `|| {}` fallback allowed processing to continue with undefined values

### 2. **Likely Sources of Empty Requests**

- **Bot/Crawler Traffic**: Search engines or security scanners
- **Monitoring Services**: Uptime monitors, Vercel health checks
- **Zapier Test Webhooks**: Saved test payloads that replay
- **Malformed API Calls**: CORS preflight issues or network errors
- **Automated Scanners**: Security tools probing endpoints

## The Fix Applied

### Enhanced Validation (All 6 Endpoints)

Added early validation that:
1. ✅ Checks if `req.body` exists
2. ✅ Verifies `req.body` is not an empty object
3. ✅ Logs suspicious requests with IP and user-agent
4. ✅ Returns 400 error BEFORE any webhook calls
5. ✅ Removed `|| {}` fallback that masked empty bodies

### Updated Endpoints

1. `/api/bookings/create.js` - Booking confirmations
2. `/api/contact/submit.js` - Contact form submissions
3. `/api/newsletter/subscribe.js` - Newsletter signups
4. `/api/users/signup.js` - User registrations
5. `/api/leagues/signup.js` - League signups
6. `/api/events/book.js` - Event bookings

### Code Pattern Applied

```javascript
// Early validation: Check if request body exists and is not empty
if (!req.body || Object.keys(req.body).length === 0) {
  console.warn('[Endpoint] attempt with empty body', {
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent']
  });
  return res.status(400).json({ 
    error: 'Request body is required'
  });
}

// Now destructure safely without fallback
const { email, firstName, lastName } = req.body;
```

## Monitoring for Future Issues

### 1. Check Vercel Logs

Monitor for the warning messages:
```bash
# Look for these patterns in Vercel logs
"attempt with empty body"
"Request body is required"
```

This will show you:
- IP addresses of suspicious traffic
- User agents (bots, crawlers, monitoring tools)
- Frequency of empty request attempts

### 2. Zapier Error Notifications

In Zapier dashboard:
1. Go to Zap History
2. Filter by "Errors"
3. Look for patterns in error timestamps
4. Check if errors correlate with specific times/sources

### 3. Set Up Alerts

**Vercel (if on Pro plan):**
- Set up log drains to send warnings to email/Slack
- Monitor 400 error rates

**Zapier:**
- Enable email notifications for Zap errors
- Set up error threshold alerts

## Testing the Fix

### Test Empty Request Handling

```bash
# Test with curl (empty body)
curl -X POST https://your-domain.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response:
# 400 Bad Request: "Request body is required"
```

### Test Valid Requests Still Work

```bash
# Test with valid data
curl -X POST https://your-domain.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Expected Response:
# 201 Created: "Successfully subscribed to newsletter!"
```

## Zapier Zap Health Check

After deploying these fixes:

1. **Clear Old Test Data**
   - Go to each Zap
   - Click "Test" on the webhook trigger
   - Generate NEW test data from a real form submission
   - Remove any old test data

2. **Verify Webhook URLs**
   - Ensure all environment variables are set correctly:
     ```
     ZAPIER_BOOKING_WEBHOOK
     ZAPIER_CONTACT_WEBHOOK
     ZAPIER_NEWSLETTER_WEBHOOK
     ZAPIER_SIGNUP_WEBHOOK
     ZAPIER_LEAGUE_WEBHOOK
     ZAPIER_EVENT_WEBHOOK
     ```

3. **Test Each Zap**
   - Submit a real form on your website
   - Verify Zap receives complete data
   - Check email notifications work correctly
   - Confirm Airtable records are created

## Prevention Best Practices

### 1. Always Validate Early
- Check request body exists FIRST
- Validate before any external API calls
- Log suspicious requests for investigation

### 2. Never Use Empty Fallbacks
```javascript
// ❌ DON'T DO THIS
const { email } = req.body || {};

// ✅ DO THIS
if (!req.body || Object.keys(req.body).length === 0) {
  return res.status(400).json({ error: 'Request body is required' });
}
const { email } = req.body;
```

### 3. Add Rate Limiting (Future Enhancement)
Consider adding rate limiting to prevent abuse:
```javascript
// Example with Vercel Edge Config or Upstash
import rateLimit from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

// In handler
await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
```

### 4. Implement Request Signing (Advanced)
For high-value endpoints, consider HMAC signatures:
- Generate signatures on client-side
- Verify signatures on server-side
- Reject unsigned requests

## Deployment Checklist

- [x] All 6 API endpoints updated with validation
- [x] Empty body checks added
- [x] Logging added for suspicious requests
- [x] Removed `|| {}` fallbacks
- [ ] Deploy to Vercel
- [ ] Test each endpoint with empty body
- [ ] Test each endpoint with valid data
- [ ] Monitor Vercel logs for 24 hours
- [ ] Check Zapier history for new errors
- [ ] Update team about the fix

## If Empty Requests Continue

If you still see empty webhook triggers after this fix:

1. **Check Vercel Logs** - Look for the warning messages to identify sources
2. **Block Suspicious IPs** - Add IP blocking in Vercel Edge Config
3. **Add CAPTCHA** - Consider adding reCAPTCHA to forms
4. **Webhook Verification** - Add signature verification to Zapier webhooks
5. **Contact Zapier Support** - Report persistent issues with webhook replay

## Summary

✅ All endpoints now reject empty requests BEFORE calling webhooks  
✅ Logging added to track suspicious traffic  
✅ Webhooks only triggered with validated, complete data  
✅ Error messages help identify the source of bad requests  

This fix should completely prevent empty Zapier webhook triggers while maintaining full functionality for legitimate requests.
