import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const HeroSection = dynamic(() => import('@/components/Hero'), {
  ssr: true,
});
const FeaturesSection = dynamic(() => import('@/components/Features'), {
  ssr: true,
});
const StatsSection = dynamic(() => import('@/components/Stats'), {
  ssr: true,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
});

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Trust-Vote - Secure Digital Voting Platform',
  description: 'Secure, transparent, and efficient digital voting platform for modern democracy',
  keywords: 'voting, secure voting, digital voting, democracy, electronic voting',
  openGraph: {
    title: 'VoteSafe - Secure Digital Voting Platform',
    description: 'Secure, transparent, and efficient digital voting platform for modern democracy',
    type: 'website',
    locale: 'en_US',
    siteName: 'Trust-Vote',
  },
};

// Page component
export default function Home(): JSX.Element {
  return (
    <>
      <main className="min-h-screen w-full overflow-x-hidden bg-gray-900">
        {/* Hero Section */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section className="relative">
          <FeaturesSection />
        </section>

        {/* Stats Section */}
        <section className="relative">
          <StatsSection />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}