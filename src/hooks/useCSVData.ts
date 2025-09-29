import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import type { EventData } from '@/types'

export const useCSVData = (csvPath: string) => {
  const [data, setData] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        setLoading(true)
        const response = await fetch(csvPath)
        const csvText = await response.text()
        
        Papa.parse(csvText, {
          header: true,
          delimiter: ';',
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = (results.data as Record<string, string>[]).map((row) => ({
              ...row,
              Revenue: parseFloat(row.Revenue) || 0,
              "Items sold": parseInt(row["Items sold"]) || 0,
              "Average Bill": parseFloat(row["Average Bill"]) || 0,
              Comission: parseFloat(row.Comission) || 0,
              Footfall: parseInt(row.Footfall) || 0,
              Latitude: parseFloat(row.Latitude) || 0,
              Longitude: parseFloat(row.Longitude) || 0,
            })) as EventData[]
            
            setData(parsedData)
            setLoading(false)
          },
          error: (err: Error) => {
            setError(err.message)
            setLoading(false)
          }
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load CSV')
        setLoading(false)
      }
    }

    fetchCSVData()
  }, [csvPath])

  return { data, loading, error }
}