'use client'

import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSendMessage: (content: string, files?: File[]) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input, files)
      setInput('')
      setFiles([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, idx) => (
            <div key={idx} className="file-tag">
              {file.name}
            </div>
          ))}
        </div>
      )}
      
      <div className="input-row">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="chat-textarea"
            disabled={disabled}
          />
          <label className="file-input-label">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input"
              disabled={disabled}
            />
            📎
          </label>
        </div>
        
        <button 
          type="submit" 
          className="send-button"
          disabled={disabled || !input.trim()}
        >
          ➤
        </button>
      </div>
    </form>
  )
}
