'use client';

import { useState, useEffect } from 'react';
import { socialLinksLarge } from '../constants/socialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerLinks = [
    { href: '#profile', label: 'プロフィール' },
    { href: '#treatment', label: '治療内容' },
    { href: '#testimonials', label: '選手の声' },
    { href: '#contact', label: 'お問い合わせ' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[var(--color-gold)]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[var(--color-paper)]/5 to-transparent" />
      </div>

      <div className="container-custom py-16 relative z-10">
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl tracking-[0.2em] font-serif mb-2">ITO TOMOAKI</div>
            <div className="text-xs text-[var(--color-paper)]/40 tracking-wider mb-4">
              Acupuncturist / Conditioning Trainer
            </div>
            <p className="text-sm text-[var(--color-paper)]/50 leading-relaxed">
              鍼灸師として、アスリートから一般の方まで、
              一人ひとりに寄り添った施術を心がけています。
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h4 className="text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-[var(--color-paper)]/60 hover:text-[var(--color-gold)] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <h4 className="text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-[var(--color-paper)]/60">
              <div>ライラック治療院 生麦</div>
              <a 
                href="tel:045-504-0399" 
                className="block hover:text-[var(--color-gold)] transition-colors"
              >
                045-504-0399
              </a>
              <a 
                href="http://lilac-namamugi.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--color-gold)] transition-colors"
              >
                <span>公式サイト</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-paper)]/10 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-xs text-[var(--color-paper)]/30 order-2 md:order-1">
            © {currentYear} Tomoaki Ito. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinksLarge.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center border border-[var(--color-paper)]/20 text-[var(--color-paper)]/60 transition-all duration-300 ${social.colorClass}`}
                aria-label={social.name}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-[var(--color-gold)] text-[var(--color-ink)] flex items-center justify-center transition-all duration-500 z-40 group overflow-hidden ${
          showScrollTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
