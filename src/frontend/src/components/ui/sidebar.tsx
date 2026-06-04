import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = TooltipPrimitive.Content

const sidebarVariants = cva(
  "group peer border-r bg-muted/50 data-[state=collapsed]:w-12 data-[state=expanded]:w-64",
  {
    variants: {
      variant: {
        default: "h-full",
        floating: "h-[calc(100vh-2rem)] mt-2 rounded-lg border bg-background shadow-sm",
        inset: "h-[calc(100vh-4rem)] mt-4 rounded-lg border bg-background shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SidebarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarVariants> {
  side?: "left" | "right"
  collapsible?: "offcanvas" | "collapsed" | "none"
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  SidebarProps
>(
  (
    {
      className,
      variant,
      side = "left",
      collapsible = "offcanvas",
      ...props
    },
    ref
  ) => {
    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex h-full w-[260px] flex-col bg-muted/50",
            className
          )}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref}
        className="group peer relative flex h-full"
        data-sidebar="sidebar"
        data-collapsible={collapsible}
      >
        <div
          data-sidebar="sidebar-overlay"
          className="fixed inset-0 z-10 bg-black/80 transition-opacity data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-black/80 print:hidden invisible"
        />
        <div
          ref={ref}
          className={cn(
            sidebarVariants({ variant }),
            className
          )}
          {...props}
        />
        <div
          className={cn(
            "absolute inset-y-0 z-20 hidden w-px bg-border transition-all duration-200",
            "[data-side=left][data-state=collapsed]:after:left-0",
            "[data-side=right][data-state=collapsed]:after:right-0",
            "[data-collapsible=offcanvas][data-state=collapsed]:w-0",
            "[data-collapsible=offcanvas][data-state=collapsed]:translate-x-0",
            "[data-collapsible=offcanvas][data-side=left][data-state=collapsed]:-translate-x-full",
            "[data-collapsible=offcanvas][data-side=right][data-state=collapsed]:translate-x-full",
            "group-data-[collapsible=none]:translate-x-0",
            "group-data-[collapsible=offcanvas]:z-50 group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=offcanvas]:translate-x-0",
            "[data-side=left]:border-r",
            "[data-side=right]:border-l",
            "[data-side=left][data-collapsible=offcanvas][data-state=collapsed]:border-r",
            "[data-side=right][data-collapsible=offcanvas][data-state=collapsed]:border-l",
            "print:hidden",
            "group-data-[collapsible=offcanvas]:fixed group-data-[collapsible=offcanvas]:inset-y-0",
            "group-data-[collapsible=offcanvas][data-side=left]:-left-2 group-data-[collapsible=offcanvas][data-side=left]:translate-x-0",
            "group-data-[collapsible=offcanvas][data-side=right]:-right-2 group-data-[collapsible=offcanvas][data-side=right]:translate-x-0"
          )}
        />
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-1 overflow-auto group-data-[collapsible=offcanvas]:overflow-hidden",
      className
    )}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=offcanvas]:!size-8 group-data-[collapsible=offcanvas]:shrink-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current=page]:bg-sidebar-primary aria-[current=page]:text-sidebar-primary-foreground",
        outline:
          "bg-background shadow-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border border-sidebar-border",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SidebarMenuButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipPrimitive.Content>
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const button = (
      <Comp
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({ variant, size }),
          isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
          className
        )}
        data-sidebar="menu-button"
        {...props}
      />
    )

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" align="center" hidden={!!props.onClick}>
            {typeof tooltip === "string" ? tooltip : tooltip}
          </TooltipContent>
        </Tooltip>
      )
    }

    return button
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
}