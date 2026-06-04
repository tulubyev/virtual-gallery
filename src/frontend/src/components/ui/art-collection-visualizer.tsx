import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye,
  Star,
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtCollectionVisualizerProps {
  collectionData: {
    name: string;
    curator: string;
    description: string;
    artworkCount: number;
    likes: number;
    rating: number;
    tags: string[];
    creationDate: string;
    lastUpdated: string;
    isFeatured: boolean;
    artworksCount: number;
    popularityTrend: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    artworkDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    engagementMetrics: {
      views: number;
      shares: number;
      comments: number;
      saves: number;
      likes: number;
    };
  };
  className?: string;
}

const ArtCollectionVisualizer: React.FC<ArtCollectionVisualizerProps> = ({
  collectionData,
  className
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{collectionData.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Куратор: {collectionData.curator}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{collectionData.rating.toFixed(1)}</span>
            </div>
            <Badge variant="outline">{collectionData.artworkCount} экспонатов</Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{collectionData.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Collection metrics */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{collectionData.engagementMetrics.views}</p>
                <p className="text-sm text-muted-foreground">Просмотров</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{collectionData.engagementMetrics.likes}</p>
                <p className="text-sm text-muted-foreground">Лайков</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{collectionData.engagementMetrics.shares}</p>
                <p className="text-sm text-muted-foreground">Шерингов</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{collectionData.engagementMetrics.comments}</p>
                <p className="text-sm text-muted-foreground">Комментариев</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {collectionData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          {/* Popularity trend chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Тренд популярности</CardTitle>
            </CardHeader>
            <CardContent>
              <DataVisualization
                type="line"
                data={collectionData.popularityTrend}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Изменение популярности за последний месяц'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  }
                }}
              />
            </CardContent>
          </Card>
          
          {/* Artwork distribution chart */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Распределение экспонатов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DataVisualization
                  type="bar"
                  data={collectionData.artworkDistribution}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      title: {
                        display: true,
                        text: 'Распределение по категориям'
                      }
                    }
                  }}
                />
                <div className="space-y-4">
                  <h4 className="font-medium">Статистика коллекции</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Дата создания:</span>
                      <span className="font-medium">{new Date(collectionData.creationDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Последнее обновление:</span>
                      <span className="font-medium">{new Date(collectionData.lastUpdated).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Всего экспонатов:</span>
                      <span className="font-medium">{collectionData.artworkCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Средний рейтинг:</span>
                      <span className="font-medium">{collectionData.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    Посетить коллекцию
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export { ArtCollectionVisualizer };