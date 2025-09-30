import * as React from "react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector
} from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { EventData } from "@/types";

interface CuisineCategoryPieChartProps {
  data: EventData[];
  selectedRestaurant?: EventData | null;
  onRestaurantSelect?: (restaurant: EventData | null) => void;
}

export function CuisineCategoryPieChart({
  data,
  selectedRestaurant
}: CuisineCategoryPieChartProps) {
  // Group by cuisine category and sum revenue
  const categoryRevenue = data.reduce((acc, item) => {
    const category = item.Cuisine_category;
    acc[category] = (acc[category] || 0) + item.Revenue;
    return acc;
  }, {} as Record<string, number>);

  // Deterministic category order for stable colors
  const categories = React.useMemo(
    () => Object.keys(categoryRevenue).sort((a, b) => a.localeCompare(b)),
    [categoryRevenue]
  );

  // Build chart data in stable order
  const chartData = categories.map((category) => ({
    category,
    revenue: categoryRevenue[category] ?? 0
  }));

  // Fixed color palette (extend if needed)
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#A855F7",
    "#10B981",
    "#F97316"
  ];

  // Active index based on selected restaurant's category; undefined when none selected
  const activeIndex = React.useMemo(() => {
    if (!selectedRestaurant) return undefined;
    return chartData.findIndex(
      (item) => item.category === selectedRestaurant.Cuisine_category
    );
  }, [selectedRestaurant, chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-start space-y-1 pb-2">
        <CardTitle className="text-lg">Revenue Distribution</CardTitle>
        <CardDescription className="text-sm">
          By Cuisine Category
        </CardDescription>
        {/* Legend with colors */}
        <div className="mt-2 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <div key={category} className="flex items-center gap-2 text-xs">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div style={{ width: "100%", height: "250px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={30}
                fill="#8884d8"
                // Only set activeIndex/activeShape when a restaurant is selected
                {...(typeof activeIndex === "number" && activeIndex >= 0
                  ? {
                      activeIndex,
                      activeShape: (shapeProps: PieSectorDataItem) => {
                        const {
                          cx = 0,
                          cy = 0,
                          startAngle = 0,
                          endAngle = 0,
                          innerRadius = 0,
                          outerRadius = 0,
                          fill
                        } = shapeProps;
                        return (
                          <g>
                            <Sector
                              cx={cx}
                              cy={cy}
                              innerRadius={innerRadius}
                              outerRadius={outerRadius + 10}
                              startAngle={startAngle}
                              endAngle={endAngle}
                              fill={fill}
                            />
                            <Sector
                              cx={cx}
                              cy={cy}
                              innerRadius={outerRadius + 12}
                              outerRadius={outerRadius + 25}
                              startAngle={startAngle}
                              endAngle={endAngle}
                              fill={fill}
                            />
                          </g>
                        );
                      }
                    }
                  : {})}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [
                  `£${value.toFixed(2)}`,
                  "Revenue"
                ]}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="50%"
                  y="45%"
                  className="text-lg font-bold fill-current"
                >
                  {(() => {
                    if (typeof activeIndex === "number" && activeIndex >= 0) {
                      return `£${chartData[
                        activeIndex
                      ].revenue.toLocaleString()}`;
                    }
                    const total = chartData.reduce((s, i) => s + i.revenue, 0);
                    return `£${total.toLocaleString()}`;
                  })()}
                </tspan>
                <tspan x="50%" y="60%" className="text-sm fill-gray-600">
                  {typeof activeIndex === "number" && activeIndex >= 0
                    ? chartData[activeIndex].category
                    : "All Categories"}
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
