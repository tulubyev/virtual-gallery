import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagProps {
  text: string;
  onRemove?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ text, onRemove, className }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
        className
      )}
    >
      {text}
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0.5 rounded-full hover:bg-secondary-foreground/20"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export { Tag };