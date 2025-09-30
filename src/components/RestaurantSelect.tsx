import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { EventData } from "@/types";

interface RestaurantSelectProps {
  data: EventData[];
  selectedRestaurant: EventData | null;
  onRestaurantSelect: (restaurant: EventData | null) => void;
}

export function RestaurantSelect({
  data,
  selectedRestaurant,
  onRestaurantSelect
}: RestaurantSelectProps) {
  const handleValueChange = (value: string) => {
    if (value === "all") {
      onRestaurantSelect(null);
    } else {
      const restaurant = data.find((item) => item.Name === value);
      if (restaurant) {
        onRestaurantSelect(restaurant);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="text-sm font-medium whitespace-nowrap">
        Restaurant:
      </label>
      <Select
        value={selectedRestaurant?.Name || "all"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Select restaurant..." />
        </SelectTrigger>
        <SelectContent className="bg-white z-1000">
          <SelectItem value="all">All Restaurants</SelectItem>
          {data.map((restaurant) => (
            <SelectItem key={restaurant.Name} value={restaurant.Name}>
              {restaurant.Name} ({restaurant.Cuisine_category})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
