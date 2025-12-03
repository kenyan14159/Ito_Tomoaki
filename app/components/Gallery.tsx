'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 12;

  // Gallery images - コンポーネント外で定義して安定した参照を維持
  const galleryImages = useMemo(() => [
    { id: 1, src: '/ito_gallery/Ito-photo1.JPG', title: 'Photo 1', category: 'Photography' },
    { id: 2, src: '/ito_gallery/Ito-photo2.JPG', title: 'Photo 2', category: 'Photography' },
    { id: 3, src: '/ito_gallery/Ito-photo3.JPG', title: 'Photo 3', category: 'Photography' },
    { id: 4, src: '/ito_gallery/Ito-photo4.JPG', title: 'Photo 4', category: 'Photography' },
    { id: 5, src: '/ito_gallery/Ito-photo5.JPG', title: 'Photo 5', category: 'Photography' },
    { id: 6, src: '/ito_gallery/Ito-photo6.JPG', title: 'Photo 6', category: 'Photography' },
    { id: 7, src: '/ito_gallery/Ito-photo7.JPG', title: 'Photo 7', category: 'Photography' },
    { id: 8, src: '/ito_gallery/Ito-photo8.JPG', title: 'Photo 8', category: 'Photography' },
    { id: 9, src: '/ito_gallery/Ito-photo9.JPG', title: 'Photo 9', category: 'Photography' },
    { id: 10, src: '/ito_gallery/Ito-photo10.JPG', title: 'Photo 10', category: 'Photography' },
    { id: 11, src: '/ito_gallery/Ito-photo11.JPG', title: 'Photo 11', category: 'Photography' },
    { id: 12, src: '/ito_gallery/Ito-photo12.JPG', title: 'Photo 12', category: 'Photography' },
    { id: 13, src: '/ito_gallery/Ito-photo13.JPG', title: 'Photo 13', category: 'Photography' },
    { id: 14, src: '/ito_gallery/Ito-photo14.JPG', title: 'Photo 14', category: 'Photography' },
    { id: 15, src: '/ito_gallery/Ito-photo15.JPG', title: 'Photo 15', category: 'Photography' },
    { id: 16, src: '/ito_gallery/Ito-photo16.JPG', title: 'Photo 16', category: 'Photography' },
    { id: 17, src: '/ito_gallery/Ito-photo17.JPG', title: 'Photo 17', category: 'Photography' },
    { id: 18, src: '/ito_gallery/Ito-photo18.JPG', title: 'Photo 18', category: 'Photography' },
    { id: 19, src: '/ito_gallery/Ito-photo19.JPG', title: 'Photo 19', category: 'Photography' },
    { id: 20, src: '/ito_gallery/Ito-photo20.JPG', title: 'Photo 20', category: 'Photography' },
    { id: 21, src: '/ito_gallery/Ito-photo21.JPG', title: 'Photo 21', category: 'Photography' },
    { id: 22, src: '/ito_gallery/Ito-photo22.JPG', title: 'Photo 22', category: 'Photography' },
    { id: 23, src: '/ito_gallery/Ito-photo23.JPG', title: 'Photo 23', category: 'Photography' },
    { id: 24, src: '/ito_gallery/Ito-photo24.JPG', title: 'Photo 24', category: 'Photography' },
    { id: 25, src: '/ito_gallery/Ito-photo25.JPG', title: 'Photo 25', category: 'Photography' },
    { id: 26, src: '/ito_gallery/Ito-photo26.JPG', title: 'Photo 26', category: 'Photography' },
    { id: 27, src: '/ito_gallery/Ito-photo27.JPG', title: 'Photo 27', category: 'Photography' },
    { id: 28, src: '/ito_gallery/Ito-photo28.JPG', title: 'Photo 28', category: 'Photography' },
    { id: 29, src: '/ito_gallery/Ito-photo29.JPG', title: 'Photo 29', category: 'Photography' },
    { id: 30, src: '/ito_gallery/Ito-photo30.JPG', title: 'Photo 30', category: 'Photography' },
    { id: 31, src: '/ito_gallery/Ito-photo31.JPG', title: 'Photo 31', category: 'Photography' },
    { id: 32, src: '/ito_gallery/Ito-photo32.JPG', title: 'Photo 32', category: 'Photography' },
    { id: 33, src: '/ito_gallery/Ito-photo33.JPG', title: 'Photo 33', category: 'Photography' },
    { id: 34, src: '/ito_gallery/Ito-photo34.JPG', title: 'Photo 34', category: 'Photography' },
    { id: 35, src: '/ito_gallery/Ito-photo35.JPG', title: 'Photo 35', category: 'Photography' },
    { id: 36, src: '/ito_gallery/Ito-photo36.JPG', title: 'Photo 36', category: 'Photography' },
    { id: 37, src: '/ito_gallery/Ito-photo37.JPG', title: 'Photo 37', category: 'Photography' },
  ], []);

  // ランダムにシャッフルした画像配列（初回レンダリング時に固定）
  const shuffledImages = useMemo(() => {
    const shuffled = [...galleryImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [galleryImages]);

  const closeModal = useCallback(() => setSelectedImage(null), []);

  const navigateImage = useCallback((direction: number) => {
    setSelectedImage((prev) => {
      if (prev === null) return null;
      const newIndex = prev + direction;
      if (newIndex >= 0 && newIndex < shuffledImages.length) {
        return newIndex;
      } else if (newIndex < 0) {
        return shuffledImages.length - 1;
      } else {
        return 0;
      }
    });
  }, [shuffledImages.length]);

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

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'ArrowRight') navigateImage(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeModal, navigateImage]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      navigateImage(diff > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="section-padding bg-[var(--color-paper)] relative overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-[var(--color-gold)]/5 animate-floating-slow" />
        <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full border border-[var(--color-ink)]/5 animate-floating-slow" style={{ animationDelay: '3s' }} />

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div
            className={`mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="gold-line" />
              <span className="text-caption text-[var(--color-gold)]">Gallery</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="heading-section text-[var(--color-ink)]">ギャラリー</h2>
                <p className="text-sm text-[var(--color-stone)] mt-2">趣味で撮影した写真</p>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-[var(--color-stone)] tracking-wider">{galleryImages.length} Photos</span>
              </div>
            </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {(showAll ? shuffledImages : shuffledImages.slice(0, INITIAL_DISPLAY_COUNT)).map((image, index) => {
              return (
                <div
                  key={image.id}
                  className={`group cursor-pointer overflow-hidden transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${Math.min(index * 50, 600)}ms` }}
                  onClick={() => image.src && setSelectedImage(index)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="relative aspect-[3/4] bg-[var(--color-ink-light)] overflow-hidden rounded-sm">
                  {/* Placeholder or Image */}
                  {image.src ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                    </>
                  ) : (
                    // Placeholder gradient
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `
                          linear-gradient(
                            ${135 + index * 30}deg,
                            rgba(26, 26, 26, 1) 0%,
                            rgba(45, 45, 45, 1) 50%,
                            rgba(26, 26, 26, 1) 100%
                          )
                        `,
                      }}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                  {/* Zoom icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[var(--color-gold)]/0 group-hover:border-[var(--color-gold)]/60 transition-all duration-500" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[var(--color-gold)]/0 group-hover:border-[var(--color-gold)]/60 transition-all duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All CTA */}
          {!showAll && shuffledImages.length > INITIAL_DISPLAY_COUNT && (
            <div 
              className={`mt-12 text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-ink)]/20 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
              >
                <span>すべての写真を見る（残り{shuffledImages.length - INITIAL_DISPLAY_COUNT}枚）</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {selectedImage !== null && shuffledImages[selectedImage].src && (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-ink)]/98 flex items-center justify-center animate-fade-in"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="ギャラリー画像ビューアー"
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[var(--color-paper)]/70 hover:text-[var(--color-paper)] hover:rotate-90 transition-all duration-300 z-10"
            onClick={closeModal}
            aria-label="閉じる"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 text-[var(--color-paper)]/50 text-sm tracking-wider">
            <span className="text-[var(--color-gold)]">{selectedImage + 1}</span>
            <span className="mx-2">/</span>
            <span>{shuffledImages.length}</span>
          </div>

          {/* Main image container */}
          <div
            className="relative max-w-5xl w-full mx-4 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Image */}
            <div className="relative flex items-center justify-center" style={{ maxHeight: '80vh' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shuffledImages[selectedImage].src!}
                alt={shuffledImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain select-none"
                draggable={false}
              />
            </div>

            {/* Copyright notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-[var(--color-paper)]/40 tracking-wider">
                © 無断転載禁止 - All Rights Reserved
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[var(--color-paper)]/20 text-[var(--color-paper)]/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            aria-label="前の画像"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-[var(--color-paper)]/20 text-[var(--color-paper)]/70 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            aria-label="次の画像"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnail navigation - 全画像に対応 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto py-2 px-4 scrollbar-hide">
            {shuffledImages.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (img.src) setSelectedImage(index);
                }}
                aria-label={`画像 ${index + 1} を表示`}
                className={`transition-all duration-300 flex-shrink-0 rounded-full ${
                  index === selectedImage
                    ? 'bg-[var(--color-gold)] w-5 h-2'
                    : img.src
                      ? 'bg-[var(--color-paper)]/30 hover:bg-[var(--color-paper)]/50 w-2 h-2'
                      : 'bg-[var(--color-paper)]/10 w-2 h-2'
                }`}
              />
            ))}
          </div>

          {/* Swipe hint for mobile */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-[var(--color-paper)]/30 md:hidden">
            スワイプで移動
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
