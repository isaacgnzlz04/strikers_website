import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import MagicButton from './MagicButton';
import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  logoOnClick,
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  onButtonClick,
  currentPath,
  modalOpen = false,
  style = {}
}) => {
  // Close nav dropdown if a modal opens
  // Only run when modalOpen changes to true
  useLayoutEffect(() => {
    if (modalOpen && isExpanded) {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // Reinitialize timeline when route changes (in case it got killed)
  useLayoutEffect(() => {
    // Close menu when route changes
    if (isExpanded) {
      setIsHamburgerOpen(false);
      setIsExpanded(false);
    }
    
    if (!tlRef.current) {
      const tl = createTimeline();
      if (tl) {
        tlRef.current = tl;
      }
    } else {
      // Reset timeline to beginning when menu is closed
      if (!isExpanded) {
        tlRef.current.progress(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const toggleMenu = () => {
    let tl = tlRef.current;
    
    // If timeline is missing, recreate it
    if (!tl) {
      tl = createTimeline();
      if (!tl) return;
      tlRef.current = tl;
    }
    
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => {
        setIsExpanded(false);
      });
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[999] top-[1.2em] md:top-[2em] ${className}`}
      style={style}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 md:px-2 md:pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-0 order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000', width: '30px' }}
          >
            {/* Top line */}
            <div
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'currentColor',
                borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                transform: isHamburgerOpen ? 'rotate(45deg) translateY(0px)' : 'rotate(0deg) translateY(-5px)',
                opacity: isHamburgerOpen ? 1 : 1,
              }}
            />
            {/* Bottom line */}
            <div
              style={{
                width: '22px',
                height: '2px',
                backgroundColor: 'currentColor',
                borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                transform: isHamburgerOpen ? 'rotate(-45deg) translateY(0px)' : 'rotate(0deg) translateY(5px)',
                opacity: isHamburgerOpen ? 1 : 1,
              }}
            />
          </div>

          <div 
            className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none px-2 cursor-pointer"
            onClick={() => {
              if (logoOnClick) {
                logoOnClick();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              // Close hamburger menu if open
              if (isExpanded) {
                toggleMenu();
              }
            }}
            role="button"
            aria-label={logoOnClick ? "Go to home page" : "Scroll to top"}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (logoOnClick) {
                  logoOnClick();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                if (isExpanded) {
                  toggleMenu();
                }
              }
            }}
            style={{
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img src={logo} alt={logoAlt} className="logo h-[26px] w-auto max-w-[140px] object-contain" />
          </div>

          <MagicButton
            type="button"
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={200}
            glowColor="150, 51, 60"
            className="card-nav-cta-button hidden md:inline-flex items-center justify-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-1 font-medium cursor-pointer"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={onButtonClick}
          >
            Book Now
          </MagicButton>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Execute the link's onClick handler first
                      if (lnk.onClick) {
                        lnk.onClick(e);
                      }
                      
                      // Then close the menu
                      if (isExpanded) {
                        setTimeout(() => {
                          setIsHamburgerOpen(false);
                          setIsExpanded(false);
                          if (tlRef.current) {
                            tlRef.current.reverse();
                          }
                        }, 50);
                      }
                    }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
