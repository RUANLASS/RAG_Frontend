'use client'

import { useState } from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import SettingsPanel from './SettingsPanel'
import { Message, ChatSettings } from '@/lib/types'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 0.7,
    topK: 5,
    model: 'gpt-4',
  })

  const handleSendMessage = async (content: string, files?: File[]) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate streaming response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on the retrieved documents and your query about "${content}", here's what I found:\n\nThe system analyzed ${settings.topK} relevant sources using ${settings.model} with temperature ${settings.temperature}. This is a mock response demonstrating the RAG capabilities.`,
        timestamp: new Date(),
        sources: [
          { title: 'Document 1', url: '#', snippet: 'Relevant excerpt from source...' },
          { title: 'Document 2', url: '#', snippet: 'Another relevant passage...' },
        ]
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="chat-container">
      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <h2 className="chat-title">RAG Assistant</h2>
          <button 
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </div>
        
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel settings={settings} onSettingsChange={setSettings} />
      )}
    </div>
  )
}