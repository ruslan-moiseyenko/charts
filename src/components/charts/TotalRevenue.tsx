import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/types";

interface TotalRevenueProps {
  data: EventData[];
}

export function TotalRevenue({ data }: TotalRevenueProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.Revenue, 0);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {data.length === 1 ? "Selected Revenue" : "Total Revenue"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold text-blue-600">
          £
          {totalRevenue.toLocaleString("en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {data.length === 1 ? data[0].Name : `${data.length} restaurants`}
        </div>
      </CardContent>
    </Card>
  );
}
