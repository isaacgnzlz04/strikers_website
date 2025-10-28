/**
 * Custom React Hook: useLeagueSignup
 * Handles league registration submissions
 */

import { useState } from 'react';

export function useLeagueSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupForLeague = async (signupData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/leagues/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sign up for league');
      }

      setSuccess(true);
      return result;
    } catch (err) {
      console.error('League signup error:', err);
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
    signupForLeague,
    reset,
    loading,
    error,
    success
  };
}
