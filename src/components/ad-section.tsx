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
                    src="https://picsum.photos/seed/colmado/600/400"
                    alt="Publicidad del Colmado Alfonso"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="grocery store"
                    className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h3 className="text-sm uppercase text-muted-foreground mb-2">Publicidad</h3>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    Colmado Alfonso: ¡Todo a tu alcance!
                </h2>
                <p className="text-muted-foreground mb-6">
                    Los productos más frescos y la mejor atención del barrio. ¡Visítanos y comprueba la calidad que nos distingue!
                </p>
                <p className="font-semibold text-primary group-hover:underline">
                    Ver Ofertas &rarr;
                </p>
            </div>
        </div>
      </Link>
    </Card>
  );
}
