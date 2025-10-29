/**
 * Vercel Serverless Function: Event Booking
 * POST /api/events/book
 * 
 * Handles event/party booking inquiries and triggers notifications
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
    console.warn('Event booking attempt with empty body', {
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    return res.status(400).json({ 
      error: 'Request body is required'
    });
  }

  const { 
    name, 
    email, 
    phone, 
    company,
    eventType, 
    eventDate, 
    eventTime, 
    guests, 
    specialRequests 
  } = req.body;

  // Validate required fields
  if (!name || !email || !eventType || !eventDate || !guests) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['name', 'email', 'eventType', 'eventDate', 'guests']
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Create event booking in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Event%20Bookings`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Contact Name': name,
            'Email': email,
            'Phone': phone || '',
            'Company': company || '',
            'Event Type': eventType,
            'Event Date': eventDate,
            'Event Time': eventTime || '',
            'Number of Guests': parseInt(guests) || 0,
            'Special Requests': specialRequests || '',
            'Status': 'Pending',
            'Inquiry Date': new Date().toISOString().split('T')[0]
          }
        })
      }
    );

    if (!airtableResponse.ok) {
      const error = await airtableResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ 
        error: 'Failed to submit event booking',
        details: error
      });
    }

    const booking = await airtableResponse.json();

    // Trigger Zapier webhook for notification (optional)
    if (process.env.ZAPIER_EVENT_WEBHOOK) {
      try {
        await fetch(process.env.ZAPIER_EVENT_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            name,
            email,
            phone,
            company,
            eventType,
            eventDate,
            eventTime,
            guests
          })
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your event inquiry! We will contact you shortly to discuss details.',
      booking: {
        id: booking.id
      }
    });

  } catch (error) {
    console.error('Event booking error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
