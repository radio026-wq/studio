import AppHeader from '@/components/app-header';
import LivePlayer from '@/components/live-player';
import ContactSection from '@/components/contact-section';
import PromoBanner from '@/components/promo-banner';
import AdSection from '@/components/ad-section';
import StreamingLinks from '@/components/streaming-links';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          <PromoBanner />
          <section id="live-player" className="grid scroll-mt-20 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Escuchar en Vivo</h2>
            <LivePlayer />
          </section>

          <section id="streaming" className="grid scroll-mt-20 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Transmitir en Vivo</h2>
            <StreamingLinks />
          </section>
          
          <section id="advertisement" className="scroll-mt-20">
            <AdSection />
          </section>

          <section id="contact" className="scroll-mt-20">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">Contacto</h2>
            <ContactSection />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} 026. Todos los derechos reservados.
      </footer>
    </div>
  );
}
