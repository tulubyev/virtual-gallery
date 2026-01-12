import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("animate-spin text-current", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ size, className }) => {
  return (
    <Loader2 className={cn(spinnerVariants({ size }), className)} />
  );
};

export { Spinner, spinnerVariants };