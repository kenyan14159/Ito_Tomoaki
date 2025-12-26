'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const Contact = () => {
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

  const clinicInfo = {
    name: 'ライラック治療院 生麦',
    address: '神奈川県横浜市鶴見区生麦3-8-7 1F',
    phone: '045-504-0399',
    hours: '月〜土 10:00-20:00（最終受付 19:00）',
    closed: '日・祝休診',
    email: 'info@lilac-clinic.jp',
    website: 'http://lilac-namamugi.com/',
    instagram: 'https://www.instagram.com/lilac.namamugi/',
    facebook: 'https://www.facebook.com/lilac.namamugi/',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-[var(--color-cream)] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-[var(--color-gold)]/10 animate-floating-slow" />
      <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full border border-[var(--color-ink)]/5 animate-floating-slow" style={{ animationDelay: '5s' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="gold-line" />
            <span className="text-caption text-[var(--color-gold)]">Contact</span>
            <span className="gold-line" />
          </div>
          <h2 className="heading-section text-[var(--color-ink)] mb-4">お問い合わせ</h2>
          <p className="text-body text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            ライラック治療院 生麦にて施術を行っています。<br className="hidden md:block" />
            合宿帯同などで不在の場合がありますので、事前のご予約をお願いします。
          </p>
        </div>

        {/* Clinic Info - Centered */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Map */}
            <div className="aspect-[4/3] mb-6 relative overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.8!2d139.6758!3d35.4978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185dd6c3c6f8d7%3A0x8f8f8f8f8f8f8f8f!2z44Op44Kk44Op44OD44Kv5rK755mC6Zmi!5e0!3m2!1sja!2sjp!4v1701580800000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                title="ライラック治療院 生麦の地図"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Clinic Card */}
            <div className="bg-[var(--color-white)] p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[var(--color-ink)]/10">
                <div className="w-14 h-14 relative flex-shrink-0 rounded-full overflow-hidden bg-[var(--color-cream)]">
                  <Image
                    src="/rairakku.png"
                    alt="ライラック治療院"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--color-ink)]">{clinicInfo.name}</h3>
                  <p className="text-xs text-[var(--color-stone)] tracking-wider">Lilac Clinic Namamugi</p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="space-y-3 text-sm">
                {[
                  { label: '住所', value: clinicInfo.address, icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )},
                  { label: '電話', value: clinicInfo.phone, link: `tel:${clinicInfo.phone}`, badge: '予約優先', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )},
                  { label: '診療', value: clinicInfo.hours, icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )},
                  { label: '休診', value: clinicInfo.closed, icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )},
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group/item">
                    <span className="text-[var(--color-gold)] mt-0.5">{item.icon}</span>
                    <div className="flex-1">
                      <span className="text-[var(--color-stone)] text-xs uppercase tracking-wider">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.link ? (
                          <a href={item.link} className="text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[var(--color-ink)]">{item.value}</span>
                        )}
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 pt-4 border-t border-[var(--color-ink)]/10 flex flex-wrap gap-4">
                <a
                  href={clinicInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
                >
                  <span>公式サイト</span>
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={clinicInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
                >
                  <span>Facebook</span>
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={clinicInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* CTA */}
              <a
                href={`tel:${clinicInfo.phone}`}
                className="group mt-6 flex items-center justify-center gap-3 w-full py-4 bg-[var(--color-gold)] text-[var(--color-ink)] text-sm font-medium hover:bg-[var(--color-gold-dark)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <svg className="relative w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="relative">電話で予約</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
