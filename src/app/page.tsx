import AppHeader from '@/components/app-header';
import LivePlayer from '@/components/live-player';
import ContentSchedule from '@/components/content-schedule';
import HighlightGenerator from '@/components/highlight-generator';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          <section id="live-player" className="grid scroll-mt-20 gap-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground font-headline">Live Stream</h2>
            <LivePlayer />
          </section>
          
          <div className="grid gap-12 lg:grid-cols-5">
            <section id="schedule" className="lg:col-span-3 scroll-mt-20">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground font-headline">Content Schedule</h2>
              <ContentSchedule />
            </section>
            
            <section id="highlights" className="lg:col-span-2 scroll-mt-20">
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground font-headline">AI Highlights</h2>
              <HighlightGenerator />
            </section>
          </div>

          <section id="contact" className="scroll-mt-20">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground font-headline">Contact Us</h2>
            <ContactSection />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} 026 Online Radio. All rights reserved.
      </footer>
    </div>
  );
}
