import './iphone-ui.css';
import './figma-assets.css';
import './components/flip-cards.css';
import './components/flip-card-integration.css';
import './components/widget-gradients.css';
import './styles/unified-modals.css';

import { GoogleGenerativeAI } from "@google/generative-ai";

// Development utilities
import { devLog } from './utils/dev-logger.js';

// Performance monitoring (development only)
if (import.meta.env.DEV) {
  import('./modules/performance-monitor.js');
}

// Initialize lazy loader for optimal performance
import { lazyLoader } from './modules/lazy-loader.js';
import { modalManager } from './modules/modal-manager.js';

// Preload critical modules in background
lazyLoader.preloadCriticalModules();

// --- DATA ---
const shortcuts = [
  { id: 1, name: "WiFi Password Share", icon: "wifi", colorScheme: "blue", description: "Quickly share your WiFi password with guests.", instructions: ["Open Shortcuts app", "Tap + to create new shortcut", "Add 'Text' action", "Enter your WiFi password", "Add 'Show Result' action", "Connect Text output to Show Result", "Name shortcut 'WiFi Password'"] },
  { id: 2, name: "Morning Briefing", icon: "wb_sunny", colorScheme: "orange", description: "Get weather, calendar, and news in one tap.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Current Weather' action", "Add 'Get Upcoming Events' action", "Add 'Speak Text' action", "Connect weather and events to Speak Text", "Add to Home Screen"] },
  { id: 3, name: "Text Cleanup", icon: "text_format", colorScheme: "purple", description: "Remove formatting from copied text.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Clipboard' action", "Add 'Get Text from Input' action", "Add 'Copy to Clipboard' action", "Connect actions in sequence", "Add to Share Sheet"] },
  { id: 4, name: "Call Mom", icon: "phone", colorScheme: "green", description: "One-tap call to your most important contact.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Call' action", "Select contact (Mom)", "Enable 'Ask Before Running' if desired", "Add to Home Screen or Widgets"] },
  { id: 5, name: "Screenshot to Album", icon: "photo_camera", colorScheme: "indigo", description: "Automatically save screenshots to a specific album.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Take Screenshot' action", "Add 'Save to Photo Album' action", "Create or select 'Screenshots' album", "Connect actions", "Add to Control Center"] },
  { id: 6, name: "Meeting Notes", icon: "edit_note", colorScheme: "red", description: "Create timestamped meeting notes instantly.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Text' action with meeting template", "Add 'Format Date' action (current date/time)", "Add 'Create Note' action", "Combine formatted date with template", "Name shortcut 'Meeting Notes'"] }
];
const moreShortcuts = [
    { id: 7, name: "Travel Time to Work", icon: "directions_car", colorScheme: "blue", description: "Get current travel time to your workplace.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Travel Time' action", "Set destination to your work address", "Add 'Speak Text' action", "Connect travel time to speech", "Add to Today Widget"] },
    { id: 8, name: "Low Power Mode Toggle", icon: "battery_saver", colorScheme: "red", description: "Quickly toggle Low Power Mode on/off.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Set Low Power Mode' action", "Choose 'Toggle' option", "Add 'Show Notification' action with status", "Add to Control Center for quick access"] },
    { id: 9, name: "Grocery List Voice", icon: "shopping_cart", colorScheme: "green", description: "Add items to grocery list by voice.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Dictate Text' action", "Add 'Add to Reminders' action", "Set list to 'Groceries'", "Connect dictated text to reminder", "Enable 'Use with Siri'"] },
    { id: 10, name: "Photo Watermark", icon: "image", colorScheme: "purple", description: "Add your watermark to photos automatically.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Select Photos' action", "Add 'Overlay Image' action", "Choose your watermark image", "Set position and opacity", "Add 'Save to Photos' action"] },
    { id: 11, name: "Timer with Music", icon: "timer", colorScheme: "orange", description: "Start a timer and play focus music.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Ask for Input' (Number) for minutes", "Add 'Start Timer' action", "Add 'Play Music' action", "Select focus playlist", "Connect timer duration to input"] },
    { id: 12, name: "QR Code Generator", icon: "qr_code", colorScheme: "indigo", description: "Generate QR codes from text or URLs.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Ask for Input' (Text)", "Add 'Generate QR Code' action", "Connect text input to QR generator", "Add 'Share' action", "Add to Share Sheet"] }
];
const automationShortcuts = [
    { id: 13, name: "Bedtime Routine", icon: "bedtime", colorScheme: "indigo", description: "Automate your entire bedtime sequence.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Set Do Not Disturb' (On)", "Add 'Set Low Power Mode' (On)", "Add 'Set Alarm' action for tomorrow", "Add 'Control Home' to dim lights", "Add 'Play Music' for sleep sounds", "Set up Personal Automation for bedtime"] },
    { id: 14, name: "Work Focus Mode", icon: "work", colorScheme: "blue", description: "Activate work mode with all the right settings.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Set Focus' action (Work)", "Add 'Send Message' to team/family", "Add 'Open App' (work apps)", "Add 'Set Volume' to appropriate level", "Create automation for work hours"] },
    { id: 15, name: "Driving Assistant", icon: "directions_car", colorScheme: "orange", description: "Activate driving mode with navigation and music.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Set Focus' (Driving)", "Add 'Get Directions' to common destinations", "Add 'Play Music' (driving playlist)", "Add 'Send Message' (auto-reply)", "Trigger when connecting to car Bluetooth"] },
    { id: 16, name: "Security Check", icon: "security", colorScheme: "red", description: "Send location and status to emergency contacts.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Current Location' action", "Add 'Send Message' to emergency contact", "Include location in message", "Add 'Take Photo' (front camera)", "Set up as emergency widget"] },
    { id: 17, name: "Home Arrival", icon: "home", colorScheme: "green", description: "Automate actions when arriving home.", instructions: ["Open Shortcuts app", "Create automation", "Set trigger to 'Arrive at Home'", "Add 'Control Home' (lights on)", "Add 'Set Focus' (Personal)", "Add 'Send Message' to family", "Add 'Play Music' (home playlist)"] },
    { id: 18, name: "Workout Tracker", icon: "fitness_center", colorScheme: "purple", description: "Log workouts with time and type tracking.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Choose from Menu' (workout types)", "Add 'Start Workout' action", "Add timer for workout duration", "Add 'Log Health Sample' for activity", "Save workout data to Health app"] }
];
const socialShortcuts = [
    { id: 19, name: "Instagram Story Post", icon: "photo", colorScheme: "purple", description: "Quickly post photos to Instagram Stories.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Select Photos' action", "Add 'Resize Image' (Instagram Story size)", "Add 'Share' action", "Choose Instagram in share sheet", "Add to Share Sheet for photos"] },
    { id: 20, name: "Group Text with Location", icon: "location_on", colorScheme: "blue", description: "Send your location to a group instantly.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Current Location' action", "Add 'Send Message' action", "Select group conversation", "Include location and custom message", "Add to Home Screen"] },
    { id: 21, name: "Social Media Break", icon: "timer_off", colorScheme: "orange", description: "Block social apps and set a timer.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Set Focus' (custom social media block)", "Add 'Start Timer' (break duration)", "Add 'Show Notification' with motivational message", "Schedule focus mode end time"] },
    { id: 22, name: "Contact Card Share", icon: "contact_page", colorScheme: "green", description: "Share your contact info as QR code.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get My Contacts' action", "Add 'Generate QR Code' from contact", "Add 'Share' action", "Customize contact fields to include", "Add to Control Center"] },
    { id: 23, name: "Birthday Reminder", icon: "cake", colorScheme: "red", description: "Get notified of upcoming birthdays.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Find Contacts' with birthday criteria", "Add 'Format Date' for birthday", "Add 'Show Notification' with birthday info", "Set up as daily automation", "Include gift suggestion logic"] },
    { id: 24, name: "Email Cleanup", icon: "delete_sweep", colorScheme: "indigo", description: "Bulk delete old emails from specific senders.", instructions: ["Open Shortcuts app", "Create new shortcut", "Add 'Get Mail' action", "Filter by sender or date range", "Add 'Delete Mail' action", "Connect filtered emails to delete", "Set up as weekly automation"] }
];

const materialIconLibrary = {
  communication: ['chat', 'email', 'phone', 'video_call', 'contacts', 'message'],
  media: ['photo_camera', 'music_note', 'play_circle', 'movie', 'headphones', 'mic'],
  productivity: ['edit_note', 'event', 'schedule', 'timer', 'alarm', 'calculator'],
  navigation: ['my_location', 'map', 'directions', 'place', 'navigation', 'explore'],
  system: ['settings', 'dark_mode', 'wifi', 'bluetooth', 'battery_full', 'volume_up'],
  health: ['fitness_center', 'favorite', 'self_improvement', 'spa', 'sports', 'run_circle'],
  shopping: ['shopping_cart', 'payment', 'local_atm', 'receipt', 'account_balance', 'savings'],
  travel: ['flight', 'hotel', 'local_taxi', 'train', 'directions_car', 'luggage']
};
const colorSchemes = ['blue', 'purple', 'orange', 'green', 'indigo', 'red'];

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// --- GLOBAL STATE ---
let currentlyFlippedCard = null;
let isShuffling = false;
let justViewedFromModal = false;

// --- MANAGERS & CLASSES ---
const shortcutManager = {
  staticSets: [shortcuts, moreShortcuts, automationShortcuts, socialShortcuts],
  aiGeneration: {
    enabled: true,
    categories: ['productivity', 'health', 'entertainment', 'travel', 'photography', 'finance', 'smart-home', 'social', 'security', 'wellness'],
    difficulty: 'beginner',
    templates: {
      productivity: [
        { name: "Focus Session Timer", icon: "timer", colorScheme: "blue", description: "Create focused work sessions.", baseInstructions: ["Open Shortcuts", "Add 'Ask for Input' for duration", "Set Focus to Work", "Start Timer"] },
        { name: "Meeting Note Taker", icon: "edit_note", colorScheme: "orange", description: "Quickly start a new note for a meeting.", baseInstructions: ["Open Shortcuts", "Format Date (current)", "Create New Note with formatted date as title"] },
        { name: "End of Day Report", icon: "summarize", colorScheme: "purple", description: "Draft an end-of-day summary.", baseInstructions: ["Open Shortcuts", "Get calendar events for today", "Create new email with event summaries"] }
      ],
      health: [
        { name: "Hydration Tracker", icon: "local_drink", colorScheme: "blue", description: "Track daily water intake.", baseInstructions: ["Open Shortcuts", "Add 'Ask for Input' for water amount", "Log Health Sample"] },
        { name: "Mindful Moment", icon: "self_improvement", colorScheme: "green", description: "Start a quick breathing exercise.", baseInstructions: ["Open Shortcuts", "Set Do Not Disturb for 1 minute", "Play calming music", "Vibrate device"] },
        { name: "Log Workout", icon: "fitness_center", colorScheme: "red", description: "Log a workout session.", baseInstructions: ["Open Shortcuts", "Choose from list (Cardio, Strength)", "Log Health Sample (Workout)"] }
      ],
      entertainment: [
        { name: "Movie Night Setup", icon: "movie", colorScheme: "indigo", description: "Set the scene for a movie.", baseInstructions: ["Open Shortcuts", "Set lights to 50%", "Set Do Not Disturb", "Open streaming app"] },
        { name: "Discover New Music", icon: "music_note", colorScheme: "purple", description: "Get a playlist of new music.", baseInstructions: ["Open Shortcuts", "Find Music (Get playlist 'New Music Mix')", "Play Music"] }
      ],
      travel: [
        { name: "Pack My Bags", icon: "luggage", colorScheme: "orange", description: "Create a packing list for a trip.", baseInstructions: ["Open Shortcuts", "Ask for destination", "Create new Reminders list named 'Packing for [Destination]'"] }
      ]
    },
    generateSet(category = null, difficulty = 'beginner') {
      const selectedCategory = category || this.categories[Math.floor(Math.random() * this.categories.length)];
      const categoryTemplates = this.templates[selectedCategory] || this.templates.productivity;

      // Shuffle templates to ensure variety
      const shuffledTemplates = [...categoryTemplates].sort(() => 0.5 - Math.random());

      const generatedShortcuts = [];
      for (let i = 0; i < 6; i++) {
        // Loop over the shuffled templates to avoid duplicates
        const template = shuffledTemplates[i % shuffledTemplates.length];
        const variation = this.createVariation(template, Date.now() + i, difficulty);
        generatedShortcuts.push(variation);
      }
      return generatedShortcuts;
    },
    createVariation(template, id, difficulty = 'beginner') {
      let namePrefix = 'Smart';
      let additionalInstructions = ['Add custom settings'];

      // Adjust complexity based on difficulty
      if (difficulty === 'intermediate') {
        namePrefix = 'Advanced';
        additionalInstructions = ['Add conditional logic', 'Configure custom variables'];
      } else if (difficulty === 'advanced') {
        namePrefix = 'Expert';
        additionalInstructions = ['Add complex automation rules', 'Integrate with multiple apps', 'Configure advanced triggers'];
      }

      return {
        ...template,
        id,
        name: `${namePrefix} ${template.name}`,
        isAIGenerated: true,
        instructions: [...template.baseInstructions, ...additionalInstructions]
      };
    }
  },
  getNextSet() { return this.generateMixedSet(); },
  generateMixedSet() {
    const allStatic = this.staticSets.flat();
    const staticSample = [...allStatic].sort(() => 0.5 - Math.random()).slice(0, 3);
    const aiSample = this.aiGeneration.enabled ? this.aiGeneration.generateSet().slice(0, 3) : [];
    return [...staticSample, ...aiSample].sort(() => 0.5 - Math.random());
  },
  getCurrentSetInfo() { return `Mixed collection`; }
};

class UserShortcutManager {
  constructor(storageKey = 'userGeneratedShortcuts') {
    this.storageKey = storageKey;
    this.shortcuts = this.loadShortcuts();
  }

  loadShortcuts() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveShortcuts() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.shortcuts));
  }

  addShortcut(shortcut) {
    // Add to the beginning of the list and keep only the last 10
    this.shortcuts.unshift(shortcut);
    this.shortcuts = this.shortcuts.slice(0, 10);
    this.saveShortcuts();
  }

  getShortcuts() {
    return this.shortcuts;
  }

  getShortcutById(id) {
    return this.shortcuts.find(s => s.id === id);
  }

  clearShortcuts() {
    this.shortcuts = [];
    this.saveShortcuts();
  }
}
const userShortcutManager = new UserShortcutManager();

class FilterPreferences {
  constructor() { this.preferences = this.loadPreferences(); }
  loadPreferences() {
    const saved = localStorage.getItem('shortcutFilterPreferences');
    return saved ? JSON.parse(saved) : this.getDefaults();
  }
  getDefaults() { return { categories: [], difficulty: 'all', aiEnabled: true, aiRatio: 0.5 }; }
  savePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    localStorage.setItem('shortcutFilterPreferences', JSON.stringify(this.preferences));
  }
  getPreferences() { return { ...this.preferences }; }

  // Helper method to categorize static shortcuts
  categorizeStaticShortcut(shortcut, setIndex) {
    // Map static shortcut sets to categories and difficulties
    const setMappings = [
      { category: 'productivity', difficulty: 'beginner' }, // shortcuts
      { category: 'productivity', difficulty: 'beginner' }, // moreShortcuts
      { category: 'smart-home', difficulty: 'intermediate' }, // automationShortcuts
      { category: 'social', difficulty: 'beginner' }  // socialShortcuts
    ];

    // For automation shortcuts, make some advanced based on complexity
    if (setIndex === 2) { // automationShortcuts
      const advancedShortcutIds = [14, 16, 17]; // Morning Routine, Security Mode, Bedtime Setup
      if (advancedShortcutIds.includes(shortcut.id)) {
        return { category: 'smart-home', difficulty: 'advanced' };
      }
    }

    return setMappings[setIndex] || { category: 'productivity', difficulty: 'beginner' };
  }

  // Helper method to filter static shortcuts by category and difficulty
  filterStaticShortcuts(allStatic) {
    const prefs = this.preferences;
    if (prefs.categories.length === 0 && prefs.difficulty === 'all') {
      return allStatic;
    }

    return allStatic.filter(shortcut => {
      // Find which set this shortcut belongs to
      let setIndex = -1;
      for (let i = 0; i < shortcutManager.staticSets.length; i++) {
        if (shortcutManager.staticSets[i].includes(shortcut)) {
          setIndex = i;
          break;
        }
      }

      if (setIndex === -1) return true; // Include if we can't categorize

      const metadata = this.categorizeStaticShortcut(shortcut, setIndex);

      // Check category filter - include if no categories selected or if category matches
      const categoryMatch = prefs.categories.length === 0 ||
                           prefs.categories.includes(metadata.category);

      // Check difficulty filter
      const difficultyMatch = prefs.difficulty === 'all' ||
                             prefs.difficulty === metadata.difficulty;

      return categoryMatch && difficultyMatch;
    });
  }

  generateFilteredSet() {
    const prefs = this.preferences;
    const allStatic = shortcutManager.staticSets.flat();
    let finalSet = [];

    if (!prefs.aiEnabled) {
      // AI disabled: only static shortcuts
      const filteredStatic = this.filterStaticShortcuts(allStatic);
      finalSet = [...filteredStatic].sort(() => 0.5 - Math.random());
    } else if (prefs.aiRatio === 1) {
      // AI only mode
      const selectedCategory = prefs.categories.length > 0 ? prefs.categories[0] : null;
      finalSet = shortcutManager.aiGeneration.generateSet(selectedCategory, prefs.difficulty);
    } else {
      // Mixed mode: combine filtered static and AI shortcuts
      const staticCount = Math.round(6 * (1 - prefs.aiRatio));
      const aiCount = 6 - staticCount;

      const filteredStatic = this.filterStaticShortcuts(allStatic);
      const staticSample = [...filteredStatic].sort(() => 0.5 - Math.random()).slice(0, staticCount);

      const selectedCategory = prefs.categories.length > 0 ? prefs.categories[0] : null;
      const aiSample = shortcutManager.aiGeneration.generateSet(selectedCategory, prefs.difficulty).slice(0, aiCount);

      finalSet = [...staticSample, ...aiSample].sort(() => 0.5 - Math.random());
    }

    return finalSet.slice(0, 6);
  }
}
const filterPreferences = new FilterPreferences();

// --- SEARCH FUNCTIONALITY ---
function initializeSearch() {
  const searchContainer = document.querySelector('.Search');
  if (!searchContainer) return;

  // Convert static search to functional input
  searchContainer.innerHTML = `
    <div class="Search-icon_container"><span class="material-icons">search</span></div>
    <input type="text" placeholder="Search shortcuts..." class="search-input" />
    <button class="search-clear" style="display: none;"><span class="material-icons">close</span></button>
  `;

  const searchInput = searchContainer.querySelector('.search-input');
  const clearButton = searchContainer.querySelector('.search-clear');
  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearButton.style.display = query ? 'flex' : 'none';

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query);
      } else if (query.length === 0) {
        initializeFlipCards(); // Reset to default view
      }
    }, 300);
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.style.display = 'none';
    initializeFlipCards();
    searchInput.focus();
  });
}

function performSearch(query) {
  const allShortcuts = [...shortcuts, ...moreShortcuts, ...automationShortcuts, ...socialShortcuts];
  const userShortcuts = userShortcutManager.getShortcuts();
  const combinedShortcuts = [...allShortcuts, ...userShortcuts];

  const results = combinedShortcuts.filter(shortcut =>
    shortcut.name.toLowerCase().includes(query.toLowerCase()) ||
    shortcut.description.toLowerCase().includes(query.toLowerCase()) ||
    (shortcut.instructions && shortcut.instructions.some(instruction =>
      instruction.toLowerCase().includes(query.toLowerCase())
    ))
  ).slice(0, 6); // Limit to 6 results

  displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) return;

  appIconsGrid.innerHTML = '';

  if (results.length === 0) {
    appIconsGrid.innerHTML = `
      <div class="search-no-results">
        <span class="material-icons">search_off</span>
        <h3>No shortcuts found</h3>
        <p>Try searching for something else</p>
      </div>
    `;
    return;
  }

  results.forEach(shortcut => createFlipCardWidget(shortcut, appIconsGrid));

  // Show search results notification
  showIOSNotification(`Found ${results.length} shortcut${results.length !== 1 ? 's' : ''} for "${query}"`, 'search');
}

// --- HAPTIC FEEDBACK & LOADING STATES ---
function triggerHapticFeedback(type = 'light') {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      error: [100, 30, 100]
    };
    navigator.vibrate(patterns[type] || patterns.light);
  }
}

function showLoadingState(element, message = 'Loading...') {
  const originalContent = element.innerHTML;
  element.classList.add('loading-shimmer');
  element.innerHTML = `
    <div class="loading-spinner">
      <span class="material-icons rotating">autorenew</span>
      <span class="loading-text">${message}</span>
    </div>
  `;

  return () => {
    element.classList.remove('loading-shimmer');
    element.innerHTML = originalContent;
  };
}

function addPullToRefresh() {
  let startY = 0;
  let pullDistance = 0;
  const refreshThreshold = 80;
  const appContainer = document.querySelector('.app-container');
  const refreshIndicator = document.createElement('div');
  refreshIndicator.className = 'pull-refresh-indicator';
  refreshIndicator.innerHTML = '<span class="material-icons">refresh</span>';
  appContainer.prepend(refreshIndicator);

  document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (startY > 0) {
      pullDistance = e.touches[0].clientY - startY;
      if (pullDistance > 0) {
        const opacity = Math.min(pullDistance / refreshThreshold, 1);
        refreshIndicator.style.opacity = opacity;
        refreshIndicator.style.transform = `translateY(${Math.min(pullDistance * 0.5, 40)}px)`;
      }
    }
  });

  document.addEventListener('touchend', () => {
    if (pullDistance > refreshThreshold) {
      triggerHapticFeedback('medium');
      showIOSNotification('Refreshing shortcuts...', 'refresh');
      setTimeout(() => {
        initializeFlipCards();
        showIOSNotification('Shortcuts updated!', 'success');
      }, 1000);
    }

    refreshIndicator.style.opacity = '0';
    refreshIndicator.style.transform = 'translateY(0)';
    startY = 0;
    pullDistance = 0;
  });
}

// --- ENHANCED INTERACTIONS ---

function createFlipCardWidget(shortcut, container, isNew = false, isTemporary = false) {
  const widget = document.createElement('div');
  widget.className = 'shortcut-card';
  widget.setAttribute('role', 'button');
  widget.setAttribute('tabindex', '0');
  widget.setAttribute('aria-label', `Shortcut: ${shortcut.name}. Press to see instructions.`);
  widget.setAttribute('data-color', shortcut.colorScheme);
  widget.setAttribute('data-shortcut-id', shortcut.id);

  if (isTemporary) {
    widget.setAttribute('data-is-temporary', 'true');
  }

  // Custom shortcuts should start flipped
  let isFlipped = isNew || false;

  widget.innerHTML = `
    <div class="shortcut-card-front">
      <span class="shortcut-icon material-icons" aria-hidden="true">${shortcut.icon}</span>
      <span class="shortcut-name">${shortcut.name}</span>
      ${shortcut.isAIGenerated ? '<div class="ai-badge">auto_awesome</div>' : ''}
    </div>
    <div class="shortcut-card-back" aria-hidden="${!isFlipped}">
      <h3>${shortcut.name} ${shortcut.isAIGenerated ? '<span class="ai-tag">AI</span>' : ''}</h3>
      <div class="description">${shortcut.description}</div>
      <div class="instructions-title">How to create this shortcut:</div>
      <ol>${shortcut.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    </div>
  `;

  if (isFlipped) {
    widget.classList.add('flipped');
  }

  const toggleFlip = () => {
    if (currentlyFlippedCard && currentlyFlippedCard !== widget) {
      currentlyFlippedCard.classList.remove('flipped');
      currentlyFlippedCard.querySelector('.shortcut-card-back').setAttribute('aria-hidden', 'true');
    }
    isFlipped = !isFlipped;
    widget.classList.toggle('flipped', isFlipped);
    widget.querySelector('.shortcut-card-back').setAttribute('aria-hidden', !isFlipped);
    currentlyFlippedCard = isFlipped ? widget : null;
    updateShareButtonTitle();
  };

  widget.addEventListener('click', toggleFlip);
  widget.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  });

  // If it's a new custom card, set it as the active flipped card
  if (isNew) {
    if (currentlyFlippedCard && currentlyFlippedCard !== widget) {
        currentlyFlippedCard.classList.remove('flipped');
    }
    currentlyFlippedCard = widget;
    updateShareButtonTitle();
  }

  container.appendChild(widget);
  return widget;
}

function shuffleCards() {
  if (isShuffling) return;
  isShuffling = true;
  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) { isShuffling = false; return; }

  if (currentlyFlippedCard) {
    currentlyFlippedCard.classList.remove('flipped');
    currentlyFlippedCard = null;
    updateShareButtonTitle();
  }

  const newShortcuts = filterPreferences.generateFilteredSet();
  const hasAI = newShortcuts.some(s => s.isAIGenerated);
  showIOSNotification(hasAI ? 'Mixed content shuffled!' : 'Shortcuts shuffled!', hasAI ? 'ai-generated' : 'default');

  const existingCards = Array.from(appIconsGrid.children);
  existingCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'scale(0.8) rotateY(90deg)';
      card.style.opacity = '0';
    }, index * 50);
  });

  setTimeout(() => {
    appIconsGrid.innerHTML = '';
    newShortcuts.forEach((shortcut, index) => {
      setTimeout(() => {
        const widget = createFlipCardWidget(shortcut, appIconsGrid);
        widget.style.transform = 'scale(0.8) rotateY(-90deg)';
        widget.style.opacity = '0';
        setTimeout(() => {
          widget.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          widget.style.transform = 'scale(1) rotateY(0deg)';
          widget.style.opacity = '1';
        }, 50);
      }, index * 100);
    });
    setTimeout(() => { isShuffling = false; }, newShortcuts.length * 100 + 500);
  }, existingCards.length * 50 + 200);
}

function showIOSNotification(message, type = 'default') {
  document.querySelector('.ios-notification')?.remove();
  const notification = document.createElement('div');
  notification.className = `ios-notification ${type}`;
  const icon = type === 'error' ? 'error_outline' : (type === 'ai-generated' ? 'auto_awesome' : 'check_circle_outline');
  notification.innerHTML = `<span class="material-icons">${icon}</span> <p>${message}</p>`;
  document.querySelector('.screen-content').appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500);
  }, 4000); // Increased timeout
}

// --- MODAL & SHARING FUNCTIONS ---

async function showGenerateModal() {
  try {
    devLog.log('showGenerateModal called');
    await modalManager.loadModalCreator();
    const modal = await modalManager.modalCreator('generate', {
      userShortcuts: userShortcutManager.getShortcuts()
    });
    devLog.log('Generate modal created:', modal);

    if (!modal) {
      console.error('Generate modal element not found after creation.');
      return;
    }

    const promptInput = modal.querySelector('#shortcut-prompt-input');
    const difficultySlider = modal.querySelector('#difficulty-slider');
    const difficultyValue = modal.querySelector('#difficulty-value');
    const difficultyDescription = modal.querySelector('#difficulty-description');
    const modalBody = modal.querySelector('#generate-modal-body');

    // Difficulty slider descriptions
    const difficultyTexts = {
      1: {
        label: 'Beginner',
        description: 'Perfect for getting started - straightforward shortcuts with simple steps.'
      },
      2: {
        label: 'Intermediate',
        description: 'More sophisticated shortcuts with multiple actions and some customization.'
      },
      3: {
        label: 'Advanced',
        description: 'Complex automation with conditional logic, variables, and advanced features.'
      }
    };

    const updateDifficultyDisplay = () => {
      const level = difficultySlider.value;
      const text = difficultyTexts[level];
      difficultyValue.textContent = text.label;
      difficultyDescription.textContent = text.description;
    };

    const showPreview = (shortcut) => {
      modal.querySelector('#generate-step-1').style.display = 'none';
      const step2Content = modal.querySelector('#generate-step-2');

      step2Content.innerHTML = `
        <div class="shortcut-preview-container">
          <div class="shortcut-preview-header">
            <h3>Generated Shortcut Preview</h3>
            <p>Review your AI-generated shortcut below, then create it!</p>
          </div>

          <div class="shortcut-preview-card">
            <div class="shortcut-preview-front">
              <span class="material-icons shortcut-preview-icon" style="color: var(--ios-${shortcut.colorScheme})">${shortcut.icon}</span>
              <h4 class="shortcut-preview-name">${shortcut.name}</h4>
              <div class="ai-badge">auto_awesome</div>
            </div>

            <div class="shortcut-preview-details">
              <div class="shortcut-preview-description">
                <strong>Description:</strong>
                <p>${shortcut.description}</p>
              </div>

              <div class="shortcut-preview-instructions">
                <strong>How to create this shortcut:</strong>
                <ol>
                  ${shortcut.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
              </div>
            </div>
          </div>
        </div>
      `;

      step2Content.style.display = 'block';

      // Update modal actions
      const modalActions = modal.querySelector('#generate-modal-actions');
      modalActions.innerHTML = `
        <button class="modal-button secondary" id="generate-back-btn">
          <span class="material-icons">arrow_back</span>
          Back
        </button>
        <button class="modal-button secondary" id="regenerate-btn">
          <span class="material-icons">refresh</span>
          Regenerate
        </button>
        <button class="modal-button primary" id="create-shortcut-btn">
          <span class="material-icons">add</span>
          Create Shortcut
        </button>
      `;

      // Event listeners for new buttons
      modal.querySelector('#create-shortcut-btn').addEventListener('click', () => handleCreateShortcut(shortcut));
      modal.querySelector('#generate-back-btn').addEventListener('click', () => {
        modal.querySelector('#generate-step-1').style.display = 'block';
        step2Content.style.display = 'none';
        modalActions.innerHTML = `
          <button class="modal-button secondary" id="generate-cancel-btn">Cancel</button>
          <button class="modal-button primary" id="generate-ai-btn">
            <span class="material-icons">auto_awesome</span>
            Generate
          </button>
        `;
        modal.querySelector('#generate-ai-btn').addEventListener('click', handleAiGeneration);
        modal.querySelector('#generate-cancel-btn').addEventListener('click', closeModal);
      });
      modal.querySelector('#regenerate-btn').addEventListener('click', handleAiGeneration);
    };

    const handleAiGeneration = async () => {
      const prompt = promptInput.value;
      if (!prompt.trim()) {
        showIOSNotification('Please enter a shortcut idea to generate.', 'error');
        return;
      }

      const generateBtn = modal.querySelector('#generate-ai-btn') || modal.querySelector('#regenerate-btn');
      const originalContent = generateBtn.innerHTML;
      generateBtn.disabled = true;
      generateBtn.innerHTML = `<span class="spinner"></span>Generating...`;

      try {
        const difficultyLevel = ['beginner', 'intermediate', 'advanced'][difficultySlider.value - 1];
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const fullPrompt = `
          You are an expert iOS Shortcuts creator. Generate a complete shortcut based on this user request:

          User Request: "${prompt}"
          Complexity Level: ${difficultyLevel}

          Create a JSON object with this exact structure:
          {
            "name": "A concise, catchy name (max 25 chars)",
            "description": "Clear, user-friendly description (max 100 chars)",
            "instructions": ["Array of 3-8 step-by-step instructions for creating this shortcut in iOS Shortcuts app"],
            "icon": "material_icon_name",
            "colorScheme": "color_name"
          }

          Requirements:
          - For ${difficultyLevel} level: ${difficultyLevel === 'beginner' ? 'Use simple, straightforward actions. 3-5 steps max.' : difficultyLevel === 'intermediate' ? 'Include some automation and variables. 4-6 steps.' : 'Use advanced features like conditionals, loops, variables, and integrations. 5-8 steps.'}
          - Choose the most appropriate icon from: ${Object.values(materialIconLibrary).flat().join(', ')}
          - Choose color from: ${colorSchemes.join(', ')}
          - Instructions should be specific iOS Shortcuts app steps
          - Focus on practical, real-world utility

          Return ONLY the raw JSON object, no other text.
        `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();

        // Clean up the response text to extract JSON
        // Remove markdown code blocks if present
        text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
        // Remove any leading/trailing whitespace
        text = text.trim();

        // Find JSON object bounds if there's extra text
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          text = text.substring(jsonStart, jsonEnd + 1);
        }

        const generatedShortcut = JSON.parse(text);
        showPreview(generatedShortcut);

      } catch (error) {
        console.error("Error calling Gemini API:", error);
        showIOSNotification('Could not generate shortcut. Please try again.', 'error');
        generateBtn.disabled = false;
        generateBtn.innerHTML = originalContent;
      }
    };

    const handleCreateShortcut = (shortcut) => {
      devLog.log('handleCreateShortcut called');

      const newShortcut = {
        id: `custom_${Date.now()}`,
        name: shortcut.name,
        description: shortcut.description,
        instructions: shortcut.instructions,
        icon: shortcut.icon,
        colorScheme: shortcut.colorScheme,
        isCustom: true,
        isAIGenerated: true
      };

      userShortcutManager.addShortcut(newShortcut);

      const appIconsGrid = document.querySelector('.app-icons-grid');
      appIconsGrid.innerHTML = ''; // Clear the grid

      // Create a special single card container
      const singleCardContainer = document.createElement('div');
      singleCardContainer.className = 'single-shortcut-container';
      singleCardContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 24px;
        height: auto;
        min-height: 400px;
        flex: 1;
      `;

      appIconsGrid.appendChild(singleCardContainer);
      const temporaryCard = createFlipCardWidget(newShortcut, singleCardContainer, true, true);
      temporaryCard.style.cssText = `
        width: 100%;
        max-width: 320px;
        height: auto !important;
        min-height: 300px !important;
        max-height: none !important;
        margin: 0;
      `;

      modalManager.closeModal('generateModal');
      showIOSNotification('AI shortcut created!', 'ai-generated');
    };

    const closeModal = () => modalManager.closeModal('generateModal');

    // Initialize difficulty slider
    difficultySlider.addEventListener('input', updateDifficultyDisplay);
    updateDifficultyDisplay();

    modal.querySelector('#generate-ai-btn').addEventListener('click', handleAiGeneration);
    modal.querySelector('#generate-cancel-btn').addEventListener('click', closeModal);
    modal.querySelector('#generate-modal-close').addEventListener('click', closeModal);

    const clearBtn = modal.querySelector('#clear-user-shortcuts-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        userShortcutManager.clearShortcuts();
        modalManager.closeModal('generateModal');
        showGenerateModal();
        showIOSNotification('Cleared recent creations.', 'default');
      });
    }

    modal.querySelectorAll('.view-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const shortcutId = e.currentTarget.closest('.user-shortcut-item').dataset.shortcutId;
        const shortcutToView = userShortcutManager.getShortcutById(shortcutId);
        if (shortcutToView) {
          justViewedFromModal = true;
          const appIconsGrid = document.querySelector('.app-icons-grid');
          appIconsGrid.innerHTML = ''; // Clear the grid

          // Create a special single card container
          const singleCardContainer = document.createElement('div');
          singleCardContainer.className = 'single-shortcut-container';
          singleCardContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 24px;
            height: auto;
            min-height: 400px;
            flex: 1;
          `;

          appIconsGrid.appendChild(singleCardContainer);
          const temporaryCard = createFlipCardWidget(shortcutToView, singleCardContainer, true, true);
          temporaryCard.style.cssText = `
            width: 100%;
            max-width: 320px;
            height: auto !important;
            min-height: 300px !important;
            max-height: none !important;
            margin: 0;
          `;

          modalManager.closeModal('generateModal');
        }
      });
    });

    modal.querySelectorAll('.reuse-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const shortcutId = e.currentTarget.closest('.user-shortcut-item').dataset.shortcutId;
        const shortcutToReuse = userShortcutManager.getShortcutById(shortcutId);
        if (shortcutToReuse) {
          showPreview(shortcutToReuse);
        }
      });
    });

    devLog.log('Generate modal event listeners attached.');

  } catch (error) {
    console.error('Error in showGenerateModal:', error);
  }
}

async function openFilterModal() {
  try {
    devLog.log('openFilterModal called');
    await modalManager.loadModalCreator();
    const modal = await modalManager.modalCreator('filter', {
      categories: shortcutManager.aiGeneration.categories,
      preferences: filterPreferences.getPreferences()
    });
    devLog.log('Filter modal created:', modal);

    if (!modal) {
      console.error('Filter modal element not found after creation.');
      return;
    }

    const applyBtn = modal.querySelector('#apply-filters-btn');
    const cancelBtn = modal.querySelector('#filter-cancel-btn');
    const resetBtn = modal.querySelector('#filter-reset-btn');
    const closeBtn = modal.querySelector('#filter-modal-close');
    const aiToggle = modal.querySelector('#ai-enabled-toggle');
    const aiRatioSlider = modal.querySelector('#ai-ratio-slider');
    const aiRatioValue = modal.querySelector('#ai-ratio-value');
    const aiRatioSection = modal.querySelector('#ai-ratio-section');
    const categoryPills = modal.querySelectorAll('.category-pill');

    devLog.log('Filter modal elements:', { applyBtn, cancelBtn, resetBtn, closeBtn, aiToggle });

    const updateVisibility = () => {
      const showRatioSlider = aiToggle.checked;
      aiRatioSection.style.display = showRatioSlider ? 'block' : 'none';
    };

    // Category pill event listeners
    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
      });
    });

    aiToggle.addEventListener('change', updateVisibility);
    aiRatioSlider.addEventListener('input', () => {
      aiRatioValue.textContent = `${Math.round(aiRatioSlider.value * 100)}%`;
    });

    const handleApplyFilters = () => {
      const selectedCategories = Array.from(modal.querySelectorAll('.category-pill.selected'))
        .map(pill => pill.dataset.category);

      const newPrefs = {
        categories: selectedCategories,
        difficulty: modal.querySelector('#difficulty-select').value,
        aiEnabled: aiToggle.checked,
        aiRatio: parseFloat(aiRatioSlider.value)
      };

      filterPreferences.savePreferences(newPrefs);
      modalManager.closeModal('filterModal');
      showIOSNotification('Filters applied! Shuffling cards...', 'default');
      setTimeout(shuffleCards, 500);
    };

    const handleResetFilters = () => {
      const defaults = filterPreferences.getDefaults();

      // Reset category pills
      categoryPills.forEach(pill => {
        pill.classList.remove('selected');
      });

      // Reset other controls
      modal.querySelector('#difficulty-select').value = defaults.difficulty;
      aiToggle.checked = defaults.aiEnabled;
      aiRatioSlider.value = defaults.aiRatio;
      aiRatioValue.textContent = `${Math.round(defaults.aiRatio * 100)}%`;

      updateVisibility();
    };

    const closeModal = () => modalManager.closeModal('filterModal');

    applyBtn.addEventListener('click', handleApplyFilters);
    cancelBtn.addEventListener('click', closeModal);
    resetBtn.addEventListener('click', handleResetFilters);
    closeBtn.addEventListener('click', closeModal);

    devLog.log('Filter modal event listeners attached.');

    updateVisibility();
  } catch (error) {
    console.error('Error in openFilterModal:', error);
  }
}

async function handleConditionalShare() {
  const isCardFlipped = !!currentlyFlippedCard;
  let shortcutData = null;

  if (isCardFlipped) {
    const card = currentlyFlippedCard;
    shortcutData = {
      name: card.querySelector('.shortcut-card-back h3')?.textContent.replace(/AI$/, '').trim() || 'iOS Shortcut',
      description: card.querySelector('.shortcut-card-back .description')?.textContent || 'Check out this shortcut!',
      icon: card.querySelector('.shortcut-card-front .shortcut-icon')?.textContent || 'rocket_launch',
      instructions: Array.from(card.querySelectorAll('.shortcut-card-back ol li')).map(li => li.textContent)
    };
  }

  await modalManager.loadModalCreator();
  const modal = await modalManager.modalCreator('share', {
    isCardFlipped,
    shortcut: shortcutData
  });

  const closeModal = () => modalManager.closeModal('shareModal');

  modal.querySelector('#share-modal-close').addEventListener('click', closeModal);

  modal.querySelector('#native-share-btn').addEventListener('click', () => {
    const sharePayload = {
      title: isCardFlipped ? shortcutData.name : 'iOS Shortcut Wizard',
      text: isCardFlipped
        ? `Shortcut: ${shortcutData.name}\nDescription: ${shortcutData.description}\n\nInstructions:\n- ${shortcutData.instructions.join('\n- ')}`
        : 'Create powerful iOS shortcuts instantly!',
      url: isCardFlipped ? undefined : 'https://techtonicliving.com/ios-shortcuts-wizard'
    };
    navigator.share(sharePayload)
      .then(() => showIOSNotification('Shared successfully!', 'default'))
      .catch(err => {
        if (err.name !== 'AbortError') {
          showIOSNotification('Could not share.', 'error');
        }
      });
  });

  modal.querySelector('#copy-link-btn').addEventListener('click', (event) => {
    const btn = event.currentTarget;
    const textToCopy = isCardFlipped
      ? `Shortcut: ${shortcutData.name}\nDescription: ${shortcutData.description}\n\nInstructions:\n- ${shortcutData.instructions.join('\n- ')}`
      : `Create powerful iOS shortcuts instantly with the iOS Shortcut Wizard: https://techtonicliving.com/ios-shortcuts-wizard`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalContent = btn.innerHTML;
      btn.innerHTML = `<span class="material-icons">check</span> Copied!`;
      btn.classList.add('copied');
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('copied');
        btn.disabled = false;
      }, 2000);
    }).catch(() => {
      showIOSNotification('Failed to copy.', 'error');
    });
  });
}

function updateShareButtonTitle() {
  const shareBtn = document.querySelector('.dock-icons [data-action="share"]');
  if (shareBtn) {
    shareBtn.title = currentlyFlippedCard ? 'Share this Shortcut' : 'Share this App';
  }
}

// --- INITIALIZATION FUNCTIONS ---

function initializeFlipCards() {
  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) return;
  appIconsGrid.innerHTML = '';

  const initialShortcuts = shortcutManager.getNextSet();
  if (initialShortcuts.some(s => s.isAIGenerated)) {
    setTimeout(() => showIOSNotification('Mixed collection loaded!', 'ai-generated'), 500);
  }

  initialShortcuts.forEach(shortcut => createFlipCardWidget(shortcut, appIconsGrid));

  document.addEventListener('click', (event) => {
    if (justViewedFromModal) {
      justViewedFromModal = false;
      return;
    }
    if (!event.target.closest('.shortcut-card') && currentlyFlippedCard) {
      if (currentlyFlippedCard.dataset.isTemporary) {
        initializeFlipCards(); // Re-initialize the grid
      } else {
        currentlyFlippedCard.classList.remove('flipped');
        currentlyFlippedCard.querySelector('.shortcut-card-back').setAttribute('aria-hidden', 'true');
      }
      currentlyFlippedCard = null;
      updateShareButtonTitle();
    }
  });
  console.log('Flip cards initialized.');
}

function initializeDockButtons() {
  const actions = {
    shuffle: shuffleCards,
    filter: openFilterModal,
    share: handleConditionalShare,
    generate: showGenerateModal
  };
  document.querySelectorAll('.dock-icons [data-action]').forEach(btn => {
    const action = btn.dataset.action;
    if (actions[action]) {
      btn.addEventListener('click', (event) => {
        devLog.log(`Dock button clicked: ${action}`);
        event.preventDefault();
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 150);
        actions[action]();
      });
    }
  });
  const style = document.createElement('style');
  style.textContent = `.app-icon-dock.pressed { animation: dockPress 0.15s ease-in-out; } @keyframes dockPress { 0% { transform: scale(1); } 50% { transform: scale(0.9); } 100% { transform: scale(1); } }`;
  document.head.appendChild(style);
  devLog.log('Dock buttons initialized.');
}

function initializeAppInteractions() {
  window.showGenerateModal = showGenerateModal;
  window.openFilterModal = openFilterModal;
  window.handleConditionalShare = handleConditionalShare;
  window.shuffleCards = shuffleCards;
  console.log('Global functions exposed.');
}

function updateTime() {
  const timeElement = document.querySelector('.time');
  if (timeElement) {
    timeElement.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
}

function animateBattery() {
  const batteryLevel = document.querySelector('.battery-level');
  if (batteryLevel) batteryLevel.style.animation = 'charge 5s linear infinite alternate';
}

function animateSignalBars() {
  document.querySelectorAll('.signal-bar').forEach((bar, index) => {
    bar.style.animation = `pulse-signal 2s ease-in-out ${index * 0.2}s infinite`;
  });
}

// --- DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
  updateTime();
  setInterval(updateTime, 1000);
  animateBattery();
  animateSignalBars();
  initializeFlipCards();
  initializeDockButtons();
  initializeAppInteractions();
  initializeSearch(); // ✨ New search functionality
  addPullToRefresh(); // ✨ New pull-to-refresh

  // Add haptic feedback to all interactive elements
  document.querySelectorAll('.app-icon, .app-icon-dock, button').forEach(element => {
    element.addEventListener('click', () => triggerHapticFeedback('light'));
  });

  const iphoneFrame = document.querySelector('.iphone-frame');
  if (iphoneFrame) {
    iphoneFrame.addEventListener('mouseenter', () => { iphoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.02)'; });
    iphoneFrame.addEventListener('mouseleave', () => { iphoneFrame.style.transform = 'rotateX(2deg) rotateY(-2deg) scale(1)'; });
  }

  const dynamicIsland = document.querySelector('.dynamic-island');
  if (dynamicIsland) {
    dynamicIsland.addEventListener('click', () => {
      dynamicIsland.style.animation = 'none';
      setTimeout(() => { dynamicIsland.style.animation = 'pulse 3s ease-in-out infinite'; }, 100);
    });
  }
  devLog.log('All initialization complete!');
});
