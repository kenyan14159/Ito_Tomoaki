'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import Image from 'next/image';
import { socialLinksLarge } from '../constants/socialLinks';

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

  // 電話番号のバリデーション
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // 任意項目なので空は許可
    const phoneRegex = /^[0-9\-+().\s]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  // メールのバリデーション
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // クライアントサイドバリデーション
    if (!validateEmail(formState.email)) {
      alert('有効なメールアドレスを入力してください。');
      return;
    }
    
    if (formState.phone && !validatePhone(formState.phone)) {
      alert('有効な電話番号を入力してください。');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Formspree を使用してメール送信
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/xpwzgkqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          type: formState.type,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', phone: '', type: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorText = await response.text().catch(() => '');
        console.error('Form submission failed:', response.status, errorText);
        alert(`送信に失敗しました（エラー: ${response.status}）。\nお手数ですが、お電話（045-504-0399）にてお問い合わせください。`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('ネットワークエラーが発生しました。\nお手数ですが、お電話（045-504-0399）にてお問い合わせください。');
    } finally {
      setIsSubmitting(false);
    }
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

  // Form field component with floating label
  const FormField = ({ 
    name, 
    label, 
    type = 'text', 
    required = false,
    value,
    onChange,
    autoComplete,
  }: {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    autoComplete?: string;
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
        autoComplete={autoComplete}
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
                  autoComplete="name"
                />
                <FormField
                  name="email"
                  label="メールアドレス"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(value) => setFormState({ ...formState, email: value })}
                  autoComplete="email"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField
                  name="phone"
                  label="電話番号"
                  type="tel"
                  value={formState.phone}
                  onChange={(value) => setFormState({ ...formState, phone: value })}
                  autoComplete="tel"
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
                {socialLinksLarge.map((social) => (
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
