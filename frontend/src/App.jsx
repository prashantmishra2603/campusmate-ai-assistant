import React from 'react';
import Dashboard from './components/Dashboard';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen text-gray-900 font-sans selection:bg-primary/20 selection:text-primary">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-accent/10 blur-[90px]" />
      </div>

      <header className="glass-panel sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                CampusMate AI
              </h1>
              <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">Smart Task Assistant</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-sm font-medium text-gray-600 bg-white/50 px-4 py-2 rounded-full border border-white/60">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
