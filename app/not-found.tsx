'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-4">
      <div 
        className={`text-center transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 404 Number with decorative elements */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[var(--color-gold)]/10 to-[var(--color-burgundy)]/10 blur-2xl" />
          </div>
          <h1 className="relative font-serif text-[120px] md:text-[180px] font-light text-[var(--color-burgundy)]/20 leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="font-serif text-2xl md:text-3xl text-[var(--color-charcoal)] mb-4">
          ページが見つかりません
        </h2>
        <p className="text-[var(--color-charcoal)]/60 mb-8 max-w-md mx-auto leading-relaxed">
          お探しのページは存在しないか、移動した可能性があります。
          <br />
          URLをご確認いただくか、トップページからお探しください。
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-charcoal)] text-white rounded-full hover:bg-[var(--color-burgundy)] transition-all duration-300 group"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-sans tracking-wider text-sm">トップページへ戻る</span>
        </Link>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-gold)]/50" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
        </div>
      </div>
    </main>
  );
}
