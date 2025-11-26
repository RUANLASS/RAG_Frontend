'use client'

import { metrics } from '@/lib/mock-data'

export default function MetricCards() {
  return (
    <div className="metrics-grid">
      {metrics.map((metric) => (
        <div key={metric.name} className="metric-card">
          <div className="metric-header">
            <span className="metric-name">{metric.name}</span>
            <span className="metric-icon">{metric.icon}</span>
          </div>
          <div className="metric-value">{metric.value}</div>
          <div className={`metric-change ${metric.change > 0 ? 'positive' : 'negative'}`}>
            <span className="change-icon">
              {metric.change > 0 ? '📈' : '📉'}
            </span>
            <span>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
            <span className="change-text">from last week</span>
          </div>
        </div>
      ))}
    </div>
  )
}