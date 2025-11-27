import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Achievements from './components/Achievements';
import Treatment from './components/Treatment';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navigation />
      <main>
        <Hero />
        <Profile />
        <Achievements />
        <Treatment />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
