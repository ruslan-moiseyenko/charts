import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventData } from '@/types'

interface TotalRevenueProps {
  data: EventData[]
}

export function TotalRevenue({ data }: TotalRevenueProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.Revenue, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              £{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Total revenue from all restaurants
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}