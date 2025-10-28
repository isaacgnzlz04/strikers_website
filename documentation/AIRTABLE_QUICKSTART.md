# Airtable Backend - Quick Start

## Setup (5 Minutes)

### 1. Create Airtable Base

Go to [Airtable](https://airtable.com) and create a new base called "Strikers Website Backend"

### 2. Get Credentials

- **API Key**: https://airtable.com/create/apikey
- **Base ID**: Found in your base's API documentation

### 3. Configure Environment

```bash
# Copy example file
cp .env.example .env.local

# Add your Airtable credentials
VITE_AIRTABLE_API_KEY=your_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_ENABLE_AIRTABLE=true

# For Vercel functions (no VITE_ prefix)
AIRTABLE_API_KEY=your_key_here
AIRTABLE_BASE_ID=your_base_id_here
```

### 4. Create Tables in Airtable

Use the **AIRTABLE_BACKEND_SETUP.md** guide to create all 15 tables.

### 5. Install and Test

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally (includes API functions)
vercel dev

# Test in browser
# Your site: http://localhost:3000
# API test: http://localhost:3000/api/bookings/availability?date=2025-11-01&serviceId=recXXX
```

## Usage in Components

```javascript
// Fetch page content
import { usePageContent } from './hooks/useAirtableContent';

function MyPage() {
  const { data, loading, error } = usePageContent('Home');
  
  if (loading) return <div>Loading...</div>;
  return <div>{/* render content */}</div>;
}

// Create booking
import { bookingService } from './services/bookingService';

const booking = await bookingService.createBooking({
  userEmail: 'user@example.com',
  userName: 'John Doe',
  serviceId: 'recXXX',
  serviceName: 'Lane Rental',
  date: '2025-11-01',
  timeSlot: '2:00 PM'
});
```

## Deploy to Vercel

```bash
# First time
vercel

# Production
vercel --prod
```

Don't forget to set environment variables in Vercel Dashboard!

## Documentation

- Full guide: `documentation/AIRTABLE_BACKEND_SETUP.md`
- API functions: `api/` directory
- React hooks: `src/hooks/`
- Services: `src/services/`
