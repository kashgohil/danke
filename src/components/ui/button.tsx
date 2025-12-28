import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-900',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 border border-red-600',
        outline: 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
        ghost: 'bg-transparent border border-transparent text-gray-900 hover:bg-gray-100 hover:border-gray-200',
        link: 'bg-transparent border border-transparent text-gray-900 underline-offset-4 hover:underline hover:text-gray-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-sm px-3',
        lg: 'h-11 rounded-sm px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export function IconButton({
  icon,
  onClick,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

export { Button, buttonVariants };
