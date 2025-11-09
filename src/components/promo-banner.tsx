"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PromoBanner() {
  return (
    <section className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
      <Image
        src="https://picsum.photos/seed/radio-cabin/1200/400"
        alt="Banner de la estación de radio con una cabina de radio"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        data-ai-hint="radio studio"
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md mb-4">
          026
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 drop-shadow-md mb-6 max-w-2xl">
          En linea desde La Romana, RD.
        </p>
        <Button size="lg" variant="secondary" onClick={() => document.getElementById('live-player')?.scrollIntoView({ behavior: 'smooth' })}>
          Escuchar Ahora
        </Button>
      </div>
    </section>
  );
}
