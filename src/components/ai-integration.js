/**
 * AI Integration Module
 * Purpose: Google Gemini AI patterns + mock data for dynamic shortcut generation
 * Last Modified: August 4, 2025 at 11:51 PM
 * Original: archive/early-drafts/index.tsx
 *
 * This module contains the Google Gemini AI integration patterns
 * for generating dynamic shortcut content.
 */

/**
 * Google Gemini AI integration configuration
 * Note: This requires API key setup and @google/genai package
 */
const AI_CONFIG = {
  model: 'gemini-2.5-flash',
  prompt: `Generate 6 useful and creative iPhone shortcut suggestions.
    For each, provide a short name (2-4 words), a single suitable emoji for an icon,
    and a numbered, step-by-step guide on how to set it up in the Shortcuts app.
    The steps should be clear and concise.`,

  responseSchema: {
    type: 'OBJECT',
    properties: {
      shortcuts: {
        type: 'ARRAY',
        description: "A list of 6 shortcut suggestions.",
        items: {
          type: 'OBJECT',
          properties: {
            id: {
              type: 'NUMBER',
              description: "A unique ID for the shortcut, starting from 1."
            },
            name: {
              type: 'STRING',
              description: "The name of the shortcut."
            },
            icon: {
              type: 'STRING',
              description: "A single emoji representing the shortcut."
            },
            instructions: {
              type: 'ARRAY',
              description: "Step-by-step instructions.",
              items: {
                type: 'STRING'
              }
            }
          },
          required: ['id', 'name', 'icon', 'instructions']
        }
      }
    },
    required: ['shortcuts']
  }
};

/**
 * Mock AI response for development/testing
 * Use this when AI integration is not yet set up
 */
const mockAIResponse = {
  shortcuts: [
    {
      id: 1,
      name: "Morning Routine",
      icon: "☀️",
      instructions: [
        "Open Shortcuts app",
        "Create new shortcut",
        "Add 'Get Weather' action",
        "Add 'Speak Text' action to announce weather",
        "Add 'Play Music' action",
        "Name it 'Morning Routine'"
      ]
    },
    {
      id: 2,
      name: "Travel Mode",
      icon: "✈️",
      instructions: [
        "Open Shortcuts app",
        "Create new shortcut",
        "Add 'Set Airplane Mode' action",
        "Add 'Set Do Not Disturb' action",
        "Add 'Set Brightness' to 50%",
        "Name it 'Travel Mode'"
      ]
    },
    {
      id: 3,
      name: "Quick Note",
      icon: "📝",
      instructions: [
        "Open Shortcuts app",
        "Create new shortcut",
        "Add 'Ask for Input' action",
        "Add 'Create Note' action",
        "Connect input to note content",
        "Name it 'Quick Note'"
      ]
    }
  ]
};

/**
 * Fetch shortcuts from AI or return mock data
 * @param {boolean} useMockData - Whether to use mock data instead of AI
 * @returns {Promise<Object>} Shortcuts data
 */
async function generateShortcuts(useMockData = true) {
  if (useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAIResponse;
  }

  // TODO: Implement actual AI integration
  // This would require:
  // 1. npm install @google/genai
  // 2. Set up API key in environment
  // 3. Implement the actual AI call

  throw new Error('AI integration not yet implemented. Use useMockData: true');
}

export { AI_CONFIG, mockAIResponse, generateShortcuts };
