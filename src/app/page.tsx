import AppHeader from '@/components/app-header';
import LivePlayer from '@/components/live-player';
import HighlightGenerator from '@/components/highlight-generator';
import ContactSection from '@/components/contact-section';
import PromoBanner from '@/components/promo-banner';
import AdSection from '@/components/ad-section';
import LiveBroadcast from '@/components/live-broadcast';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          <PromoBanner />
          <section id="live-player" className="grid scroll-mt-20 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Live Stream</h2>
            <LivePlayer />
          </section>

          <section id="live-broadcast" className="grid scroll-mt-20 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Go Live</h2>
            <LiveBroadcast />
          </section>
          
          <div className="grid gap-12 lg:grid-cols-5">
            <section id="highlights" className="lg:col-span-5 scroll-mt-20">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">AI Highlights</h2>
              <HighlightGenerator />
            </section>
          </div>

          <section id="advertisement" className="scroll-mt-20">
            <AdSection />
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Contact Us</h2>
            <ContactSection />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Radio Station. All rights reserved.
      </footer>
    </div>
  );
}
