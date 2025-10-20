import { useRef, useEffect, useCallback, forwardRef } from 'react';
import { gsap } from 'gsap';
import './MagicButton.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = '150, 51, 60'; // Brand color #96333C

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'magic-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const MagicButton = forwardRef(({
  children,
  onClick,
  className = '',
  enableStars = false,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  spotlightRadius = 300,
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  const internalRef = ref || buttonRef;
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);
  const spotlightRef = useRef(null);

  const initializeParticles = useCallback(() => {
    const element = internalRef.current || buttonRef.current;
    if (particlesInitialized.current || !element) return;

    const { width, height } = element.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor, internalRef]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    
    // Kill all GSAP animations first
    if (magnetismAnimationRef.current) {
      magnetismAnimationRef.current.kill();
      magnetismAnimationRef.current = null;
    }

    // Remove particles safely without triggering React conflicts
    particlesRef.current.forEach(particle => {
      try {
        // Kill any GSAP animations on this particle immediately
        gsap.killTweensOf(particle);
        
        // Use a safer removal method that checks if parent still exists
        if (particle && particle.isConnected && particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      } catch (e) {
        // Element already removed or DOM structure changed, ignore safely
        console.debug('Particle cleanup:', e.message);
      }
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    const element = internalRef.current || buttonRef.current;
    if (!element || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        const el = internalRef.current || buttonRef.current;
        if (!isHoveredRef.current || !el) return;

        const clone = particle.cloneNode(true);
        el.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, internalRef]);

  useEffect(() => {
    const element = internalRef.current || buttonRef.current;
    if (!element) return;

    // Create spotlight element
    if (enableSpotlight) {
      const spotlight = document.createElement('div');
      spotlight.className = 'magic-button-spotlight';
      spotlight.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle,
          rgba(${glowColor}, 0.3) 0%,
          rgba(${glowColor}, 0.15) 25%,
          transparent 60%
        );
        z-index: 1;
        opacity: 0;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
      `;
      element.appendChild(spotlight);
      spotlightRef.current = spotlight;
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      
      if (enableStars) {
        animateParticles();
      }

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableSpotlight && spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableSpotlight && spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism && !enableSpotlight) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.08;
        const magnetY = (y - centerY) * 0.08;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableSpotlight && spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          left: x,
          top: y,
          duration: 0.1,
          ease: 'power2.out'
        });
      }

      // Border glow effect
      if (enableBorderGlow) {
        const relativeX = (x / rect.width) * 100;
        const relativeY = (y / rect.height) * 100;
        element.style.setProperty('--glow-x', `${relativeX}%`);
        element.style.setProperty('--glow-y', `${relativeY}%`);
        element.style.setProperty('--glow-intensity', '1');
      }
    };

    const handleClick = e => {
      if (!clickEffect) {
        if (onClick) onClick(e);
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            try {
              // Check if element is still connected to DOM before removing
              if (ripple && ripple.isConnected && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
              }
            } catch (e) {
              // Already removed or DOM structure changed, ignore safely
              console.debug('Ripple cleanup:', e.message);
            }
          }
        }
      );

      if (onClick) onClick(e);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      
      // Remove event listeners
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('click', handleClick);
      }
      
      // Clear all animations and particles
      clearAllParticles();
      
      // Kill all GSAP animations on the element itself
      if (element) {
        gsap.killTweensOf(element);
      }
      
      // Safely remove spotlight
      if (spotlightRef.current) {
        try {
          gsap.killTweensOf(spotlightRef.current);
          if (spotlightRef.current.isConnected && spotlightRef.current.parentNode) {
            spotlightRef.current.parentNode.removeChild(spotlightRef.current);
          }
        } catch (e) {
          // Element already removed or DOM structure changed, ignore safely
          console.debug('Spotlight cleanup:', e.message);
        }
        spotlightRef.current = null;
      }
    };
  }, [animateParticles, clearAllParticles, enableTilt, enableMagnetism, clickEffect, glowColor, enableStars, enableSpotlight, enableBorderGlow, onClick, internalRef]);

  return (
    <button
      ref={(el) => {
        buttonRef.current = el;
        if (typeof internalRef === 'function') {
          internalRef(el);
        } else if (internalRef) {
          internalRef.current = el;
        }
      }}
      className={`magic-button ${enableBorderGlow ? 'magic-button--border-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

MagicButton.displayName = 'MagicButton';

export default MagicButton;
