'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const analyzeCode = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');
    
    try {
      if (!code.trim()) {
        throw new Error('Please enter some code to analyze');
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details || data.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error: any) {
      console.error('Analysis error:', error);
      setError(error.message || 'Error analyzing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🛡️</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                VulnGPT
              </h1>
            </div>
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">
              Secure Your Code
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Analyze your code for security vulnerabilities using advanced AI
            </p>
          </div>

          {/* Code Input Section */}
          <div className="bg-black/30 backdrop-blur rounded-xl border border-white/10 p-6 space-y-4">
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center space-x-2 text-gray-500">
                <span className="text-sm font-mono">{'>'}</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 bg-black/50 text-gray-300 p-4 pl-8 font-mono text-sm rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                placeholder="Paste your code here..."
                spellCheck="false"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => setCode('')}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  title="Clear code"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <button
              onClick={analyzeCode}
              disabled={loading || !code.trim()}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 transform
                ${loading || !code.trim() 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Analyze Code'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="animate-fade-in bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-medium">Error</h3>
              </div>
              <p className="mt-2 text-red-300">{error}</p>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="animate-fade-in bg-black/30 backdrop-blur rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Security Analysis Results
              </h2>
              <div 
                className="prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: analysis
                    .replace(/\n/g, '<br>')
                    .replace(/### 🚨/g, '<h3 class="text-2xl font-bold mt-8 mb-4 flex items-center gap-2 text-red-400">🚨')
                    .replace(/\*\*Location\*\*/g, '<strong class="text-blue-400">Location</strong>')
                    .replace(/\*\*Severity\*\*: HIGH/g, '<strong class="text-red-400">Severity</strong>: <span class="text-red-400 font-bold">HIGH</span>')
                    .replace(/\*\*Severity\*\*: MEDIUM/g, '<strong class="text-orange-400">Severity</strong>: <span class="text-orange-400 font-bold">MEDIUM</span>')
                    .replace(/\*\*Severity\*\*: LOW/g, '<strong class="text-yellow-400">Severity</strong>: <span class="text-yellow-400 font-bold">LOW</span>')
                    .replace(/\*\*Description\*\*/g, '<strong class="text-purple-400">Description</strong>')
                    .replace(/\*\*Remediation\*\*/g, '<strong class="text-green-400">Remediation</strong>')
                    .replace(/```javascript/g, '<pre class="bg-black/50 p-4 rounded-lg overflow-auto border border-gray-700">')
                    .replace(/```/g, '</pre>')
                }} 
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Powered by OpenAI GPT • Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
