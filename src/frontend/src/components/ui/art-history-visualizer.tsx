import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award,
} from "lucide-react";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtHistoryVisualizerProps {
  historyData: {
    periods: Array<{
      name: string;
      startDate: number;
      endDate: number;
      keyArtists: string[];
      notableWorks: string[];
      characteristics: string[];
      influence: number; // 0-100
    }>;
    timeline: Array<{
      year: number;
      event: string;
      significance: number; // 0-100
    }>;
    regionalDevelopment: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    artisticMovements: Array<{
      name: string;
      period: string;
      keyCharacteristics: string[];
      majorArtists: string[];
      influenceScore: number; // 0-100
    }>;
    evolutionMetrics: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
  };
  className?: string;
}

const ArtHistoryVisualizer: React.FC<ArtHistoryVisualizerProps> = ({
  historyData,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Periods overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {historyData.periods.map((period, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{period.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{period.startDate} - {period.endDate}</div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Award className="h-4 w-4 mr-1" />
                <span>{period.influence}% влияния</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Историческая хронология</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {historyData.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                      {event.year}
                    </div>
                    <div className="h-full w-0.5 bg-muted mt-2"></div>
                  </div>
                  <div className="pb-4 flex-1">
                    <h4 className="font-medium">{event.event}</h4>
                    <p className="text-sm text-muted-foreground">Значимость: {event.significance}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Regional development chart */}
        <Card>
          <CardHeader>
            <CardTitle>Региональное развитие</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="bar"
              data={historyData.regionalDevelopment}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Развитие искусства в разных регионах'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Artistic movements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Художественные движения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyData.artisticMovements.map((movement, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{movement.name}</h3>
                      <p className="text-sm text-muted-foreground">{movement.period}</p>
                    </div>
                    <Badge variant="outline">{movement.influenceScore}% влияния</Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Характеристики:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {movement.keyCharacteristics.map((char, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium">Ключевые художники:</h4>
                      <p className="text-sm">{movement.majorArtists.join(', ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Evolution chart */}
        <Card>
          <CardHeader>
            <CardTitle>Эволюция стилей</CardTitle>
          </CardHeader>
          <CardContent>
            <DataVisualization
              type="line"
              data={historyData.evolutionMetrics}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Изменение художественных стилей во времени'
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
    </div>
  );
};

export { ArtHistoryVisualizer };