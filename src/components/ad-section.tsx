import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

type AdProps = {
    title: string;
    description: string;
    contact: {
        phone?: string;
        email?: string;
    };
    image: {
        src: string;
        aiHint: string;
    };
    callToAction: string;
    layout?: 'vertical' | 'horizontal';
};


export default function AdSection({ title, description, contact, image, callToAction, layout = 'vertical' }: AdProps) {
  return (
    <Card className={cn("shadow-lg overflow-hidden", layout === 'horizontal' && "w-full")}>
      <Link href="#" className="block group h-full">
        <div className={cn("grid h-full", layout === 'vertical' ? 'grid-rows-[1fr_auto]' : 'md:grid-cols-2')}>
            <div className={cn("relative", layout === 'vertical' ? 'h-64' : 'h-64 md:h-auto')}>
                <Image
                    src={image.src}
                    alt={`Publicidad de ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={image.aiHint}
                    className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h3 className="text-sm uppercase text-muted-foreground mb-2">Publicidad</h3>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {title}
                </h2>
                <p className="text-muted-foreground mb-4">
                    {description}
                </p>
                <div className="space-y-2 mb-6">
                    {contact.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-sm text-foreground">{contact.phone}</span>
                        </div>
                    )}
                    {contact.email && (
                         <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-primary" />
                            <span className="text-sm text-foreground">{contact.email}</span>
                        </div>
                    )}
                </div>
                <p className="font-semibold text-primary group-hover:underline">
                    {callToAction} &rarr;
                </p>
            </div>
        </div>
      </Link>
    </Card>
  );
}