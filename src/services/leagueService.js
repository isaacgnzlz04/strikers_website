/**
 * League Service
 * High-level service for league operations via Airtable
 */

import { fetchRecords, TABLES } from '../lib/airtable';

// Default leagues data (fallback if Airtable is not available)
const DEFAULT_LEAGUES = [
  {
    name: 'Monday Night Mixed',
    format: 'Mixed',
    day: 'Monday',
    time: '6:30 PM',
    totalWeeks: 32,
    active: true,
    description: 'Competitive mixed league perfect for teams that like a challenge and great atmosphere.',
  },
  {
    name: 'Tuesday Women\'s Classic',
    format: 'Ladies',
    day: 'Tuesday',
    time: '6:00 PM',
    totalWeeks: 28,
    active: true,
    description: 'High-energy ladies league focused on skill building, camaraderie, and weekly fun.',
  },
  {
    name: 'Wednesday Senior Rollers',
    format: 'Seniors',
    day: 'Wednesday',
    time: '1:00 PM',
    totalWeeks: 24,
    active: true,
    description: 'Relaxed daytime league tailored for seniors looking to stay active and social.',
  },
  {
    name: 'Thursday Youth Thunder',
    format: 'Youth',
    day: 'Thursday',
    time: '4:00 PM',
    totalWeeks: 20,
    active: true,
    description: 'Youth development league with certified coaches, perfect for building fundamentals.',
  },
  {
    name: 'Friday Night Lights',
    format: 'Open',
    day: 'Friday',
    time: '9:00 PM',
    totalWeeks: 36,
    active: true,
    description: 'Late-night open league with cosmic bowling vibes, music, and weekend energy.',
  },
];

export const leagueService = {
  /**
   * Get all leagues from secure API endpoint
   * @param {boolean} activeOnly - If true, only return active leagues (currently always fetches active)
   * @returns {Promise<Array>} Array of league records
   */
  async getAllLeagues(activeOnly = false) {
    try {
      console.log('[League Service] Fetching leagues from secure API');
      
      const response = await fetch('/api/leagues/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch leagues: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      const leagues = data.leagues || [];

      // Map Airtable fields to expected format
      return leagues.map(league => ({
        id: league.id,
        name: league['League Name'],
        format: league['Format'],
        day: league['Day'],
        time: league['Time'],
        totalWeeks: league['Total Weeks'],
        currentWeek: league['Current Week'],
        season: league['Season'],
        active: league['Active'],
        description: league['Description'],
        entryFee: league['Entry Fee'],
        maxTeams: league['Max Teams'],
        photo: league['Photo']?.[0]?.url || null
      }));
    } catch (error) {
      console.error('Failed to fetch leagues from API:', error);
      // Return default leagues as fallback
      return DEFAULT_LEAGUES;
    }
  },

  /**
   * Get a single league by name
   * @param {string} leagueName - The name of the league
   * @returns {Promise<Object|null>} League record or null
   */
  async getLeague(leagueName) {
    try {
      const leagues = await fetchRecords(TABLES.LEAGUES, {
        filterByFormula: `{League Name} = "${leagueName}"`,
        maxRecords: 1,
        useCache: true
      });

      if (leagues.length === 0) return null;

      const league = leagues[0];
      return {
        id: league.id,
        name: league['League Name'],
        format: league['Format'],
        day: league['Day'],
        time: league['Time'],
        totalWeeks: league['Total Weeks'],
        currentWeek: league['Current Week'],
        season: league['Season'],
        active: league['Active'],
        description: league['Description'],
        entryFee: league['Entry Fee'],
        maxTeams: league['Max Teams'],
        photo: league['Photo']?.[0]?.url || null
      };
    } catch (error) {
      console.error('Failed to fetch league from Airtable:', error);
      return null;
    }
  },

  /**
   * Get weeks for a specific league
   * @param {string} leagueName - The name of the league
   * @returns {Promise<Array>} Array of week records
   */
  async getWeeksForLeague(leagueName) {
    try {
      const weeks = await fetchRecords(TABLES.LEAGUE_WEEKS, {
        filterByFormula: `{League Name} = "${leagueName}"`,
        sort: [{ field: 'Week Number', direction: 'asc' }],
        useCache: true
      });

      return weeks.map(week => ({
        id: week.id,
        leagueName: week['League Name'],
        week: week['Week Number'],
        weekNumber: week['Week Number'],
        weekDate: week['Week Date'],
        pdfUrl: week['PDF URL'] || week['PDF File']?.[0]?.url || null,
        fileName: week['PDF File']?.[0]?.filename || `Week ${week['Week Number']}.pdf`,
        notes: week['Notes']
      }));
    } catch (error) {
      console.error('Failed to fetch league weeks from Airtable:', error);
      return [];
    }
  },

  /**
   * Get PDF data for a specific league and week
   * @param {string} leagueName - The name of the league
   * @param {number} weekNumber - The week number
   * @returns {Promise<Object|null>} PDF data or null
   */
  async getPDF(leagueName, weekNumber) {
    try {
      const weeks = await fetchRecords(TABLES.LEAGUE_WEEKS, {
        filterByFormula: `AND({League Name} = "${leagueName}", {Week Number} = ${weekNumber})`,
        maxRecords: 1,
        useCache: true
      });

      if (weeks.length === 0) return null;

      const week = weeks[0];
      const pdfUrl = week['PDF URL'] || week['PDF File']?.[0]?.url || null;
      
      if (!pdfUrl) return null;

      return {
        id: week.id,
        league: leagueName,
        week: weekNumber,
        pdfData: pdfUrl, // URL to the PDF
        fileName: week['PDF File']?.[0]?.filename || `${leagueName}-Week-${weekNumber}.pdf`
      };
    } catch (error) {
      console.error('Failed to fetch PDF from Airtable:', error);
      return null;
    }
  },

  /**
   * Get standings for a specific league and week
   * @param {string} leagueName - The name of the league
   * @param {number} weekNumber - The week number (optional, gets all if not specified)
   * @returns {Promise<Array>} Array of standing records
   */
  async getStandings(leagueName, weekNumber = null) {
    try {
      let filterFormula = `{League Name} = "${leagueName}"`;
      if (weekNumber !== null) {
        filterFormula = `AND(${filterFormula}, {Week Number} = ${weekNumber})`;
      }

      const standings = await fetchRecords(TABLES.LEAGUE_STANDINGS, {
        filterByFormula: filterFormula,
        sort: [
          { field: 'Week Number', direction: 'desc' },
          { field: 'Team Position', direction: 'asc' }
        ],
        useCache: true
      });

      return standings.map(standing => ({
        id: standing.id,
        leagueName: standing['League Name'],
        weekNumber: standing['Week Number'],
        teamName: standing['Team Name'],
        teamPosition: standing['Team Position'],
        gamesPlayed: standing['Games Played'],
        wins: standing['Wins'],
        losses: standing['Losses'],
        points: standing['Points'],
        pins: standing['Pins'],
        highGame: standing['High Game'],
        highSeries: standing['High Series'],
        average: standing['Average'],
        notes: standing['Notes']
      }));
    } catch (error) {
      console.error('Failed to fetch standings from Airtable:', error);
      return [];
    }
  },

  /**
   * Get default leagues data (for fallback)
   * @returns {Array} Default leagues
   */
  getDefaultLeagues() {
    return [...DEFAULT_LEAGUES];
  }
};

export default leagueService;
