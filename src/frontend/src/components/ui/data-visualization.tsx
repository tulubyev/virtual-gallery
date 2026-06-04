import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { cn } from "@/lib/utils";

// Регистрируем необходимые элементы для Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DataVisualizationProps {
  type: "line" | "bar" | "pie" | "doughnut";
  data: any;
  options?: any;
  className?: string;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  type,
  data,
  options = {},
  className
}) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: data.title || "График",
      },
    },
  };

  const combinedOptions = { ...defaultOptions, ...options };

  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data} options={combinedOptions} />;
      case "bar":
        return <Bar data={data} options={combinedOptions} />;
      case "pie":
      case "doughnut":
        return <Pie data={data} options={combinedOptions} />;
      default:
        return <Line data={data} options={combinedOptions} />;
    }
  };

  return (
    <div className={cn("w-full h-80", className)}>
      {renderChart()}
    </div>
  );
};

export { DataVisualization };