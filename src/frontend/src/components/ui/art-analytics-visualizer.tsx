import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataVisualization } from "@/components/ui/data-visualization";
import { cn } from "@/lib/utils";

interface ArtAnalyticsVisualizerProps {
  analyticsData: {
    viewsOverTime: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
      }[];
    };
    engagementMetrics: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
      }[];
    };
    topArtworks: Array<{
      title: string;
      views: number;
      likes: number;
      shares: number;
    }>;
    visitorDemographics: {
      ageGroups: Array<{ label: string; value: number }>;
      genderDistribution: Array<{ label: string; value: number }>;
    };
  };
  className?: string;
}

const ArtAnalyticsVisualizer: React.FC<ArtAnalyticsVisualizerProps> = ({
  analyticsData,
  className
}) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      {/* Views over time chart */}
      <Card>
        <CardHeader>
          <CardTitle>Просмотры по времени</CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            type="line"
            data={analyticsData.viewsOverTime}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Просмотры экспонатов за последний месяц'
                }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Engagement metrics chart */}
      <Card>
        <CardHeader>
          <CardTitle>Метрики вовлеченности</CardTitle>
        </CardHeader>
        <CardContent>
          <DataVisualization
            type="bar"
            data={analyticsData.engagementMetrics}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Лайки, просмотры и шеринг экспонатов'
                }
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Top artworks */}
      <Card>
        <CardHeader>
          <CardTitle>Топ экспонатов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topArtworks.map((artwork, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">{artwork.title}</h4>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span>👁️ {artwork.views} просмотров</span>
                    <span>❤️ {artwork.likes} лайков</span>
                    <span>↗️ {artwork.shares} шерингов</span>
                  </div>
                </div>
                <span className="text-lg font-semibold">#{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visitor demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Демография посетителей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">По возрасту</h4>
              <DataVisualization
                type="pie"
                data={{
                  labels: analyticsData.visitorDemographics.ageGroups.map(group => group.label),
                  datasets: [{
                    data: analyticsData.visitorDemographics.ageGroups.map(group => group.value),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(54, 162, 235, 0.8)',
                      'rgba(255, 206, 86, 0.8)',
                      'rgba(75, 192, 192, 0.8)',
                      'rgba(153, 102, 255, 0.8)',
                    ]
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    }
                  }
                }}
              />
            </div>
            <div>
              <h4 className="font-medium mb-3">По полу</h4>
              <DataVisualization
                type="pie"
                data={{
                  labels: analyticsData.visitorDemographics.genderDistribution.map(group => group.label),
                  datasets: [{
                    data: analyticsData.visitorDemographics.genderDistribution.map(group => group.value),
                    backgroundColor: [
                      'rgba(54, 162, 235, 0.8)',
                      'rgba(255, 99, 132, 0.8)',
                      'rgba(75, 192, 192, 0.8)',
                    ]
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    }
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ArtAnalyticsVisualizer };