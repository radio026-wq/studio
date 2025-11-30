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
                    src="https://picsum.photos/seed/security/600/400"
                    alt="Publicidad de A&A Security Sistem"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="security camera"
                    className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h3 className="text-sm uppercase text-muted-foreground mb-2">Publicidad</h3>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    A&amp;A Security Sistem: Protegemos lo que más importa.
                </h2>
                <p className="text-muted-foreground mb-6">
                    Sistemas de seguridad y cámaras de vigilancia para tu hogar o negocio. Tranquilidad garantizada con la mejor tecnología.
                </p>
                <p className="font-semibold text-primary group-hover:underline">
                    Cotiza tu Sistema &rarr;
                </p>
            </div>
        </div>
      </Link>
    </Card>
  );
}
