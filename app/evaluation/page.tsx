import MetricCards from '@/components/evaluation/MetricCards'
import PerformanceCharts from '@/components/evaluation/PerformanceCharts'
import ComparisonTable from '@/components/evaluation/ComparisonTable'

export default function EvaluationPage() {
  return (
    <main className="eval-container">
      <div className="eval-header">
        <h1 className="eval-title">Model Evaluation</h1>
        <p className="eval-subtitle">
          Performance metrics and comparisons for RAG models
        </p>
      </div>
      
      {/* Metric Cards */}
      <MetricCards />
      
      {/* Performance Charts */}
      <PerformanceCharts />
      
      {/* Comparison Table */}
      <ComparisonTable />
    </main>
  )
}