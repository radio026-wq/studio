import { Skeleton } from "@/components/ui/skeleton";
import { Radio } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-4 flex">
            <div className="mr-6 flex items-center space-x-2">
              <Radio className="h-6 w-6 text-primary" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          <section className="grid gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-40 w-full" />
          </section>
          
          <div className="grid gap-12 lg:grid-cols-5">
            <section className="lg:col-span-3 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-80 w-full" />
            </section>
            
            <section className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-80 w-full" />
            </section>
          </div>

          <section className="space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-56 w-full" />
          </section>
        </div>
      </main>
    </div>
  );
}
