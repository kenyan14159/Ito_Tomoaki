'use client';

import { useState, useEffect, useCallback } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { href: '#profile', label: 'Profile', id: 'profile' },
    { href: '#achievements', label: 'Achievements', id: 'achievements' },
    { href: '#treatment', label: 'Treatment', id: 'treatment' },
    { href: '#gallery', label: 'Gallery', id: 'gallery' },
    { href: '#testimonials', label: 'Voice', id: 'testimonials' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  // Track scroll position and active section
  const handleScroll = useCallback(() => {
    // Scroll position
    setIsScrolled(window.scrollY > 50);

    // Scroll progress
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    setScrollProgress(progress);

    // Active section detection
    const sections = navLinks.map(link => document.querySelector(link.href));
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPosition >= top) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Height of nav
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-paper)]/98 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] transition-all duration-150"
          style={{ 
            width: `${scrollProgress}%`,
            opacity: isScrolled ? 1 : 0,
          }}
        />

        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              className="relative z-10 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span
                className={`text-base md:text-lg tracking-[0.15em] font-serif transition-colors duration-500 ${
                  isScrolled || isMobileMenuOpen ? 'text-[var(--color-ink)]' : 'text-[var(--color-paper)]'
                }`}
              >
                ITO TOMOAKI
              </span>
              <span 
                className={`absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full`}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs tracking-[0.15em] uppercase transition-all duration-300 py-2 ${
                    activeSection === link.id
                      ? isScrolled
                        ? 'text-[var(--color-gold)]'
                        : 'text-[var(--color-gold)]'
                      : isScrolled
                        ? 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
                        : 'text-[var(--color-paper)]/70 hover:text-[var(--color-paper)]'
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  <span 
                    className={`absolute -bottom-0 left-0 h-px bg-[var(--color-gold)] transition-all duration-300 ${
                      activeSection === link.id ? 'w-full' : 'w-0'
                    }`}
                  />
                  {/* Hover indicator */}
                  <span 
                    className={`absolute -bottom-0 left-0 h-px bg-current transition-all duration-300 ${
                      activeSection !== link.id ? 'w-0 group-hover:w-full' : ''
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Contact Button - Desktop */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`hidden md:flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-500 border group ${
                isScrolled
                  ? 'border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]'
                  : 'border-[var(--color-paper)]/50 text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]'
              }`}
            >
              <span>予約・相談</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'bg-[var(--color-ink)] rotate-45 translate-y-[4px]'
                    : isScrolled
                    ? 'bg-[var(--color-ink)]'
                    : 'bg-[var(--color-paper)]'
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'bg-[var(--color-ink)] -rotate-45 -translate-y-[3px]'
                    : isScrolled
                    ? 'bg-[var(--color-ink)]'
                    : 'bg-[var(--color-paper)]'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-paper)] transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-asanoha opacity-20" />
        
        <div className="flex flex-col items-center justify-center h-full gap-6 relative">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-2xl tracking-[0.2em] transition-all duration-300 ${
                activeSection === link.id 
                  ? 'text-[var(--color-gold)]' 
                  : 'text-[var(--color-ink)] hover:text-[var(--color-gold)]'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 px-8 py-4 text-sm tracking-[0.15em] uppercase border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-all duration-300"
            style={{
              transitionDelay: isMobileMenuOpen ? '0.3s' : '0s',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            予約・相談
          </a>
          
          {/* Section indicator dots */}
          <div 
            className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: 'opacity 0.5s ease 0.4s',
            }}
          >
            {navLinks.map((link) => (
              <div 
                key={link.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === link.id 
                    ? 'bg-[var(--color-gold)] scale-125' 
                    : 'bg-[var(--color-ink)]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
