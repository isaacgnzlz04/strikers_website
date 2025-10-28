/**
 * Custom React Hook: useAirtableContent
 * Fetches and caches content from Airtable
 */

import { useState, useEffect } from 'react';
import { fetchRecords } from '../lib/airtable';

export function useAirtableContent(tableName, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const records = await fetchRecords(tableName, options);
        setData(records);
      } catch (err) {
        console.error(`Error fetching ${tableName}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [tableName, JSON.stringify(options)]);

  return { data, loading, error };
}

/**
 * Custom React Hook: usePageContent
 * Fetches content for a specific page
 */
export function usePageContent(pageName) {
  return useAirtableContent('Website Content', {
    filterByFormula: `AND({Page Name} = '${pageName}', {Active} = TRUE())`,
    sort: [{ field: 'Display Order', direction: 'asc' }],
    useCache: true
  });
}

/**
 * Custom React Hook: useEvents
 * Fetches upcoming events
 */
export function useEvents(includeAll = false) {
  const today = new Date().toISOString().split('T')[0];
  
  return useAirtableContent('Events', {
    filterByFormula: includeAll 
      ? `{Status} != 'Cancelled'`
      : `AND({Status} = 'Upcoming', {Start Date} >= '${today}')`,
    sort: [{ field: 'Start Date', direction: 'asc' }],
    useCache: true
  });
}

/**
 * Custom React Hook: useNews
 * Fetches published news/announcements
 */
export function useNews(limit = 10) {
  return useAirtableContent('News', {
    filterByFormula: `{Status} = 'Published'`,
    sort: [{ field: 'Published Date', direction: 'desc' }],
    maxRecords: limit,
    useCache: true
  });
}

/**
 * Custom React Hook: useTestimonials
 * Fetches approved testimonials
 */
export function useTestimonials(limit = 10) {
  return useAirtableContent('Testimonials', {
    filterByFormula: `AND({Status} = 'Approved', {Display on Website} = TRUE())`,
    sort: [{ field: 'Submitted Date', direction: 'desc' }],
    maxRecords: limit,
    useCache: true
  });
}

/**
 * Custom React Hook: useStaff
 * Fetches active staff members
 */
export function useStaff() {
  return useAirtableContent('Staff', {
    filterByFormula: `{Active} = TRUE()`,
    sort: [{ field: 'Name', direction: 'asc' }],
    useCache: true
  });
}

/**
 * Custom React Hook: usePricing
 * Fetches active pricing/packages
 */
export function usePricing() {
  return useAirtableContent('Pricing', {
    filterByFormula: `{Active} = TRUE()`,
    sort: [{ field: 'Display Order', direction: 'asc' }],
    useCache: true
  });
}

/**
 * Custom React Hook: useGallery
 * Fetches gallery images
 */
export function useGallery(category = null) {
  const filterFormula = category 
    ? `AND({Display on Website} = TRUE(), FIND('${category}', {Category}))`
    : `{Display on Website} = TRUE()`;

  return useAirtableContent('Gallery', {
    filterFormula,
    sort: [{ field: 'Display Order', direction: 'asc' }],
    useCache: true
  });
}

/**
 * Custom React Hook: useLeagues
 * Fetches active leagues
 */
export function useLeagues(activeOnly = true) {
  const filterFormula = activeOnly ? `{Active} = TRUE()` : null;

  return useAirtableContent('Leagues', {
    filterFormula,
    sort: [{ field: 'Day', direction: 'asc' }],
    useCache: true
  });
}
