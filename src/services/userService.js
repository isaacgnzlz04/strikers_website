/**
 * User Service
 * High-level service for user operations via Vercel serverless functions
 */

export const userService = {
  /**
   * Create a new user account
   */
  async signup(userData) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create account');
    }

    return result.user;
  },

  /**
   * Subscribe to newsletter
   */
  async subscribeNewsletter(email, firstName = '', lastName = '') {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, firstName, lastName })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to subscribe');
    }

    return result;
  },

  /**
   * Submit contact form
   */
  async submitContact(contactData) {
    const response = await fetch('/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit contact form');
    }

    return result;
  },

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone format (basic US format)
   */
  validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }
};
