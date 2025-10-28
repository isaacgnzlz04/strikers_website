/**
 * Vercel Serverless Function: League Signup
 * POST /api/leagues/signup
 * 
 * Handles league registration submissions and triggers notifications
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

  const { 
    name, 
    email, 
    phone, 
    league, 
    usbcMembership, 
    average, 
    teamName, 
    additionalInfo 
  } = req.body || {};

  // Validate required fields
  if (!name || !email || !league) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['name', 'email', 'league']
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Prepare fields for Airtable
    const fields = {
      'Name': name,
      'Email': email,
      'Phone': phone || '',
      'League Name': league,
      'USBC Membership': usbcMembership || '',
      'Team Name': teamName || '',
      'Additional Info': additionalInfo || '',
      'Status': 'Pending',
      'Registration Date': new Date().toISOString().split('T')[0]
    };

    // Only include Average Score if it's a valid number
    if (average && !isNaN(parseFloat(average))) {
      fields['Average Score'] = parseFloat(average);
    }

    // Create league signup in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/League%20Signups`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ 
        error: 'Failed to submit league signup',
        details: error
      });
    }

    const signup = await airtableResponse.json();

    // Trigger Zapier webhook for notification (optional)
    if (process.env.ZAPIER_LEAGUE_WEBHOOK) {
      try {
        await fetch(process.env.ZAPIER_LEAGUE_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            signupId: signup.id,
            name,
            email,
            phone,
            league,
            usbcMembership,
            average,
            teamName
          })
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return res.status(201).json({
      success: true,
      message: `Thank you for signing up for ${league}! We will contact you shortly with league details.`,
      signup: {
        id: signup.id
      }
    });

  } catch (error) {
    console.error('League signup error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
