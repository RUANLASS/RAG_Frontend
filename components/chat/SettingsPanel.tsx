'use client'

import { ChatSettings } from '@/lib/types'

interface SettingsPanelProps {
  settings: ChatSettings
  onSettingsChange: (settings: ChatSettings) => void
}

export default function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  return (
    <div className="settings-panel">
      <h3 className="settings-title">Chat Settings</h3>
      
      {/* Model Selection */}
      <div className="setting-group">
        <label className="setting-label">Model</label>
        <select
          className="select-input"
          value={settings.model}
          onChange={(e) => onSettingsChange({ ...settings, model: e.target.value })}
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3">Claude 3</option>
          <option value="llama-2">Llama 2</option>
        </select>
      </div>
      
      {/* Temperature */}
      <div className="setting-group">
        <div className="setting-label">
          <span>Temperature</span>
          <span className="setting-value">{settings.temperature}</span>
        </div>
        <input
          type="range"
          className="slider-input"
          value={settings.temperature}
          onChange={(e) => onSettingsChange({ ...settings, temperature: parseFloat(e.target.value) })}
          min="0"
          max="1"
          step="0.1"
        />
        <p className="setting-help">
          Higher values make output more random
        </p>
      </div>
      
      {/* Top K */}
      <div className="setting-group">
        <div className="setting-label">
          <span>Top-K Documents</span>
          <span className="setting-value">{settings.topK}</span>
        </div>
        <input
          type="range"
          className="slider-input"
          value={settings.topK}
          onChange={(e) => onSettingsChange({ ...settings, topK: parseInt(e.target.value) })}
          min="1"
          max="10"
          step="1"
        />
        <p className="setting-help">
          Number of documents to retrieve
        </p>
      </div>
    </div>
  )
}