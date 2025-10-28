import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useEventBooking } from '../hooks/useEventBooking';

const EventModal = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const modalContentRef = useRef(null);
  const backdropRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const openTlRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: 'Birthday',
    eventDate: '',
    eventTime: '',
    guests: '',
    specialRequests: '',
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animation effect when modal opens - use timeline for consistent enter/exit behavior
  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();
    openTlRef.current = tl;

    // Fade in backdrop
    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Modal entrance - scale and slide
    tl.fromTo(
      modalContentRef.current,
      { scale: 0.8, opacity: 0, y: -50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.15'
    );

    // Title slide in
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      );
    }

    // Content fade in
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
      openTlRef.current = null;
    };
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });

    // Fade out content
    if (contentRef.current) {
      tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.18, ease: 'power2.in' });
    }

    // Title out
    if (titleRef.current) {
      tl.to(titleRef.current, { y: -20, opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.12');
    }

    // Modal scale down
    tl.to(modalContentRef.current, { scale: 0.8, opacity: 0, y: -30, duration: 0.28, ease: 'back.in(1.7)' }, '-=0.12');

    // Fade out backdrop
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.18');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { bookEvent, loading, error } = useEventBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await bookEvent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        guests: parseInt(formData.guests),
        specialRequests: formData.specialRequests,
      });
      
      alert('Thank you for your event inquiry! We will contact you shortly to discuss your event details and availability.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventType: 'Birthday',
        eventDate: '',
        eventTime: '',
        guests: '',
        specialRequests: '',
      });
      handleClose();
    } catch (err) {
      alert(err.message || 'Failed to submit event inquiry. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: isMobile ? '20px' : '40px',
        overflow: 'auto',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalContentRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          border: '2px solid var(--accent-primary)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.2)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          ×
        </button>

        {/* Modal Content */}
        <div style={{ padding: isMobile ? '30px 20px' : '40px' }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: isMobile ? '2rem' : '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            🎉 Plan Your Event
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            Let us help you create an unforgettable celebration!
          </p>

          <form ref={contentRef} onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontWeight: '600',
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Email & Phone Row */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>

            {/* Company/Organization (Optional) */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontWeight: '600',
                }}
              >
                Company/Organization <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Optional)</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Event Type */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontWeight: '600',
                }}
              >
                Event Type *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              >
                <option value="Birthday">Birthday Party</option>
                <option value="Corporate">Corporate Event</option>
                <option value="Fundraiser">Fundraiser</option>
                <option value="School/Youth Group">School/Youth Group</option>
              </select>
            </div>

            {/* Date & Time Row */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontWeight: '600',
                  }}
                >
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontWeight: '600',
                }}
              >
                Expected Number of Guests *
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter number of guests"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Special Requests */}
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontWeight: '600',
                }}
              >
                Special Requests or Questions <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>(Optional)</span>
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about any special requirements, dietary restrictions, or questions you have..."
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px 30px',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#fff',
                backgroundColor: loading ? '#999' : 'var(--accent-primary)',
                border: 'none',
                borderRadius: '50px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(150, 51, 60, 0.3)',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'var(--accent-secondary)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(78, 152, 213, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'var(--accent-primary)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(150, 51, 60, 0.3)';
                }
              }}
            >
              {loading ? 'Submitting...' : 'Submit Event Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
