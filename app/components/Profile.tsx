'use client';

import { useEffect, useRef, useState } from 'react';
import { socialLinks } from '../constants/socialLinks';
import ImageModal from './ImageModal';

const Profile = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileImageUrl = '/itotomoaki.jpg';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const qualifications = [
    '鍼灸師',
    'あん摩マッサージ指圧師',
  ];

  const profileDetails = [
    { label: '勤務先', value: 'ライラック治療院' },
    { label: '居住地', value: '神奈川県横浜市' },
    { label: '出身地', value: '静岡県浜松市' },
  ];

  const education = [
    { type: '高校', name: '浜松日体高校', detail: '駅伝部' },
    { type: '大学', name: '関東学院大学 経営学部', detail: '駅伝部' },
    { type: '専門学校', name: '呉竹鍼灸柔整専門学校', detail: '鍼灸あん摩マッサージ指圧科' },
  ];

  return (
    <>
      <section
        id="profile"
        ref={sectionRef}
        className="section-padding bg-[var(--color-paper)] relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full border border-[var(--color-gold)]/5 animate-floating-slow" />
          <div className="absolute bottom-[15%] left-[3%] w-48 h-48 rounded-full border border-[var(--color-ink)]/5 animate-floating-slow" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[50%] right-[15%] w-24 h-24 rounded-full bg-[var(--color-gold)]/3 animate-gentle-pulse" />
          
          {/* Vertical lines */}
          <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-[var(--color-ink)]/5 to-transparent" />
          <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-[var(--color-gold)]/10 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Image */}
            <div
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div 
                className="relative aspect-[4/5] bg-[var(--color-ink-light)] overflow-hidden cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImageUrl}
                  alt="伊藤智章"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Decorative frame */}
                <div className="absolute inset-4 border border-[var(--color-gold)]/20 pointer-events-none transition-all duration-500 group-hover:inset-6" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-20 group-hover:h-20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-gold)]/30 transition-all duration-500 group-hover:w-20 group-hover:h-20" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element behind image */}
              <div 
                className={`absolute -bottom-8 -right-8 w-32 h-32 border border-[var(--color-gold)]/20 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Right Column - Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              {/* Section Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="gold-line" />
                <span className="text-caption text-[var(--color-gold)]">Profile</span>
              </div>

              {/* Title */}
              <h2 className="heading-section text-[var(--color-ink)] mb-2">
                伊藤智章
              </h2>
              <p className="text-sm text-[var(--color-stone)] mb-2">いとう ともあき</p>
              <p className="text-lg tracking-[0.2em] text-[var(--color-stone)] mb-8">
                ITO TOMOAKI
              </p>

              {/* Description */}
              <div className="space-y-4 mb-8">
                <p className="text-body text-[var(--color-ink-soft)]">
                  ライラック治療院にて、鍼灸師として施術を通じて選手たちのコンディショニングをサポートしています。
                </p>
                <p className="text-body text-[var(--color-ink-soft)]">
                  施術は一般の方も受診可能です。心身のケアにご興味のある方は、お気軽にご相談ください。
                </p>
              </div>

              {/* Profile Details */}
              <div className="mb-8 p-6 bg-[var(--color-cream)] relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[var(--color-gold)]/20 transition-all duration-300 group-hover:w-16 group-hover:h-16" />
                
                <div className="grid gap-4 relative">
                  {profileDetails.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4"
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-xs tracking-[0.15em] text-[var(--color-stone)] uppercase w-20">{item.label}</span>
                      <span className="text-sm text-[var(--color-ink)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h3 className="text-sm tracking-[0.2em] text-[var(--color-ink)] uppercase mb-4 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  <span>学歴</span>
                </h3>
                <div className="space-y-3">
                  {education.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 group/edu"
                    >
                      <span className="text-xs tracking-[0.1em] text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1.5 min-w-[70px] text-center transition-all duration-300 group-hover/edu:bg-[var(--color-gold)]/20">
                        {item.type}
                      </span>
                      <div>
                        <span className="text-sm text-[var(--color-ink)]">{item.name}</span>
                        <span className="text-xs text-[var(--color-stone)] ml-2">（{item.detail}）</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-10">
                <h3 className="text-sm tracking-[0.2em] text-[var(--color-ink)] uppercase mb-4 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>資格</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="group px-5 py-2.5 bg-[var(--color-ink)] text-sm text-[var(--color-paper)] tracking-wider relative overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative">{qual}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* SNS Links with brand colors */}
              <div>
                <h3 className="text-sm tracking-[0.2em] text-[var(--color-ink)] uppercase mb-4 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>SNS</span>
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 flex items-center justify-center bg-[var(--color-cream)] text-[var(--color-ink-soft)] transition-all duration-300 ${social.colorClass}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={profileImageUrl}
        imageAlt="伊藤智章"
      />
    </>
  );
};

export default Profile;
