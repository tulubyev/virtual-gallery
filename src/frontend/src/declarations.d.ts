// Module declarations for packages not installed but referenced in UI components.
// These allow TypeScript to compile without errors for shadcn/ui primitive dependencies.

declare module '@radix-ui/react-accordion' {
  const Root: any;
  const Item: any;
  const Header: any;
  const Trigger: any;
  const Content: any;
  export { Root, Item, Header, Trigger, Content };
}

declare module '@radix-ui/react-alert-dialog' {
  const Root: any;
  const Trigger: any;
  const Portal: any;
  const Overlay: any;
  const Content: any;
  const Header: any;
  const Footer: any;
  const Title: any;
  const Description: any;
  const Action: any;
  const Cancel: any;
  export { Root, Trigger, Portal, Overlay, Content, Header, Footer, Title, Description, Action, Cancel };
}

declare module '@radix-ui/react-aspect-ratio' {
  const Root: any;
  export { Root };
}

declare module '@radix-ui/react-checkbox' {
  const Root: any;
  const Indicator: any;
  export { Root, Indicator };
}

declare module '@radix-ui/react-collapsible' {
  const Root: any;
  const Trigger: any;
  const Content: any;
  export { Root, Trigger, Content };
}

declare module '@radix-ui/react-context-menu' {
  const Root: any;
  const Trigger: any;
  const Group: any;
  const Portal: any;
  const Sub: any;
  const RadioGroup: any;
  const SubTrigger: any;
  const SubContent: any;
  const Content: any;
  const Item: any;
  const CheckboxItem: any;
  const RadioItem: any;
  const Label: any;
  const Separator: any;
  const ItemIndicator: any;
  export { Root, Trigger, Group, Portal, Sub, RadioGroup, SubTrigger, SubContent, Content, Item, CheckboxItem, RadioItem, Label, Separator, ItemIndicator };
}

declare module '@radix-ui/react-hover-card' {
  const Root: any;
  const Trigger: any;
  const Content: any;
  export { Root, Trigger, Content };
}

declare module '@radix-ui/react-label' {
  const Root: any;
  export { Root };
  export type LabelProps = { className?: string; htmlFor?: string; children?: React.ReactNode; [key: string]: any };
}

declare module '@radix-ui/react-popover' {
  const Root: any;
  const Trigger: any;
  const Anchor: any;
  const Content: any;
  const Close: any;
  const Portal: any;
  export { Root, Trigger, Anchor, Content, Close, Portal };
}

declare module '@radix-ui/react-progress' {
  const Root: any;
  const Indicator: any;
  export { Root, Indicator };
}

declare module '@radix-ui/react-radio-group' {
  const Root: any;
  const Item: any;
  const Indicator: any;
  export { Root, Item, Indicator };
}

declare module '@radix-ui/react-scroll-area' {
  const Root: any;
  const Viewport: any;
  const ScrollAreaScrollbar: any;
  const ScrollAreaThumb: any;
  const Corner: any;
  export { Root, Viewport, ScrollAreaScrollbar, ScrollAreaThumb, Corner };
}

declare module '@radix-ui/react-separator' {
  const Root: any;
  export { Root };
}

declare module '@radix-ui/react-slider' {
  const Root: any;
  const Track: any;
  const Range: any;
  const Thumb: any;
  export { Root, Track, Range, Thumb };
}

declare module '@radix-ui/react-switch' {
  const Root: any;
  const Thumb: any;
  export { Root, Thumb };
}

declare module '@radix-ui/react-tabs' {
  const Root: any;
  const List: any;
  const Trigger: any;
  const Content: any;
  export { Root, List, Trigger, Content };
}

declare module '@radix-ui/react-toast' {
  const Provider: any;
  const Viewport: any;
  const Root: any;
  const Action: any;
  const Close: any;
  const Title: any;
  const Description: any;
  export { Provider, Viewport, Root, Action, Close, Title, Description };
  export type ToastActionElement = any;
  export type ToastProps = any;
}

declare module '@radix-ui/react-toggle' {
  const Root: any;
  export { Root };
}

declare module '@radix-ui/react-toggle-group' {
  const Root: any;
  const Item: any;
  export { Root, Item };
}

declare module '@radix-ui/react-tooltip' {
  const Provider: any;
  const Root: any;
  const Trigger: any;
  const Content: any;
  const Portal: any;
  export { Provider, Root, Trigger, Content, Portal };
}

declare module 'react-day-picker' {
  const DayPicker: any;
  export { DayPicker };
  export type DayPickerProps = any;
  export type DayPickerSingleProps = any;
  export type DayPickerMultipleProps = any;
  export type DayPickerRangeProps = any;
  export type SelectSingleEventHandler = any;
  export type SelectMultipleEventHandler = any;
  export type SelectRangeEventHandler = any;
}

declare module 'embla-carousel-react' {
  const useEmblaCarousel: any;
  export { useEmblaCarousel };
  export default useEmblaCarousel;
  export type EmblaOptionsType = any;
}

declare module 'cmdk' {
  const Command: any;
  export { Command };
  export default Command;
}

declare module 'react-chartjs-2' {
  export const Line: any;
  export const Bar: any;
  export const Pie: any;
  export const Doughnut: any;
  export const Radar: any;
  export const Chart: any;
}

declare module 'chart.js' {
  export const Chart: any;
  export const CategoryScale: any;
  export const LinearScale: any;
  export const BarElement: any;
  export const LineElement: any;
  export const PointElement: any;
  export const ArcElement: any;
  export const Title: any;
  export const Tooltip: any;
  export const Legend: any;
  export const Filler: any;
  export const RadialLinearScale: any;
  export type ChartData<T extends string = string> = any;
  export type ChartOptions = any;
}

declare module 'react-hook-form' {
  export const useForm: any;
  export const useFormContext: any;
  export const useFormState: any;
  export const useWatch: any;
  export const useFieldArray: any;
  export const Controller: any;
  export const FormProvider: any;
  export type FieldValues = any;
  export type FieldPath<T> = any;
  export type Control<T> = any;
  export type UseFormReturn<T> = any;
  export type UseFormRegisterReturn = any;
  export type ControllerProps<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>> = any;
  export type ControllerRenderProps<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>> = any;
}

declare module 'react-resizable-panels' {
  export const PanelGroup: any;
  export const Panel: any;
  export const PanelResizeHandle: any;
}

declare module 'next-themes' {
  export const useTheme: any;
  export const ThemeProvider: any;
}

declare module 'sonner' {
  export const Toaster: any;
  export const toast: any;
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
  export const extend: any;
  export type ThreeElements = any;
  export type RootState = any;
}

// Declare missing model module referenced by RoomService
declare module '../../models/Room' {
  export interface RoomType {
    id: number;
    name: string;
    category: string;
    description?: string;
    defaultCapacity?: number;
    [key: string]: unknown;
  }

  export interface RoomInstance {
    id: number;
    typeId: number;
    galleryId: number;
    name: string;
    status: string;
    [key: string]: unknown;
  }

  export interface RoomAnalytics {
    roomId: number;
    visitCount: number;
    avgDuration: number;
    [key: string]: unknown;
  }
}

// Declare missing model module referenced by RoomCustomizer / RoomGenerator
declare module '../../../models/Room' {
  export interface RoomType {
    id: number;
    name: string;
    category: string;
    description?: string;
    [key: string]: unknown;
  }

  export interface RoomInstance {
    id: number;
    typeId: number;
    galleryId: number;
    name: string;
    status: string;
    [key: string]: unknown;
  }

  export interface RoomAnalytics {
    roomId: number;
    visitCount: number;
    avgDuration: number;
    [key: string]: unknown;
  }
}

// Extend JSX IntrinsicElements for Three.js/React Three Fiber JSX elements
declare namespace JSX {
  interface IntrinsicElements {
    mesh: any;
    group: any;
    ambientLight: any;
    directionalLight: any;
    pointLight: any;
    boxGeometry: any;
    meshStandardMaterial: any;
    meshBasicMaterial: any;
    planeGeometry: any;
    sphereGeometry: any;
    cylinderGeometry: any;
  }
}
