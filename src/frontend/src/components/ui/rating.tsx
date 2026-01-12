import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  readonly?: boolean;
  onRate?: (value: number) => void;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ 
  value, 
  max = 5, 
  readonly = false, 
  onRate, 
  className 
}) => {
  const handleClick = (index: number) => {
    if (!readonly && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={readonly}
          className={cn(
            "h-5 w-5 transition-colors",
            index < value ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground",
            readonly ? "cursor-default" : "cursor-pointer hover:opacity-75"
          )}
        >
          <Star className="h-full w-full" />
        </button>
      ))}
    </div>
  );
};

export { Rating };