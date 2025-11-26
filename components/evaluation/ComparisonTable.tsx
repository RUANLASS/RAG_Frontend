'use client'

import { comparisonData } from '@/lib/mock-data'

export default function ComparisonTable() {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">Model Comparison</h3>
        <p className="table-description">Performance comparison across different models</p>
      </div>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Accuracy</th>
            <th>F1 Score</th>
            <th>Recall@5</th>
            <th>Latency (ms)</th>
            <th>Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((model) => (
            <tr key={model.name} className={model.isYours ? 'highlight' : ''}>
              <td>
                <div className="model-name">
                  {model.isYours && <span className="crown-icon">👑</span>}
                  {model.name}
                  {model.isYours && <span className="badge">Your Model</span>}
                </div>
              </td>
              <td>{model.accuracy}%</td>
              <td>{model.f1}</td>
              <td>{model.recall}</td>
              <td>{model.latency}</td>
              <td>{model.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
