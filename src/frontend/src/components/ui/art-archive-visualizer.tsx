import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Award,
  Image,
  Filter,
  Search,
  TrendingUp,
  Target,
  User
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

interface ArtArchiveVisualizerProps {
  archiveData: {
    totalArtworks: number;
    dateRange: {
      start: number;
      end: number;
    };
    collectionCount: number;
    curatorCount: number;
    preservationStatus: string;
    collections: Array<{
      name: string;
      description: string;
      artworkCount: number;
      digitizedCount: number;
      totalCount: number;
      period: string;
      dateRange?: {
        start: number;
        end: number;
      };
      tags: string[];
      curator: string;
      preservationStatus: 'excellent' | 'good' | 'fair' | 'poor';
    }>;
    digitizationProgress: {
      totalArtworks: number;
      digitized: number;
      inProgress: number;
      awaitingDigitization: number;
    };
    digitizationMetrics: {
      digitized: number;
      completionRate: number;
    };
    mediaTypes: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    mediaDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    temporalDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    geographicDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    preservationMetrics: {
      excellent: number;
      good: number;
      fair: number;
      poor: number;
    };
  };
  className?: string;
}

const ArtArchiveVisualizer: React.FC<ArtArchiveVisualizerProps> = ({
  archiveData,
  className
}) => {
  const digitizationRate = (archiveData.digitizationProgress.digitized / archiveData.digitizationProgress.totalArtworks) * 100;
  const preservationMetrics = archiveData.preservationMetrics;
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Archive metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего экспонатов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archiveData.totalArtworks.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>С {archiveData.dateRange.start} по {archiveData.dateRange.end}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Оцифровано</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archiveData.digitizationMetrics.digitized.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{archiveData.digitizationMetrics.completionRate}% завершено</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Коллекций</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archiveData.collectionCount.toLocaleString()}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              <span>{archiveData.curatorCount} кураторов</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Типы медиа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archiveData.mediaTypes.labels.length}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Image className="h-4 w-4 mr-1" />
              <span>Разнообразие форматов</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Состояние</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archiveData.preservationStatus}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Target className="h-4 w-4 mr-1" />
              <span>Среднее</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digitization progress */}
        <Card>
          <CardHeader>
            <CardTitle>Прогресс оцифровки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Общий прогресс</span>
                <span>{digitizationRate.toFixed(1)}%</span>
              </div>
              <ProgressBar 
                value={digitizationRate} 
                variant={digitizationRate > 80 ? "success" : digitizationRate > 50 ? "default" : "warning"} 
              />
              
              <div className="grid grid-cols-4 gap-2 text-center text-sm">
                <div>
                  <p className="font-semibold">{archiveData.digitizationProgress.totalArtworks.toLocaleString()}</p>
                  <p className="text-muted-foreground">Всего</p>
                </div>
                <div>
                  <p className="font-semibold">{archiveData.digitizationProgress.digitized.toLocaleString()}</p>
                  <p className="text-muted-foreground">Оцифровано</p>
                </div>
                <div>
                  <p className="font-semibold">{archiveData.digitizationProgress.inProgress.toLocaleString()}</p>
                  <p className="text-muted-foreground">В работе</p>
                </div>
                <div>
                  <p className="font-semibold">{archiveData.digitizationProgress.awaitingDigitization.toLocaleString()}</p>
                  <p className="text-muted-foreground">Ожидает</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Media types chart */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение по типам медиа</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="doughnut"
              data={archiveData.mediaDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Распределение экспонатов по типам медиа'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preservation status */}
        <Card>
          <CardHeader>
            <CardTitle>Состояние сохранности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Отличное</span>
                </div>
                <span className="text-sm font-medium">{preservationMetrics.excellent}%</span>
              </div>
              <ProgressBar value={preservationMetrics.excellent} variant="success" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Хорошее</span>
                </div>
                <span className="text-sm font-medium">{preservationMetrics.good}%</span>
              </div>
              <ProgressBar value={preservationMetrics.good} variant="default" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Удовлетворительное</span>
                </div>
                <span className="text-sm font-medium">{preservationMetrics.fair}%</span>
              </div>
              <ProgressBar value={preservationMetrics.fair} variant="warning" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Плохое</span>
                </div>
                <span className="text-sm font-medium">{preservationMetrics.poor}%</span>
              </div>
              <ProgressBar value={preservationMetrics.poor} variant="error" />
            </div>
          </CardContent>
        </Card>
        
        {/* Collections overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Коллекции архива</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Фильтр
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {archiveData.collections.map((collection, index) => {
                const progress = (collection.digitizedCount / collection.totalCount) * 100;
                
                return (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
                      </div>
                      <Badge variant="outline">{collection.totalCount} экспонатов</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Куратор: {collection.curator}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{collection.period}</span>
                      </div>
                      <Badge variant={
                        collection.preservationStatus === 'excellent' ? 'default' :
                        collection.preservationStatus === 'good' ? 'secondary' :
                        collection.preservationStatus === 'fair' ? 'outline' : 'destructive'
                      }>
                        {collection.preservationStatus === 'excellent' ? 'Отличное' :
                         collection.preservationStatus === 'good' ? 'Хорошее' :
                         collection.preservationStatus === 'fair' ? 'Удовлетворительное' : 'Требует внимания'}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Прогресс оцифровки</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <ProgressBar 
                        value={progress} 
                        variant={progress > 80 ? "success" : progress > 50 ? "default" : "warning"} 
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {collection.tags.map((tag, tagIndex) => (
                        <Tag key={tagIndex} text={tag} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Temporal distribution chart */}
      <Card>
        <CardHeader>
          <CardTitle>Распределение по времени создания</CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            type="line"
            data={archiveData.temporalDistribution}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Количество экспонатов по годам создания'
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
    </div>
  );
};

export { ArtArchiveVisualizer };
