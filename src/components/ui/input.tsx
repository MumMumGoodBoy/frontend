import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
import Typography from './typography';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, ...props }, ref) => {
  const generatedId = React.useId();
  return (
    <div className="flex flex-col gap-0">
      {label && (
        <Label htmlFor={generatedId} className="mb-1">
          <Typography variant="h5">{label}</Typography>
        </Label>
      )}
      <input
        type={type}
        id={generatedId}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
