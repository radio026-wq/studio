import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function AdSection() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <Link href="#" className="block group">
        <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
                <Image
                    src="https://picsum.photos/seed/ad/600/400"
                    alt="Anuncio"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="headphones product"
                    className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h3 className="text-sm uppercase text-muted-foreground mb-2">Publicidad</h3>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4 group-hover:text-primary transition-colors">
                    El Mejor Sonido, Sin Interrupciones.
                </h2>
                <p className="text-muted-foreground mb-6">
                    Experimenta un audio cristalino con los nuevos Auriculares Aura. Cancelación de ruido, 24 horas de batería y comodidad premium.
                </p>
                <p className="font-semibold text-primary group-hover:underline">
                    Comprar Ahora &rarr;
                </p>
            </div>
        </div>
      </Link>
    </Card>
  );
}
