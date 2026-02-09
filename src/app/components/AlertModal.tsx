import { X, AlertTriangle, Zap } from 'lucide-react';
import { Chute } from '../types';

interface AlertModalProps {
  chute: Chute;
  onMarkCleared: () => void;
  onReset: () => void;
  onViewDetails: () => void;
  onClose: () => void;
}

export function AlertModal({ chute, onMarkCleared, onReset, onViewDetails, onClose }: AlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl shadow-2xl max-w-2xl w-full mx-4 animate-in fade-in zoom-in duration-300 border-2 border-red-500/50 overflow-hidden">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 animate-pulse pointer-events-none"></div>
        
        {/* Red Header */}
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white px-8 py-6 relative border-b-2 border-red-500/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-red-700/50 rounded-lg p-1 transition-colors backdrop-blur"
          >
            <X className="size-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur p-3 rounded-xl shadow-lg">
              <AlertTriangle className="size-12 animate-pulse" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1 flex items-center gap-2">
                ⚠ CRITICAL ALERT
                <Zap className="size-6 animate-pulse" />
              </h2>
              <p className="text-red-100 text-lg">{chute.name} - Chute Full</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6 relative z-10">
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-lg border border-purple-500/30 shadow-lg">
                <div className="text-sm text-cyan-300 mb-1">Time Detected</div>
                <div className="text-lg font-bold text-white">{chute.lastUpdated}</div>
              </div>
              <div className="bg-gradient-to-br from-red-950/50 to-pink-950/50 p-4 rounded-lg border border-red-500/50 shadow-lg">
                <div className="text-sm text-red-300 mb-1">Fill Level</div>
                <div className="text-lg font-bold text-red-400">{chute.fillLevel}%</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border-l-4 border-yellow-400 p-4 rounded-lg backdrop-blur">
              <p className="text-yellow-100">
                <strong className="text-yellow-300">⚡ Warning:</strong> This chute has reached full capacity and requires immediate operator action. 
                Overflow risk may occur if not addressed promptly.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onMarkCleared}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-green-500/50 flex items-center justify-center gap-2"
            >
              ✅ Mark as Cleared
            </button>
            <button
              onClick={onReset}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              🔄 Reset Status
            </button>
            <button
              onClick={onViewDetails}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              🔍 View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}