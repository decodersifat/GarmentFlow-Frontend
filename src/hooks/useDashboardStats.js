import { useState, useEffect } from 'react';
import API from '../config/api';

const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [statsRes, activityRes] = await Promise.all([
        API.get('/dashboard/stats'),
        API.get('/dashboard/activity')
      ]);

      setStats(statsRes.data.data);
      setActivity(activityRes.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchStats();

  return { stats, activity, loading, error, refetch };
};

export default useDashboardStats;
