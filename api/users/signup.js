/**
 * Vercel Serverless Function: User Signup
 * POST /api/users/signup
 * 
 * Creates a new user in Airtable and optionally adds to Mailchimp
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

  const { email, firstName, lastName, phone, newsletterOptIn } = req.body || {};

  // Validate required fields
  if (!email || !firstName || !lastName) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['email', 'firstName', 'lastName']
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Check if user already exists
    const existingUserParams = new URLSearchParams({
      filterByFormula: `{Email} = '${email}'`
    });

    const existingUserResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Users%2FMembers?${existingUserParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
      }
    );

    if (existingUserResponse.ok) {
      const existingData = await existingUserResponse.json();
      if (existingData.records.length > 0) {
        return res.status(409).json({ 
          error: 'User already exists',
          userId: existingData.records[0].id
        });
      }
    }

    // Create user in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Users%2FMembers`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Email': email,
            'First Name': firstName,
            'Last Name': lastName,
            'Phone Number': phone || '',
            'Member Status': 'Active',
            'Newsletter Opted In': newsletterOptIn || false
          }
        })
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ 
        error: 'Failed to create user',
        details: error
      });
    }

    const user = await airtableResponse.json();

    // Trigger Zapier webhook for welcome email and Mailchimp sync (optional)
    if (process.env.ZAPIER_SIGNUP_WEBHOOK) {
      try {
        await fetch(process.env.ZAPIER_SIGNUP_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            email,
            firstName,
            lastName,
            phone,
            newsletterOptIn: newsletterOptIn || false
          })
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: user.id,
        email: user.fields.Email,
        firstName: user.fields['First Name'],
        lastName: user.fields['Last Name']
      }
    });

  } catch (error) {
    console.error('User signup error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
