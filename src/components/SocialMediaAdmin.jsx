import React, { useState, useEffect } from 'react';
import { createSocialMediaFeed } from '../utils/socialMediaFeed';
import socialMediaConfig from '../utils/socialMediaConfig';

/**
 * Social Media Admin Panel
 * Provides controls for managing the social media feed cache and viewing statistics
 */
const SocialMediaAdmin = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const feedManager = createSocialMediaFeed(socialMediaConfig);

  const loadStats = async () => {
    try {
      const cacheStats = await feedManager.getCacheStats();
      setStats(cacheStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setMessage('Fetching fresh posts from social media...');
    
    try {
      const posts = await feedManager.fetchAllPosts(true); // Force refresh
      setMessage(`✅ Successfully loaded ${posts.length} posts!`);
      await loadStats();
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    setLoading(true);
    setMessage('Clearing cache...');
    
    try {
      await feedManager.clearCache();
      setMessage('✅ Cache cleared successfully!');
      await loadStats();
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '10px',
      border: '2px solid var(--accent-primary)',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-header)',
        fontSize: '1.5rem',
        color: 'var(--text-primary)',
        marginBottom: '1rem'
      }}>
        Social Media Feed Manager
      </h2>

      {/* Statistics */}
      {stats && (
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--accent-primary)',
            marginBottom: '0.5rem'
          }}>
            Cache Statistics
          </h3>
          <div style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            <p>Status: <strong style={{ color: stats.expired ? '#f44336' : '#4caf50' }}>
              {stats.exists ? (stats.expired ? 'Expired' : 'Active') : 'Empty'}
            </strong></p>
            {stats.exists && (
              <>
                <p>Posts Cached: <strong style={{ color: 'var(--text-primary)' }}>{stats.count}</strong></p>
                <p>Age: <strong style={{ color: 'var(--text-primary)' }}>{stats.ageMinutes} minutes</strong></p>
                <p>Cached At: <strong style={{ color: 'var(--text-primary)' }}>
                  {stats.cachedAt?.toLocaleString()}
                </strong></p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div style={{
          padding: '10px 15px',
          backgroundColor: message.includes('❌') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
          border: `1px solid ${message.includes('❌') ? '#f44336' : '#4caf50'}`,
          borderRadius: '8px',
          marginBottom: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-primary)'
        }}>
          {message}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: '150px',
            padding: '12px 24px',
            backgroundColor: 'var(--accent-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Loading...' : '🔄 Refresh Posts'}
        </button>

        <button
          onClick={handleClearCache}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: '150px',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? '⏳ Loading...' : '🗑️ Clear Cache'}
        </button>

        <button
          onClick={loadStats}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: '150px',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '2px solid var(--accent-secondary)',
            borderRadius: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          📊 Reload Stats
        </button>
      </div>

      {/* Info */}
      <div style={{
        marginTop: '1.5rem',
        padding: '12px',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: '8px',
        borderLeft: '4px solid var(--accent-secondary)'
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          margin: 0,
          lineHeight: 1.6
        }}>
          <strong style={{ color: 'var(--accent-secondary)' }}>ℹ️ Info:</strong> The cache automatically
          refreshes every 30 minutes. Use "Refresh Posts" to fetch new content immediately,
          or "Clear Cache" to force a fresh fetch on the next page load.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaAdmin;
