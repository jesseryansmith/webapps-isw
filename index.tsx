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
}

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

  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
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
        setError(`Failed to generate shortcuts. ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShortcuts();
  }, []);

  const handleFlip = (id: number) => {
    setFlippedId(prevId => (prevId === id ? null : id));
  };

  if (loading) {
    return <div className="loading-indicator">Loading Shortcuts...</div>;
  }

  if (error) {
    return <div className="error-message" role="alert">{error}</div>;
  }

  return (
    <div className="widget-grid">
      {shortcuts.map((shortcut) => (
        <ShortcutWidget
          key={shortcut.id}
          shortcut={shortcut}
          isFlipped={flippedId === shortcut.id}
          onFlip={() => handleFlip(shortcut.id)}
        />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);