import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

interface TagProps {
  text: string;
  onRemove?: () => void;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Tag: React.FC<TagProps> = ({ text, onRemove, className, variant = "default" }) => {
  if (onRemove) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
          className
        )}
      >
        {text}
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0.5 rounded-full hover:bg-secondary-foreground/20"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <Badge variant={variant} className={cn("rounded-full", className)}>
      {text}
    </Badge>
  );
};

export { Tag };