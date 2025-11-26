export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: Source[]
}

export interface Source {
  title: string
  url: string
  snippet: string
}

export interface ChatSettings {
  temperature: number
  topK: number
  model: string
}

export interface Metric {
  name: string
  value: string
  change: number
  icon: string
}

export interface PerformanceData {
  metric: string
  yourModel: number
  baseline: number
}

export interface ComparisonModel {
  name: string
  accuracy: number
  f1: number
  recall: number
  latency: number
  cost: number
  isYours?: boolean
}