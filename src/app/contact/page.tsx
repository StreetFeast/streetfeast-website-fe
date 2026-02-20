'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Header } from '@/components/Header';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { useConsentStore } from '@/store/consentStore';

export default function ContactPage() {
  const { hasConsented, isHydrated } = useConsentStore();
  const shouldMountProvider = isHydrated && hasConsented === true;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <>
      <Header />
      {shouldMountProvider && siteKey ? (
        <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
          <ContactForm />
        </GoogleReCaptchaProvider>
      ) : (
        <ContactForm />
      )}
      <Footer />
    </>
  );
}
