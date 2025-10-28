/**
 * Custom React Hook: useContactForm
 * Handles contact form submissions
 */

import { useState } from 'react';

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      console.error('Contact form error:', err);
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
    submitForm,
    reset,
    loading,
    error,
    success
  };
}
