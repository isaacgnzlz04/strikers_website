/**
 * Content Service
 * High-level service for fetching website content from Airtable
 */

import { fetchRecords, TABLES } from '../lib/airtable';

export const contentService = {
  /**
   * Get content for a specific page
   */
  async getPageContent(pageName) {
    return await fetchRecords(TABLES.WEBSITE_CONTENT, {
      filterByFormula: `AND({Page Name} = '${pageName}', {Active} = TRUE())`,
      sort: [{ field: 'Display Order', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Get all active news posts
   */
  async getNews(limit = 10) {
    return await fetchRecords(TABLES.NEWS, {
      filterByFormula: `{Status} = 'Published'`,
      sort: [{ field: 'Published Date', direction: 'desc' }],
      maxRecords: limit,
      useCache: true
    });
  },

  /**
   * Get upcoming events
   */
  async getUpcomingEvents() {
    const today = new Date().toISOString().split('T')[0];
    return await fetchRecords(TABLES.EVENTS, {
      filterByFormula: `AND({Status} = 'Upcoming', {Start Date} >= '${today}')`,
      sort: [{ field: 'Start Date', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Get all events (including past)
   */
  async getAllEvents() {
    return await fetchRecords(TABLES.EVENTS, {
      filterByFormula: `{Status} != 'Cancelled'`,
      sort: [{ field: 'Start Date', direction: 'desc' }],
      useCache: true
    });
  },

  /**
   * Get approved testimonials
   */
  async getTestimonials(limit = 10) {
    return await fetchRecords(TABLES.TESTIMONIALS, {
      filterByFormula: `AND({Status} = 'Approved', {Display on Website} = TRUE())`,
      sort: [{ field: 'Submitted Date', direction: 'desc' }],
      maxRecords: limit,
      useCache: true
    });
  },

  /**
   * Get active staff members
   */
  async getStaff() {
    return await fetchRecords(TABLES.STAFF, {
      filterByFormula: `{Active} = TRUE()`,
      sort: [{ field: 'Name', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Get active pricing/packages
   */
  async getPricing() {
    return await fetchRecords(TABLES.PRICING, {
      filterByFormula: `{Active} = TRUE()`,
      sort: [{ field: 'Display Order', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Get gallery images
   */
  async getGallery(category = null) {
    const filterFormula = category 
      ? `AND({Display on Website} = TRUE(), FIND('${category}', {Category}))`
      : `{Display on Website} = TRUE()`;

    return await fetchRecords(TABLES.GALLERY, {
      filterByFormula,
      sort: [{ field: 'Display Order', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Get settings/configuration
   */
  async getSettings(category = null) {
    const filterFormula = category 
      ? `{Category} = '${category}'`
      : null;

    const records = await fetchRecords(TABLES.SETTINGS, {
      filterFormula,
      useCache: true
    });

    // Convert to key-value object
    return records.reduce((acc, record) => {
      acc[record['Setting Key']] = record['Setting Value'];
      return acc;
    }, {});
  },

  /**
   * Get active leagues
   */
  async getLeagues(activeOnly = true) {
    const filterFormula = activeOnly ? `{Active} = TRUE()` : null;

    return await fetchRecords(TABLES.LEAGUES, {
      filterFormula,
      sort: [{ field: 'Day', direction: 'asc' }],
      useCache: true
    });
  }
};
