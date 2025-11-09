"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.25,4,12,4,12,4S5.75,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.75,2,12,2,12s0,4.25,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.75,20,12,20,12,20s6.25,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.25,22,12,22,12S22,7.75,21.582,6.186z M10,15.5V8.5l6,3.5L10,15.5z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 C13.67,9,13,9.67,13,10.5V12h3l-0.5,3h-2.5v6.8C18.56,20.87,22,16.84,22,12z" />
    </svg>
);


export default function StreamingLinks() {
  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Plataformas de Streaming</CardTitle>
            <CardDescription>
                Inicia tu transmisión en vivo en tu plataforma preferida.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild size="lg" className="bg-[#3b5998] hover:bg-[#3b5998]/90 text-white">
                <Link href="https://www.facebook.com/live/create" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon className="mr-2 h-5 w-5" />
                    Transmitir en Facebook
                </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Link href="https://www.youtube.com/live_dashboard" target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon className="mr-2 h-5 w-5" />
                    Transmitir en YouTube
                </Link>
            </Button>
      </CardContent>
    </Card>
  );
}
