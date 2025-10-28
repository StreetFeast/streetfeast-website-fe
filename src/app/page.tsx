import { Header } from '@/components/Header';
import { HeroHeader } from '@/components/HeroHeader';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <HeroHeader />
      <ContactForm />
      <Footer />
    </>
  );
}
