/**
 * Custom React Hook: useBooking
 * Handles booking operations
 */

import { useState } from 'react';

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
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

      setSuccess(true);
      return result.booking;
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (date, serviceId) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ date, serviceId });
      const response = await fetch(`/api/bookings/availability?${params.toString()}`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to check availability');
      }

      return result.slots;
    } catch (err) {
      console.error('Availability check error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    checkAvailability,
    loading,
    error,
    success
  };
}
