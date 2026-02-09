import { Package, AlertCircle, Clock, MoreVertical, Zap } from 'lucide-react';
import { Chute } from '../types';

interface ChuteCardProps {
  chute: Chute;
  onMarkCleared: () => void;
  onReset: () => void;
  onAcknowledge: () => void;
}

export function ChuteCard({ chute, onMarkCleared, onReset, onAcknowledge }: ChuteCardProps) {
  const getStatusColor = () => {
    switch (chute.status) {
      case 'Normal':
        return {
          bg: 'from-green-950/40 to-green-900/20',
          border: 'border-green-500/50',
          badge: 'from-green-600 to-emerald-600',
          icon: 'text-green-400',
          glow: 'shadow-green-500/20'
        };
      case 'Warning':
        return {
          bg: 'from-yellow-950/40 to-yellow-900/20',
          border: 'border-yellow-500/50',
          badge: 'from-yellow-600 to-orange-600',
          icon: 'text-yellow-400',
          glow: 'shadow-yellow-500/20'
        };
      case 'Full':
        return {
          bg: 'from-red-950/40 to-red-900/20',
          border: 'border-red-500/50',
          badge: 'from-red-600 to-pink-600',
          icon: 'text-red-400',
          glow: 'shadow-red-500/20'
        };
      case 'Offline':
        return {
          bg: 'from-slate-950/40 to-slate-900/20',
          border: 'border-slate-500/50',
          badge: 'from-slate-600 to-slate-700',
          icon: 'text-slate-400',
          glow: 'shadow-slate-500/20'
        };
      default:
        return {
          bg: 'from-slate-950/40 to-slate-900/20',
          border: 'border-slate-500/50',
          badge: 'from-slate-600 to-slate-700',
          icon: 'text-slate-400',
          glow: 'shadow-slate-500/20'
        };
    }
  };

  const colors = getStatusColor();

  const getStatusEmoji = () => {
    switch (chute.status) {
      case 'Normal': return '🟢';
      case 'Warning': return '🟡';
      case 'Full': return '🔴';
      case 'Offline': return '⚫';
      default: return '';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-xl ${colors.border} border-2 rounded-xl shadow-xl ${colors.glow} transition-all hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden`}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity"></div>
      
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-slate-900/50 rounded-lg border ${colors.border}`}>
              <Package className={`size-8 ${colors.icon}`} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{chute.name}</h3>
              {chute.hasActiveAlert && (
                <div className="flex items-center gap-1 text-red-400 text-sm mt-1 animate-pulse">
                  <AlertCircle className="size-4" />
                  <span className="font-medium">Active Alert</span>
                </div>
              )}
            </div>
          </div>
          <div className={`bg-gradient-to-r ${colors.badge} px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg text-white`}>
            <span>{getStatusEmoji()}</span>
            <span>{chute.status}</span>
          </div>
        </div>

        {/* Fill Level */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-cyan-300">Fill Level</span>
            <span className="font-bold text-white">{chute.fillLevel}%</span>
          </div>
          <div className="w-full bg-slate-900/50 rounded-full h-4 overflow-hidden shadow-inner border border-purple-500/20">
            <div 
              className={`h-full transition-all duration-500 ${
                chute.fillLevel >= 90 ? 'bg-gradient-to-r from-red-600 to-pink-600' :
                chute.fillLevel >= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-green-500 to-emerald-500'
              } shadow-lg relative`}
              style={{ width: `${chute.fillLevel}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-purple-300/70 mb-4">
          <Clock className="size-4" />
          <span>Last updated: {chute.lastUpdated}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-500/20">
          <button
            onClick={onMarkCleared}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-500/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={chute.status === 'Normal'}
          >
            ✅ Mark Cleared
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/30 text-sm"
          >
            🔄 Reset
          </button>
          <button
            onClick={onAcknowledge}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!chute.hasActiveAlert}
          >
            Acknowledge
          </button>
          <button className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-cyan-300 rounded-lg font-medium transition-all shadow-lg border border-purple-500/20 text-sm flex items-center gap-1">
            <MoreVertical className="size-4" />
            More
          </button>
        </div>
      </div>
    </div>
  );
}