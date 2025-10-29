/**
 * Vercel Serverless Function: Get Leagues
 * GET /api/leagues/list
 * 
 * Fetches active leagues from Airtable (server-side to keep API key secure)
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Build Airtable query with filter and sort
    const params = new URLSearchParams({
      filterByFormula: '{Active} = TRUE()',
      'sort[0][field]': 'Day',
      'sort[0][direction]': 'asc'
    });

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leagues?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch leagues',
        details: error
      });
    }

    const data = await airtableResponse.json();

    // Transform records to a cleaner format
    const leagues = data.records.map(record => ({
      id: record.id,
      ...record.fields
    }));

    return res.status(200).json({
      success: true,
      leagues,
      count: leagues.length
    });

  } catch (error) {
    console.error('League fetch error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
