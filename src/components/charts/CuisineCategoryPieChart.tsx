import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { EventData } from '@/types'

interface CuisineCategoryPieChartProps {
  data: EventData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function CuisineCategoryPieChart({ data }: CuisineCategoryPieChartProps) {
  // Group by cuisine category and sum revenue
  const categoryRevenue = data.reduce((acc, item) => {
    const category = item.Cuisine_category
    acc[category] = (acc[category] || 0) + item.Revenue
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(categoryRevenue).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100 // Round to 2 decimal places
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Cuisine Category</CardTitle>
        <CardDescription>Revenue distribution across different cuisine categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`£${value.toFixed(2)}`, 'Revenue']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}