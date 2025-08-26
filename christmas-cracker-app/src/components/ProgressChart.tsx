'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar
} from 'recharts'
import { format, subDays, eachDayOfInterval } from 'date-fns'

interface ProgressData {
  date: string
  completionRate: number
  stepsCompleted: boolean
  waterGoalMet: boolean
  proteinGoalMet: boolean
  sleepGoalMet: boolean
  readingCompleted: boolean
  supplementsTaken: boolean
  exerciseCompleted: boolean
  adultingTaskDone: boolean
}

interface ProgressChartProps {
  data: ProgressData[]
  chartType?: 'line' | 'area' | 'bar'
  height?: number
}

export default function ProgressChart({ 
  data, 
  chartType = 'line',
  height = 300 
}: ProgressChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (data.length === 0) {
      // Generate sample data for the last 30 days if no data exists
      const endDate = new Date()
      const startDate = subDays(endDate, 29)
      const dateRange = eachDayOfInterval({ start: startDate, end: endDate })
      
      const sampleData = dateRange.map(date => ({
        date: format(date, 'MMM dd'),
        completionRate: Math.floor(Math.random() * 100),
        fullDate: date
      }))
      
      setChartData(sampleData)
    } else {
      // Process real data
      const processedData = data.map(item => ({
        date: format(new Date(item.date), 'MMM dd'),
        completionRate: calculateCompletionRate(item),
        fullDate: new Date(item.date)
      })).sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())
      
      setChartData(processedData)
    }
  }, [data])

  const calculateCompletionRate = (item: ProgressData): number => {
    const activities = [
      item.stepsCompleted,
      item.waterGoalMet,
      item.proteinGoalMet,
      item.sleepGoalMet,
      item.readingCompleted,
      item.supplementsTaken,
      item.exerciseCompleted,
      item.adultingTaskDone
    ]
    
    const completed = activities.filter(Boolean).length
    return Math.round((completed / activities.length) * 100)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-red-200">
          <p className="text-gray-600 font-medium">{label}</p>
          <p className="text-red-700 font-bold text-lg">
            {payload[0].value}% Complete
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center h-[300px] flex items-center justify-center">
        <div>
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500 text-lg">Start tracking to see your progress chart!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 elegant-shadow">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-red-800 mb-2">Progress Over Time</h3>
        <p className="text-gray-600 text-sm">
          Your daily completion rate for the last 30 days
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#dc2626"
              strokeWidth={3}
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
            />
          </LineChart>
        ) : chartType === 'area' ? (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completionRate"
              stroke="#dc2626"
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completionRate" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#b91c1c"/>
              </linearGradient>
            </defs>
          </BarChart>
        )}
      </ResponsiveContainer>
      
      {/* Chart Type Selector */}
      <div className="flex justify-center mt-6 space-x-4">
        {['line', 'area', 'bar'].map((type) => (
          <button
            key={type}
            onClick={() => (chartType as any) = type}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chartType === type
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
