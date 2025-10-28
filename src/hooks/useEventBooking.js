/**
 * Custom React Hook: useEventBooking
 * Handles event/party booking submissions
 */

import { useState } from 'react';

export function useEventBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const bookEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/events/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book event');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      console.error('Event booking error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    bookEvent,
    reset,
    loading,
    error,
    success
  };
}
