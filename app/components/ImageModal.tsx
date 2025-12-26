'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  // ESCキーで閉じる
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md cursor-pointer animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="画像プレビュー"
    >
      <button
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:rotate-90 transition-all duration-300"
        onClick={onClose}
        aria-label="閉じる"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div 
        className="relative max-w-4xl max-h-[90vh] w-full mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          quality={90}
          className="object-contain w-full h-auto max-h-[90vh] shadow-2xl"
          priority
        />
      </div>
    </div>
  );
};

export default ImageModal;
