// Metric cards data
export const metrics = [
  {
    name: 'Accuracy',
    value: '94.2%',
    change: 2.5,
    icon: '🎯',
  },
  {
    name: 'F1 Score',
    value: '0.91',
    change: 1.8,
    icon: '📊',
  },
  {
    name: 'Avg Latency',
    value: '245ms',
    change: -5.3,
    icon: '⏱️',
  },
  {
    name: 'Recall@5',
    value: '0.88',
    change: 3.2,
    icon: '⚡',
  },
]

// Performance chart data
export const performanceData = [
  { metric: 'Accuracy', yourModel: 94.2, baseline: 89.5 },
  { metric: 'Precision', yourModel: 92.8, baseline: 87.3 },
  { metric: 'Recall', yourModel: 90.5, baseline: 85.1 },
  { metric: 'F1 Score', yourModel: 91.6, baseline: 86.2 },
]

// Latency trend data
export const latencyData = [
  { day: 'Mon', latency: 235 },
  { day: 'Tue', latency: 248 },
  { day: 'Wed', latency: 242 },
  { day: 'Thu', latency: 255 },
  { day: 'Fri', latency: 239 },
  { day: 'Sat', latency: 245 },
  { day: 'Sun', latency: 238 },
]

// Model comparison data
export const comparisonData = [
  {
    name: 'Your RAG Model',
    accuracy: 94.2,
    f1: 0.91,
    recall: 0.88,
    latency: 245,
    cost: 0.023,
    isYours: true,
  },
  {
    name: 'GPT-4 Baseline',
    accuracy: 91.8,
    f1: 0.89,
    recall: 0.86,
    latency: 1200,
    cost: 0.15,
  },
  {
    name: 'Claude 3 Baseline',
    accuracy: 90.5,
    f1: 0.87,
    recall: 0.84,
    latency: 980,
    cost: 0.12,
  },
  {
    name: 'Llama 2 Fine-tuned',
    accuracy: 87.3,
    f1: 0.83,
    recall: 0.79,
    latency: 340,
    cost: 0.008,
  },
  {
    name: 'Basic RAG',
    accuracy: 82.1,
    f1: 0.78,
    recall: 0.75,
    latency: 450,
    cost: 0.015,
  },
]