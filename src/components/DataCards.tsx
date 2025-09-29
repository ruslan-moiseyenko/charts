import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventData } from '@/types'

interface DataCardsProps {
  data: EventData[]
}

export function DataCards({ data }: DataCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Restaurant Details</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{item.Name}</CardTitle>
              <CardDescription>{item.Cuisine_category} • {item.Cuisine_type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-semibold">£{item.Revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Items Sold:</span>
                  <span className="font-semibold">{item["Items sold"]}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Bill:</span>
                  <span className="font-semibold">£{item["Average Bill"].toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Commission:</span>
                  <span className="font-semibold">£{item.Comission.toFixed(2)}</span>
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
        ))}
      </div>
    </div>
  )
}