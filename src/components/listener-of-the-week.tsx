import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Quote } from 'lucide-react';

export default function ListenerOfTheWeek() {
  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Award className="text-primary"/>
            <span>Ana de la Cruz</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center text-center gap-4">
        <Image
          src="https://picsum.photos/seed/listener/200/200"
          alt="Oyente de la semana"
          width={120}
          height={120}
          className="rounded-full border-4 border-primary/50"
          data-ai-hint="portrait person"
        />
        <div className="relative">
            <Quote className="absolute -top-2 -left-4 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm italic text-muted-foreground">
                ¡La mejor energía para empezar mis mañanas! Nunca me pierdo el show de la mañana, me hace reír y me mantiene al día con la mejor música. ¡Sigan así!
            </p>
             <Quote className="absolute -bottom-2 -right-4 h-8 w-8 text-muted-foreground/20 transform scale-x-[-1]" />
        </div>
      </CardContent>
    </Card>
  );
}
