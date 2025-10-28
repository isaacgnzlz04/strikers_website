/**
 * Vercel Serverless Function: Check Booking Availability
 * GET /api/bookings/availability?date=YYYY-MM-DD&serviceId=recXXX
 * 
 * Checks available time slots for a given date and service
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

  const { date, serviceId } = req.query;

  if (!date || !serviceId) {
    return res.status(400).json({ 
      error: 'Missing required parameters',
      required: ['date', 'serviceId']
    });
  }

  try {
    // Fetch availability records from Airtable
    const filterFormula = `AND({Date} = '${date}', {Service} = '${serviceId}', {Status} = 'Available')`;
    const params = new URLSearchParams({
      filterByFormula: filterFormula,
      sort: JSON.stringify([{ field: 'Start Time', direction: 'asc' }])
    });

    const availabilityResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Availability?${params.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
      }
    );

    if (!availabilityResponse.ok) {
      const error = await availabilityResponse.json();
      console.error('Airtable error:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }

    const availabilityData = await availabilityResponse.json();

    // Fetch existing bookings for the date
    const bookingsFilter = `AND({Date} = '${date}', {Service} = '${serviceId}', OR({Status} = 'Confirmed', {Status} = 'Pending'))`;
    const bookingsParams = new URLSearchParams({
      filterByFormula: bookingsFilter
    });

    const bookingsResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Bookings?${bookingsParams.toString()}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
      }
    );

    let bookedSlots = [];
    if (bookingsResponse.ok) {
      const bookingsData = await bookingsResponse.json();
      bookedSlots = bookingsData.records.map(r => r.fields['Time Slot']);
    }

    // Process availability and mark booked slots
    const slots = availabilityData.records.map(record => ({
      id: record.id,
      startTime: record.fields['Start Time'],
      endTime: record.fields['End Time'],
      capacity: record.fields['Available Spots'] || 1,
      booked: record.fields['Booked Spots'] || 0,
      isAvailable: !bookedSlots.includes(record.fields['Start Time']) && 
                   (record.fields['Booked Spots'] || 0) < (record.fields['Available Spots'] || 1)
    }));

    return res.status(200).json({
      success: true,
      date,
      serviceId,
      slots
    });

  } catch (error) {
    console.error('Availability check error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
