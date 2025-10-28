import React, { useState, useEffect, useRef } from 'react';
import MagicButton from './MagicButton';
import HonorScoresManager from './HonorScoresManager';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const AdminStandingsPage = ({ onClose, openPublicStandings }) => {
  console.log('AdminStandingsPage component mounted');
  
  const [selectedLeague, setSelectedLeague] = useState('Monday Night Open');
  const [csvInput, setCsvInput] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessingPDF, setIsProcessingPDF] = useState(false);
  const [pdfStatus, setPdfStatus] = useState('');
  const [showHonorScoresManager, setShowHonorScoresManager] = useState(false);
  const fileInputRef = useRef(null);

  const leagues = [
    'Monday Night Open',
    'Tuesday Night Ladies',
    'Wednesday Night Mixed',
    'Church League',
    'Youth'
  ];

  // Simple password protection (you can make this more secure with backend)
  const ADMIN_PASSWORD = 'strikers2025'; // Change this!

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    // Load existing standings when league changes
    if (isAuthenticated) {
      const saved = localStorage.getItem(`standings_${selectedLeague}`);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          // Convert back to CSV format for editing
          const csv = data.map(entry => 
            `${entry.rank},${entry.name},${entry.wins},${entry.losses},${entry.points},${entry.average}`
          ).join('\n');
          setCsvInput(csv);
        } catch (e) {
          setCsvInput('');
        }
      } else {
        setCsvInput('');
      }
    }
  }, [selectedLeague, isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleSave = () => {
    if (!csvInput.trim()) {
      alert('Please enter standings data!');
      return;
    }

    try {
      // Parse CSV input
      const lines = csvInput.trim().split('\n');
      const standings = lines.map(line => {
        const [rank, name, wins, losses, points, average] = line.split(',').map(s => s.trim());
        return {
          rank: rank || '',
          name: name || '',
          wins: wins || '0',
          losses: losses || '0',
          points: points || '0',
          average: average || '0'
        };
      });

      // Save to localStorage
      localStorage.setItem(`standings_${selectedLeague}`, JSON.stringify(standings));
      alert(`Standings for ${selectedLeague} saved successfully!`);
    } catch (e) {
      alert('Error saving standings. Please check your format.');
    }
  };

  const handleClear = () => {
    if (window.confirm(`Are you sure you want to clear standings for ${selectedLeague}?`)) {
      localStorage.removeItem(`standings_${selectedLeague}`);
      setCsvInput('');
      alert('Standings cleared!');
    }
  };

  const extractStandingsFromPDF = async (file) => {
    setIsProcessingPDF(true);
    setPdfStatus('Reading PDF...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      setPdfStatus(`Processing ${pdf.numPages} page(s)...`);

      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }

      setPdfStatus('Extracting standings data...');

      // Parse the text to extract standings
      // This handles common formats from LeagueSecretary and similar software
      const lines = fullText.split('\n').filter(line => line.trim());
      const standings = [];
      
      // Common patterns to look for:
      // Numbers followed by team/player names, then stats
      const standingsPattern = /^(\d+)[.\s]+(.+?)\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)/;
      
      // Also try tab or multiple space separations
      const altPattern = /^(\d+)\s+(.+?)\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)/;
      
      for (const line of lines) {
        let match = line.match(standingsPattern) || line.match(altPattern);
        
        if (match) {
          const [, rank, name, wins, losses, points, average] = match;
          standings.push({
            rank: rank.trim(),
            name: name.trim(),
            wins: wins.trim(),
            losses: losses.trim(),
            points: points.trim(),
            average: average.trim()
          });
        }
      }

      if (standings.length === 0) {
        // Try alternative parsing - split by whitespace and look for numeric patterns
        setPdfStatus('Trying alternative parsing method...');
        
        for (const line of lines) {
          const parts = line.trim().split(/\s{2,}|\t/); // Split by 2+ spaces or tabs
          
          if (parts.length >= 6) {
            const firstPart = parts[0].trim();
            // Check if first part is a number (rank)
            if (/^\d+$/.test(firstPart)) {
              standings.push({
                rank: parts[0].trim(),
                name: parts[1].trim(),
                wins: parts[2].trim(),
                losses: parts[3].trim(),
                points: parts[4].trim(),
                average: parts[5].trim()
              });
            }
          }
        }
      }

      if (standings.length > 0) {
        // Convert to CSV format for the text area
        const csvData = standings.map(entry => 
          `${entry.rank}, ${entry.name}, ${entry.wins}, ${entry.losses}, ${entry.points}, ${entry.average}`
        ).join('\n');
        
        setCsvInput(csvData);
        setPdfStatus(`✅ Successfully extracted ${standings.length} entries!`);
        
        setTimeout(() => {
          setPdfStatus('');
          setIsProcessingPDF(false);
        }, 3000);
      } else {
        setPdfStatus('⚠️ Could not automatically extract standings. Please enter manually or check PDF format.');
        setIsProcessingPDF(false);
      }

    } catch (error) {
      console.error('PDF processing error:', error);
      setPdfStatus('❌ Error processing PDF. Please try manual entry.');
      setIsProcessingPDF(false);
    }
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      extractStandingsFromPDF(file);
    } else {
      alert('Please upload a valid PDF file');
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isAuthenticated) {
    console.log('Rendering login screen (not authenticated)');
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-primary, #1a1a1a)',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-secondary, #2a2a2a)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            border: '2px solid #96333C',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-header, sans-serif)',
              fontSize: '2rem',
              color: 'var(--accent-primary, #96333C)',
              marginBottom: '30px',
            }}
          >
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1rem',
              fontFamily: 'var(--font-body, sans-serif)',
              borderRadius: '10px',
              border: '2px solid var(--border-color, #444)',
              backgroundColor: 'var(--bg-primary, #1a1a1a)',
              color: 'var(--text-primary, #ffffff)',
              marginBottom: '20px',
            }}
          />
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '15px',
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
            Login
          </MagicButton>
        </div>
      </div>
    );
  }

  // Show Honor Scores Manager if selected
  if (showHonorScoresManager) {
    return <HonorScoresManager onClose={() => setShowHonorScoresManager(false)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Navigation Buttons */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {onClose && (
            <MagicButton
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              clickEffect={true}
              glowColor="78, 152, 213"
              onClick={() => {
                if (openPublicStandings) {
                  onClose();
                  setTimeout(() => openPublicStandings(), 300);
                } else {
                  window.history.back();
                }
              }}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '2px solid var(--border-color)',
                borderRadius: '50px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              ← Back to Standings
            </MagicButton>
          )}

          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            glowColor="150, 51, 60"
            onClick={() => setShowHonorScoresManager(true)}
            style={{
              padding: '10px 20px',
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
            🏆 Manage Honor Scores
          </MagicButton>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '3rem',
            color: 'var(--accent-primary)',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Update League Standings
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Select a league and enter standings data below
        </p>

        {/* League Selector */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: selectedLeague === league ? '2px solid var(--accent-primary)' : '2px solid var(--border-color)',
                backgroundColor: selectedLeague === league ? 'var(--accent-primary)' : 'transparent',
                color: selectedLeague === league ? '#ffffff' : 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {league}
            </button>
          ))}
        </div>

        {/* PDF Upload Section */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
            border: '2px solid var(--accent-secondary)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.3rem',
              color: 'var(--accent-secondary)',
              marginBottom: '10px',
            }}
          >
            📄 Upload PDF (LeagueSecretary)
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', marginBottom: '15px' }}>
            Got a PDF from LeagueSecretary? Upload it here and we'll automatically extract the standings!
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handlePDFUpload}
            style={{ display: 'none' }}
            id="pdf-upload"
          />
          
          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            glowColor="78, 152, 213"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessingPDF}
            style={{
              padding: '15px 30px',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: isProcessingPDF ? 'var(--bg-primary)' : 'var(--accent-secondary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              cursor: isProcessingPDF ? 'wait' : 'pointer',
              fontFamily: 'var(--font-body)',
              opacity: isProcessingPDF ? 0.6 : 1,
            }}
          >
            {isProcessingPDF ? '⏳ Processing...' : '📤 Upload PDF'}
          </MagicButton>
          
          {pdfStatus && (
            <p
              style={{
                marginTop: '15px',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: pdfStatus.includes('✅') ? '#4CAF50' : pdfStatus.includes('❌') ? '#f44336' : 'var(--accent-secondary)',
                fontWeight: '600',
              }}
            >
              {pdfStatus}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid var(--border-color)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.3rem',
              color: 'var(--accent-secondary)',
              marginBottom: '10px',
            }}
          >
            📋 Or Enter Manually
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Enter one team/player per line in this format:
          </p>
          <code
            style={{
              display: 'block',
              backgroundColor: 'var(--bg-primary)',
              padding: '15px',
              borderRadius: '10px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: 'var(--accent-secondary)',
              marginBottom: '10px',
            }}
          >
            Rank, Team/Player Name, Wins, Losses, Points, Average
          </code>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <strong>Example:</strong>
          </p>
          <code
            style={{
              display: 'block',
              backgroundColor: 'var(--bg-primary)',
              padding: '15px',
              borderRadius: '10px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
            }}
          >
            1, Strike Force, 12, 3, 36, 215<br/>
            2, Pin Crushers, 10, 5, 30, 205<br/>
            3, Spare Me, 9, 6, 27, 198
          </code>
        </div>

        {/* Input Area */}
        <textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="Enter standings data here..."
          style={{
            width: '100%',
            minHeight: '400px',
            padding: '20px',
            fontSize: '1rem',
            fontFamily: 'monospace',
            borderRadius: '15px',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            resize: 'vertical',
          }}
        />

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
            enableTilt={true}
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
            Save Standings
          </MagicButton>

          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            glowColor="78, 152, 213"
            onClick={handleClear}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              backgroundColor: 'transparent',
              color: 'var(--accent-secondary)',
              border: '2px solid var(--accent-secondary)',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Clear Standings
          </MagicButton>

          <MagicButton
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            glowColor="78, 152, 213"
            onClick={() => window.open('/', '_blank')}
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
            View Public Site
          </MagicButton>
        </div>
      </div>
    </div>
  );
};

export default AdminStandingsPage;
