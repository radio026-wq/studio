import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
      <Image
        src="https://picsum.photos/seed/lamega/1200/400"
        alt="Banner de La Mega"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        data-ai-hint="concert crowd"
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-md mb-4 font-headline uppercase">
          Mega Mezcla de Verano
        </h2>
        <p className="text-lg md:text-xl text-primary drop-shadow-md mb-6 max-w-2xl font-bold">
          ¡Los DJs de La Mega están mezclando en vivo los mejores éxitos del verano!
        </p>
        <Button size="lg" variant="secondary">Escucha Ahora</Button>
      </div>
    </section>
  );
}
