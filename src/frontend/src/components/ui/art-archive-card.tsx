import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Archive,
  GalleryVerticalEnd,
  Users,
  Eye,
  Heart,
  Star,
  Calendar,
  Award,
  MapPin,
  FileText,
  Image,
  Video,
  Music,
  Filter,
  Search,
  Download,
  Upload
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";

interface ArtArchiveCardProps {
  name: string;
  description: string;
  curator: string;
  artworkCount: number;
  dateRange: {
    start: number;
    end: number;
  };
  tags: string[];
  preservationStatus: 'excellent' | 'good' | 'fair' | 'poor';
  digitizationProgress: number;
  featured?: boolean;
  imageUrl?: string;
  onView?: () => void;
  onDownload?: () => void;
  className?: string;
}

const ArtArchiveCard: React.FC<ArtArchiveCardProps> = ({
  name,
  description,
  curator,
  artworkCount,
  dateRange,
  tags,
  preservationStatus,
  digitizationProgress,
  featured = false,
  imageUrl,
  onView,
  onDownload,
  className
}) => {
  const statusColors = {
    excellent: 'bg-green-500',
    good: 'bg-blue-500',
    fair: 'bg-yellow-500',
    poor: 'bg-red-500'
  };

  return (
    <Card className={cn("overflow-hidden group", className)}>
      {featured && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Архив выдающегося значения
        </div>
      )}
      
      <div className="relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-muted flex items-center justify-center">
            <Archive className="h-16 w-16 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {dateRange.start}-{dateRange.end}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">Куратор: {curator}</p>
          </div>
          <Badge variant="outline" className={`border ${statusColors[preservationStatus]}`}>
            {preservationStatus === 'excellent' ? 'Отличное' : 
             preservationStatus === 'good' ? 'Хорошее' : 
             preservationStatus === 'fair' ? 'Удовлетворительное' : 'Требует внимания'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{artworkCount}</p>
              <p className="text-xs text-muted-foreground">Экспонатов</p>
            </div>
            <div className="border rounded-lg p-2">
              <p className="text-lg font-semibold">{digitizationProgress}%</p>
              <p className="text-xs text-muted-foreground">Оцифровано</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Прогресс оцифровки</span>
              <span>{digitizationProgress}%</span>
            </div>
            <ProgressBar 
              value={digitizationProgress} 
              variant={digitizationProgress > 90 ? "success" : digitizationProgress > 70 ? "default" : digitizationProgress > 40 ? "warning" : "error"} 
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button className="w-full" onClick={onView}>
          <Eye className="h-4 w-4 mr-2" />
          Просмотреть архив
        </Button>
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Скачать
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Поделиться
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { ArtArchiveCard };