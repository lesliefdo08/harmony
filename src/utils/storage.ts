/**
 * Local storage utilities for user preferences and session data
 */

export interface UserPreferences {
  lastVolume: number;
  lastTrackId: number;
  totalListeningTime: number;
  favoriteCategory: string;
  sessionHistory: SessionData[];
}

export interface SessionData {
  trackId: number;
  trackName: string;
  duration: number;
  timestamp: number;
  completed: boolean;
}

const STORAGE_KEYS = {
  PREFERENCES: 'harmony_user_preferences',
  CURRENT_SESSION: 'harmony_current_session',
};

/**
 * Get user preferences from local storage
 */
export const getUserPreferences = (): UserPreferences | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading preferences:', error);
    return null;
  }
};

/**
 * Save user preferences to local storage
 */
export const saveUserPreferences = (preferences: Partial<UserPreferences>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const current = getUserPreferences() || {
      lastVolume: 75,
      lastTrackId: 0,
      totalListeningTime: 0,
      favoriteCategory: 'focus',
      sessionHistory: [],
    };
    
    const updated = { ...current, ...preferences };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

/**
 * Track a listening session
 */
export const trackSession = (sessionData: SessionData): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const preferences = getUserPreferences() || {
      lastVolume: 75,
      lastTrackId: 0,
      totalListeningTime: 0,
      favoriteCategory: 'focus',
      sessionHistory: [],
    };
    
    // Add new session to history
    preferences.sessionHistory.push(sessionData);
    
    // Update total listening time
    preferences.totalListeningTime += sessionData.duration;
    
    // Keep only last 50 sessions
    if (preferences.sessionHistory.length > 50) {
      preferences.sessionHistory = preferences.sessionHistory.slice(-50);
    }
    
    saveUserPreferences(preferences);
  } catch (error) {
    console.error('Error tracking session:', error);
  }
};

/**
 * Get session statistics
 */
export const getSessionStats = () => {
  const preferences = getUserPreferences();
  if (!preferences) {
    return {
      totalSessions: 0,
      totalTime: 0,
      averageSessionLength: 0,
      mostUsedTrack: null,
      sessionsThisWeek: 0,
    };
  }
  
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const recentSessions = preferences.sessionHistory.filter(
    (session) => now - session.timestamp < oneWeek
  );
  
  // Count track usage
  const trackCounts: Record<string, number> = {};
  preferences.sessionHistory.forEach((session) => {
    trackCounts[session.trackName] = (trackCounts[session.trackName] || 0) + 1;
  });
  
  const mostUsedTrack = Object.keys(trackCounts).length > 0
    ? Object.entries(trackCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
    : null;
  
  return {
    totalSessions: preferences.sessionHistory.length,
    totalTime: preferences.totalListeningTime,
    averageSessionLength:
      preferences.sessionHistory.length > 0
        ? preferences.totalListeningTime / preferences.sessionHistory.length
        : 0,
    mostUsedTrack,
    sessionsThisWeek: recentSessions.length,
  };
};

/**
 * Format time in seconds to MM:SS
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Convert time string (MM:SS) to seconds
 */
export const parseTimeString = (timeString: string): number => {
  const parts = timeString.split(':');
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  return minutes * 60 + seconds;
};
