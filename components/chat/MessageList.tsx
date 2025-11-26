'use client'

import { Message } from '@/lib/types'
import SourceCitation from './SourceCitation'
import { useEffect, useRef } from 'react'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="empty-state">
          <p>Start a conversation by typing a message below</p>
        </div>
      )}
      
      {messages.map((message) => (
        <div key={message.id} className="message">
          <div className={`avatar ${message.role === 'user' ? 'avatar-user' : 'avatar-assistant'}`}>
            {message.role === 'user' ? '👤' : '🤖'}
          </div>
          
          <div className="message-content">
            <div className="message-header">
              <span className="message-sender">
                {message.role === 'user' ? 'You' : 'Assistant'}
              </span>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="message-text">
              {message.content}
            </div>
            
            {message.sources && message.sources.length > 0 && (
              <SourceCitation sources={message.sources} />
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="message">
          <div className="avatar avatar-assistant">🤖</div>
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Thinking...</span>
          </div>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  )
}