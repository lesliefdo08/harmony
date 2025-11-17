'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSessionStats, formatTime } from '@/utils/storage';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsModal = ({ isOpen, onClose }: StatsModalProps) => {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTime: 0,
    averageSessionLength: 0,
    mostUsedTrack: null as string | null,
    sessionsThisWeek: 0,
  });

  const [weeklyData, setWeeklyData] = useState<Array<{ day: string; sessions: number; minutes: number }>>([]);
  const [trackUsageData, setTrackUsageData] = useState<Array<{ name: string; plays: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      setStats(getSessionStats());
      
      // Generate mock weekly data (can be replaced with real localStorage data)
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const mockWeeklyData = days.map(day => ({
        day,
        sessions: Math.floor(Math.random() * 5) + 1,
        minutes: Math.floor(Math.random() * 60) + 10,
      }));
      setWeeklyData(mockWeeklyData);

      // Mock track usage data
      const mockTrackData = [
        { name: 'Concentration', plays: 15 },
        { name: 'Relaxation', plays: 12 },
        { name: 'Creative Surge', plays: 8 },
        { name: 'Deep Sleep', plays: 10 },
      ];
      setTrackUsageData(mockTrackData);
    }
  }, [isOpen]);

  const achievements = [
    {
      title: 'Getting Started',
      description: 'Complete your first session',
      unlocked: stats.totalSessions >= 1,
    },
    {
      title: 'Dedicated Listener',
      description: 'Complete 10 sessions',
      unlocked: stats.totalSessions >= 10,
    },
    {
      title: 'Mindfulness Master',
      description: 'Listen for 1 hour total',
      unlocked: stats.totalTime >= 3600,
    },
    {
      title: 'Weekly Warrior',
      description: 'Complete 7 sessions this week',
      unlocked: stats.sessionsThisWeek >= 7,
    },
    {
      title: 'Harmony Expert',
      description: 'Complete 50 sessions',
      unlocked: stats.totalSessions >= 50,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-20 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div 
              className="bg-gradient-to-br from-[var(--surface)]/98 to-[var(--surface-alt)]/98 backdrop-blur-xl rounded-3xl border border-[var(--primary)]/30 max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[80vh] overflow-y-auto custom-scrollbar p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                  Your Progress
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--primary)]/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-2">
                    {stats.totalSessions}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/70 uppercase tracking-wider">Total Sessions</div>
                </div>

                <div className="bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[var(--wave)] to-[var(--accent)] bg-clip-text text-transparent mb-2">
                    {formatTime(stats.totalTime)}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/70 uppercase tracking-wider">Total Time</div>
                </div>

                <div className="bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[var(--neural)] to-[var(--glow)] bg-clip-text text-transparent mb-2">
                    {formatTime(stats.averageSessionLength)}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/70 uppercase tracking-wider">Avg Session</div>
                </div>

                <div className="bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] bg-clip-text text-transparent mb-2">
                    {stats.sessionsThisWeek}
                  </div>
                  <div className="text-sm text-[var(--foreground)]/70 uppercase tracking-wider">This Week</div>
                </div>
              </div>

              {/* Favorite Track */}
              {stats.mostUsedTrack && (
                <div className="mb-8 bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                  <div className="flex items-center space-x-3">

                    <div>
                      <div className="text-sm text-[var(--foreground)]/70 uppercase tracking-wider mb-1">Most Played</div>
                      <div className="text-xl font-semibold text-[var(--foreground)]">{stats.mostUsedTrack}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Weekly Activity Chart */}
              <div className="mb-8 bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(192, 202, 245, 0.1)" />
                    <XAxis dataKey="day" stroke="rgba(192, 202, 245, 0.5)" />
                    <YAxis stroke="rgba(192, 202, 245, 0.5)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--surface)', 
                        border: '1px solid rgba(122, 162, 247, 0.3)',
                        borderRadius: '12px',
                        color: 'var(--foreground)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="#7aa2f7" 
                      strokeWidth={3}
                      dot={{ fill: '#7aa2f7', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#9ece6a" 
                      strokeWidth={3}
                      dot={{ fill: '#9ece6a', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Track Usage Chart */}
              <div className="mb-8 bg-[var(--background)]/50 rounded-2xl p-6 border border-[var(--primary)]/20">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Track Popularity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={trackUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(192, 202, 245, 0.1)" />
                    <XAxis dataKey="name" stroke="rgba(192, 202, 245, 0.5)" />
                    <YAxis stroke="rgba(192, 202, 245, 0.5)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--surface)', 
                        border: '1px solid rgba(122, 162, 247, 0.3)',
                        borderRadius: '12px',
                        color: 'var(--foreground)'
                      }}
                    />
                    <Bar 
                      dataKey="plays" 
                      fill="url(#barGradient)" 
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7aa2f7" />
                        <stop offset="100%" stopColor="#bb9af7" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Achievements</h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className={`p-4 rounded-xl border transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 border-[var(--primary)]/30'
                          : 'bg-[var(--background)]/30 border-[var(--foreground)]/10 opacity-60'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="font-semibold text-[var(--foreground)] flex items-center space-x-2">
                            <span>{achievement.title}</span>
                            {achievement.unlocked && (
                              <span className="text-[var(--accent)]">✓</span>
                            )}
                          </div>
                          <div className="text-sm text-[var(--foreground)]/60">{achievement.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Motivational Message */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-2xl border border-[var(--primary)]/20 text-center"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.5}}
              >
                <p className="text-[var(--foreground)]/80">
                  {stats.totalSessions === 0 ? "Start your first session to begin tracking your progress!" : stats.totalSessions < 5 ? "Great start! Keep going to unlock more achievements!" : stats.totalSessions < 20 ? "You're building a great habit! Stay consistent!" : "Amazing dedication! You're a true Harmonics master!"}
                </p>
              </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StatsModal;

