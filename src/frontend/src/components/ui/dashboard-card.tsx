import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: number;
  changeText: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  progress?: number;
  progressText?: string;
  footerText?: string;
  footerValue?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  onClick?: () => void;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeText,
  icon,
  trend,
  progress,
  progressText,
  footerText,
  footerValue,
  variant = 'default',
  onClick,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <span>{change}%</span>
          </div>
          <span className="text-xs text-muted-foreground">{changeText}</span>
        </div>
        
        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{progressText}</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} variant={variant} />
          </div>
        )}
        
        {footerText && footerValue && (
          <div className="mt-4 pt-4 border-t flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{footerText}</span>
            <span className="text-sm font-medium">{footerValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { DashboardCard };