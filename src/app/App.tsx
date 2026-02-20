import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { ChuteCard } from './components/ChuteCard';
import { AlertModal } from './components/AlertModal';
import { EventLog } from './components/EventLog';
import { Chute, Event } from './types';

import { getAllChutes } from '../api/chuteStatusAPI';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  
  //FOR API USE
  const [chutes, setChutes] = useState<Chute[]>([]);

  const [events, setEvents] = useState<Event[]>([
    { timestamp: '10:15:30 AM', chuteName: 'Chute 3', eventType: 'Full', source: 'IoT Sensor', status: 'Active' },
    { timestamp: '10:20:42 AM', chuteName: 'Chute 2', eventType: 'Warning', source: 'IoT Sensor', status: 'Active' },
    { timestamp: '10:10:15 AM', chuteName: 'Chute 1', eventType: 'Cleared', source: 'Mobile App', status: 'Resolved' },
    { timestamp: '10:05:22 AM', chuteName: 'Chute 4', eventType: 'Reset', source: 'Operator', status: 'Resolved' },
    { timestamp: '09:45:12 AM', chuteName: 'Chute 5', eventType: 'Error', source: 'System', status: 'Active' },
    { timestamp: '09:30:05 AM', chuteName: 'Chute 3', eventType: 'Reset', source: 'Operator', status: 'Resolved' },
    { timestamp: '09:15:33 AM', chuteName: 'Chute 2', eventType: 'Warning', source: 'IoT Sensor', status: 'Resolved' },
    { timestamp: '09:00:18 AM', chuteName: 'Chute 1', eventType: 'Normal', source: 'System', status: 'Resolved' },
  ]);

  const [alertChute, setAlertChute] = useState<Chute | null>(null);

  // Simulate connection status changes
  useEffect(() => {
    // Only run if authenticated
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      // Randomly change connection status (90% connected)
      if (Math.random() > 0.95) {
        setIsConnected(prev => !prev);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Show alert modal for full chutes on initial load
  useEffect(() => {
    // Only show alert if authenticated
    if (!isAuthenticated) return;

    const fullChute = chutes.find(c => c.status === 'Full');
    if (fullChute) {
      setAlertChute(fullChute);
    }
  }, [isAuthenticated]);

  // API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllChutes();
        setChutes(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const addEvent = (chuteName: string, eventType: string, source: string = 'Operator', status: 'Active' | 'Resolved' = 'Resolved') => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setEvents(prev => [{
      timestamp,
      chuteName,
      eventType,
      source,
      status
    }, ...prev]);
  };

  const handleMarkCleared = (chuteId: number) => {
    setChutes(prev => prev.map(chute =>
      chute.id === chuteId
        ? { ...chute, status: 'Normal', fillLevel: 0, hasActiveAlert: false, lastUpdated: new Date().toLocaleTimeString('en-US') }
        : chute
    ));

    const chute = chutes.find(c => c.id === chuteId);
    if (chute) {
      addEvent(chute.name, 'Cleared', 'Operator', 'Resolved');

      // Update event status for this chute
      setEvents(prev => prev.map(event =>
        event.chuteName === chute.name && event.status === 'Active'
          ? { ...event, status: 'Resolved' }
          : event
      ));
    }

    if (alertChute?.id === chuteId) {
      setAlertChute(null);
    }
  };

  const handleReset = (chuteId: number) => {
    setChutes(prev => prev.map(chute =>
      chute.id === chuteId
        ? { ...chute, fillLevel: 0, hasActiveAlert: false, lastUpdated: new Date().toLocaleTimeString('en-US') }
        : chute
    ));

    const chute = chutes.find(c => c.id === chuteId);
    if (chute) {
      addEvent(chute.name, 'Reset');
    }

    if (alertChute?.id === chuteId) {
      setAlertChute(null);
    }
  };

  const handleAcknowledge = (chuteId: number) => {
    setChutes(prev => prev.map(chute =>
      chute.id === chuteId
        ? { ...chute, hasActiveAlert: false }
        : chute
    ));

    const chute = chutes.find(c => c.id === chuteId);
    if (chute) {
      addEvent(chute.name, 'Acknowledged');
    }

    if (alertChute?.id === chuteId) {
      setAlertChute(null);
    }
  };

  const handleViewDetails = () => {
    console.log('View details for', alertChute);
    // Could open a detailed view or navigate to another page
  };

  const handleLogin = (username: string, password: string) => {
    // Simple demo authentication
    if (username === 'operator' && password === 'demo123') {
      setIsAuthenticated(true);
      setCurrentUser(username);
      setLoginError(null);

      // Add login event
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setEvents(prev => [{
        timestamp,
        chuteName: 'System',
        eventType: 'Login',
        source: 'Operator Portal',
        status: 'Resolved'
      }, ...prev]);
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Header isConnected={isConnected} />

      <main className="p-6">
        {/* Main Monitoring Area */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Chute Status Overview
            </h2>
            <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white text-xs font-bold shadow-lg shadow-purple-500/50">
              LIVE
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chutes.map(chute => (
              <ChuteCard
                key={chute.id}
                chute={chute}
              />
            ))}
          </div>
        </section>

        {/* Event Log */}
        <section>
          <EventLog events={events} />
        </section>
      </main>

      {/* Alert Modal */}
      {alertChute && (
        <AlertModal
          chute={alertChute}
          onMarkCleared={() => handleMarkCleared(alertChute.id)}
          onReset={() => handleReset(alertChute.id)}
          onViewDetails={handleViewDetails}
          onClose={() => setAlertChute(null)}
        />
      )}
    </div>
  );
}