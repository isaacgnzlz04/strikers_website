import React, { useState, useEffect } from 'react';
import MagicButton from './MagicButton';

const HonorScoresManager = ({ onClose }) => {
  const [honorScores, setHonorScores] = useState([]);
  const [newEntry, setNewEntry] = useState({
    name: '',
    score: '',
    type: 'Game',
    date: ''
  });

  useEffect(() => {
    // Load honor scores from localStorage
    const saved = localStorage.getItem('honorScores');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHonorScores(data);
      } catch (e) {
        setHonorScores([]);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('honorScores', JSON.stringify(honorScores));
    alert('Honor scores saved successfully!');
  };

  const handleAdd = () => {
    if (!newEntry.name.trim() || !newEntry.score.trim()) {
      alert('Please enter both name and score!');
      return;
    }

    const entry = {
      id: Date.now(),
      name: newEntry.name.trim(),
      score: newEntry.score.trim(),
      type: newEntry.type,
      date: newEntry.date || new Date().toISOString().split('T')[0]
    };

    setHonorScores([...honorScores, entry]);
    setNewEntry({ name: '', score: '', type: 'Game', date: '' });
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this honor score?')) {
      setHonorScores(honorScores.filter(entry => entry.id !== id));
    }
  };

  const handleEdit = (id, field, value) => {
    setHonorScores(honorScores.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '20px',
          padding: '40px 30px',
          maxWidth: '1200px',
          width: '100%',
          border: '2px solid var(--accent-primary)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="78, 152, 213"
            onClick={onClose}
            style={{
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '2px solid var(--border-color)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              marginBottom: '20px',
            }}
          >
            ← Back to Standings
          </MagicButton>

          <h1
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '3rem',
              color: 'var(--accent-primary)',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            🏆 Manage Honor Scores
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          >
            Add or remove honor scores for the entire bowling alley
          </p>
        </div>

        {/* Add New Entry Form */}
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            border: '2px solid var(--accent-primary)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            Add New Honor Score
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '5px',
                }}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Bowler Name"
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  borderRadius: '10px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '5px',
                }}
              >
                Score
              </label>
              <input
                type="number"
                placeholder="300"
                value={newEntry.score}
                onChange={(e) => setNewEntry({ ...newEntry, score: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  borderRadius: '10px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '5px',
                }}
              >
                Type
              </label>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  borderRadius: '10px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="Game">Game</option>
                <option value="Series">Series</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '5px',
                }}
              >
                Date
              </label>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  borderRadius: '10px',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={handleAdd}
            style={{
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            + Add Honor Score
          </MagicButton>
        </div>

        {/* Existing Honor Scores List */}
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            border: '1px solid var(--border-color)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.5rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}
          >
            Current Honor Scores ({honorScores.length})
          </h2>

          {honorScores.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              No honor scores yet. Add your first one above!
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Score
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Type
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        color: 'var(--text-primary)',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        borderBottom: '2px solid var(--accent-primary)',
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {honorScores.map((entry, index) => (
                    <tr
                      key={entry.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '10px 12px' }}>
                        <input
                          type="text"
                          value={entry.name}
                          onChange={(e) => handleEdit(entry.id, 'name', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            borderRadius: '5px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <input
                          type="number"
                          value={entry.score}
                          onChange={(e) => handleEdit(entry.id, 'score', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            borderRadius: '5px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--accent-primary)',
                            textAlign: 'center',
                            fontWeight: '700',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <select
                          value={entry.type}
                          onChange={(e) => handleEdit(entry.id, 'type', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            borderRadius: '5px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <option value="Game">Game</option>
                          <option value="Series">Series</option>
                        </select>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <input
                          type="date"
                          value={entry.date}
                          onChange={(e) => handleEdit(entry.id, 'date', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-body)',
                            borderRadius: '5px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleRemove(entry.id)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-body)',
                            fontWeight: '600',
                            backgroundColor: '#f44336',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={handleSave}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            💾 Save All Changes
          </MagicButton>

          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            clickEffect={true}
            glowColor="78, 152, 213"
            onClick={onClose}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '2px solid var(--border-color)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cancel
          </MagicButton>
        </div>
      </div>
    </div>
  );
};

export default HonorScoresManager;
