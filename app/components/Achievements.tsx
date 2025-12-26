'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-padding bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--color-gold) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Floating circles */}
        <div className="absolute top-[20%] left-[10%] w-48 h-48 rounded-full border border-[var(--color-gold)]/5 animate-floating-slow" />
        <div className="absolute bottom-[10%] right-[15%] w-64 h-64 rounded-full border border-[var(--color-paper)]/5 animate-floating-slow" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[60%] left-[80%] w-24 h-24 rounded-full bg-[var(--color-gold)]/5 animate-gentle-pulse" />

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-[var(--color-gold)]/5 to-transparent" />
        
        {/* Vertical lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-paper)]/5 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-[var(--color-gold)]" />
            <span className="text-caption text-[var(--color-gold)]">Support</span>
            <span className="w-12 h-px bg-[var(--color-gold)]" />
          </div>
          <h2 className="heading-section mb-4">サポート実績</h2>
          <p className="text-lg text-[var(--color-paper)]/60 max-w-xl mx-auto">
            大学駅伝の強豪校を中心に、アスリートのコンディショニングをサポート
          </p>
        </div>

        {/* Team Card */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="group relative p-8 md:p-12 bg-[var(--color-paper)]/5 border border-[var(--color-paper)]/10 backdrop-blur-sm hover:border-[var(--color-gold)]/30 transition-all duration-500">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Logo */}
              <div className="relative">
                <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:border-[var(--color-gold)]/60">
                  <Image
                    src="/nssu_icon.jpg"
                    alt="日本体育大学駅伝部ロゴ"
                    fill
                    quality={85}
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 rounded-full border border-[var(--color-gold)]/10 animate-gentle-pulse" />
              </div>
              
              {/* Content */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-block px-4 py-1.5 bg-[var(--color-gold)]/10 text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase mb-4 rounded-full">
                  大学駅伝
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-paper)] mb-2">
                  日本体育大学
                </h3>
                <p className="text-base text-[var(--color-paper)]/60 mb-4">
                  男子駅伝ブロック
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 pt-6 border-t border-[var(--color-paper)]/10">
                  <div className="text-center">
                    <div className="text-2xl font-serif text-[var(--color-gold)]">78年連続</div>
                    <div className="text-xs text-[var(--color-paper)]/40 mt-1">78回箱根駅伝出場</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-paper)]/5 border border-[var(--color-paper)]/10 rounded-full">
            <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-[var(--color-paper)]/50">
              掲載許可をいただいたチームのみ記載
            </span>
          </div>
        </div>

        {/* Decorative quote */}
        <div
          className={`mt-16 max-w-2xl mx-auto text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative py-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />
            <p className="text-lg font-serif italic text-[var(--color-paper)]/40">
              "一人ひとりの身体と向き合い、<br />最高のパフォーマンスを引き出すサポートを"
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
