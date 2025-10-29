/**
 * Vercel Serverless Function: Contact Form Submission
 * POST /api/contact/submit
 * 
 * Handles contact form submissions, stores in Airtable, and triggers Zapier webhook
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

  // Early validation: Check if request body exists and is not empty
  if (!req.body || Object.keys(req.body).length === 0) {
    console.warn('Contact form submission attempt with empty body', {
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    return res.status(400).json({ 
      error: 'Request body is required'
    });
  }

  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['name', 'email', 'message']
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Create inquiry in Airtable
    const tableUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Contact%2FInquiry%20Forms`;
    console.log('Attempting to POST to:', tableUrl);
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID);
    
    const airtableResponse = await fetch(
      tableUrl,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Name': name,
            'Email': email,
            'Phone': phone || '',
            'Subject': subject || 'General',
            'Message': message,
            'Status': 'New'
          }
        })
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error details:', JSON.stringify(error, null, 2));
      console.error('Request body:', JSON.stringify({
        fields: {
          'Name': name,
          'Email': email,
          'Phone': phone || '',
          'Subject': subject || 'General Inquiry',
          'Message': message,
          'Status': 'New'
        }
      }, null, 2));
      return res.status(500).json({ 
        error: 'Failed to submit contact form',
        details: error
      });
    }

    const inquiry = await airtableResponse.json();

    // Trigger Zapier webhook for email notification (optional)
    if (process.env.ZAPIER_CONTACT_WEBHOOK) {
      try {
        await fetch(process.env.ZAPIER_CONTACT_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inquiryId: inquiry.id,
            name,
            email,
            phone,
            subject: subject || 'General Inquiry',
            message
          })
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      inquiry: {
        id: inquiry.id
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
