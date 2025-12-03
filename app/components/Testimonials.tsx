'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { TESTIMONIALS } from '../constants/testimonials';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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

  // Progress bar and auto-advance
  const startProgress = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setProgress(0);
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1.25; // 8 seconds to complete (100 / 1.25 * 100ms = 8000ms)
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (!isPaused && isVisible) {
      startProgress();
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPaused, isVisible, activeIndex, startProgress]);

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }
  }, [progress, TESTIMONIALS.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-[var(--color-ink)] text-[var(--color-paper)] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)]/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)]/10 to-transparent" />
        
        {/* Floating circles */}
        <div className="absolute top-[15%] right-[10%] w-32 h-32 rounded-full border border-[var(--color-gold)]/5 animate-floating-slow" />
        <div className="absolute bottom-[20%] left-[8%] w-48 h-48 rounded-full border border-[var(--color-paper)]/5 animate-floating-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Large quote symbol */}
      <div className="absolute top-20 left-10 md:left-20 text-[var(--color-gold)]/5 pointer-events-none">
        <svg className="w-32 h-32 md:w-48 md:h-48" viewBox="0 0 100 100" fill="currentColor">
          <path d="M30 60 L30 40 Q30 20 50 20 L50 30 Q40 30 40 40 L50 40 L50 60 Z M60 60 L60 40 Q60 20 80 20 L80 30 Q70 30 70 40 L80 40 L80 60 Z" />
        </svg>
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
            <span className="text-caption text-[var(--color-gold)]">Testimonials</span>
            <span className="w-12 h-px bg-[var(--color-gold)]" />
          </div>
          <h2 className="heading-section mb-4">選手の声</h2>
          <p className="text-lg text-[var(--color-paper)]/60 max-w-2xl mx-auto">
            日本体育大学 陸上競技部の選手たちからの声
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Card Container */}
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute -top-8 left-0 right-0 h-px bg-[var(--color-paper)]/10">
              <div 
                className="h-full bg-[var(--color-gold)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Testimonial Cards */}
            <div className="relative min-h-[450px] md:min-h-[380px]">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0 relative'
                      : index < activeIndex
                        ? 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'
                        : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-[var(--color-paper)]/5 backdrop-blur-sm border border-[var(--color-paper)]/10 p-8 md:p-12">
                    {/* Record badge */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      <span className="w-8 h-px bg-[var(--color-gold)]/30" />
                      <span className="px-4 py-2 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)] text-sm tracking-wider">
                        {testimonial.record}
                      </span>
                      <span className="w-8 h-px bg-[var(--color-gold)]/30" />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base md:text-lg font-serif leading-relaxed text-[var(--color-paper)]/90 mb-10 text-center relative">
                      <span className="absolute -top-4 left-0 text-4xl text-[var(--color-gold)]/20">"</span>
                      {testimonial.quote}
                      <span className="absolute -bottom-4 right-0 text-4xl text-[var(--color-gold)]/20">"</span>
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-ink-medium)] mb-4 flex items-center justify-center border border-[var(--color-gold)]/30 relative overflow-hidden">
                        <span className="text-xl font-serif text-[var(--color-gold)]">
                          {testimonial.name.charAt(0)}
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                      </div>
                      <div className="text-lg font-serif text-[var(--color-paper)]">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[var(--color-paper)]/50 mt-1">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {/* Prev button */}
            <button
              onClick={() => goToSlide(activeIndex > 0 ? activeIndex - 1 : TESTIMONIALS.length - 1)}
              className="w-10 h-10 flex items-center justify-center border border-[var(--color-paper)]/20 text-[var(--color-paper)]/50 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots with progress */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-8 h-2 overflow-hidden rounded-full"
                >
                  {/* Background */}
                  <span className="absolute inset-0 bg-[var(--color-paper)]/20 rounded-full" />
                  {/* Active fill */}
                  <span 
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-[var(--color-gold)]' 
                        : index < activeIndex 
                          ? 'bg-[var(--color-gold)]/50'
                          : 'bg-transparent'
                    }`}
                    style={{
                      width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => goToSlide((activeIndex + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 flex items-center justify-center border border-[var(--color-paper)]/20 text-[var(--color-paper)]/50 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pause indicator */}
          <div className="text-center mt-4">
            <span className={`text-xs text-[var(--color-paper)]/30 transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
              一時停止中
            </span>
          </div>
        </div>

        {/* Team Affiliation */}
        <div
          className={`mt-16 pt-12 border-t border-[var(--color-paper)]/10 text-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-16 h-px bg-[var(--color-paper)]/20" />
            <span className="text-xs tracking-[0.2em] text-[var(--color-paper)]/40 uppercase">
              日本体育大学 陸上競技部
            </span>
            <span className="w-16 h-px bg-[var(--color-paper)]/20" />
          </div>
          <p className="text-sm text-[var(--color-paper)]/40 italic">
            ※ 掲載許可をいただいた選手の声を匿名で紹介しています
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
