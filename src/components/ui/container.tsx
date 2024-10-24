import React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const containerStyles = cva('flex justify-center mx-auto w-full min-h-screen', {
  variants: {
    variant: {
      constrained: 'sm:px-6 lg:px-8',
      'padded-content': 'px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: {
    variant: 'padded-content',
  },
});

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerStyles> {
  variant?: 'constrained' | 'padded-content';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({ className, variant, style, ...props }, ref) => (
  <div
    className={cn(containerStyles({ variant, className }))}
    style={{
      backgroundImage: `radial-gradient(at 150% 11%, hsla(166,69%,67%,1) 0px, transparent 50%),radial-gradient(at 100% 120%, hsla(89,66%,79%,1) 0px, transparent 50%)`,
      ...style,
    }}
    {...props}
    ref={ref}
  />
));

Container.displayName = 'Container';

export { Container };
