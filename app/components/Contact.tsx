'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import Image from 'next/image';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', type: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const clinicInfo = {
    name: 'ライラック治療院 生麦',
    address: '神奈川県横浜市鶴見区生麦3-8-7 1F',
    phone: '045-504-0399',
    hours: '月〜土 10:00-20:00（最終受付 19:00）',
    closed: '日・祝休診',
    email: 'info@lilac-clinic.jp',
    website: 'http://lilac-namamugi.com/',
    instagram: 'https://www.instagram.com/lilac.namamugi/',
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/tomo.icoco',
      colorClass: 'social-icon-instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=100007170611509',
      colorClass: 'social-icon-facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'X',
      url: 'https://x.com/tomo_i_coco',
      colorClass: 'social-icon-x',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@tomo.icoco',
      colorClass: 'social-icon-threads',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.281 1.333-3.08.853-.737 2.063-1.17 3.504-1.252 1.048-.06 2.015.043 2.881.308-.088-1.013-.471-1.773-1.148-2.273-.775-.572-1.932-.861-3.443-.861h-.016c-1.228.007-2.214.28-2.93.813l-1.132-1.71c1.081-.804 2.523-1.218 4.287-1.233h.023c1.973 0 3.54.467 4.658 1.388.94.773 1.548 1.86 1.816 3.238.746.324 1.412.744 1.98 1.253 1.056.945 1.67 2.181 1.823 3.676.186 1.818-.28 3.703-1.348 5.46-1.2 1.974-3.088 3.469-5.618 4.446-1.476.57-3.094.859-4.812.859z"/>
        </svg>
      ),
    },
  ];

  // Form field component with floating label
  const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    required = false,
    value,
    onChange,
  }: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="relative group">
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 bg-[var(--color-white)] border border-[var(--color-ink)]/10 text-[var(--color-ink)] 
                   focus:border-[var(--color-gold)] focus:outline-none transition-all duration-300
                   focus:shadow-[0_0_0_3px_rgba(201,169,98,0.1)]"
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${value || focusedField === name 
            ? 'top-2 text-[10px] tracking-[0.15em] uppercase' 
            : 'top-1/2 -translate-y-1/2 text-sm'
          }
          ${focusedField === name 
            ? 'text-[var(--color-gold)]' 
            : 'text-[var(--color-stone)]'
          }
        `}
      >
        {label} {required && <span className="text-[var(--color-gold)]">*</span>}
      </label>
      {/* Focus line animation */}
      <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-gold)] transition-all duration-300 ${
        focusedField === name ? 'w-full' : 'w-0'
      }`} />
    </div>
  );

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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Success message */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-[var(--color-forest)]/10 border border-[var(--color-forest)]/30 text-[var(--color-forest)] text-sm animate-fade-in-scale">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>お問い合わせありがとうございます。内容を確認の上、ご連絡いたします。</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  name="name"
                  label="お名前"
                  required
                  value={formState.name}
                  onChange={(value) => setFormState({ ...formState, name: value })}
                />
                <FormField
                  name="email"
                  label="メールアドレス"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(value) => setFormState({ ...formState, email: value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  name="phone"
                  label="電話番号"
                  type="tel"
                  value={formState.phone}
                  onChange={(value) => setFormState({ ...formState, phone: value })}
                />
                <div className="relative group">
                  <select
                    id="type"
                    name="type"
                    required
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                    onFocus={() => setFocusedField('type')}
                    onBlur={() => setFocusedField(null)}
                    className="peer w-full px-4 pt-6 pb-2 bg-[var(--color-white)] border border-[var(--color-ink)]/10 text-[var(--color-ink)] 
                               focus:border-[var(--color-gold)] focus:outline-none transition-all duration-300 appearance-none cursor-pointer
                               focus:shadow-[0_0_0_3px_rgba(201,169,98,0.1)]"
                  >
                    <option value=""></option>
                    <option value="reservation">施術予約</option>
                    <option value="consultation">ご相談</option>
                    <option value="team">チームサポート依頼</option>
                    <option value="other">その他</option>
                  </select>
                  <label
                    htmlFor="type"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none
                      ${formState.type || focusedField === 'type' 
                        ? 'top-2 text-[10px] tracking-[0.15em] uppercase' 
                        : 'top-1/2 -translate-y-1/2 text-sm'
                      }
                      ${focusedField === 'type' 
                        ? 'text-[var(--color-gold)]' 
                        : 'text-[var(--color-stone)]'
                      }
                    `}
                  >
                    お問い合わせ種別 <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  {/* Dropdown arrow */}
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-stone)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-gold)] transition-all duration-300 ${
                    focusedField === 'type' ? 'w-full' : 'w-0'
                  }`} />
                </div>
              </div>

              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 bg-[var(--color-white)] border border-[var(--color-ink)]/10 text-[var(--color-ink)] 
                             focus:border-[var(--color-gold)] focus:outline-none transition-all duration-300 resize-none
                             focus:shadow-[0_0_0_3px_rgba(201,169,98,0.1)]"
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none
                    ${formState.message || focusedField === 'message' 
                      ? 'top-2 text-[10px] tracking-[0.15em] uppercase' 
                      : 'top-6 text-sm'
                    }
                    ${focusedField === 'message' 
                      ? 'text-[var(--color-gold)]' 
                      : 'text-[var(--color-stone)]'
                    }
                  `}
                >
                  メッセージ <span className="text-[var(--color-gold)]">*</span>
                </label>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[var(--color-gold)] transition-all duration-300 ${
                  focusedField === 'message' ? 'w-full' : 'w-0'
                }`} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto px-10 py-4 bg-[var(--color-ink)] text-[var(--color-paper)] text-sm tracking-[0.1em] font-medium overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                {/* Gold overlay on hover */}
                <span className="absolute inset-0 bg-[var(--color-gold)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <span className="relative flex items-center justify-center gap-3 group-hover:text-[var(--color-ink)]">
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <span>送信する</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* SNS with brand colors on hover */}
            <div className="mt-10 pt-8 border-t border-[var(--color-ink)]/10">
              <h3 className="text-sm text-[var(--color-ink)] mb-4 tracking-wider">SNS</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 flex items-center justify-center bg-[var(--color-white)] border border-[var(--color-ink)]/10 text-[var(--color-ink-soft)] transition-all duration-300 ${social.colorClass}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Clinic Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Map */}
            <div className="aspect-[4/3] mb-6 relative overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.6123456789!2d139.67!3d35.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z56We5aWI5bed55yM5qiq5rWc5biC6ba055Sf5Yy655Sf6bq7My04LTc!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
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
