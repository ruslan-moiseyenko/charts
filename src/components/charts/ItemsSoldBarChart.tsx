import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventData } from '@/types'

interface ItemsSoldBarChartProps {
  data: EventData[]
}

export function ItemsSoldBarChart({ data }: ItemsSoldBarChartProps) {
  const chartData = data.map(item => ({
    name: item.Name,
    itemsSold: item["Items sold"]
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items Sold by Restaurant</CardTitle>
        <CardDescription>Number of items sold per restaurant</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="itemsSold" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}