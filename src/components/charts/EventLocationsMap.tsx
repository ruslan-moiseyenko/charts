import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { EventData } from "@/types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
// @ts-expect-error - leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

interface EventLocationsMapProps {
  data: EventData[];
  selectedRestaurant?: EventData | null;
  onRestaurantSelect?: (restaurant: EventData | null) => void;
}

export function EventLocationsMap({
  data,
  selectedRestaurant
}: EventLocationsMapProps) {
  // Get unique locations (since all data points have same coordinates, group them)
  const location =
    data.length > 0
      ? { lat: data[0].Latitude, lng: data[0].Longitude }
      : { lat: 51.501, lng: -0.141 };

  // Show selected restaurant or all restaurants
  const displayData = selectedRestaurant ? [selectedRestaurant] : data;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {selectedRestaurant ? `Location` : "Event Location"}
        </CardTitle>
        <CardDescription className="text-sm">
          {selectedRestaurant
            ? selectedRestaurant.Name
            : "London, Spring Fiesta"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div style={{ height: "250px", width: "100%" }}>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div>
                  <h3 className="font-semibold">
                    {selectedRestaurant
                      ? selectedRestaurant.Name
                      : "Spring Fiesta Event"}
                  </h3>
                  <div className="text-sm">
                    {selectedRestaurant ? (
                      <div>
                        <p>
                          <strong>Cuisine:</strong>{" "}
                          {selectedRestaurant.Cuisine_category}
                        </p>
                        <p>
                          <strong>Revenue:</strong> £
                          {selectedRestaurant.Revenue}
                        </p>
                        <p>
                          <strong>Items Sold:</strong>{" "}
                          {selectedRestaurant["Items sold"]}
                        </p>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {selectedRestaurant.Duration}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p>
                          <strong>Restaurants:</strong> {displayData.length}
                        </p>
                        <ul className="mt-2">
                          {displayData.map((item, index) => (
                            <li key={index}>
                              {item.Name} - £{item.Revenue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
