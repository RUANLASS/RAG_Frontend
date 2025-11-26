'use client'

interface Source {
  title: string
  url: string
  snippet: string
}

interface SourceCitationProps {
  sources: Source[]
}

export default function SourceCitation({ sources }: SourceCitationProps) {
  return (
    <div className="sources-container">
      <p className="sources-label">Sources:</p>
      <div>
        {sources.map((source, idx) => (
          <div key={idx} className="source-card">
            <a 
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              <div className="source-content">
                <p className="source-title">{source.title}</p>
                <p className="source-snippet">{source.snippet}</p>
              </div>
              <span className="source-icon">🔗</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}