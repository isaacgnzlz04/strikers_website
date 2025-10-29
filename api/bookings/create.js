/**
 * Vercel Serverless Function: Create Booking
 * POST /api/bookings/create
 * 
 * Creates a new booking in Airtable and triggers Zapier webhook for email notifications
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
    console.warn('Booking creation attempt with empty body', {
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });
    return res.status(400).json({ 
      error: 'Request body is required'
    });
  }

  const { userEmail, userName, userPhone, serviceId, serviceName, date, timeSlot, notes, numberOfLanes, numberOfPeople, specialRequests } = req.body;

  // Validate required fields (serviceId is now optional)
  if (!userEmail || !userName || !date || !timeSlot) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['userEmail', 'userName', 'date', 'timeSlot']
    });
  }

  try {
    // Prepare fields for Airtable
    const fields = {
      'User Email': userEmail,
      'User Name': userName,
      'User Phone': userPhone || '',
      'Service Name': serviceName || 'Lane Rental',
      'Date': date,
      'Time Slot': timeSlot,
      'Status': 'Pending',
      'Payment Status': 'Pending',
      'Notes': notes || specialRequests || ''
    };

    // Add optional fields if provided
    if (numberOfLanes) {
      fields['Number of Lanes'] = parseInt(numberOfLanes);
    }
    if (numberOfPeople) {
      fields['Number of People'] = parseInt(numberOfPeople);
    }
    
    // Only add Service linked record if serviceId is provided
    if (serviceId) {
      fields['Service'] = [serviceId];
    }

    // Create booking in Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Bookings`,
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
        error: 'Failed to create booking',
        details: error
      });
    }

    const booking = await airtableResponse.json();

    // Trigger Zapier webhook for email notification (optional)
    if (process.env.ZAPIER_BOOKING_WEBHOOK) {
      try {
        await fetch(process.env.ZAPIER_BOOKING_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            userEmail,
            userName,
            userPhone: userPhone || '',
            serviceName: serviceName || 'Lane Rental',
            date,
            timeSlot,
            numberOfLanes: numberOfLanes || '',
            numberOfPeople: numberOfPeople || '',
            specialRequests: specialRequests || notes || '',
            status: 'Pending'
          })
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        ...booking.fields
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
