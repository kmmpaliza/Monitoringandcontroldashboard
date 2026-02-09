import { useState } from 'react';
import { Lock, User, AlertCircle, Shield, Cpu } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error: string | null;
}

export function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full mb-4 shadow-lg shadow-purple-500/50 relative">
            <Cpu className="size-10 text-white animate-pulse" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 opacity-50 blur-xl"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            AI Chute Monitor
          </h1>
          <p className="text-cyan-300/80">
            Intelligent Operator Access Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-purple-500/20">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 px-6 py-4 border-b border-purple-500/30">
            <h2 className="text-xl font-bold text-white">Secure Authentication</h2>
            <p className="text-cyan-300/70 text-sm mt-1">AI-powered access control</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/50 p-4 rounded-lg backdrop-blur">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-red-400" />
                  <p className="text-sm text-red-300 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-bold text-cyan-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-purple-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-slate-500"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-bold text-cyan-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-purple-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-slate-500"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="size-4 text-purple-600 border-purple-500/30 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-slate-300">Remember me on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-purple-500/50 hover:shadow-cyan-500/50 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Lock className="size-5 relative z-10" />
              <span className="relative z-10">Authenticate</span>
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-950/50 px-8 py-4 border-t border-purple-500/20">
            <p className="text-xs text-cyan-300/60 text-center">
              For access issues, contact your system administrator
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4">
          <p className="text-cyan-300 text-sm text-center mb-2">
            <strong className="text-white">Demo Credentials:</strong>
          </p>
          <p className="text-slate-300 text-xs text-center">
            Username: <span className="text-purple-400 font-mono">operator</span> | 
            Password: <span className="text-purple-400 font-mono">demo123</span>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-cyan-400/60 text-xs">
            🔒 Secured by AI-powered encryption
          </p>
        </div>
      </div>
    </div>
  );
}