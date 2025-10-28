/**
 * Booking Service
 * High-level service for booking operations via Vercel serverless functions
 */

export const bookingService = {
  /**
   * Create a new booking
   */
  async createBooking(bookingData) {
    const response = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create booking');
    }

    return result.booking;
  },

  /**
   * Check availability for a date and service
   */
  async checkAvailability(date, serviceId) {
    const params = new URLSearchParams({ date, serviceId });
    const response = await fetch(`/api/bookings/availability?${params.toString()}`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to check availability');
    }

    return result.slots;
  },

  /**
   * Get booking types/services
   */
  async getBookingTypes() {
    // This is read-only, can use direct Airtable call
    const { fetchRecords, TABLES } = await import('../lib/airtable');
    
    return await fetchRecords(TABLES.BOOKING_TYPES, {
      filterByFormula: `{Active} = TRUE()`,
      sort: [{ field: 'Service Name', direction: 'asc' }],
      useCache: true
    });
  },

  /**
   * Format booking data for submission
   */
  formatBookingData(formData) {
    return {
      userEmail: formData.email,
      userName: `${formData.firstName} ${formData.lastName}`,
      userPhone: formData.phone || '',
      serviceId: formData.serviceId,
      serviceName: formData.serviceName,
      date: formData.date,
      timeSlot: formData.timeSlot,
      notes: formData.notes || ''
    };
  }
};
