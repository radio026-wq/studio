import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
      <Image
        src="https://picsum.photos/seed/radiobanner/1200/400"
        alt="Promotional Banner"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        data-ai-hint="radio studio"
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4 font-headline">
          ¡Nuevo Programa Próximamente!
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 drop-shadow-md mb-6 max-w-2xl">
          Prepárate para "La Hora de Medianoche" con DJ Alex, trayéndote los mejores ritmos electrónicos cada viernes por la noche.
        </p>
        <Button size="lg">Saber Más</Button>
      </div>
    </section>
  );
}
