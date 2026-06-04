import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  Star,
  Calendar,
  MapPin,
  Ruler,
  HardHat,
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

interface ArtArchitectureVisualizerProps {
  architectureData: {
    galleries: Array<{
      name: string;
      location: string;
      area: number; // in square meters
      capacity: number;
      constructionYear: number;
      architect: string;
      description: string;
      visitorCount: number;
      rating: number;
      tags: string[];
    }>;
    constructionMetrics: {
      totalGalleries: number;
      totalArea: number; // in square meters
      averageCapacity: number;
      oldestGallery: number;
      newestGallery: number;
    };
    architecturalStyles: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    visitorDistribution: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    sustainabilityMetrics: {
      energyEfficiency: number; // 0-100
      ecoFriendlyMaterials: number; // 0-100
      naturalLighting: number; // 0-100
      greenSpaces: number; // 0-100
    };
    spaceUtilization: Array<{
      galleryId: string;
      galleryName: string;
      utilizationRate: number; // 0-100
      exhibitionCount: number;
      visitorDensity: number; // visitors per sqm
    }>;
  };
  className?: string;
}

const ArtArchitectureVisualizer: React.FC<ArtArchitectureVisualizerProps> = ({
  architectureData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Architecture metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего галерей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{architectureData.constructionMetrics.totalGalleries}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <HardHat className="h-4 w-4 mr-1" />
              <span>Архитектурных объектов</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Общая площадь</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(architectureData.constructionMetrics.totalArea / 1000).toFixed(1)}k м²</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Ruler className="h-4 w-4 mr-1" />
              <span>Выставочного пространства</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Средняя вместимость</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{architectureData.constructionMetrics.averageCapacity}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>Посетителей одновременно</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Возраст</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date().getFullYear() - architectureData.constructionMetrics.oldestGallery}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Самой старой галереи</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architectural styles chart */}
        <Card>
          <CardHeader>
            <CardTitle>Архитектурные стили</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="doughnut"
              data={architectureData.architecturalStyles}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                  title: {
                    display: true,
                    text: 'Распределение галерей по архитектурным стилям'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
        
        {/* Visitor distribution chart */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение посещений</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={architectureData.visitorDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Посещения по галереям за последние 12 месяцев'
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top galleries */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Архитектурные особенности галерей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {architectureData.galleries.map((gallery, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{gallery.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {gallery.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{gallery.rating.toFixed(1)}</span>
                      </div>
                      <Badge variant="outline">{gallery.area} м²</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Вместимость</p>
                      <p className="font-medium">{gallery.capacity} человек</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Год постройки</p>
                      <p className="font-medium">{gallery.constructionYear}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Посетителей</p>
                      <p className="font-medium">{gallery.visitorCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Архитектор</p>
                      <p className="font-medium truncate">{gallery.architect}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {gallery.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Sustainability metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Экологичность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Энергоэффективность</span>
                  <span>{architectureData.sustainabilityMetrics.energyEfficiency}%</span>
                </div>
                <ProgressBar
                  value={architectureData.sustainabilityMetrics.energyEfficiency}
                  variant={architectureData.sustainabilityMetrics.energyEfficiency > 80 ? "success" : architectureData.sustainabilityMetrics.energyEfficiency > 50 ? "default" : "warning"}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Эко-материалы</span>
                  <span>{architectureData.sustainabilityMetrics.ecoFriendlyMaterials}%</span>
                </div>
                <ProgressBar
                  value={architectureData.sustainabilityMetrics.ecoFriendlyMaterials}
                  variant={architectureData.sustainabilityMetrics.ecoFriendlyMaterials > 80 ? "success" : architectureData.sustainabilityMetrics.ecoFriendlyMaterials > 50 ? "default" : "warning"}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Естественное освещение</span>
                  <span>{architectureData.sustainabilityMetrics.naturalLighting}%</span>
                </div>
                <ProgressBar
                  value={architectureData.sustainabilityMetrics.naturalLighting}
                  variant={architectureData.sustainabilityMetrics.naturalLighting > 80 ? "success" : architectureData.sustainabilityMetrics.naturalLighting > 50 ? "default" : "warning"}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Зеленые зоны</span>
                  <span>{architectureData.sustainabilityMetrics.greenSpaces}%</span>
                </div>
                <ProgressBar
                  value={architectureData.sustainabilityMetrics.greenSpaces}
                  variant={architectureData.sustainabilityMetrics.greenSpaces > 80 ? "success" : architectureData.sustainabilityMetrics.greenSpaces > 50 ? "default" : "warning"}
                />
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-2">Использование пространства</h4>
                <div className="space-y-3">
                  {architectureData.spaceUtilization.map((util, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm">
                        <span className="truncate">{util.galleryName}</span>
                        <span>{util.utilizationRate}%</span>
                      </div>
                      <ProgressBar
                        value={util.utilizationRate}
                        variant={util.utilizationRate > 80 ? "success" : util.utilizationRate > 50 ? "default" : "warning"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ArtArchitectureVisualizer };