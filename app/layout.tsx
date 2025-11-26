import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RAG Chatbot - Hackathon Template',
  description: 'AI-powered RAG chatbot with evaluation dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              <span className="nav-icon">💬</span>
              <span className="nav-title">RAG Chatbot</span>
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Chat</Link>
              <Link href="/evaluation" className="nav-link">📊 Evaluation</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}