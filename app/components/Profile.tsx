'use client';

import { useEffect, useRef, useState } from 'react';

const Profile = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileImageUrl = 'https://nssu-ekiden.com/wp-content/uploads/2025/02/itotomoaki.jpg';

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tomo.icoco',
      colorClass: 'social-icon-instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100007170611509',
      colorClass: 'social-icon-facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      url: 'https://x.com/tomo_i_coco',
      colorClass: 'social-icon-x',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@tomo.icoco',
      colorClass: 'social-icon-threads',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.281 1.333-3.08.853-.737 2.063-1.17 3.504-1.252 1.048-.06 2.015.043 2.881.308-.088-1.013-.471-1.773-1.148-2.273-.775-.572-1.932-.861-3.443-.861h-.016c-1.228.007-2.214.28-2.93.813l-1.132-1.71c1.081-.804 2.523-1.218 4.287-1.233h.023c1.973 0 3.54.467 4.658 1.388.94.773 1.548 1.86 1.816 3.238.746.324 1.412.744 1.98 1.253 1.056.945 1.67 2.181 1.823 3.676.186 1.818-.28 3.703-1.348 5.46-1.2 1.974-3.088 3.469-5.618 4.446-1.476.57-3.094.859-4.812.859z"/>
        </svg>
      ),
    },
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
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white hover:rotate-90 transition-all duration-300"
            onClick={() => setIsModalOpen(false)}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImageUrl}
              alt="伊藤智章"
              className="object-contain w-full h-auto max-h-[90vh] shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
