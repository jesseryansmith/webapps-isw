# 💎 MYPEARLS.md - High-Yield Key Info Cheatsheet
**Purpose: Quick reference for critical working memory info**
**Last Modified: August 8, 2025 at 1:45 PM**

## 📋 Table of Contents
1. [File Status](#file-status)
2. [CSS Class Mapping](#css-class-mapping)
3. [Component Integration](#component-integration)
4. [Server & Build](#server--build)
5. [Archive Insights](#archive-insights)
6. [Phase 2 Status](#phase-2-status)

---

## 📁 File Status
**ACTIVE FILES:**
- ✅ `index.html` (main entry - iPhone UI)
- ✅ `src/iphone-ui.css` (matches HTML structure)
- ✅ `src/main.js` (1,880+ lines production code - ✅ **Phase 2 COMPLETE**)

**INTEGRATED COMPONENTS:**
- ✅ `src/components/flip-cards.css` (glassmorphism effects - **ACTIVE**)
- ✅ `src/components/widget-gradients.css` (visual patterns - **ACTIVE**)
- ✅ AI generation system (60+ templates - **OPERATIONAL**)
- ✅ Filter modal system (categories + preferences - **WORKING**)

**REMOVED:**
- ❌ Old `index.html` (broken CSS references)

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
**Phase 2 Implementation - ✅ COMPLETE:**
```javascript
// All components successfully integrated in main.js:
import './components/flip-cards.css';         // ✅ Active
import './components/widget-gradients.css';   // ✅ Active

// AI Content Generation:
shortcutManager.aiGeneration.enabled = true;  // ✅ Working
generateMixedSet();                           // ✅ Operational

// Filter System:
filterPreferences.generateFilteredSet();     // ✅ Live
```

**Current Features:**
- 🎯 **6-category shortcut system** (Productivity, Health, Entertainment, Travel, Photography, Finance)
- 🤖 **AI generation with 60+ templates** and variation algorithms
- 🎨 **Material Design icons** with color-coded categories
- 📱 **Glassmorphism flip cards** with 3D animations
- ⚙️ **Filter modal** with category selection and AI/static toggle

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

## ⚡ Phase 2 Status
**✅ IMPLEMENTATION COMPLETE (August 8, 2025):**

**Delivered Features:**
1. ✅ **Interactive flip cards** replacing static icons - All 6 grid positions with 3D animations
2. ✅ **AI shortcut generation** - 60+ templates across 6 categories with smart variation system
3. ✅ **Advanced filter modal** - Category selection, AI/static toggle, difficulty levels
4. ✅ **Glassmorphism effects** - Professional iOS-style backdrop filters and visual depth
5. ✅ **Global scope management** - HTML onclick compatibility with window object assignments
6. ✅ **Preference persistence** - localStorage-based settings retention across sessions

**Technical Metrics:**
- **1,880+ lines** of production JavaScript code
- **60+ AI templates** with infinite variation possibilities
- **10 filter categories** with granular control
- **6 color schemes** for visual organization
- **Zero breaking changes** - Full backward compatibility maintained

**Component Files:**
- ✅ Flip cards CSS (glassmorphism effects) - **INTEGRATED**
- ✅ Widget gradients (visual patterns) - **INTEGRATED**
- ✅ AI integration patterns - **FULLY IMPLEMENTED**
- ✅ Filter modal system - **OPERATIONAL**

**Server Status:** 🟢 Running clean on localhost:5173 with all Phase 2 features live
