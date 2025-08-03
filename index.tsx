/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from '@google/genai';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

// Define the structure of a shortcut for TypeScript
interface Shortcut {
  id: number;
  name: string;
  icon: string;
  instructions: string[];
  category?: string;
  siriPhrase?: string;
}

// Preset shortcuts for when API is not available
const PRESET_SHORTCUTS: Shortcut[] = [
  {
    id: 1,
    name: "Morning Routine",
    icon: "☀️",
    category: "productivity",
    instructions: [
      "Open Shortcuts app",
      "Tap '+' to create new shortcut",
      "Add 'Get Weather' action",
      "Add 'Speak Text' action with weather",
      "Add 'Open App' action for Calendar",
      "Save as 'Morning Routine'"
    ],
    siriPhrase: "Start my morning"
  },
  {
    id: 2,
    name: "Coffee Timer",
    icon: "☕",
    category: "utility",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Start Timer' action",
      "Set duration to 4 minutes",
      "Add 'Speak Text' action: 'Coffee timer started'",
      "Save as 'Coffee Timer'"
    ],
    siriPhrase: "Start coffee timer"
  },
  {
    id: 3,
    name: "Focus Mode",
    icon: "🎯",
    category: "productivity",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Set Focus' action",
      "Choose 'Do Not Disturb'",
      "Add 'Set Volume' to silent",
      "Save as 'Focus Mode'"
    ],
    siriPhrase: "Enter focus mode"
  },
  {
    id: 4,
    name: "Text Home",
    icon: "🏠",
    category: "automation",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Send Message' action",
      "Set recipient to emergency contact",
      "Set message to 'I'm on my way home'",
      "Save shortcut"
    ],
    siriPhrase: "Text that I'm coming home"
  },
  {
    id: 5,
    name: "Water Reminder",
    icon: "💧",
    category: "health",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Log Health Sample' action",
      "Set to 'Water' and amount '240ml'",
      "Add 'Speak Text' action: 'Water logged'",
      "Save shortcut"
    ],
    siriPhrase: "Log water intake"
  },
  {
    id: 6,
    name: "Social Share",
    icon: "📱",
    category: "social",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Take Photo' action",
      "Add 'Share' action",
      "Select social media apps",
      "Save shortcut"
    ],
    siriPhrase: "Share to social media"
  }
];

// Widget component
function ShortcutWidget({ shortcut, isFlipped, onFlip }: { shortcut: Shortcut, isFlipped: boolean, onFlip: () => void }) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onFlip();
    }
  };

  return (
    <div className="widget-container" onClick={onFlip} onKeyDown={handleKeyDown} role="button" tabIndex={0} aria-label={`Shortcut: ${shortcut.name}. Press to see instructions.`} aria-pressed={isFlipped}>
      <div className={`widget-flipper ${isFlipped ? 'flipped' : ''}`}>
        <div className="widget-front">
          <span className="widget-icon" aria-hidden="true">{shortcut.icon}</span>
          <span className="widget-name">{shortcut.name}</span>
        </div>
        <div className="widget-back" aria-hidden={!isFlipped}>
          <h3>{shortcut.name}</h3>
          <ol>
            {shortcut.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSiriModal, setShowSiriModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(null);

  const filteredShortcuts = currentFilter 
    ? shortcuts.filter(s => s.category === currentFilter)
    : shortcuts;

  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        // Use preset shortcuts if no API key
        if (!process.env.API_KEY) {
          console.warn("No API_KEY found, using preset shortcuts");
          setShortcuts(PRESET_SHORTCUTS);
          setLoading(false);
          return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: "Generate 6 useful and creative iPhone shortcut suggestions. For each, provide a short name (2-4 words), a single suitable emoji for an icon, and a numbered, step-by-step guide on how to set it up in the Shortcuts app. The steps should be clear and concise.",
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                shortcuts: {
                  type: Type.ARRAY,
                  description: "A list of 6 shortcut suggestions.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: {
                        type: Type.NUMBER,
                        description: "A unique ID for the shortcut, starting from 1."
                      },
                      name: {
                        type: Type.STRING,
                        description: "The name of the shortcut."
                      },
                      icon: {
                        type: Type.STRING,
                        description: "A single emoji representing the shortcut."
                      },
                      instructions: {
                        type: Type.ARRAY,
                        description: "Step-by-step instructions.",
                        items: {
                          type: Type.STRING
                        }
                      }
                    },
                    required: ['id', 'name', 'icon', 'instructions']
                  }
                }
              },
              required: ['shortcuts']
            },
          },
        });
        
        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse && jsonResponse.shortcuts) {
            setShortcuts(jsonResponse.shortcuts);
        } else {
            throw new Error("Invalid data structure from API.");
        }
      } catch (e) {
        console.error(e);
        setError(`API unavailable, using preset shortcuts.`);
        setShortcuts(PRESET_SHORTCUTS);
      } finally {
        setLoading(false);
      }
    };

    fetchShortcuts();
  }, []);

  const handleFlip = (id: number) => {
    const newFlippedId = flippedId === id ? null : id;
    setFlippedId(newFlippedId);
    
    if (newFlippedId) {
      const shortcut = shortcuts.find(s => s.id === id);
      setSelectedShortcut(shortcut || null);
    } else {
      setSelectedShortcut(null);
    }
  };

  // Dock button handlers
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleSiriClick = () => {
    if (selectedShortcut) {
      setShowSiriModal(true);
    }
  };

  const handleShareClick = () => {
    if (selectedShortcut) {
      setShowShareModal(true);
    }
  };

  const handleShuffleClick = () => {
    // Shuffle the shortcuts array
    const shuffled = [...shortcuts].sort(() => Math.random() - 0.5);
    setShortcuts(shuffled.slice(0, 6));
    setFlippedId(null);
    setSelectedShortcut(null);
    showToast('New shortcuts loaded!');
  };

  const applyFilter = (category: string) => {
    setCurrentFilter(category);
    setShowFilterModal(false);
    showToast(`Filter applied: ${category || 'All categories'}`);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } finally {
          textArea.remove();
        }
      }
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  };

  const showToast = (message: string) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 20px;
      font-size: 0.9rem;
      z-index: 1100;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const generateShareContent = (shortcut: Shortcut): string => {
    return `🎯 iOS Shortcut: ${shortcut.name}

📱 Instructions:
${shortcut.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

🗣️ Siri Command: "Hey Siri, ${shortcut.siriPhrase || shortcut.name}"

#iOSShortcuts #Automation #Productivity`;
  };

  if (loading) {
    return <div className="loading-indicator">Loading Shortcuts...</div>;
  }

  if (error) {
    return <div className="error-message" role="alert">{error}</div>;
  }

  return (
    <>
      <div className="widget-grid">
        {filteredShortcuts.map((shortcut) => (
          <ShortcutWidget
            key={shortcut.id}
            shortcut={shortcut}
            isFlipped={flippedId === shortcut.id}
            onFlip={() => handleFlip(shortcut.id)}
          />
        ))}
      </div>

      {/* Dock functionality */}
      <div className="dock-overlay">
        <button 
          className="dock-button-overlay filter-btn" 
          onClick={handleFilterClick}
          title="Filter shortcuts by category"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-170px)',
            background: 'transparent',
            border: 'none',
            width: '55px',
            height: '55px',
            borderRadius: '13px',
            zIndex: 101,
            cursor: 'pointer'
          }}
        />
        <button 
          className="dock-button-overlay siri-btn" 
          onClick={handleSiriClick}
          disabled={!selectedShortcut}
          title="Generate Siri command"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-85px)',
            background: 'transparent',
            border: 'none',
            width: '55px',
            height: '55px',
            borderRadius: '13px',
            zIndex: 101,
            cursor: selectedShortcut ? 'pointer' : 'not-allowed',
            opacity: selectedShortcut ? 1 : 0.5
          }}
        />
        <button 
          className="dock-button-overlay share-btn" 
          onClick={handleShareClick}
          disabled={!selectedShortcut}
          title="Share shortcut"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(0px)',
            background: 'transparent',
            border: 'none',
            width: '55px',
            height: '55px',
            borderRadius: '13px',
            zIndex: 101,
            cursor: selectedShortcut ? 'pointer' : 'not-allowed',
            opacity: selectedShortcut ? 1 : 0.5
          }}
        />
        <button 
          className="dock-button-overlay shuffle-btn" 
          onClick={handleShuffleClick}
          title="Shuffle suggestions"
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(85px)',
            background: 'transparent',
            border: 'none',
            width: '55px',
            height: '55px',
            borderRadius: '13px',
            zIndex: 101,
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowFilterModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(8px)'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '22px',
              padding: '24px',
              maxWidth: '400px',
              width: '90vw',
              color: '#fff'
            }}
          >
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem' }}>Filter Shortcuts</h2>
            <select 
              value={currentFilter}
              onChange={(e) => applyFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem'
              }}
            >
              <option value="">All Categories</option>
              <option value="productivity">Productivity</option>
              <option value="automation">Automation</option>
              <option value="social">Social</option>
              <option value="utility">Utility</option>
              <option value="health">Health</option>
            </select>
          </div>
        </div>
      )}

      {/* Siri Modal */}
      {showSiriModal && selectedShortcut && (
        <div 
          className="modal-overlay"
          onClick={() => setShowSiriModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(8px)'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '22px',
              padding: '24px',
              maxWidth: '400px',
              width: '90vw',
              color: '#fff'
            }}
          >
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem' }}>Siri Command</h2>
            <p>Use this phrase to trigger your shortcut with Siri:</p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '16px',
              borderRadius: '12px',
              margin: '16px 0',
              fontFamily: 'monospace',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>"Hey Siri, {selectedShortcut.siriPhrase || selectedShortcut.name}"</span>
              <button
                onClick={async () => {
                  const success = await copyToClipboard(`Hey Siri, ${selectedShortcut.siriPhrase || selectedShortcut.name}`);
                  if (success) {
                    showToast('Siri command copied!');
                    setShowSiriModal(false);
                  }
                }}
                style={{
                  background: '#007AFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedShortcut && (
        <div 
          className="modal-overlay"
          onClick={() => setShowShareModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(8px)'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '22px',
              padding: '24px',
              maxWidth: '400px',
              width: '90vw',
              color: '#fff'
            }}
          >
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.2rem' }}>Share Shortcut</h2>
            <textarea
              readOnly
              value={generateShareContent(selectedShortcut)}
              style={{
                width: '100%',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '12px',
                color: '#fff',
                fontSize: '0.9rem',
                resize: 'none',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              {navigator.share && (
                <button
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: `iOS Shortcut: ${selectedShortcut.name}`,
                        text: generateShareContent(selectedShortcut)
                      });
                      showToast('Shared successfully!');
                      setShowShareModal(false);
                    } catch (error) {
                      // User cancelled or error occurred
                    }
                  }}
                  style={{
                    background: '#34C759',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    flex: 1
                  }}
                >
                  Share
                </button>
              )}
              <button
                onClick={async () => {
                  const success = await copyToClipboard(generateShareContent(selectedShortcut));
                  if (success) {
                    showToast('Content copied to clipboard!');
                    setShowShareModal(false);
                  }
                }}
                style={{
                  background: '#8E8E93',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  flex: 1
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);