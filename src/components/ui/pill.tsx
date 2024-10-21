import { cn } from '@/lib/utils';

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'absolute hidden origin-center items-center justify-center rounded-full border-2 border-border bg-background/90',
        'px-4 py-2 text-sm font-semibold text-foreground shadow-lg duration-1000 ease-minor-spring animate-in fade-in-0 zoom-in-150 xl:flex',
        className,
      )}
    >
      {children}
    </div>
  );
}
