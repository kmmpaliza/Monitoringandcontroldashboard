import { useState, useEffect } from 'react';
import { User, Circle, Cpu } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
}

export function Header({ isConnected }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <header className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 text-white border-b-4 border-purple-500 shadow-lg shadow-purple-500/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: App Name */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg shadow-lg shadow-purple-500/50">
              <Cpu className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Chute Monitor
              </h1>
              <p className="text-xs text-cyan-300/70">Intelligent Control System</p>
            </div>
          </div>

          {/* Right: Date/Time, Status, User */}
          <div className="flex items-center gap-8">
            {/* Date and Time */}
            <div className="text-right">
              <div className="text-sm text-purple-300/70">{formatDate(currentTime)}</div>
              <div className="text-lg font-mono font-semibold text-cyan-300">{formatTime(currentTime)}</div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <Circle 
                className={`size-3 ${isConnected ? 'fill-cyan-400 text-cyan-400 animate-pulse' : 'fill-red-500 text-red-500'}`} 
              />
              <span className="text-sm font-medium text-cyan-300">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* User Profile */}
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur rounded-lg border border-purple-500/30 hover:border-cyan-500/50 transition-all shadow-lg">
              <User className="size-5 text-cyan-300" />
              <span className="text-sm font-medium text-white">Operator</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}