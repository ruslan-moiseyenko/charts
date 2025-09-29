import { useCSVData } from '@/hooks/useCSVData'
import { DataCards } from '@/components/DataCards'
import { ItemsSoldBarChart } from '@/components/charts/ItemsSoldBarChart'
import { CuisineCategoryPieChart } from '@/components/charts/CuisineCategoryPieChart'
import { EventLocationsMap } from '@/components/charts/EventLocationsMap'
import { TotalRevenue } from '@/components/charts/TotalRevenue'

export function Dashboard() {
  const { data, loading, error } = useCSVData('/data.csv')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No data available</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Spring Fiesta Event Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Analytics and insights for restaurant performance
        </p>
      </header>

      {/* Charts Section */}
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Total Revenue - takes full width on mobile, half on larger screens */}
            <div className="md:col-span-1">
              <TotalRevenue data={data} />
            </div>
            
            {/* Bar Chart */}
            <div className="md:col-span-1">
              <ItemsSoldBarChart data={data} />
            </div>
            
            {/* Pie Chart */}
            <div className="md:col-span-1">
              <CuisineCategoryPieChart data={data} />
            </div>
            
            {/* Map */}
            <div className="md:col-span-1">
              <EventLocationsMap data={data} />
            </div>
          </div>
        </section>

        {/* Data Cards Section */}
        <section>
          <DataCards data={data} />
        </section>
      </div>
    </div>
  )
}