import { useState } from 'react';
import { Filter, Activity, Sparkles } from 'lucide-react';
import { Event } from '../types';

interface EventLogProps {
  events: Event[];
}

export function EventLog({ events }: EventLogProps) {
  const [filterChute, setFilterChute] = useState<string>('all');
  const [filterEventType, setFilterEventType] = useState<string>('all');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filteredEvents = events.filter(event => {
    if (filterChute !== 'all' && event.chuteName !== filterChute) return false;
    if (filterEventType !== 'all' && event.eventType !== filterEventType) return false;
    if (showActiveOnly && event.status !== 'Active') return false;
    return true;
  });

  const uniqueChutes = Array.from(new Set(events.map(e => e.chuteName)));
  const uniqueEventTypes = Array.from(new Set(events.map(e => e.eventType)));

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-500/50 shadow-lg shadow-orange-500/30' 
      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500/50 shadow-lg shadow-green-500/30';
  };

  const getEventTypeColor = (eventType: string) => {
    switch(eventType) {
      case 'Full': return 'text-red-400 font-bold';
      case 'Warning': return 'text-yellow-400 font-bold';
      case 'Error': return 'text-red-400 font-bold';
      case 'Cleared': return 'text-green-400 font-medium';
      case 'Reset': return 'text-cyan-400 font-medium';
      case 'Login': return 'text-purple-400 font-medium';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950/90 to-slate-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-500/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-white px-6 py-4 rounded-t-xl border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="size-6 text-cyan-400" />
            <h2 className="text-xl font-bold">Event / Activity Log</h2>
            <Sparkles className="size-4 text-purple-400 animate-pulse" />
          </div>
          <div className="text-sm text-cyan-300">
            {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-900/50 to-slate-950/50 border-b border-purple-500/20">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-purple-400" />
            <span className="text-sm font-medium text-cyan-300">Filters:</span>
          </div>
          
          <select
            value={filterChute}
            onChange={(e) => setFilterChute(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/50 border border-purple-500/30 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="all">All Chutes</option>
            {uniqueChutes.map(chute => (
              <option key={chute} value={chute}>{chute}</option>
            ))}
          </select>

          <select
            value={filterEventType}
            onChange={(e) => setFilterEventType(e.target.value)}
            className="px-3 py-1.5 bg-slate-900/50 border border-purple-500/30 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="all">All Events</option>
            {uniqueEventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="size-4 text-purple-600 border-purple-500/30 rounded"
            />
            <span className="text-sm text-slate-300">Show Active Only</span>
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-900 to-slate-950 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-cyan-300 border-b border-purple-500/30">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-cyan-300 border-b border-purple-500/30">
                Chute Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-cyan-300 border-b border-purple-500/30">
                Event Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-cyan-300 border-b border-purple-500/30">
                Source
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-cyan-300 border-b border-purple-500/30">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-purple-300/50">
                  No events match the current filters
                </td>
              </tr>
            ) : (
              filteredEvents.map((event, index) => (
                <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-900/10 transition-colors">
                  <td className="px-6 py-3 text-sm text-cyan-300 font-mono">
                    {event.timestamp}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-white">
                    {event.chuteName}
                  </td>
                  <td className={`px-6 py-3 text-sm ${getEventTypeColor(event.eventType)}`}>
                    {event.eventType}
                  </td>
                  <td className="px-6 py-3 text-sm text-purple-300">
                    {event.source}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}