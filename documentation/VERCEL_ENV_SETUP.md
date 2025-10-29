# Vercel Environment Variables Setup

## Issue: Airtable Base ID Shows as "undefined" in Production

**Symptom:** 
```
GET https://api.airtable.com/v0/undefined/Leagues 404 (Not Found)
```

**Root Cause:** Missing environment variables in Vercel

**Solution:** Set server-side environment variables (NO VITE_ prefix needed - we use secure API routes!)

## Required Environment Variables

### ⚠️ Security Note: No VITE_ Prefixed Variables Needed!

**Good news:** We've secured the app so Airtable API keys are NEVER exposed to the browser. All Airtable calls go through secure API routes.

### For Server-Side (API Routes) - Vercel Functions Only

These variables are used in your API routes (no VITE_ prefix):

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_airtable_base_id_here
ZAPIER_BOOKING_WEBHOOK=your_webhook_url
ZAPIER_CONTACT_WEBHOOK=your_webhook_url
ZAPIER_NEWSLETTER_WEBHOOK=your_webhook_url
ZAPIER_SIGNUP_WEBHOOK=your_webhook_url
ZAPIER_LEAGUE_WEBHOOK=your_webhook_url
ZAPIER_EVENT_WEBHOOK=your_webhook_url
```

## How to Add to Vercel

### Step 1: Access Environment Variables
1. Go to https://vercel.com
2. Select your project (`strikers_website`)
3. Click **Settings** tab
4. Click **Environment Variables** in the sidebar

### Step 2: Add Each Variable
For each variable:
1. Click **Add New**
2. Enter the **Key** (e.g., `AIRTABLE_BASE_ID` - NO VITE_ prefix)
3. Enter the **Value** (your actual API key/ID)
4. Select which environments:
   - ✅ **Production**
   - ✅ **Preview** (optional but recommended)
   - ⬜ **Development** (not needed, use `.env.local`)
5. Click **Save**

### Step 3: Redeploy
After adding all variables:
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋯** menu → **Redeploy**
4. Or just push a new commit to trigger deployment

## Complete List of Required Variables

**Only server-side variables needed (secure, not exposed to browser):**

```env
# Server-side (API Routes) - Never exposed to browser
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX

# Zapier Webhooks
ZAPIER_BOOKING_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
ZAPIER_CONTACT_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
ZAPIER_NEWSLETTER_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
ZAPIER_SIGNUP_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
ZAPIER_LEAGUE_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
ZAPIER_EVENT_WEBHOOK=https://hooks.zapier.com/hooks/catch/XXXXX/XXXXX/
```

**No VITE_ prefixed variables are needed!** All Airtable data is fetched through secure API routes.

## Architecture: Secure API Routes

### How It Works Now (Secure ✅)

```
Browser → /api/leagues/list → Airtable API
         (No API key)      (API key on server)
```

**Benefits:**
- ✅ API keys never exposed to browser
- ✅ No one can extract keys from DevTools
- ✅ Centralized rate limiting possible
- ✅ Can add authentication/authorization later
- ✅ Cached on server for better performance

### API Endpoints Created

- `GET /api/leagues/list` - Fetches active leagues (replaces direct Airtable calls)
- All existing POST endpoints already use this secure pattern

## Why Two Sets of Airtable Variables?

**You DON'T need two sets anymore!** Only server-side variables are required.

## Verification

After deployment, check:
1. Open browser DevTools → Console
2. Navigate to `/leagues`
3. Look for Airtable API calls
4. Should see: `https://api.airtable.com/v0/appXXXXXXX/Leagues` (not "undefined")

## Troubleshooting

### Still seeing "undefined"?
- ✅ Verify variables are added to Vercel
- ✅ Check they have the exact correct names (case-sensitive)
- ✅ Ensure you redeployed after adding variables
- ✅ Clear browser cache and hard refresh (Ctrl+Shift+R)

### API calls work locally but not in production?
- Your `.env.local` file works locally
- Must set same variables in Vercel dashboard
- `.env.local` is NOT deployed to Vercel (it's in .gitignore)

### Where do I find these values?

**Airtable API Key:**
1. Go to https://airtable.com/account
2. Click **Generate API key** or copy existing key

**Airtable Base ID:**
1. Go to https://airtable.com/api
2. Select your base
3. Find in URL or "Authentication" section: `appXXXXXXXXXXXXXX`

**Zapier Webhook URLs:**
1. Go to https://zapier.com/app/zaps
2. Edit each Zap
3. Click on the webhook trigger
4. Copy the webhook URL shown
