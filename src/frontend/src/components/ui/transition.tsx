import React, { HTMLAttributes, forwardRef } from "react";
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

    const AnyComponent = Component as React.ElementType<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
    return (
      <AnyComponent
        ref={ref as React.Ref<HTMLElement>}
        className={cn(transitionClass)}
        {...props}
      >
        {children}
      </AnyComponent>
    );
  }
);

Transition.displayName = "Transition";

export { Transition };