/**
 * Vercel Serverless Function: Newsletter Subscription
 * POST /api/newsletter/subscribe
 * 
 * Subscribes user to newsletter via Mailchimp and logs in Airtable
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, lastName } = req.body || {};

  // Validate required fields
  if (!email) {
    return res.status(400).json({ 
      error: 'Email is required'
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Trigger Zapier webhook (handles both Mailchimp and Airtable)
    if (process.env.ZAPIER_NEWSLETTER_WEBHOOK) {
      const zapierResponse = await fetch(process.env.ZAPIER_NEWSLETTER_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || '',
          lastName: lastName || '',
          source: 'website'
        })
      });

      if (!zapierResponse.ok) {
        throw new Error('Failed to subscribe to newsletter');
      }

      return res.status(201).json({
        success: true,
        message: 'Successfully subscribed to newsletter!'
      });
    }

    // Fallback: Direct Airtable logging if no Zapier webhook
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Email%20Logs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Email': email,
            'Email Type': 'Newsletter',
            'Status': 'Sent'
          }
        })
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ 
        error: 'Failed to subscribe',
        details: error
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
