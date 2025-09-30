import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { EventData } from "@/types";

interface ItemsSoldBarChartProps {
  data: EventData[];
  selectedRestaurant?: EventData | null;
  onRestaurantSelect?: (restaurant: EventData | null) => void;
}

export function ItemsSoldBarChart({
  data,
  selectedRestaurant,
  onRestaurantSelect
}: ItemsSoldBarChartProps) {
  const chartData = data.map((item) => ({
    name: item.Name,
    itemsSold: item["Items sold"],
    isSelected: selectedRestaurant?.Name === item.Name
  }));

  const handleBarClick = (data: any) => {
    if (onRestaurantSelect && data?.activeLabel) {
      const restaurantName = data.activeLabel;
      const restaurant = data.find(
        (item: EventData) => item.Name === restaurantName
      );
      if (restaurant) {
        onRestaurantSelect(
          selectedRestaurant?.Name === restaurant.Name ? null : restaurant
        );
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Items Sold</CardTitle>
        <CardDescription className="text-sm">
          {selectedRestaurant ? "Selected Restaurant" : "All Restaurants"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} onClick={handleBarClick}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar
              dataKey="itemsSold"
              fill="#3b82f6"
              style={{ cursor: "pointer" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
