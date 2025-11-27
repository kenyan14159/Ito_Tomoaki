'use client';

import { useEffect, useRef, useState } from 'react';

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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
  }, [selectedImage]);

  // Gallery images - プレースホルダー（後で実際の画像に置き換え）
  const galleryImages = [
    { 
      id: 1, 
      aspectRatio: 'aspect-[4/3]',
      src: null, // 後で画像を追加
      title: 'Photo 1',
      category: 'Photography'
    },
    { 
      id: 2, 
      aspectRatio: 'aspect-[3/4]',
      src: null,
      title: 'Photo 2',
      category: 'Photography'
    },
    { 
      id: 3, 
      aspectRatio: 'aspect-[4/3]',
      src: null,
      title: 'Photo 3',
      category: 'Photography'
    },
    { 
      id: 4, 
      aspectRatio: 'aspect-[1/1]',
      src: null,
      title: 'Photo 4',
      category: 'Photography'
    },
    { 
      id: 5, 
      aspectRatio: 'aspect-[3/4]',
      src: null,
      title: 'Photo 5',
      category: 'Photography'
    },
    { 
      id: 6, 
      aspectRatio: 'aspect-[4/3]',
      src: null,
      title: 'Photo 6',
      category: 'Photography'
    },
  ];

  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < galleryImages.length) {
      setSelectedImage(newIndex);
    } else if (newIndex < 0) {
      setSelectedImage(galleryImages.length - 1);
    } else {
      setSelectedImage(0);
    }
  };

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`group cursor-pointer overflow-hidden transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${index === 1 || index === 4 ? 'md:row-span-2' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => image.src && setSelectedImage(index)}
              >
                <div className={`relative ${index === 1 || index === 4 ? 'aspect-[3/5] md:aspect-[3/5]' : image.aspectRatio} bg-[var(--color-ink-light)] overflow-hidden`}>
                  {/* Placeholder or Image */}
                  {image.src ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      {image.src ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    {/* Title */}
                    <span className="text-white text-sm font-medium tracking-wider">
                      {image.src ? image.title : 'Coming Soon'}
                    </span>
                    <span className="text-white/60 text-xs mt-1 tracking-[0.15em] uppercase">{image.category}</span>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[var(--color-gold)]/0 group-hover:border-[var(--color-gold)]/60 transition-all duration-500" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[var(--color-gold)]/0 group-hover:border-[var(--color-gold)]/60 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div 
            className={`mt-12 text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-ink)]/20 text-sm text-[var(--color-ink-soft)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-300"
            >
              <span>すべての写真を見る</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {selectedImage !== null && galleryImages[selectedImage].src && (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-ink)]/98 flex items-center justify-center animate-fade-in"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[var(--color-paper)]/70 hover:text-[var(--color-paper)] hover:rotate-90 transition-all duration-300 z-10"
            onClick={closeModal}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 text-[var(--color-paper)]/50 text-sm tracking-wider">
            <span className="text-[var(--color-gold)]">{selectedImage + 1}</span>
            <span className="mx-2">/</span>
            <span>{galleryImages.length}</span>
          </div>

          {/* Main image container */}
          <div
            className="relative max-w-5xl w-full mx-4 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[selectedImage].src!}
                alt={galleryImages[selectedImage].title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-serif text-[var(--color-paper)]">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-sm text-[var(--color-paper)]/50 mt-1 tracking-[0.15em] uppercase">
                {galleryImages[selectedImage].category}
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
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnail navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (img.src) setSelectedImage(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedImage
                    ? 'bg-[var(--color-gold)] w-6'
                    : img.src
                      ? 'bg-[var(--color-paper)]/30 hover:bg-[var(--color-paper)]/50'
                      : 'bg-[var(--color-paper)]/10'
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
