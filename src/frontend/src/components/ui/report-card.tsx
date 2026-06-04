import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  GalleryVerticalEnd,
  Download,
  Filter,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

interface ReportCardProps {
  title: string;
  period: string;
  data: {
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down';
  }[];
  totalValue: number;
  comparisonValue: number;
  status: 'completed' | 'in-progress' | 'pending';
  onDownload?: () => void;
  onFilter?: () => void;
  className?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  period,
  data,
  totalValue,
  comparisonValue,
  status,
  onDownload,
  onFilter,
  className
}) => {
  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    pending: 'bg-gray-500'
  };

  const statusText = {
    completed: 'Завершен',
    'in-progress': 'В процессе',
    pending: 'Ожидает'
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`capitalize ${statusColors[status]}`}>
            {statusText[status]}
          </Badge>
          {onFilter && (
            <Button variant="outline" size="sm" onClick={onFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Фильтр
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-3xl font-bold">{totalValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Всего</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{comparisonValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Пред. период</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <GalleryVerticalEnd className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{item.value.toLocaleString()}</p>
                  <div className={`flex items-center text-xs ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    <span>{item.change}%</span>
                  </div>
                </div>
                <div className="w-24">
                  <ProgressBar 
                    value={Math.min(100, (item.value / totalValue) * 100)} 
                    variant={item.trend === 'up' ? 'success' : 'error'} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-6">
          {onDownload && (
            <Button variant="outline" onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Скачать отчет
            </Button>
          )}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Обновлено:</p>
            <p className="text-sm">{new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ReportCard };