import { useState } from "react";
import { useCSVData } from "@/hooks/useCSVData";
import { RestaurantSelect } from "@/components/RestaurantSelect";
import { ItemsSoldBarChart } from "@/components/charts/ItemsSoldBarChart";
import { CuisineCategoryPieChart } from "@/components/charts/CuisineCategoryPieChart";
import { EventLocationsMap } from "@/components/charts/EventLocationsMap";
import { TotalRevenue } from "@/components/charts/TotalRevenue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { EventData } from "@/types";

export function Dashboard() {
  const { data, loading, error } = useCSVData(
    `${import.meta.env.BASE_URL}data.csv`
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<EventData | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header with Restaurant Select */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Spring Fiesta Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Restaurant Analytics Overview
            </p>
          </div>
          <RestaurantSelect
            data={data}
            selectedRestaurant={selectedRestaurant}
            onRestaurantSelect={setSelectedRestaurant}
          />
        </div>
      </div>

      {/* Single Screen Grid Layout */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)]">
        {/* Left Column - KPIs */}
        <div className="col-span-3 space-y-4">
          {/* Total Revenue */}
          <div className="h-32">
            <TotalRevenue
              data={selectedRestaurant ? [selectedRestaurant] : data}
            />
          </div>

          {/* Selected Restaurant Details */}
          {selectedRestaurant && (
            <Card className="h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {selectedRestaurant.Name}
                </CardTitle>
                <CardDescription>
                  {selectedRestaurant.Cuisine_category} •{" "}
                  {selectedRestaurant.Cuisine_type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-semibold">
                    £{selectedRestaurant.Revenue.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Items Sold:</span>
                  <span className="font-semibold">
                    {selectedRestaurant["Items sold"]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Bill:</span>
                  <span className="font-semibold">
                    £{selectedRestaurant["Average Bill"].toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">
                    {selectedRestaurant.Duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Footfall:</span>
                  <span className="font-semibold">
                    {selectedRestaurant.Footfall}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle Column - Charts */}
        <div className="col-span-6 space-y-8">
          {/* Bar Chart */}
          <div className="h-80">
            <ItemsSoldBarChart
              data={data}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={setSelectedRestaurant}
            />
          </div>

          {/* Pie Chart */}
          <div className="h-90">
            <CuisineCategoryPieChart
              data={data}
              selectedRestaurant={selectedRestaurant}
            />
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="col-span-3">
          <div className="h-auto">
            <EventLocationsMap
              data={data}
              selectedRestaurant={selectedRestaurant}
              onRestaurantSelect={setSelectedRestaurant}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
