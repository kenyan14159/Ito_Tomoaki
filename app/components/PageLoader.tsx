'use client';

import { useState, useEffect } from 'react';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress - 時間短縮版
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // より速く加速
        const increment = prev < 50 ? 5 : prev < 80 ? 4 : 3;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    // Start exit animation - 時間短縮
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    // Complete loading - 時間短縮
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-ink)] transition-all duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-asanoha opacity-10" />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--color-gold)]/10"
          style={{
            transform: `translate(-50%, -50%) scale(${0.5 + progress / 200})`,
            opacity: 0.1 + progress / 500,
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--color-paper)]/5"
          style={{
            transform: `translate(-50%, -50%) scale(${0.3 + progress / 150})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            progress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-3xl md:text-4xl tracking-[0.3em] font-serif text-[var(--color-paper)] mb-2">
            ITO
          </div>
          <div className="text-3xl md:text-4xl tracking-[0.3em] font-serif text-[var(--color-gold)]">
            TOMOAKI
          </div>
        </div>

        {/* Subtitle */}
        <div 
          className={`text-xs tracking-[0.25em] text-[var(--color-paper)]/40 uppercase mb-12 transition-all duration-700 ${
            progress > 30 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          鍼灸師 / コンディショニングトレーナー
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto">
          <div className="h-px bg-[var(--color-paper)]/10 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[var(--color-gold)] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-xs text-[var(--color-paper)]/30 tracking-widest">
            {progress}%
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div 
        className={`absolute top-8 left-8 transition-all duration-500 ${
          progress > 50 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-8 h-8 border-t border-l border-[var(--color-gold)]/30" />
      </div>
      <div 
        className={`absolute bottom-8 right-8 transition-all duration-500 ${
          progress > 50 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-8 h-8 border-b border-r border-[var(--color-gold)]/30" />
      </div>
    </div>
  );
};

export default PageLoader;

