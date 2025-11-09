import { Radio } from 'lucide-react';
import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-black sm:inline-block font-headline">
              026 Radio en Línea
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
