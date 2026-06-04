import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TransitionProps extends HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  as?: React.ElementType;
}

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  (
    {
      show = true,
      enter = "",
      enterFrom = "",
      enterTo = "",
      leave = "",
      leaveFrom = "",
      leaveTo = "",
      className,
      children,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    if (!show) return null;

    const transitionClass = show ? 
      `${enter} ${enterFrom} ${enterTo} ${className}` : 
      `${leave} ${leaveFrom} ${leaveTo} ${className}`;

    return (
      <Component
        ref={ref}
        className={cn(transitionClass)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Transition.displayName = "Transition";

export { Transition };