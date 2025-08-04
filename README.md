# 🏆 iOS Shortcut Wizard - MASTER REFERENCE
**Last Modified: August 5, 2025 at 12:17 AM**
**Source of Truth - NO DELETIONS ALLOWED (only moves/strikethrough)**## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Current Status](#current-status)
3. [Quick Start](#quick-start)
4. [Architecture](#architecture)
5. [Phase 2 Components](#phase-2-components)
6. [Development Roadmap](#development-roadmap)
7. [File Structure](#file-structure)
8. [Integration Guide](#integration-guide)
9. [Historical Notes](#historical-notes)

## 🎯 Project Overview
**Custom iOS Shortcut Wizard** - An interactive web-based application that simulates iPhone interface for discovering and learning iOS shortcuts. Built with Vite + Vanilla JavaScript, featuring realistic iPhone UI mockup with advanced interactions.

## ✅ Current Status
- **Active Build**: Running on http://localhost:5173/
- **Main Entry**: `index.html` (cleaned and optimized)
- **Core Styling**: `src/iphone-ui.css` with iPhone frame + iOS home screen
- **JavaScript**: `src/main.js` with animations and interactions
- **Ready Components**: Advanced flip cards, AI integration, glassmorphism effects

## 🚀 Quick Start

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open: http://localhost:5173/

## 🏗️ Architecture
- **Framework**: Vite + Vanilla JavaScript (no React dependency)
- **Styling**: CSS with iPhone UI mockup, glassmorphism effects
- **Assets**: Material Icons, external app images, SF Pro Display font
- **Integration**: Figma design system ready, AI content generation prepared

## 🎁 Phase 2 Components (Extracted from Archives)
### **Ready to Implement:**
- **`src/components/flip-cards.css`** - 604 lines of professional glassmorphism
- **`src/components/flip-card-logic.js`** - Interactive widget creation (React→JS)
- **`src/components/ai-integration.js`** - Google Gemini AI patterns + mock data
- **`src/components/widget-gradients.css`** - iOS-accurate visual effects

### **Features Available:**
- ✨ 3D flip animations with backdrop-filter
- 🎨 Advanced glassmorphism effects
- 🤖 AI-generated shortcut content
- ♿ Accessibility-friendly interactions
- 🌓 Dark/light theme support
- 📱 iOS-accurate animations and transitions

## 🗺️ Development Roadmap
### **Phase 1: ✅ COMPLETE**
- iPhone UI foundation with realistic device frame
- Basic interactions and animations
- Directory cleanup and component extraction

### **Phase 2: 🚀 READY TO IMPLEMENT**
- Interactive flip cards replacing static icons
- AI-generated shortcut content integration
- Enhanced glassmorphism visual effects
- Advanced user interactions

### **Phase 3: 🔮 PLANNED**
- Real-time AI integration with API keys
- User-created shortcut storage
- Export/import functionality
- Template library system

## 📁 File Structure
```
webapps-isw/
├── index.html                    # Main entry point (iPhone UI)
├── src/
│   ├── components/              # Extracted reusable components
│   │   ├── flip-cards.css      # Professional glassmorphism
│   │   ├── flip-card-logic.js  # Widget creation logic
│   │   ├── ai-integration.js   # Content generation
│   │   └── widget-gradients.css # Visual patterns
│   ├── iphone-ui.css           # Main iPhone styling
│   ├── main.js                 # Core application logic
│   ├── figma-assets.css        # Design tokens
│   └── figma-manager.js        # Asset utilities
├── archive/                     # Historical versions (preserved)
├── MYDIARY.md                  # Session handoff notes
├── MYPEARLS.md                 # Key info cheatsheet
└── MYTREE.md                   # Directory change log
```

## 🔧 Integration Guide
### **To Add Flip Cards:**
```javascript
import { createFlipCardWidget } from './components/flip-card-logic.js';
// Replace static icons with interactive widgets
```

### **To Apply Enhanced Styling:**
```css
@import './components/flip-cards.css';
@import './components/widget-gradients.css';
```

### **To Enable Dynamic Content:**
```javascript
import { generateShortcuts } from './components/ai-integration.js';
// Load AI-generated or mock shortcut data
```

## 📚 Historical Notes
### **Archive Recovery (August 4, 2025):**
- Extracted valuable React components from `/archive/early-drafts/`
- Converted TypeScript to vanilla JavaScript
- Preserved 604 lines of professional CSS styling
- Saved AI integration patterns for future implementation

~~### Legacy Gemini API Setup (Deprecated):~~
~~Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key~~
*Note: AI integration now uses mock data with prepared patterns for future API connection*
