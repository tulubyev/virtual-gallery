import { Avatar as AvatarPrimitive, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  fallback = "U", 
  className = "", 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl"
  };

  return (
    <AvatarPrimitive className={`${sizeClasses[size]} ${className}`}>
      {src ? <AvatarImage src={src} alt="Avatar" /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarPrimitive>
  );
};

export { Avatar, AvatarImage, AvatarFallback };