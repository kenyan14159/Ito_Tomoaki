'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { TREATMENT_DATA } from '../constants/treatments';

// アイコンコンポーネントをコンポーネント外部で定義
const TreatmentIcons: Record<string, React.ReactNode> = {
  acupuncture: (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
      <line x1="24" y1="4" x2="24" y2="44" />
      <circle cx="24" cy="8" r="3" />
      <path d="M20 16 L28 16" />
      <path d="M18 24 L30 24" />
      <path d="M20 32 L28 32" />
    </svg>
  ),
  moxibustion: (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M24 40 C16 40 12 32 12 24 C12 16 18 8 24 4 C30 8 36 16 36 24 C36 32 32 40 24 40Z" />
      <path d="M20 28 Q24 20 28 28" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
  electro: (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M28 4 L18 22 L26 22 L20 44 L30 26 L22 26 L28 4Z" strokeLinejoin="round" />
    </svg>
  ),
  cupping: (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 32 Q12 16 24 12 Q36 16 36 32" strokeWidth="1.5" />
      <ellipse cx="24" cy="32" rx="12" ry="4" />
      <path d="M16 28 Q24 24 32 28" strokeDasharray="2 2" />
    </svg>
  ),
};

const TreatmentComponent = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 定数データにアイコンを追加
  const treatments = useMemo(() => 
    TREATMENT_DATA.map((treatment) => ({
      ...treatment,
      icon: TreatmentIcons[treatment.id],
    })), 
  []);

  return (
    <section
      id="treatment"
      ref={sectionRef}
      className="section-padding bg-[var(--color-cream)] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-[var(--color-gold)]/10 animate-floating-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full border border-[var(--color-ink)]/5 animate-floating-slow" style={{ animationDelay: '5s' }} />
        <div className="absolute top-[40%] left-[5%] w-32 h-32 rounded-full bg-[var(--color-gold)]/5 animate-gentle-pulse" />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-waves opacity-30" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="gold-line" />
            <span className="text-caption text-[var(--color-gold)]">Treatment</span>
            <span className="gold-line" />
          </div>
          <h2 className="heading-section text-[var(--color-ink)] mb-4">治療内容</h2>
          <p className="text-body text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            お一人おひとりの状態を丁寧に診断し、<br className="hidden md:block" />
            最適な治療法を組み合わせてご提案いたします
          </p>
        </div>

        {/* Treatment Tabs - Desktop */}
        <div className="hidden lg:block">
          <div
            className={`flex justify-center gap-2 mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {treatments.map((treatment, index) => (
              <button
                key={treatment.id}
                onClick={() => setActiveTab(index)}
                className={`group relative px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden ${
                  activeTab === index
                    ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
                    : 'bg-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] border border-[var(--color-ink)]/10 hover:border-[var(--color-ink)]/30'
                }`}
              >
                {/* Hover shimmer */}
                <span className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${activeTab === index ? '' : 'hidden'}`} />
                <span className="relative">{treatment.title}</span>
              </button>
            ))}
          </div>

          {/* Active Treatment Detail */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] bg-[var(--color-ink)] overflow-hidden group">
                <Image
                  src={treatments[activeTab].image}
                  alt={treatments[activeTab].title}
                  fill
                  className={`object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-20 group-hover:h-20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-20 group-hover:h-20" />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-4 text-[var(--color-gold)]">
                  {treatments[activeTab].icon}
                </div>
                <h3 className="text-3xl font-serif text-[var(--color-ink)] mb-2">
                  {treatments[activeTab].title}
                </h3>
                <p className="text-sm tracking-[0.2em] text-[var(--color-stone)] mb-6">
                  {treatments[activeTab].titleEn}
                </p>
                <p className="text-body text-[var(--color-ink-soft)] mb-6">
                  {treatments[activeTab].description}
                </p>
                <p className="text-body text-[var(--color-ink-soft)] mb-8">
                  {treatments[activeTab].detail}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  {treatments[activeTab].benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 group/benefit"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] transition-transform duration-300 group-hover/benefit:scale-125" />
                      <span className="text-sm text-[var(--color-ink-soft)] group-hover/benefit:text-[var(--color-ink)] transition-colors duration-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Cards - Mobile */}
        <div className="lg:hidden space-y-6">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.id}
              className={`group bg-[var(--color-white)] shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Mobile Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-serif text-white mb-1">
                    {treatment.title}
                  </h3>
                  <p className="text-xs tracking-[0.2em] text-white/70">
                    {treatment.titleEn}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-[var(--color-gold)]">{treatment.icon}</div>
                </div>
                <p className="text-body text-[var(--color-ink-soft)] mb-4">
                  {treatment.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {treatment.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--color-cream)] text-xs text-[var(--color-ink-soft)] hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)] transition-colors duration-300"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-body text-[var(--color-ink-soft)] mb-6">
            症状やご希望に合わせて、最適な治療プランをご提案いたします
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm tracking-[0.1em] font-medium overflow-hidden transition-all duration-300"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            {/* Gold overlay on hover */}
            <span className="absolute inset-0 bg-[var(--color-gold)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <span className="relative group-hover:text-[var(--color-ink)]">ご相談・ご予約</span>
            <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-ink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TreatmentComponent;
