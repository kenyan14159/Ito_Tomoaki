'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Staggered load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const profileImageUrl = '/itotomoaki.jpg';

  // Split text for character animation
  const nameChars = '伊藤智章'.split('');

  return (
    <>
      <section 
        className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ink)]"
      >
        {/* Background */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `
                linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.7) 40%, rgba(13,13,13,0.4) 100%)
              `,
            }}
          />
          
          {/* Animated gradient mesh */}
          <div 
            className="absolute inset-0 z-[5] opacity-30"
            style={{
              background: `
                radial-gradient(ellipse at 0% 50%, rgba(201, 169, 98, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 100% 0%, rgba(45, 74, 62, 0.1) 0%, transparent 40%)
              `,
            }}
          />
          
          <Image
            src={profileImageUrl}
            alt="伊藤智章 - 鍼灸師・コンディショニングトレーナー"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[70%_top] md:object-[30%_top] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          {/* Floating circles */}
          <div 
            className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full border border-[var(--color-gold)]/10 animate-floating-slow"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute top-[60%] right-[20%] w-32 h-32 rounded-full border border-[var(--color-paper)]/5 animate-floating-slow"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute bottom-[30%] left-[5%] w-48 h-48 rounded-full border border-[var(--color-gold)]/5 animate-floating-slow"
            style={{ animationDelay: '4s' }}
          />
          
          {/* Vertical decorative lines */}
          <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)]/10 to-transparent" />
          <div className="absolute top-0 left-[85%] w-px h-full bg-gradient-to-b from-transparent via-[var(--color-paper)]/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="container-custom">
            <div className="max-w-2xl py-24 md:py-32">
              {/* Pre-title with line animation */}
              <div 
                className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '0.3s' }}
              >
                <span 
                  className={`h-px bg-[var(--color-gold)] transition-all duration-1000 ${
                    isLoaded ? 'w-12' : 'w-0'
                  }`}
                  style={{ transitionDelay: '0.5s' }}
                />
                <span className="text-xs tracking-[0.2em] text-[var(--color-gold)] uppercase">
                  鍼灸師 / コンディショニングトレーナー
                </span>
              </div>

              {/* Name with character-by-character animation */}
              <h1 
                className={`mb-6 transition-all duration-700 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                <span className="block text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-paper)] tracking-wide leading-tight">
                  {nameChars.map((char, index) => (
                    <span
                      key={index}
                      className={`inline-block transition-all duration-500 ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ 
                        transitionDelay: `${0.5 + index * 0.1}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span 
                  className={`block text-base md:text-lg tracking-[0.3em] text-[var(--color-paper)]/40 mt-3 transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: '1s' }}
                >
                  ITO TOMOAKI
                </span>
              </h1>

              {/* Description with fade */}
              <p 
                className={`text-base md:text-lg text-[var(--color-paper)]/70 leading-relaxed mb-10 max-w-lg transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '0.8s' }}
              >
                ライラック治療院 生麦にて、鍼灸師として施術を行っています。
                <br className="hidden md:block" />
                日本体育大学駅伝部をはじめ、アスリートのコンディショニングから
                一般の方の体調管理まで幅広く対応しています。
              </p>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-wrap gap-4 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '1s' }}
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-gold)] text-[var(--color-ink)] text-sm tracking-[0.1em] font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,98,0.3)]"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative">ご予約・お問い合わせ</span>
                  <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#profile"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-paper)]/30 text-[var(--color-paper)] text-sm tracking-[0.1em] transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  <span>プロフィール</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          <span className="text-[10px] tracking-[0.2em] text-[var(--color-paper)]/40 uppercase">Scroll</span>
          <div className="relative w-6 h-10 rounded-full border border-[var(--color-paper)]/20 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[var(--color-gold)] animate-scroll-indicator" />
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--color-gold)]/50 to-transparent" />
        </div>

        {/* Japanese pattern overlay - subtle */}
        <div className="absolute inset-0 z-[11] pattern-asanoha opacity-30 pointer-events-none" />
      </section>

      {/* Modal - 共通コンポーネントを使用 */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={profileImageUrl}
        imageAlt="伊藤智章"
      />
    </>
  );
};

export default Hero;
