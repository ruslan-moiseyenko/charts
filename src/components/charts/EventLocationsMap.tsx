import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventData } from '@/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in react-leaflet
// @ts-expect-error - leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface EventLocationsMapProps {
  data: EventData[]
}

export function EventLocationsMap({ data }: EventLocationsMapProps) {
  // Get unique locations (since all data points have same coordinates, group them)
  const location = data.length > 0 ? { lat: data[0].Latitude, lng: data[0].Longitude } : { lat: 51.5010, lng: -0.1410 }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Locations</CardTitle>
        <CardDescription>Location of restaurants on the map</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px', width: '100%' }}>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <div>
                  <h3 className="font-semibold">Spring Fiesta Event</h3>
                  <div className="text-sm">
                    <p><strong>Restaurants:</strong> {data.length}</p>
                    <ul className="mt-2">
                      {data.map((item, index) => (
                        <li key={index}>{item.Name} - £{item.Revenue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}