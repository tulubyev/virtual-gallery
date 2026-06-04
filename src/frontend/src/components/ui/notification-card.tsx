import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  Check,
  X,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";

interface NotificationCardProps {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'notification';
  timestamp: string;
  isRead: boolean;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
  onMarkAsRead?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  type,
  timestamp,
  isRead,
  actions = [],
  onMarkAsRead,
  onDismiss,
  className
}) => {
  const typeColors = {
    info: 'text-blue-500 bg-blue-500/10',
    success: 'text-green-500 bg-green-500/10',
    warning: 'text-yellow-500 bg-yellow-500/10',
    error: 'text-red-500 bg-red-500/10',
    notification: 'text-primary bg-primary/10'
  };

  const typeIcons = {
    info: <Info className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    notification: <Bell className="h-5 w-5" />
  };

  return (
    <Card className={cn(!isRead && 'ring-2 ring-primary/20', className)}>
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${typeColors[type]}`}>
              {typeIcons[type]}
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              {!isRead && onMarkAsRead && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onMarkAsRead}
                  className="h-6 w-6 p-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              {onDismiss && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onDismiss}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {actions.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={action.onClick}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export { NotificationCard };