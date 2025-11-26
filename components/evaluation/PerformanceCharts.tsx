'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { performanceData, latencyData } from '@/lib/mock-data'

export default function PerformanceCharts() {
  return (
    <div className="charts-grid">
      {/* Performance Metrics Bar Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Performance Metrics</h3>
          <p className="chart-description">Comparison across different metrics</p>
        </div>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yourModel" fill="#3b82f6" name="Your Model" />
              <Bar dataKey="baseline" fill="#d1d5db" name="Baseline" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Latency Over Time Line Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Latency Trends</h3>
          <p className="chart-description">Response time over the last 7 days</p>
        </div>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="latency" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Avg Latency (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}