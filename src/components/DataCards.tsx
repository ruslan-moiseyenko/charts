import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventData } from "@/types";

interface DataCardsProps {
  data: EventData[];
  selectedRestaurant?: EventData | null;
  onRestaurantSelect?: (restaurant: EventData | null) => void;
  showClearButton?: boolean;
}

export function DataCards({
  data,
  selectedRestaurant,
  onRestaurantSelect,
  showClearButton = false
}: DataCardsProps) {
  return (
    <div className="space-y-4">
      {showClearButton && selectedRestaurant && onRestaurantSelect && (
        <Button onClick={() => onRestaurantSelect(null)} variant="outline">
          Clear Selection
        </Button>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => {
          const isSelected = selectedRestaurant?.Name === item.Name;
          return (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => onRestaurantSelect?.(item)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{item.Name}</CardTitle>
                <CardDescription>
                  {item.Cuisine_category} • {item.Cuisine_type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-semibold">
                      £{item.Revenue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Sold:</span>
                    <span className="font-semibold">{item["Items sold"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Bill:</span>
                    <span className="font-semibold">
                      £{item["Average Bill"].toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission:</span>
                    <span className="font-semibold">
                      £{item.Comission.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Footfall:</span>
                    <span className="font-semibold">{item.Footfall}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{item.Duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
