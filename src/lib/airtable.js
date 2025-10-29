/**
 * Airtable API Client
 * Handles all Airtable API interactions with caching and error handling
 */

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes (same as social media cache)
const CACHE_PREFIX = 'airtable_';

/**
 * Get cached data from localStorage
 */
function getCachedData(key) {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;
    
    if (isExpired) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

/**
 * Save data to localStorage cache
 */
function setCachedData(key, data) {
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

/**
 * Clear all Airtable cache
 */
export function clearAirtableCache() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    console.log('Airtable cache cleared');
  } catch (error) {
    console.error('Cache clear error:', error);
  }
}

/**
 * Make a request to Airtable API
 */
async function airtableRequest(endpoint, options = {}) {
  const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${endpoint}`;
  
  const headers = {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Airtable API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Airtable request error:', error);
    throw error;
  }
}

/**
 * Fetch records from a table with optional filtering and caching
 */
export async function fetchRecords(tableName, options = {}) {
  const {
    filterByFormula,
    sort,
    maxRecords,
    view,
    useCache = true,
    fields
  } = options;

  // Generate cache key based on parameters
  const cacheKey = `${tableName}_${JSON.stringify({ filterByFormula, sort, maxRecords, view, fields })}`;

  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey);
    if (cached) {
      console.log(`[Airtable] Using cached data for ${tableName}`);
      return cached;
    }
  }

  // Build query parameters
  const params = new URLSearchParams();
  if (filterByFormula) params.append('filterByFormula', filterByFormula);
  if (maxRecords) params.append('maxRecords', maxRecords);
  if (view) params.append('view', view);
  if (sort) {
    sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field);
      params.append(`sort[${i}][direction]`, s.direction || 'asc');
    });
  }
  if (fields) {
    fields.forEach(field => params.append('fields[]', field));
  }

  const endpoint = `${encodeURIComponent(tableName)}?${params.toString()}`;
  
  console.log(`[Airtable] Fetching records from ${tableName}`);
  const response = await airtableRequest(endpoint);

  // Transform records to a simpler format
  const records = response.records.map(record => ({
    id: record.id,
    ...record.fields,
    createdTime: record.createdTime
  }));

  // Cache the results
  if (useCache) {
    setCachedData(cacheKey, records);
  }

  return records;
}

/**
 * Fetch a single record by ID
 */
export async function fetchRecord(tableName, recordId) {
  const endpoint = `${encodeURIComponent(tableName)}/${recordId}`;
  
  console.log(`[Airtable] Fetching record ${recordId} from ${tableName}`);
  const response = await airtableRequest(endpoint);

  return {
    id: response.id,
    ...response.fields,
    createdTime: response.createdTime
  };
}

/**
 * Create a new record
 * Note: This should typically be called from a serverless function to protect API keys
 */
export async function createRecord(tableName, fields) {
  const endpoint = encodeURIComponent(tableName);
  
  console.log(`[Airtable] Creating record in ${tableName}`);
  const response = await airtableRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify({ fields })
  });

  return {
    id: response.id,
    ...response.fields,
    createdTime: response.createdTime
  };
}

/**
 * Update an existing record
 * Note: This should typically be called from a serverless function to protect API keys
 */
export async function updateRecord(tableName, recordId, fields) {
  const endpoint = `${encodeURIComponent(tableName)}/${recordId}`;
  
  console.log(`[Airtable] Updating record ${recordId} in ${tableName}`);
  const response = await airtableRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify({ fields })
  });

  return {
    id: response.id,
    ...response.fields,
    createdTime: response.createdTime
  };
}

/**
 * Delete a record
 * Note: This should typically be called from a serverless function to protect API keys
 */
export async function deleteRecord(tableName, recordId) {
  const endpoint = `${encodeURIComponent(tableName)}/${recordId}`;
  
  console.log(`[Airtable] Deleting record ${recordId} from ${tableName}`);
  const response = await airtableRequest(endpoint, {
    method: 'DELETE'
  });

  return response.deleted;
}

// Table name constants for consistency
export const TABLES = {
  USERS: 'Users/Members',
  BOOKINGS: 'Bookings',
  BOOKING_TYPES: 'Booking Types/Services',
  AVAILABILITY: 'Availability/Schedule',
  EMAIL_LOGS: 'Email Logs',
  WEBSITE_CONTENT: 'Website Content',
  NEWS: 'News/Announcements',
  EVENTS: 'Events/Programs',
  CONTACT_INQUIRIES: 'Contact/Inquiry Forms',
  TESTIMONIALS: 'Testimonials/Reviews',
  STAFF: 'Staff/Instructors',
  PRICING: 'Pricing/Packages',
  LEAGUES: 'Leagues',
  GALLERY: 'Gallery/Media',
  WAITLIST: 'Waitlist',
  LEAGUE_SIGNUPS: 'League Signups',
  EVENT_BOOKINGS: 'Event Bookings',
  LEAGUE_WEEKS: 'League Weeks',
  LEAGUE_STANDINGS: 'League Standings',
  SETTINGS: 'Settings/Configuration'
};
