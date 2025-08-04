# 💎 MYPEARLS.md - High-Yield Key Info Cheatsheet
**Purpose: Quick reference for critical working memory info**
**Last Modified: August 4, 2025 at 11:48 PM**

## 📋 Table of Contents
1. [File Status](#file-status)
2. [CSS Class Mapping](#css-class-mapping)
3. [Component Integration](#component-integration)
4. [Server & Build](#server--build)
5. [Archive Insights](#archive-insights)
6. [Next Phase Shortcuts](#next-phase-shortcuts)

---

## 📁 File Status
**ACTIVE FILES:**
- ✅ `index.html` (main entry - iPhone UI)
- ✅ `src/iphone-ui.css` (matches HTML structure)
- ✅ `src/main.js` (core JavaScript logic)

**REMOVED:**
- ❌ Old `index.html` (broken CSS references)

**READY TO USE:**
- 🎁 `src/components/flip-cards.css` (604 lines glassmorphism)
- 🎁 `src/components/flip-card-logic.js` (widget creation)
- 🎁 `src/components/ai-integration.js` (content generation)

---

## 🎨 CSS Class Mapping
**iPhone Structure (CURRENT):**
```
.device-container > .iphone-frame > .screen-content
├── .status-bar (.time, .signal-bars, .battery)
├── .ios-home-screen
│   ├── .app-icons-grid (.app-icon.blue/.pink/.yellow)
│   └── .dock-area > .dock-icons (.app-icon-dock)
└── .home-indicator
```

**Material Icons Used:**
- `photo_camera`, `music_note`, `edit_note`, `map`, `sunny`, `alarm`

---

## 🔧 Component Integration
**Flip Cards:**
```javascript
import { createFlipCardWidget } from './components/flip-card-logic.js';
createFlipCardWidget(shortcut, container);
```

**Enhanced Styling:**
```css
@import './components/flip-cards.css';
@import './components/widget-gradients.css';
```

**AI Content:**
```javascript
import { generateShortcuts } from './components/ai-integration.js';
const data = await generateShortcuts(true); // Mock data
```

---

## 🚀 Server & Build
**Commands:**
```bash
npm install    # Dependencies
npm run dev    # Start server (http://localhost:5173/)
```

**Tech Stack:**
- Vite 7.0.6
- Vanilla JavaScript (no React)
- CSS with iPhone 15 Pro dimensions (393x852)

---

## 🏴‍☠️ Archive Insights
**From `/archive/early-drafts/`:**
- **React Components** → Converted to Vanilla JS
- **TypeScript Interfaces** → JSDoc comments
- **Google Gemini AI** → Mock data + integration patterns
- **Professional Animations** → 3D transforms, backdrop-filter

**CSS Variables Rescued:**
```css
--ios-blue: #007AFF;
--dynamic-island-width: 126px;
--widget-radius: 22px;
--transition-smooth: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

---

## ⚡ Next Phase Shortcuts
**Quick Implementation:**
1. Replace `.app-icon` divs with `createFlipCardWidget()` calls
2. Import glassmorphism CSS to `src/main.js`
3. Connect mock AI data to populate dynamic content
4. Test accessibility with keyboard navigation

**Component Files Ready:**
- Flip animations ✅
- Glassmorphism effects ✅
- AI integration patterns ✅
- Gradient variations ✅

**Server Status:** 🟢 Running clean on localhost:5173
