import './iphone-ui.css'
import './figma-assets.css'
import './components/flip-cards.css'
import './components/widget-gradients.css'

// Add custom integration styles
const customStyles = `
  /* Integration styles for flip cards in app grid */
  .app-icons-grid .shortcut-card {
    width: 100%;
    height: 120px;
    min-height: 120px;
    max-width: 160px;
    margin: 0;
    position: relative;
    z-index: 1;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Flipped card fills entire grid container */
  .app-icons-grid .shortcut-card.flipped {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    z-index: 10;
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-radius: var(--widget-radius, 22px);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  /* Material Design 3 Two-Tone Icon Styling */
  .shortcut-card .shortcut-icon {
    font-family: 'Material Icons';
    font-size: 1.8rem;
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    margin: 0;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    align-self: flex-start;
    max-width: 1.8rem;
    max-height: 1.8rem;
    overflow: hidden;
  }

  /* Color Schemes for Entire Front Card */
  .shortcut-card[data-color="blue"] .shortcut-card-front {
    background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  .shortcut-card[data-color="purple"] .shortcut-card-front {
    background: linear-gradient(135deg, #AF52DE 0%, #8E44AD 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(175, 82, 222, 0.3);
  }

  .shortcut-card[data-color="orange"] .shortcut-card-front {
    background: linear-gradient(135deg, #FF9500 0%, #FF6B35 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);
  }

  .shortcut-card[data-color="green"] .shortcut-card-front {
    background: linear-gradient(135deg, #34C759 0%, #2ECC71 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(52, 199, 89, 0.3);
  }

  .shortcut-card[data-color="indigo"] .shortcut-card-front {
    background: linear-gradient(135deg, #5856D6 0%, #4834D4 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(88, 86, 214, 0.3);
  }

  .shortcut-card[data-color="red"] .shortcut-card-front {
    background: linear-gradient(135deg, #FF3B30 0%, #E74C3C 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 59, 48, 0.3);
  }

  /* Reset icon background since front card now has the color */
  .shortcut-card .shortcut-icon {
    background: transparent;
    color: inherit;
    box-shadow: none;
  }

  /* Solid background colors for card backs (matching front colors) */
  .shortcut-card[data-color="blue"] .shortcut-card-back {
    background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
  }

  .shortcut-card[data-color="purple"] .shortcut-card-back {
    background: linear-gradient(135deg, #AF52DE 0%, #8E44AD 100%);
  }

  .shortcut-card[data-color="orange"] .shortcut-card-back {
    background: linear-gradient(135deg, #FF9500 0%, #FF6B35 100%);
  }

  .shortcut-card[data-color="green"] .shortcut-card-back {
    background: linear-gradient(135deg, #34C759 0%, #2ECC71 100%);
  }

  .shortcut-card[data-color="indigo"] .shortcut-card-back {
    background: linear-gradient(135deg, #5856D6 0%, #4834D4 100%);
  }

  .shortcut-card[data-color="red"] .shortcut-card-back {
    background: linear-gradient(135deg, #FF3B30 0%, #E74C3C 100%);
  }

  /* Hover effects for entire front card */
  .shortcut-card:hover .shortcut-card-front {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  .shortcut-card:hover .shortcut-icon {
    transform: scale(1.05);
  }

  /* Front card layout and styling */
  .shortcut-card .shortcut-card-front {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    border-radius: var(--widget-radius, 22px);
    padding: 12px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
  }

  .shortcut-card .shortcut-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    text-align: left;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
    align-self: flex-start;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    hyphens: auto;
  }

  .shortcut-card .shortcut-instructions {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
  }

  .shortcut-card .shortcut-instructions h3 {
    font-size: 1.0rem;
    font-weight: 700;
    margin-bottom: 3px;
    color: white;
    text-align: left;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    width: 100%;
    word-wrap: break-word;
    hyphens: auto;
    line-height: 1.3;
  }

  .shortcut-card .shortcut-instructions .description {
    font-size: 0.7rem;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 8px;
    width: 100%;
    font-style: italic;
    word-wrap: break-word;
    hyphens: auto;
  }

  .shortcut-card .shortcut-instructions .instructions-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    margin-bottom: 5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .shortcut-card .shortcut-instructions ol {
    font-size: 0.65rem;
    line-height: 1.2;
    color: white;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    padding-left: 0;
    list-style: none;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    position: relative;
    margin: 0;
    max-height: calc(100% - 60px);
  }

  /* Webkit scrollbar styling for better cross-browser support */
  .shortcut-card .shortcut-instructions ol::-webkit-scrollbar {
    width: 4px;
  }

  .shortcut-card .shortcut-instructions ol::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }

  .shortcut-card .shortcut-instructions ol::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    transition: background 0.3s ease;
  }

  .shortcut-card .shortcut-instructions ol::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  /* Fade gradients for scroll indication */
  .shortcut-card .shortcut-instructions ol::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      transparent 100%);
    z-index: 1;
    pointer-events: none;
    margin-bottom: -12px;
  }

  .shortcut-card .shortcut-instructions ol::after {
    content: '';
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 12px;
    background: linear-gradient(to top,
      rgba(0, 0, 0, 0.1) 0%,
      transparent 100%);
    z-index: 1;
    pointer-events: none;
    margin-top: -12px;
  }

  .shortcut-card .shortcut-instructions li {
    margin-bottom: 3px;
    background: rgba(255, 255, 255, 0.12);
    padding: 4px 8px;
    border-radius: 5px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeInUp 0.3s ease-out forwards;
    opacity: 0;
    transform: translateY(10px);
    position: relative;
    counter-increment: step-counter;
    scroll-margin-top: 4px;
    scroll-margin-bottom: 4px;
    font-size: 0.65rem;
    line-height: 1.3;
    word-wrap: break-word;
    hyphens: auto;
    white-space: normal;
  }

  /* Scroll shadow effects for better depth perception */
  .shortcut-card .shortcut-instructions::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.05) 0%,
      transparent 100%);
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .shortcut-card .shortcut-instructions::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top,
      rgba(0, 0, 0, 0.05) 0%,
      transparent 100%);
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* Show scroll shadows when content is scrollable */
  .shortcut-card .shortcut-instructions ol:not(:first-child) ~ .shortcut-card .shortcut-instructions::before,
  .shortcut-card .shortcut-instructions:hover::before,
  .shortcut-card .shortcut-instructions:hover::after {
    opacity: 1;
  }

  .shortcut-card .shortcut-instructions li:before {
    content: counter(step-counter);
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.25);
    color: white;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 600;
  }

  .shortcut-card .shortcut-instructions ol {
    counter-reset: step-counter;
  }

  .shortcut-card .shortcut-instructions li:nth-child(1) { animation-delay: 0.1s; }
  .shortcut-card .shortcut-instructions li:nth-child(2) { animation-delay: 0.2s; }
  .shortcut-card .shortcut-instructions li:nth-child(3) { animation-delay: 0.3s; }
  .shortcut-card .shortcut-instructions li:nth-child(4) { animation-delay: 0.4s; }
  .shortcut-card .shortcut-instructions li:nth-child(5) { animation-delay: 0.5s; }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .shortcut-card .shortcut-name {
      color: #fff;
    }
  }

  /* AI-Generated Content Indicators */
  .ai-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 0.6rem;
    padding: 0 1px 1px 0;
    opacity: 0.8;
    z-index: 2;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
  }

  .ai-tag {
    font-size: 0.6rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 1px 4px;
    border-radius: 6px;
    margin-left: 6px;
    margin-bottom: 2px;
    font-weight: 500;
  }

  /* Enhanced notification styles for AI content */
  .ios-notification.ai-generated {
    background: linear-gradient(135deg, rgba(88, 86, 214, 0.9) 0%, rgba(175, 82, 222, 0.9) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

// Inject custom styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

// Sample iOS shortcuts data with Material Design 3 two-tone icons
const shortcuts = [
  {
    id: 1,
    name: "Take camera burst photos",
    icon: "photo_camera",
    iconType: "material-two-tone",
    colorScheme: "blue",
    description: "Quickly capture multiple photos in burst mode to get the perfect shot, especially useful for moving subjects or group photos.",
    instructions: [
      "Open the Shortcuts app on your iPhone",
      "Tap the '+' button to create a new shortcut",
      "Search for 'Open App' action and add it",
      "Select 'Camera' as the app to open",
      "Add 'Wait' action and set to 1 second",
      "Add 'Take Photo' action",
      "Set photo count to 'Ask for Input'",
      "Name your shortcut and save"
    ]
  },
  {
    id: 2,
    name: "Set music sleep timer",
    icon: "music_note",
    iconType: "material-two-tone",
    colorScheme: "purple",
    description: "Automatically stop music playback after a specified time, perfect for falling asleep to your favorite tunes without draining battery.",
    instructions: [
      "Open the Shortcuts app",
      "Create a new shortcut with '+'",
      "Add 'Ask for Input' action (Number type)",
      "Set prompt to 'Sleep timer (minutes)'",
      "Add 'Calculate' action: Provided Input × 60",
      "Add 'Start Timer' action using calculated seconds",
      "Add 'Wait for Timer to Finish' action",
      "Add 'Pause Media' action",
      "Name it 'Sleep Timer' and save"
    ]
  },
  {
    id: 3,
    name: "Create quick note",
    icon: "edit_note",
    iconType: "material-two-tone",
    colorScheme: "orange",
    description: "Instantly create and save a note with voice or text input, bypassing the need to navigate through the Notes app interface.",
    instructions: [
      "Open Shortcuts app and tap '+'",
      "Add 'Ask for Input' action",
      "Set input type to 'Text'",
      "Change prompt to 'What's on your mind?'",
      "Add 'Create Note' action",
      "Connect the text input to note content",
      "Add current date/time if desired",
      "Name shortcut 'Quick Note' and save",
      "Add to Home Screen for easy access"
    ]
  },
  {
    id: 4,
    name: "Find my device",
    icon: "my_location",
    iconType: "material-two-tone",
    colorScheme: "green",
    description: "Locate your iPhone, iPad, or other Apple devices by making them play a sound, even when they're on silent mode.",
    instructions: [
      "Open Shortcuts and create new shortcut",
      "Add 'Find My' action from suggestions",
      "Select 'Play Sound on Device'",
      "Choose 'Ask Each Time' for device selection",
      "Add 'Show Notification' action",
      "Set message to 'Playing sound on device...'",
      "Test the shortcut with your devices",
      "Name it 'Find Device' and save",
      "Add to Control Center for quick access"
    ]
  },
  {
    id: 5,
    name: "Enable dark mode",
    icon: "dark_mode",
    iconType: "material-two-tone",
    colorScheme: "indigo",
    description: "Toggle between light and dark mode appearance settings instantly, perfect for different lighting conditions throughout the day.",
    instructions: [
      "Open Shortcuts app",
      "Tap '+' to create new shortcut",
      "Search for 'Set Appearance' action",
      "Add the action to your shortcut",
      "Choose 'Toggle' for the appearance setting",
      "Add 'Show Notification' action",
      "Set message to 'Appearance toggled'",
      "Name shortcut 'Toggle Dark Mode'",
      "Save and add to Home Screen"
    ]
  },
  {
    id: 6,
    name: "Set smart alarm",
    icon: "alarm",
    iconType: "material-two-tone",
    colorScheme: "red",
    description: "Create intelligent alarms that adapt to your schedule, with custom sounds and snooze options for a gentler wake-up experience.",
    instructions: [
      "Open Shortcuts and tap '+'",
      "Add 'Ask for Input' for wake-up time",
      "Set input type to 'Date and Time'",
      "Add 'Format Date' action",
      "Add 'Create Alarm' action",
      "Connect formatted time to alarm time",
      "Add 'Set Alarm Label' action",
      "Set label to 'Smart Wake-Up'",
      "Name shortcut and save"
    ]
  }
];

// Additional shortcuts examples (ready to use for shuffling)
const moreShortcuts = [
  {
    id: 7,
    name: "Video Call",
    icon: "video_call",
    iconType: "material-two-tone",
    colorScheme: "blue",
    description: "Start video calls with friends and family instantly using FaceTime or your preferred video calling app.",
    instructions: [
      "Open FaceTime app from Home Screen",
      "Tap '+' button to start new call",
      "Select contact from your contacts list",
      "Tap video call button to begin",
      "Wait for connection to establish",
      "Enjoy your video conversation"
    ]
  },
  {
    id: 8,
    name: "Fitness Track",
    icon: "fitness_center",
    iconType: "material-two-tone",
    colorScheme: "green",
    description: "Track your workouts and fitness activities with detailed metrics and progress monitoring.",
    instructions: [
      "Open Health app on your device",
      "Tap 'Browse' tab at bottom",
      "Select 'Activity' category",
      "Choose 'Workouts' option",
      "Tap 'Add Workout' button",
      "Select workout type from list",
      "Start new workout session"
    ]
  },
  {
    id: 9,
    name: "Shopping List",
    icon: "shopping_cart",
    iconType: "material-two-tone",
    colorScheme: "purple",
    description: "Create and manage shopping lists with smart suggestions and shared access for family members.",
    instructions: [
      "Open Reminders app",
      "Tap 'Add List' at bottom",
      "Name it 'Shopping List'",
      "Tap 'Done' to create",
      "Add items with '+' button",
      "Check off items when purchased",
      "Share list with family if needed"
    ]
  },
  {
    id: 10,
    name: "Travel Plans",
    icon: "flight",
    iconType: "material-two-tone",
    colorScheme: "orange",
    description: "Plan your trips with route optimization, travel time estimates, and location bookmarking.",
    instructions: [
      "Open Maps app from Home Screen",
      "Search for your destination",
      "Tap 'Directions' button",
      "Choose transportation method",
      "Review route options",
      "Tap 'Go' to start navigation",
      "Save to favorites for future use"
    ]
  },
  {
    id: 11,
    name: "Voice Memo",
    icon: "mic",
    iconType: "material-two-tone",
    colorScheme: "red",
    description: "Record voice memos, interviews, or important conversations with high-quality audio capture.",
    instructions: [
      "Open Voice Memos app",
      "Tap red record button",
      "Speak clearly into microphone",
      "Tap stop when finished",
      "Name your recording",
      "Save to device storage",
      "Share or transcribe as needed"
    ]
  },
  {
    id: 12,
    name: "Weather Check",
    icon: "cloud",
    iconType: "material-two-tone",
    colorScheme: "indigo",
    description: "Get detailed weather forecasts, alerts, and conditions for your current location or any city worldwide.",
    instructions: [
      "Open Weather app",
      "Allow location access",
      "View current conditions",
      "Scroll for hourly forecast",
      "Tap '+' to add cities",
      "Set weather notifications",
      "Check radar for precipitation"
    ]
  }
];

// Set 3: Automation & Smart Home
const automationShortcuts = [
  {
    id: 13,
    name: "Smart Lights",
    icon: "lightbulb",
    iconType: "material-two-tone",
    colorScheme: "blue",
    description: "Control your smart lights and create custom lighting scenes for different times of day and activities.",
    instructions: [
      "Open Shortcuts app and tap '+'",
      "Add 'Control Home' action",
      "Select your smart lights",
      "Choose 'Set Scene' option",
      "Create scenes for morning, work, evening",
      "Add 'Ask for Input' to choose scene",
      "Name it 'Smart Lighting' and save",
      "Add to Home Screen for quick access"
    ]
  },
  {
    id: 14,
    name: "Morning Routine",
    icon: "wb_sunny",
    iconType: "material-two-tone",
    colorScheme: "orange",
    description: "Automate your morning routine with weather, calendar, news, and smart home controls all in one shortcut.",
    instructions: [
      "Create new shortcut in Shortcuts app",
      "Add 'Get Current Weather' action",
      "Add 'Get Upcoming Events' action",
      "Add 'Get Contents of URL' for news",
      "Add 'Control Home' for lights/thermostat",
      "Add 'Speak Text' to announce info",
      "Set up automation to run at wake time",
      "Test and adjust based on your needs"
    ]
  },
  {
    id: 15,
    name: "Do Not Disturb",
    icon: "do_not_disturb",
    iconType: "material-two-tone",
    colorScheme: "purple",
    description: "Smart Do Not Disturb that adapts to your location, calendar events, and time of day automatically.",
    instructions: [
      "Open Shortcuts and create new shortcut",
      "Add 'Set Focus' action",
      "Choose 'Do Not Disturb' focus",
      "Add 'Get Calendar Events' action",
      "Add conditional logic for meeting times",
      "Set location-based triggers",
      "Add exceptions for important contacts",
      "Create automation rules for automatic activation"
    ]
  },
  {
    id: 16,
    name: "Security Mode",
    icon: "security",
    iconType: "material-two-tone",
    colorScheme: "red",
    description: "Activate security cameras, lock doors, set alarms, and send location to emergency contacts with one tap.",
    instructions: [
      "Create new shortcut for security",
      "Add 'Control Home' for smart locks",
      "Add 'Control Home' for security cameras",
      "Add 'Get Current Location' action",
      "Add 'Send Message' to emergency contacts",
      "Add 'Set Alarm' for specified time",
      "Test all security device connections",
      "Add to Control Center for quick access"
    ]
  },
  {
    id: 17,
    name: "Bedtime Setup",
    icon: "bedtime",
    iconType: "material-two-tone",
    colorScheme: "indigo",
    description: "Perfect bedtime routine that dims lights, sets alarms, plays sleep sounds, and activates sleep mode.",
    instructions: [
      "Open Shortcuts app",
      "Add 'Set Alarm' action with wake time",
      "Add 'Control Home' to dim all lights",
      "Add 'Set Focus' to Sleep mode",
      "Add 'Play Podcast' or sleep sounds",
      "Add 'Set Do Not Disturb' until morning",
      "Add 'Charge Point' reminder action",
      "Schedule to run automatically at bedtime"
    ]
  },
  {
    id: 18,
    name: "Car Mode",
    icon: "directions_car",
    iconType: "material-two-tone",
    colorScheme: "green",
    description: "Automatically optimize your phone for driving with navigation, music, and hands-free messaging setup.",
    instructions: [
      "Create shortcut for driving mode",
      "Add 'Set Focus' to Driving focus",
      "Add 'Open App' action for Maps",
      "Add 'Play Music' from preferred app",
      "Add 'Announce Messages' setting",
      "Set up voice control activation",
      "Add location automation for car",
      "Test voice commands and adjustments"
    ]
  }
];

// Set 4: Social & Communication
const socialShortcuts = [
  {
    id: 19,
    name: "Quick Share",
    icon: "share",
    iconType: "material-two-tone",
    colorScheme: "blue",
    description: "Instantly share photos, links, or text to multiple social platforms with custom messages for each.",
    instructions: [
      "Open Shortcuts and create new shortcut",
      "Add 'Select Photos' or 'Get Clipboard'",
      "Add 'Ask for Input' for caption text",
      "Add 'Share' action for Instagram",
      "Add 'Share' action for Twitter/X",
      "Add 'Share' action for Facebook",
      "Customize message for each platform",
      "Test sharing flow and save shortcut"
    ]
  },
  {
    id: 20,
    name: "Group Message",
    icon: "groups",
    iconType: "material-two-tone",
    colorScheme: "green",
    description: "Send coordinated messages to different groups (family, work, friends) with location and arrival times.",
    instructions: [
      "Create new messaging shortcut",
      "Add 'Ask for Input' to choose group",
      "Add 'Get Current Location' action",
      "Add 'Get Estimated Travel Time' if needed",
      "Add conditional logic for group selection",
      "Add 'Send Message' to family group",
      "Add 'Send Message' to work group",
      "Customize messages for each group type"
    ]
  },
  {
    id: 21,
    name: "Social Check-in",
    icon: "location_on",
    iconType: "material-two-tone",
    colorScheme: "orange",
    description: "Check into locations on social media with photos, ratings, and automatic friend tagging suggestions.",
    instructions: [
      "Open Shortcuts app",
      "Add 'Get Current Location' action",
      "Add 'Search Local Businesses' nearby",
      "Add 'Take Photo' for check-in image",
      "Add 'Ask for Input' for rating/review",
      "Add 'Share' to social media apps",
      "Add location tags and friend suggestions",
      "Save and test at different locations"
    ]
  },
  {
    id: 22,
    name: "Emergency Contact",
    icon: "emergency",
    iconType: "material-two-tone",
    colorScheme: "red",
    description: "Quickly contact emergency contacts with your location, medical info, and current situation details.",
    instructions: [
      "Create emergency communication shortcut",
      "Add 'Get Current Location' action",
      "Add 'Get Contents of URL' for medical ID",
      "Add 'Ask for Input' for situation details",
      "Add 'Send Message' to emergency contact 1",
      "Add 'Send Message' to emergency contact 2",
      "Add 'Call' action as backup option",
      "Test thoroughly and add to Lock Screen"
    ]
  },
  {
    id: 23,
    name: "Event Invite",
    icon: "event",
    iconType: "material-two-tone",
    colorScheme: "purple",
    description: "Create and send calendar invites with location details, agenda, and automatic reminder setup.",
    instructions: [
      "Open Shortcuts for event creation",
      "Add 'Ask for Input' for event details",
      "Add 'Ask for Input' for date and time",
      "Add 'Search Local Businesses' for venue",
      "Add 'Create Calendar Event' action",
      "Add 'Send Message' with event details",
      "Add 'Add to Calendar' for attendees",
      "Set up automatic reminders and confirmations"
    ]
  },
  {
    id: 24,
    name: "Social Break",
    icon: "timer_off",
    iconType: "material-two-tone",
    colorScheme: "indigo",
    description: "Take intentional breaks from social media with app blocking, mindfulness reminders, and alternative activities.",
    instructions: [
      "Create digital wellbeing shortcut",
      "Add 'Set Focus' to block social apps",
      "Add 'Start Timer' for break duration",
      "Add 'Open App' for meditation/reading",
      "Add 'Show Notification' with mindfulness quote",
      "Add 'Get Suggested Actions' for offline activities",
      "Set up automatic reactivation after break",
      "Track break frequency and duration"
    ]
  }
];

/**
 * Material Design 3 Icon Library for Shortcuts
 * Curated selection of two-tone icons perfect for iOS shortcuts
 */
const materialIconLibrary = {
  // Communication & Social
  communication: ['chat', 'email', 'phone', 'video_call', 'contacts', 'message'],

  // Media & Entertainment
  media: ['photo_camera', 'music_note', 'play_circle', 'movie', 'headphones', 'mic'],

  // Productivity & Tools
  productivity: ['edit_note', 'event', 'schedule', 'timer', 'alarm', 'calculator'],

  // Navigation & Location
  navigation: ['my_location', 'map', 'directions', 'place', 'navigation', 'explore'],

  // System & Settings
  system: ['settings', 'dark_mode', 'wifi', 'bluetooth', 'battery_full', 'volume_up'],

  // Health & Fitness
  health: ['fitness_center', 'favorite', 'self_improvement', 'spa', 'sports', 'run_circle'],

  // Shopping & Finance
  shopping: ['shopping_cart', 'payment', 'local_atm', 'receipt', 'account_balance', 'savings'],

  // Travel & Transport
  travel: ['flight', 'hotel', 'local_taxi', 'train', 'directions_car', 'luggage']
};

/**
 * Color schemes for Material Design icons
 */
const colorSchemes = ['blue', 'purple', 'orange', 'green', 'indigo', 'red'];

/**
 * Helper function to create a new shortcut with Material Design icon
 * @param {string} name - Shortcut name
 * @param {string} icon - Material Design icon name
 * @param {string} colorScheme - Color scheme (blue, purple, orange, green, indigo, red)
 * @param {Array} instructions - Step-by-step instructions
 * @returns {Object} Formatted shortcut object
 */
function createShortcut(name, icon, colorScheme, instructions) {
  return {
    id: Date.now() + Math.random(), // Simple unique ID
    name,
    icon,
    iconType: "material-two-tone",
    colorScheme,
    instructions
  };
}

/**
 * Global flip card state management
 */
let currentlyFlippedCard = null;
let currentShortcutSet = 1; // Track which set is currently displayed (1-4, or 5+ for AI)
let isShuffling = false; // Prevent multiple shuffles at once

/**
 * Shortcut Management System
 * Handles static library + AI generation hybrid approach
 */
const shortcutManager = {
  // All static shortcut sets
  staticSets: [
    shortcuts,           // Set 1: Essential shortcuts
    moreShortcuts,       // Set 2: Communication & media
    automationShortcuts, // Set 3: Automation & smart home
    socialShortcuts      // Set 4: Social & communication
  ],

  // Track which sets have been shown
  shownSets: new Set(),

  // AI generation system (Phase 2)
  aiGeneration: {
    enabled: true, // Phase 2 activated!
    categories: ['productivity', 'health', 'entertainment', 'travel', 'photography', 'finance', 'smart-home', 'social', 'security', 'wellness'],
    difficulty: 'beginner', // beginner, intermediate, advanced

    // AI shortcut generation templates - Expanded for variety
    templates: {
      productivity: [
        {
          name: "Focus Session Timer",
          icon: "timer",
          colorScheme: "blue",
          description: "Create focused work sessions with custom break intervals, app blocking, and productivity tracking.",
          baseInstructions: [
            "Open Shortcuts app and create new shortcut",
            "Add 'Ask for Input' for session duration",
            "Add 'Set Focus' to Work focus mode",
            "Add 'Start Timer' with input duration",
            "Add 'Show Notification' when timer ends",
            "Add 'Set Focus' to off when complete"
          ]
        },
        {
          name: "Email Digest",
          icon: "mail",
          colorScheme: "orange",
          description: "Get a smart summary of important emails with priority filtering and quick action buttons.",
          baseInstructions: [
            "Create new shortcut for email management",
            "Add 'Get Mail' action for inbox",
            "Add 'Filter Items' for unread emails",
            "Add 'Get Text from Input' for subjects",
            "Add 'Show Notification' with count",
            "Add 'Ask for Input' for quick replies"
          ]
        },
        {
          name: "Task Scheduler",
          icon: "schedule",
          colorScheme: "green",
          description: "Automatically schedule tasks based on priority, deadlines, and available time slots.",
          baseInstructions: [
            "Open Shortcuts and create new automation",
            "Add 'Get Calendar Events' for today",
            "Add 'Ask for Input' for task details",
            "Add 'Calculate' optimal time slot",
            "Add 'Create Calendar Event' for task",
            "Add 'Set Reminder' before task starts"
          ]
        },
        {
          name: "Meeting Prep",
          icon: "groups",
          colorScheme: "purple",
          description: "Prepare for meetings by gathering agenda, participants, and relevant documents automatically.",
          baseInstructions: [
            "Create meeting preparation shortcut",
            "Add 'Get Calendar Events' for next meeting",
            "Add 'Get Contacts' for attendees",
            "Add 'Search Files' for relevant docs",
            "Add 'Create Note' with meeting prep",
            "Add 'Send Message' to confirm attendance"
          ]
        },
        {
          name: "Expense Reporter",
          icon: "receipt",
          colorScheme: "red",
          description: "Quickly log business expenses with receipt photos and automatic categorization.",
          baseInstructions: [
            "Open Shortcuts for expense tracking",
            "Add 'Take Photo' for receipt",
            "Add 'Ask for Input' for amount",
            "Add 'Ask for Input' for category",
            "Add 'Create Note' in expense log",
            "Add 'Send Email' to accounting"
          ]
        },
        {
          name: "Document Scanner",
          icon: "scanner",
          colorScheme: "indigo",
          description: "Scan documents with OCR text recognition and automatic cloud storage.",
          baseInstructions: [
            "Create document scanning shortcut",
            "Add 'Take Photo' action",
            "Add 'Extract Text' from image",
            "Add 'Create Note' with extracted text",
            "Add 'Save to Files' in cloud folder",
            "Add 'Share' via preferred method"
          ]
        }
      ],
      health: [
        {
          name: "Hydration Tracker",
          icon: "local_drink",
          colorScheme: "blue",
          description: "Track daily water intake with smart reminders and personalized hydration goals.",
          baseInstructions: [
            "Open Shortcuts app",
            "Add 'Ask for Input' for water amount",
            "Add 'Log Health Sample' for water",
            "Add 'Get Health Sample' for daily total",
            "Add 'Calculate' daily progress percentage",
            "Add 'Show Notification' with progress"
          ]
        },
        {
          name: "Mood Check-in",
          icon: "sentiment_satisfied",
          colorScheme: "green",
          description: "Daily mood tracking with contextual questions and wellness recommendations.",
          baseInstructions: [
            "Create new wellness shortcut",
            "Add 'Ask for Input' with mood options",
            "Add 'Ask for Input' for mood notes",
            "Add 'Log Health Sample' for mood data",
            "Add 'Show Notification' with affirmation",
            "Add 'Open App' for meditation if needed"
          ]
        },
        {
          name: "Sleep Optimizer",
          icon: "bedtime",
          colorScheme: "purple",
          description: "Optimize sleep schedule with smart bedtime reminders and sleep quality tracking.",
          baseInstructions: [
            "Open Shortcuts for sleep tracking",
            "Add 'Ask for Input' for target bedtime",
            "Add 'Set Alarm' for optimal wake time",
            "Add 'Set Do Not Disturb' sleep mode",
            "Add 'Log Health Sample' for sleep data",
            "Add 'Control Home' to dim lights"
          ]
        },
        {
          name: "Workout Logger",
          icon: "fitness_center",
          colorScheme: "orange",
          description: "Log workouts with exercise tracking, rep counting, and progress monitoring.",
          baseInstructions: [
            "Create fitness tracking shortcut",
            "Add 'Ask for Input' for workout type",
            "Add 'Start Timer' for workout duration",
            "Add 'Ask for Input' for sets and reps",
            "Add 'Log Health Sample' for workout",
            "Add 'Show Notification' with achievement"
          ]
        },
        {
          name: "Meditation Guide",
          icon: "self_improvement",
          colorScheme: "indigo",
          description: "Start guided meditation sessions with breathing exercises and mindfulness tracking.",
          baseInstructions: [
            "Open mindfulness shortcut",
            "Add 'Ask for Input' for session length",
            "Add 'Play Podcast' for guided meditation",
            "Add 'Start Timer' for session duration",
            "Add 'Log Health Sample' for mindfulness",
            "Add 'Show Notification' with wisdom quote"
          ]
        },
        {
          name: "Calorie Counter",
          icon: "restaurant",
          colorScheme: "red",
          description: "Quick calorie logging with food recognition and nutritional information lookup.",
          baseInstructions: [
            "Create nutrition tracking shortcut",
            "Add 'Take Photo' of food item",
            "Add 'Ask for Input' for food details",
            "Add 'Get Contents of URL' for nutrition data",
            "Add 'Log Health Sample' for calories",
            "Add 'Calculate' daily calorie progress"
          ]
        }
      ],
      entertainment: [
        {
          name: "Movie Night Planner",
          icon: "movie",
          colorScheme: "purple",
          description: "Discover movies based on mood, set up viewing environment, and invite friends automatically.",
          baseInstructions: [
            "Open Shortcuts for entertainment",
            "Add 'Ask for Input' for movie genre",
            "Add 'Get Contents of URL' for recommendations",
            "Add 'Control Home' to dim lights",
            "Add 'Send Message' to invite friends",
            "Add 'Set Do Not Disturb' for movie time"
          ]
        },
        {
          name: "Playlist Creator",
          icon: "queue_music",
          colorScheme: "orange",
          description: "Create dynamic playlists based on mood, activity, or time of day with smart recommendations.",
          baseInstructions: [
            "Create music curation shortcut",
            "Add 'Ask for Input' for mood or activity",
            "Add 'Get My Music' from library",
            "Add 'Filter Items' by genre/mood",
            "Add 'Create Playlist' with selections",
            "Add 'Play Music' from new playlist"
          ]
        },
        {
          name: "Podcast Queue",
          icon: "podcasts",
          colorScheme: "blue",
          description: "Automatically queue podcasts based on commute time, interests, and listening history.",
          baseInstructions: [
            "Open podcast management shortcut",
            "Add 'Get Travel Time' for commute",
            "Add 'Search Podcasts' by topic",
            "Add 'Filter Items' by duration",
            "Add 'Create Playlist' for queue",
            "Add 'Play Podcast' from queue"
          ]
        },
        {
          name: "Game Launcher",
          icon: "sports_esports",
          colorScheme: "green",
          description: "Quick access to games with friend notifications and achievement tracking.",
          baseInstructions: [
            "Create gaming shortcut",
            "Add 'Ask for Input' for game type",
            "Add 'Open App' for selected game",
            "Add 'Send Message' to gaming friends",
            "Add 'Get Health Sample' for screen time",
            "Add 'Set Timer' for gaming session"
          ]
        },
        {
          name: "Photo Slideshow",
          icon: "slideshow",
          colorScheme: "indigo",
          description: "Create automatic slideshows from recent photos with music and sharing options.",
          baseInstructions: [
            "Open photo presentation shortcut",
            "Add 'Get Photos' from recent albums",
            "Add 'Filter Items' by date or location",
            "Add 'Create Video' from photos",
            "Add 'Add Music' to slideshow",
            "Add 'Share' via preferred method"
          ]
        },
        {
          name: "Event Finder",
          icon: "event_available",
          colorScheme: "red",
          description: "Discover local events, concerts, and activities based on interests and location.",
          baseInstructions: [
            "Create event discovery shortcut",
            "Add 'Get Current Location' action",
            "Add 'Get Contents of URL' for event data",
            "Add 'Filter Items' by interest tags",
            "Add 'Create Calendar Event' for selected",
            "Add 'Send Message' to share with friends"
          ]
        }
      ],
      travel: [
        {
          name: "Trip Packing List",
          icon: "luggage",
          colorScheme: "orange",
          description: "Generate smart packing lists based on destination weather, trip duration, and activities.",
          baseInstructions: [
            "Create travel preparation shortcut",
            "Add 'Ask for Input' for destination",
            "Add 'Get Current Weather' for location",
            "Add 'Ask for Input' for trip duration",
            "Add 'Create Note' with packing list",
            "Add 'Add to Reminders' for packing items"
          ]
        },
        {
          name: "Flight Tracker",
          icon: "flight",
          colorScheme: "blue",
          description: "Track flight status, gate changes, and delays with automatic notifications.",
          baseInstructions: [
            "Open flight monitoring shortcut",
            "Add 'Ask for Input' for flight number",
            "Add 'Get Contents of URL' for flight data",
            "Add 'Create Calendar Event' for flight",
            "Add 'Set Location Reminder' for airport",
            "Add 'Send Message' with flight updates"
          ]
        },
        {
          name: "Local Explorer",
          icon: "explore",
          colorScheme: "green",
          description: "Discover nearby attractions, restaurants, and activities with reviews and directions.",
          baseInstructions: [
            "Create exploration shortcut",
            "Add 'Get Current Location' action",
            "Add 'Search Local Businesses' nearby",
            "Add 'Filter Items' by category",
            "Add 'Get Directions' to selected place",
            "Add 'Create Note' with recommendations"
          ]
        },
        {
          name: "Hotel Booker",
          icon: "hotel",
          colorScheme: "purple",
          description: "Find and compare hotel deals with automatic booking and itinerary management.",
          baseInstructions: [
            "Open accommodation shortcut",
            "Add 'Ask for Input' for destination",
            "Add 'Ask for Input' for check-in dates",
            "Add 'Get Contents of URL' for hotel deals",
            "Add 'Create Calendar Event' for stay",
            "Add 'Add to Wallet' for confirmation"
          ]
        },
        {
          name: "Currency Converter",
          icon: "currency_exchange",
          colorScheme: "indigo",
          description: "Real-time currency conversion with spending tracking for international travel.",
          baseInstructions: [
            "Create currency conversion shortcut",
            "Add 'Ask for Input' for amount",
            "Add 'Ask for Input' for currencies",
            "Add 'Get Contents of URL' for exchange rates",
            "Add 'Calculate' converted amount",
            "Add 'Show Notification' with result"
          ]
        },
        {
          name: "Travel Journal",
          icon: "book",
          colorScheme: "red",
          description: "Create travel diary entries with photos, locations, and memorable moments.",
          baseInstructions: [
            "Open travel journaling shortcut",
            "Add 'Get Current Location' action",
            "Add 'Take Photo' for memory",
            "Add 'Ask for Input' for journal entry",
            "Add 'Create Note' with location data",
            "Add 'Share' to social media if desired"
          ]
        }
      ],
      photography: [
        {
          name: "Golden Hour Alert",
          icon: "wb_twilight",
          colorScheme: "red",
          description: "Get notifications for perfect lighting conditions and automatically prepare camera settings.",
          baseInstructions: [
            "Open Shortcuts for photography",
            "Add 'Get Current Location' action",
            "Add 'Get Contents of URL' for sunset data",
            "Add 'Calculate' golden hour times",
            "Add 'Create Calendar Event' for reminder",
            "Add 'Open App' action for Camera"
          ]
        },
        {
          name: "Photo Organizer",
          icon: "photo_library",
          colorScheme: "blue",
          description: "Automatically organize photos by location, date, and content with smart albums.",
          baseInstructions: [
            "Create photo management shortcut",
            "Add 'Get Photos' from recent",
            "Add 'Get Details of Images' for metadata",
            "Add 'Filter Items' by location/date",
            "Add 'Create Album' for organization",
            "Add 'Show Notification' with summary"
          ]
        },
        {
          name: "Portrait Mode",
          icon: "portrait",
          colorScheme: "green",
          description: "Quick access to portrait photography with optimal settings and composition guides.",
          baseInstructions: [
            "Open portrait photography shortcut",
            "Add 'Open App' for Camera app",
            "Add 'Set Camera Mode' to Portrait",
            "Add 'Show Notification' with tips",
            "Add 'Take Photo' with settings",
            "Add 'Apply Filter' if desired"
          ]
        },
        {
          name: "Photo Editor",
          icon: "tune",
          colorScheme: "purple",
          description: "Quick photo editing with presets, filters, and automatic enhancement options.",
          baseInstructions: [
            "Create photo editing shortcut",
            "Add 'Select Photos' from library",
            "Add 'Ask for Input' for edit type",
            "Add 'Apply Filter' to photos",
            "Add 'Adjust Image' settings",
            "Add 'Save to Photos' with edits"
          ]
        },
        {
          name: "Time-lapse Creator",
          icon: "timelapse",
          colorScheme: "orange",
          description: "Create time-lapse videos with interval settings and automatic stabilization.",
          baseInstructions: [
            "Open time-lapse shortcut",
            "Add 'Ask for Input' for interval time",
            "Add 'Open App' for Camera",
            "Add 'Set Camera Mode' to Time-lapse",
            "Add 'Start Recording' video",
            "Add 'Save to Photos' when complete"
          ]
        },
        {
          name: "Watermark Tool",
          icon: "brush",
          colorScheme: "indigo",
          description: "Add custom watermarks, signatures, or logos to photos automatically.",
          baseInstructions: [
            "Create watermarking shortcut",
            "Add 'Select Photos' to watermark",
            "Add 'Get Text' for watermark content",
            "Add 'Overlay Text' on image",
            "Add 'Resize Image' if needed",
            "Add 'Save to Photos' with watermark"
          ]
        }
      ],
      finance: [
        {
          name: "Expense Tracker",
          icon: "receipt_long",
          colorScheme: "green",
          description: "Quick expense logging with smart categorization and spending insights.",
          baseInstructions: [
            "Create financial tracking shortcut",
            "Add 'Ask for Input' for expense amount",
            "Add 'Ask for Input' for expense category",
            "Add 'Create Note' in expense log",
            "Add 'Calculate' monthly spending",
            "Add 'Show Notification' with budget status"
          ]
        },
        {
          name: "Budget Planner",
          icon: "savings",
          colorScheme: "blue",
          description: "Create and manage budgets with spending alerts and financial goal tracking.",
          baseInstructions: [
            "Open budget management shortcut",
            "Add 'Ask for Input' for budget category",
            "Add 'Ask for Input' for budget amount",
            "Add 'Get Notes' for expense history",
            "Add 'Calculate' remaining budget",
            "Add 'Set Reminder' for budget review"
          ]
        },
        {
          name: "Bill Reminder",
          icon: "schedule_send",
          colorScheme: "red",
          description: "Track bill due dates with automatic reminders and payment scheduling.",
          baseInstructions: [
            "Create bill tracking shortcut",
            "Add 'Ask for Input' for bill details",
            "Add 'Ask for Input' for due date",
            "Add 'Create Calendar Event' for reminder",
            "Add 'Set Reminder' 3 days before",
            "Add 'Create Note' with payment info"
          ]
        },
        {
          name: "Investment Tracker",
          icon: "trending_up",
          colorScheme: "purple",
          description: "Monitor investment portfolio with price alerts and performance tracking.",
          baseInstructions: [
            "Open investment monitoring shortcut",
            "Add 'Ask for Input' for stock symbol",
            "Add 'Get Contents of URL' for stock price",
            "Add 'Calculate' portfolio value",
            "Add 'Create Note' with performance",
            "Add 'Show Notification' with updates"
          ]
        },
        {
          name: "Savings Goal",
          icon: "account_balance",
          colorScheme: "orange",
          description: "Set and track savings goals with progress monitoring and motivation.",
          baseInstructions: [
            "Create savings tracking shortcut",
            "Add 'Ask for Input' for goal amount",
            "Add 'Ask for Input' for current savings",
            "Add 'Calculate' progress percentage",
            "Add 'Show Notification' with motivation",
            "Add 'Create Reminder' for next deposit"
          ]
        },
        {
          name: "Tax Organizer",
          icon: "description",
          colorScheme: "indigo",
          description: "Organize tax documents and receipts with automatic categorization and storage.",
          baseInstructions: [
            "Open tax preparation shortcut",
            "Add 'Take Photo' of tax document",
            "Add 'Extract Text' from image",
            "Add 'Ask for Input' for document type",
            "Add 'Save to Files' in tax folder",
            "Add 'Create Note' with document summary"
          ]
        }
      ]
    },

    // Generate a new set of shortcuts
    generateSet(category = null, difficulty = 'beginner') {
      const selectedCategory = category || this.categories[Math.floor(Math.random() * this.categories.length)];
      const categoryTemplates = this.templates[selectedCategory] || this.templates.productivity;

      console.log(`Generating AI set for ${selectedCategory} (${difficulty}) with ${categoryTemplates.length} templates available`);

      // Create variations of templates - ensure we get different shortcuts
      const generatedShortcuts = [];

      // If we have 6 or more templates, use each one once
      if (categoryTemplates.length >= 6) {
        // Shuffle templates array to get random selection
        const shuffledTemplates = [...categoryTemplates].sort(() => Math.random() - 0.5);

        for (let i = 0; i < 6; i++) {
          const template = shuffledTemplates[i];
          const variation = this.createVariation(template, Date.now() + i + Math.random());
          generatedShortcuts.push(variation);
        }
      } else {
        // If fewer than 6 templates, use each template once then create variations
        const usedTemplates = new Set();

        for (let i = 0; i < 6; i++) {
          let template;
          let templateIndex;

          if (usedTemplates.size < categoryTemplates.length) {
            // First pass: use each template once
            do {
              templateIndex = Math.floor(Math.random() * categoryTemplates.length);
            } while (usedTemplates.has(templateIndex));
            usedTemplates.add(templateIndex);
          } else {
            // Second pass: create variations of existing templates
            templateIndex = Math.floor(Math.random() * categoryTemplates.length);
          }

          template = categoryTemplates[templateIndex];
          const variation = this.createVariation(template, Date.now() + i + Math.random(), i >= categoryTemplates.length);
          generatedShortcuts.push(variation);
        }
      }

      console.log(`Generated ${generatedShortcuts.length} unique AI shortcuts`);
      return generatedShortcuts;
    },

    // Create variations of base templates
    createVariation(template, id, isSecondaryVariation = false) {
      const variations = {
        prefixes: ['Smart ', 'Quick ', 'Auto ', 'Daily ', 'Personal ', 'Custom ', 'Pro ', 'Advanced '],
        suffixes: [' Pro', ' Plus', ' Assistant', ' Helper', ' Manager', ' Wizard', ' Tool', ' Master'],
        modifiers: ['Enhanced', 'Advanced', 'Simple', 'Instant', 'Automated', 'Dynamic', 'Intelligent']
      };

      // Create name variation - more aggressive variation for secondary iterations
      let variantName = template.name;

      if (isSecondaryVariation) {
        // For secondary variations, always modify the name significantly
        const modifier = variations.modifiers[Math.floor(Math.random() * variations.modifiers.length)];
        const prefix = variations.prefixes[Math.floor(Math.random() * variations.prefixes.length)];
        variantName = `${modifier} ${variantName}`;
        if (Math.random() > 0.5) {
          const suffix = variations.suffixes[Math.floor(Math.random() * variations.suffixes.length)];
          variantName = variantName + suffix;
        }
      } else {
        // For primary variations, lighter modification
        if (Math.random() > 0.6) {
          const prefix = variations.prefixes[Math.floor(Math.random() * variations.prefixes.length)];
          variantName = prefix + variantName;
        }
        if (Math.random() > 0.7) {
          const suffix = variations.suffixes[Math.floor(Math.random() * variations.suffixes.length)];
          variantName = variantName + suffix;
        }
      }

      // Add complexity based on difficulty
      let instructions = [...template.baseInstructions];

      // Add some variation to instructions for secondary variations
      if (isSecondaryVariation) {
        instructions.push("Add custom settings for personalization");
        instructions.push("Test shortcut with different scenarios");
      }

      if (this.difficulty === 'intermediate') {
        instructions.push("Add conditional logic for edge cases");
        instructions.push("Set up automation triggers");
      } else if (this.difficulty === 'advanced') {
        instructions.push("Add conditional logic for edge cases");
        instructions.push("Set up automation triggers");
        instructions.push("Integrate with third-party APIs");
        instructions.push("Add error handling and fallbacks");
      }

      return {
        id: id,
        name: variantName,
        icon: template.icon,
        iconType: "material-two-tone",
        colorScheme: template.colorScheme,
        description: template.description,
        instructions: instructions,
        isAIGenerated: true,
        category: template.category || 'ai-generated'
      };
    }
  },

  // Get next set of shortcuts with random mixing
  getNextSet() {
    return this.generateMixedSet();
  },

  // Generate a mixed set of 6 shortcuts from static and AI sources
  generateMixedSet() {
    const mixedShortcuts = [];
    const allStaticShortcuts = this.staticSets.flat(); // Flatten all static shortcuts

    // Decide how many static vs AI shortcuts to include (random mix)
    const staticCount = Math.floor(Math.random() * 4) + 2; // 2-5 static shortcuts
    const aiCount = 6 - staticCount; // Remaining slots for AI shortcuts

    console.log(`Generating mixed set: ${staticCount} static + ${aiCount} AI shortcuts`);

    // Get random static shortcuts
    const shuffledStatic = [...allStaticShortcuts].sort(() => Math.random() - 0.5);
    for (let i = 0; i < staticCount && i < shuffledStatic.length; i++) {
      mixedShortcuts.push(shuffledStatic[i]);
    }

    // Get AI-generated shortcuts if enabled and needed
    if (aiCount > 0 && this.aiGeneration.enabled) {
      const aiShortcuts = this.aiGeneration.generateSet(null, this.aiGeneration.difficulty);
      // Take only the number we need
      for (let i = 0; i < aiCount && i < aiShortcuts.length; i++) {
        mixedShortcuts.push(aiShortcuts[i]);
      }
    } else if (aiCount > 0) {
      // If AI is disabled, fill remaining slots with more static shortcuts
      for (let i = staticCount; i < 6 && i < shuffledStatic.length; i++) {
        mixedShortcuts.push(shuffledStatic[i]);
      }
    }

    // Final shuffle to mix static and AI shortcuts randomly
    const finalMix = mixedShortcuts.sort(() => Math.random() - 0.5);
    console.log(`✨ Mixed set generated: ${finalMix.length} total shortcuts`);

    return finalMix;
  },

  // Get current set info for notifications with mixed content indicators
  getCurrentSetInfo() {
    return `Mixed collection`;
  },

  // Enhanced features for Phase 2
  setDifficulty(level) {
    this.aiGeneration.difficulty = level;
    console.log(`AI difficulty set to: ${level}`);
  },

  // Get category-specific set
  getCategorySet(category) {
    if (this.aiGeneration.enabled && this.aiGeneration.categories.includes(category)) {
      return this.aiGeneration.generateSet(category);
    }
    return null;
  },

  // Smart recommendations based on time/usage
  getRecommendedCategory() {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 17) return 'productivity';
    if (hour >= 17 && hour < 21) return 'entertainment';
    if (hour >= 21 || hour < 7) return 'wellness';
    return 'productivity';
  }
};

/**
 * Filter preferences management
 */
class FilterPreferences {
  constructor() {
    this.preferences = this.loadPreferences();
  }

  loadPreferences() {
    const saved = localStorage.getItem('shortcutFilterPreferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved filter preferences:', e);
      }
    }

    // Default preferences
    return {
      categories: ['productivity', 'health', 'entertainment', 'travel', 'photography', 'finance', 'smart-home', 'social', 'security', 'wellness'], // Array of selected categories
      contentType: 'mixed', // 'static', 'ai', or 'mixed'
      difficulty: 'all', // 'beginner', 'intermediate', 'advanced', or 'all'
      aiRatio: 0.5 // Ratio of AI shortcuts in mixed content (0.5 = 50%)
    };
  }

  savePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    localStorage.setItem('shortcutFilterPreferences', JSON.stringify(this.preferences));
    console.log('Filter preferences saved:', this.preferences);
  }

  getPreferences() {
    return { ...this.preferences };
  }

  // Apply filters to generate a customized shortcut set
  generateFilteredSet() {
    const prefs = this.preferences;
    console.log('Generating filtered set with preferences:', prefs);

    let staticShortcuts = [];
    let aiShortcuts = [];

    // Get static shortcuts (optionally filtered by category)
    if (prefs.contentType !== 'ai') {
      staticShortcuts = shortcutManager.staticSets.flat();
    }

    // Get AI shortcuts based on category preferences
    if (prefs.contentType !== 'static') {
      if (prefs.categories.includes('all')) {
        // Generate from random categories
        const randomCategory = shortcutManager.aiGeneration.categories[
          Math.floor(Math.random() * shortcutManager.aiGeneration.categories.length)
        ];
        aiShortcuts = shortcutManager.aiGeneration.generateSet(randomCategory, prefs.difficulty === 'all' ? 'beginner' : prefs.difficulty);
      } else {
        // Generate from preferred categories
        const preferredCategories = prefs.categories.filter(cat =>
          shortcutManager.aiGeneration.categories.includes(cat)
        );
        if (preferredCategories.length > 0) {
          const selectedCategory = preferredCategories[
            Math.floor(Math.random() * preferredCategories.length)
          ];
          aiShortcuts = shortcutManager.aiGeneration.generateSet(selectedCategory, prefs.difficulty === 'all' ? 'beginner' : prefs.difficulty);
        } else {
          // Fallback to random category
          const randomCategory = shortcutManager.aiGeneration.categories[
            Math.floor(Math.random() * shortcutManager.aiGeneration.categories.length)
          ];
          aiShortcuts = shortcutManager.aiGeneration.generateSet(randomCategory, prefs.difficulty === 'all' ? 'beginner' : prefs.difficulty);
        }
      }
    }

    // Mix static and AI based on content type and ratio preferences
    let finalSet = [];
    const targetCount = 6;

    if (prefs.contentType === 'static') {
      // Only static shortcuts
      const shuffled = [...staticShortcuts].sort(() => Math.random() - 0.5);
      finalSet = shuffled.slice(0, targetCount);
    } else if (prefs.contentType === 'ai') {
      // Only AI shortcuts
      finalSet = aiShortcuts.slice(0, targetCount);
    } else {
      // Mixed content - default to 50/50 split if aiRatio not specified
      const aiRatio = prefs.aiRatio || 0.5; // Default to 50% AI
      const aiCount = Math.round(targetCount * aiRatio);
      const staticCount = targetCount - aiCount;

      console.log('Mixed content calculation:', {
        aiRatio: aiRatio,
        aiCount: aiCount,
        staticCount: staticCount,
        targetCount: targetCount
      });

      const selectedStatic = [...staticShortcuts].sort(() => Math.random() - 0.5).slice(0, staticCount);
      const selectedAI = aiShortcuts.slice(0, aiCount);

      finalSet = [...selectedStatic, ...selectedAI].sort(() => Math.random() - 0.5);
    }

    // Ensure we have exactly 6 shortcuts
    while (finalSet.length < targetCount) {
      if (staticShortcuts.length > 0 && prefs.contentType !== 'ai') {
        const randomStatic = staticShortcuts[Math.floor(Math.random() * staticShortcuts.length)];
        if (!finalSet.find(s => s.id === randomStatic.id)) {
          finalSet.push(randomStatic);
        }
      } else if (aiShortcuts.length > 0) {
        finalSet.push(aiShortcuts[finalSet.length % aiShortcuts.length]);
      } else {
        break;
      }
    }

    finalSet = finalSet.slice(0, targetCount);

    console.log(`Generated filtered set: ${finalSet.length} shortcuts (${finalSet.filter(s => s.isAIGenerated).length} AI, ${finalSet.filter(s => !s.isAIGenerated).length} static)`);
    return finalSet;
  }
}

/**
 * Global filter preferences instance
 */
const filterPreferences = new FilterPreferences();

/**
 * Creates a flip card widget for a shortcut
 * @param {Object} shortcut - The shortcut data
 * @param {HTMLElement} container - Parent container element
 * @returns {HTMLElement} The created widget element
 */
function createFlipCardWidget(shortcut, container) {
  const widget = document.createElement('div');
  widget.className = 'shortcut-card';
  widget.setAttribute('role', 'button');
  widget.setAttribute('tabindex', '0');
  widget.setAttribute('aria-label', `Shortcut: ${shortcut.name}. Press to see instructions.`);
  widget.setAttribute('data-color', shortcut.colorScheme);

  let isFlipped = false;

  widget.innerHTML = `
    <div class="shortcut-card-front">
      <span class="shortcut-icon material-icons" aria-hidden="true">${shortcut.icon}</span>
      <span class="shortcut-name">${shortcut.name}</span>
      ${shortcut.isAIGenerated ? '<div class="ai-badge">auto_awesome</div>' : ''}
    </div>
    <div class="shortcut-card-back" aria-hidden="true">
      <div class="shortcut-instructions">
        <h3>${shortcut.name} ${shortcut.isAIGenerated ? '<span class="ai-tag">AI</span>' : ''}</h3>
        <div class="description">${shortcut.description}</div>
        <div class="instructions-title">How to create this shortcut:</div>
        <ol>
          ${shortcut.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    </div>
  `;

  // Clean flip functionality with simplified state management
  function toggleFlip() {
    // Close any other flipped card immediately
    if (currentlyFlippedCard && currentlyFlippedCard !== widget) {
      currentlyFlippedCard.classList.remove('flipped');
      currentlyFlippedCard.setAttribute('aria-pressed', 'false');
      const otherBackSide = currentlyFlippedCard.querySelector('.shortcut-card-back');
      otherBackSide.setAttribute('aria-hidden', 'true');
    }

    // Toggle current card state
    isFlipped = !isFlipped;
    widget.classList.toggle('flipped', isFlipped);
    widget.setAttribute('aria-pressed', isFlipped.toString());

    const backSide = widget.querySelector('.shortcut-card-back');
    backSide.setAttribute('aria-hidden', (!isFlipped).toString());

    // Update global state
    currentlyFlippedCard = isFlipped ? widget : null;

    // Update share button title based on new state
    updateShareButtonTitle();
  }

  // Event listeners
  widget.addEventListener('click', toggleFlip);
  widget.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFlip();
    }
  });

  container.appendChild(widget);
  return widget;
}

// Dynamic time display
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const timeElement = document.querySelector('.time');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Battery level animation
function animateBattery() {
  const batteryLevel = document.querySelector('.battery-level');
  if (batteryLevel) {
    const levels = ['25%', '50%', '75%', '100%'];
    let currentLevel = 0;

    setInterval(() => {
      batteryLevel.style.width = levels[currentLevel];
      currentLevel = (currentLevel + 1) % levels.length;
    }, 3000);
  }
}

// Signal bars animation
function animateSignalBars() {
  const bars = document.querySelectorAll('.signal-bars .bar');
  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.animation = `pulse 2s ease-in-out infinite`;
      bar.style.animationDelay = `${index * 0.2}s`;
    }, index * 200);
  });
}

/**
 * Shuffle cards with smooth animation - Enhanced with AI/Static hybrid
 */
function shuffleCards() {
  console.log('Shuffle function called');

  if (isShuffling) {
    console.log('Already shuffling, skipping');
    return; // Prevent multiple shuffles
  }

  isShuffling = true;
  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) {
    console.error('App icons grid not found');
    isShuffling = false;
    return;
  }

  // Close any currently flipped card
  if (currentlyFlippedCard) {
    currentlyFlippedCard.classList.remove('flipped');
    currentlyFlippedCard = null;

    // Update share button title when card is unflipped during shuffle
    updateShareButtonTitle();
  }

  // Get next set of shortcuts respecting current filter preferences
  const newShortcuts = filterPreferences.generateFilteredSet();

  console.log('Shuffle using filtered preferences:', filterPreferences.preferences);

  // Show iOS notification based on current content type
  const currentPrefs = filterPreferences.preferences;
  const isAIGenerated = newShortcuts.some(s => s.isAIGenerated);

  if (currentPrefs.contentType === 'ai') {
    showIOSNotification('AI shortcuts shuffled!', 'ai-generated');
  } else if (currentPrefs.contentType === 'static') {
    showIOSNotification('Static shortcuts shuffled!', 'default');
  } else if (isAIGenerated) {
    showIOSNotification('Mixed content shuffled!', 'ai-generated');
  } else {
    showIOSNotification('Shortcuts shuffled!', 'default');
  }
  const contentTypeLabel = {
    'static': 'Static Shortcuts',
    'ai': 'AI Generated',
    'mixed': 'Mixed Content'
  }[currentPrefs.contentType] || 'Mixed Content';

  console.log(`Shuffling ${contentTypeLabel} with ${newShortcuts.length} cards`);

  // Add shuffle animation to existing cards
  const existingCards = appIconsGrid.querySelectorAll('.shortcut-card');
  console.log(`Found ${existingCards.length} existing cards to animate out`);

  existingCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'scale(0.8) rotateY(90deg)';
      card.style.opacity = '0';
    }, index * 50);
  });

  // After animation completes, replace with new cards
  setTimeout(() => {
    // Clear existing cards
    appIconsGrid.innerHTML = '';
    console.log('Cleared existing cards');

    // Create new cards with entrance animation
    newShortcuts.forEach((shortcut, index) => {
      setTimeout(() => {
        const widget = createFlipCardWidget(shortcut, appIconsGrid);
        widget.style.transform = 'scale(0.8) rotateY(-90deg)';
        widget.style.opacity = '0';

        // Animate in
        setTimeout(() => {
          widget.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          widget.style.transform = 'scale(1) rotateY(0deg)';
          widget.style.opacity = '1';
        }, 50);
      }, index * 100);
    });

    // Reset shuffle lock after all animations complete
    setTimeout(() => {
      isShuffling = false;
      // Removed the second notification as requested by user
      // const finalNotificationType = newShortcuts.some(s => s.isAIGenerated) ? 'ai-generated' : 'default';
      // const finalMessage = newShortcuts.some(s => s.isAIGenerated)
      //   ? `${setInfo} loaded!`
      //   : `${setInfo} loaded!`;
      // showIOSNotification(finalMessage, finalNotificationType);
      console.log(`Shuffle complete - ${setInfo}`);
    }, newShortcuts.length * 100 + 500);

  }, existingCards.length * 50 + 200);
}

/**
 * Replace static app icons with interactive flip cards
 */
function initializeFlipCards() {
  console.log('Initializing flip cards...');
  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) {
    console.error('App icons grid not found');
    return;
  }

  console.log('Found app icons grid, clearing existing content...');
  // Clear existing static icons
  appIconsGrid.innerHTML = '';

  // Get initial mixed set of shortcuts (including random mixing from the start)
  const initialShortcuts = shortcutManager.getNextSet();
  console.log(`Generated ${initialShortcuts.length} initial shortcuts:`, initialShortcuts.map(s => s.name));

  // Show initial load notification
  const hasAIContent = initialShortcuts.some(s => s.isAIGenerated);
  if (hasAIContent) {
    setTimeout(() => {
      showIOSNotification('Mixed collection loaded!', 'ai-generated');
    }, 500);
  }

  // Create flip cards for each shortcut in the mixed set
  initialShortcuts.forEach((shortcut, index) => {
    console.log(`Creating flip card ${index + 1}: ${shortcut.name}`);
    createFlipCardWidget(shortcut, appIconsGrid);
  });

  // Clean click-outside-to-close functionality
  document.addEventListener('click', (event) => {
    // Check if click is outside of any shortcut card
    if (!event.target.closest('.shortcut-card') && currentlyFlippedCard) {
      currentlyFlippedCard.classList.remove('flipped');
      currentlyFlippedCard.setAttribute('aria-pressed', 'false');
      const backSide = currentlyFlippedCard.querySelector('.shortcut-card-back');
      backSide.setAttribute('aria-hidden', 'true');
      currentlyFlippedCard = null;

      // Update share button title when card is unflipped
      updateShareButtonTitle();
    }
  });

  console.log('Flip cards initialized with', initialShortcuts.length, 'mixed shortcuts');
  console.log('Material Design icons loaded:', initialShortcuts.map(s => s.icon).join(', '));
  console.log('Color schemes used:', [...new Set(initialShortcuts.map(s => s.colorScheme))].join(', '));
  console.log('Mixed content on load:', shortcutManager.getCurrentSetInfo());
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Starting initialization...');

  // Add a small delay to ensure all CSS is loaded
  setTimeout(() => {
    console.log('Starting battery animation...');
    animateBattery();

    console.log('Starting signal bars animation...');
    animateSignalBars();

    console.log('Initializing interactive flip cards...');
    // Initialize interactive flip cards
    initializeFlipCards();

    console.log('Adding dock button functionality...');
    // Add dock button functionality
    initializeDockButtons();

    console.log('Adding device hover effects...');
    // Add subtle hover effects to the device
    const iphoneFrame = document.querySelector('.iphone-frame');
    if (iphoneFrame) {
      iphoneFrame.addEventListener('mouseenter', () => {
        iphoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.02)';
      });

      iphoneFrame.addEventListener('mouseleave', () => {
        iphoneFrame.style.transform = 'rotateX(2deg) rotateY(-2deg) scale(1)';
      });
      console.log('Device hover effects added');
    } else {
      console.warn('iPhone frame not found');
    }

    console.log('Adding dynamic island interaction...');
    // Dynamic Island interaction
    const dynamicIsland = document.querySelector('.dynamic-island');
    if (dynamicIsland) {
      dynamicIsland.addEventListener('click', () => {
        dynamicIsland.style.animation = 'none';
        setTimeout(() => {
          dynamicIsland.style.animation = 'pulse 3s ease-in-out infinite';
        }, 100);
      });
      console.log('Dynamic island interaction added');
    } else {
      console.warn('Dynamic island not found');
    }

    console.log('Initializing app interactions...');
    // Initialize app interactions
    initializeAppInteractions();

    console.log('All initialization complete!');
  }, 100); // Small delay to ensure CSS is loaded
});

// Initialize dock button functionality
function initializeDockButtons() {
  // Get all dock icons
  const dockIcons = document.querySelectorAll('.dock-icons .app-icon-dock');

  if (dockIcons.length > 0) {
    console.log(`Found ${dockIcons.length} dock icons`);

    // First dock button triggers shuffle
    dockIcons[0].addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      console.log('Shuffle button clicked!');

      // Add press animation
      dockIcons[0].classList.add('pressed');
      setTimeout(() => {
        dockIcons[0].classList.remove('pressed');
      }, 150);

      // Trigger shuffle
      shuffleCards();
    });

    // Add hover effects for first dock button
    dockIcons[0].addEventListener('mouseenter', () => {
      dockIcons[0].style.transform = 'scale(1.1)';
      dockIcons[0].style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
      dockIcons[0].style.cursor = 'pointer';
    });

    dockIcons[0].addEventListener('mouseleave', () => {
      dockIcons[0].style.transform = 'scale(1)';
      dockIcons[0].style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });

    // Add visual indicator that this is the shuffle button
    dockIcons[0].setAttribute('title', 'Shuffle Shortcuts');
    dockIcons[0].style.position = 'relative';

    // Second dock button (orange book) - Filter functionality
    if (dockIcons.length > 1) {
      dockIcons[1].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('Filter button clicked!');

        // Add press animation
        dockIcons[1].classList.add('pressed');
        setTimeout(() => {
          dockIcons[1].classList.remove('pressed');
        }, 150);

        // Open filter modal
        openFilterModal();
      });

      // Add hover effects for second dock button
      dockIcons[1].addEventListener('mouseenter', () => {
        dockIcons[1].style.transform = 'scale(1.1)';
        dockIcons[1].style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        dockIcons[1].style.cursor = 'pointer';
      });

      dockIcons[1].addEventListener('mouseleave', () => {
        dockIcons[1].style.transform = 'scale(1)';
        dockIcons[1].style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      });

      // Add visual indicator that this is the filter button
      dockIcons[1].setAttribute('title', 'Filter Shortcuts');
      dockIcons[1].style.position = 'relative';

      console.log('Dock filter button initialized successfully');
    }

    // Third dock button (blue share) - Conditional Share functionality
    if (dockIcons.length > 2) {
      dockIcons[2].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('Share button clicked!');

        // Add press animation
        dockIcons[2].classList.add('pressed');
        setTimeout(() => {
          dockIcons[2].classList.remove('pressed');
        }, 150);

        // Conditional logic based on whether a card is flipped
        handleConditionalShare();
      });

      // Add hover effects for third dock button
      dockIcons[2].addEventListener('mouseenter', () => {
        dockIcons[2].style.transform = 'scale(1.1)';
        dockIcons[2].style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        dockIcons[2].style.cursor = 'pointer';
      });

      dockIcons[2].addEventListener('mouseleave', () => {
        dockIcons[2].style.transform = 'scale(1)';
        dockIcons[2].style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      });

      // Dynamic title based on current state
      updateShareButtonTitle();
      dockIcons[2].style.position = 'relative';

      console.log('Dock share button initialized successfully');
    }

    // Fourth dock button (red generate) - Generate Custom Shortcut functionality
    if (dockIcons.length > 3) {
      dockIcons[3].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('Generate button clicked!');

        // Add press animation
        dockIcons[3].classList.add('pressed');
        setTimeout(() => {
          dockIcons[3].classList.remove('pressed');
        }, 150);

        // Open generate modal
        showGenerateModal();
      });

      // Add hover effects for fourth dock button
      dockIcons[3].addEventListener('mouseenter', () => {
        dockIcons[3].style.transform = 'scale(1.1)';
        dockIcons[3].style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        dockIcons[3].style.cursor = 'pointer';
      });

      dockIcons[3].addEventListener('mouseleave', () => {
        dockIcons[3].style.transform = 'scale(1)';
        dockIcons[3].style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      });

      // Add visual indicator that this is the generate button
      dockIcons[3].setAttribute('title', 'Generate Custom Shortcut');
      dockIcons[3].style.position = 'relative';

      console.log('Dock generate button initialized successfully');
    }

    console.log('Dock shuffle button initialized successfully');
  } else {
    console.warn('No dock icons found. Retrying in 1 second...');
    // Retry after a short delay in case DOM isn't fully loaded
    setTimeout(initializeDockButtons, 1000);
  }
}

// Conditional Share Function
function handleConditionalShare() {
  if (currentlyFlippedCard) {
    // Condition 2: Card is flipped - Share specific shortcut
    shareSpecificShortcut();
  } else {
    // Condition 1: No card flipped - Share webapp promotion
    shareWebappPromotion();
  }
}

// Share specific shortcut when card is flipped
function shareSpecificShortcut() {
  const flippedCard = currentlyFlippedCard;
  const shortcutName = flippedCard.querySelector('.flip-card-front h3')?.textContent || 'Shortcut';
  const shortcutDescription = flippedCard.querySelector('.flip-card-back .shortcut-description')?.textContent || 'iOS Shortcut';

  const shortcutText = `${shortcutName}\n\n${shortcutDescription}\n\nFrom iOS Shortcuts Wizard - Create powerful iOS shortcuts instantly!\n\n🔗 https://techtonicliving.com/ios-shortcuts-wizard`;

  // Check if Web Share API is supported (iOS Safari, Android Chrome, etc.)
  if (navigator.share && navigator.canShare && navigator.canShare({
    title: `${shortcutName} - iOS Shortcut`,
    text: shortcutDescription,
    url: 'https://techtonicliving.com/ios-shortcuts-wizard'
  })) {
    // Use native share sheet (iOS Share Sheet)
    navigator.share({
      title: `${shortcutName} - iOS Shortcut`,
      text: shortcutDescription,
      url: 'https://techtonicliving.com/ios-shortcuts-wizard'
    }).then(() => {
      showIOSNotification(`"${shortcutName}" shared successfully!`, 'default');
    }).catch((error) => {
      if (error.name !== 'AbortError') {
        // Fallback to clipboard if share fails (but not if user cancelled)
        copyToClipboardFallback(shortcutText, shortcutName);
      }
    });
  } else if (navigator.share) {
    // Basic Web Share API support without canShare
    navigator.share({
      title: `${shortcutName} - iOS Shortcut`,
      text: shortcutDescription,
      url: 'https://techtonicliving.com/ios-shortcuts-wizard'
    }).then(() => {
      showIOSNotification(`"${shortcutName}" shared successfully!`, 'default');
    }).catch((error) => {
      if (error.name !== 'AbortError') {
        copyToClipboardFallback(shortcutText, shortcutName);
      }
    });
  } else {
    // No Web Share API support - fallback to clipboard
    copyToClipboardFallback(shortcutText, shortcutName);
  }
}

// Share webapp promotion when no card is flipped
function shareWebappPromotion() {
  const promotionText = `🚀 iOS Shortcuts Wizard - Create powerful iOS shortcuts instantly!\n\n✨ Features:\n• AI-generated shortcuts\n• 60+ curated templates\n• Multiple categories\n• Interactive flip cards\n• Filter & customize\n\nTry it now: https://techtonicliving.com/ios-shortcuts-wizard`;

  // Check if Web Share API is supported
  if (navigator.share && navigator.canShare && navigator.canShare({
    title: 'iOS Shortcuts Wizard',
    text: '🚀 Create powerful iOS shortcuts instantly! AI-generated shortcuts, 60+ templates, multiple categories & more!',
    url: 'https://techtonicliving.com/ios-shortcuts-wizard'
  })) {
    // Use native share sheet (iOS Share Sheet)
    navigator.share({
      title: 'iOS Shortcuts Wizard',
      text: '🚀 Create powerful iOS shortcuts instantly! AI-generated shortcuts, 60+ templates, multiple categories & more!',
      url: 'https://techtonicliving.com/ios-shortcuts-wizard'
    }).then(() => {
      showIOSNotification('Shared successfully!', 'default');
    }).catch((error) => {
      if (error.name !== 'AbortError') {
        // Fallback to clipboard if share fails (but not if user cancelled)
        copyToClipboardFallback(promotionText, 'Promo text');
      }
    });
  } else if (navigator.share) {
    // Basic Web Share API support without canShare
    navigator.share({
      title: 'iOS Shortcuts Wizard',
      text: '🚀 Create powerful iOS shortcuts instantly! AI-generated shortcuts, 60+ templates, multiple categories & more!',
      url: 'https://techtonicliving.com/ios-shortcuts-wizard'
    }).then(() => {
      showIOSNotification('Shared successfully!', 'default');
    }).catch((error) => {
      if (error.name !== 'AbortError') {
        copyToClipboardFallback(promotionText, 'Promo text');
      }
    });
  } else {
    // No Web Share API support - fallback to clipboard
    copyToClipboardFallback(promotionText, 'Promo text');
  }
}

// Unified clipboard fallback function
function copyToClipboardFallback(text, itemName) {
  // On desktop, show share modal instead of just copying
  if (!navigator.share || !navigator.canShare) {
    showShareModal(text, itemName);
  } else {
    // Mobile fallback - just copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      showIOSNotification(`${itemName} copied to clipboard!`, 'default');
    }).catch(() => {
      // Fallback for older browsers
      fallbackCopyToClipboard(text);
      showIOSNotification(`${itemName} copied to clipboard!`, 'default');
    });
  }
}// Fallback clipboard function for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

// Update share button title based on current state
function updateShareButtonTitle() {
  const dockIcons = document.querySelectorAll('.dock-icons .app-icon-dock');
  if (dockIcons.length > 2) {
    const shareButton = dockIcons[2];
    if (currentlyFlippedCard) {
      const shortcutName = currentlyFlippedCard.querySelector('.flip-card-front h3')?.textContent || 'Shortcut';
      shareButton.setAttribute('title', `Share "${shortcutName}"`);
    } else {
      shareButton.setAttribute('title', 'Share iOS Shortcuts Wizard');
    }
  }
}

// App-specific interactions
function initializeAppInteractions() {
  // App icon interactions
  const appIcons = document.querySelectorAll('.app-icon');
  appIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      // Add press animation
      icon.classList.add('pressed');
      setTimeout(() => {
        icon.classList.remove('pressed');
      }, 150);

      const shortcut = icon.dataset.shortcut;
      console.log('Shortcut activated:', shortcut);

      // Show execution feedback with iOS-style notification
      showIOSNotification(`Executing ${shortcut}...`);

      // Here you can add specific shortcut logic for your website integration
      executeShortcut(shortcut);
    });

    // Long press for editing (authentic iOS behavior)
    let longPressTimer;
    icon.addEventListener('mousedown', () => {
      longPressTimer = setTimeout(() => {
        enterEditMode();
      }, 500);
    });

    icon.addEventListener('mouseup', () => {
      clearTimeout(longPressTimer);
    });

    icon.addEventListener('mouseleave', () => {
      clearTimeout(longPressTimer);
    });
  });

  // Page dots interaction
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Remove active from all dots
      dots.forEach(d => d.classList.remove('active'));
      // Add active to clicked dot
      dot.classList.add('active');
      console.log('Page changed to:', index + 1);
    });
  });
}

// Execute specific shortcuts (customize for your website)
function executeShortcut(shortcutName) {
  const shortcuts = {
    camera: () => {
      // Integrate with your website's camera functionality
      console.log('Camera shortcut activated');
    },
    music: () => {
      // Integrate with your website's music player
      console.log('Music shortcut activated');
    },
    notes: () => {
      // Integrate with your website's note-taking feature
      console.log('Notes shortcut activated');
    },
    maps: () => {
      // Integrate with your website's location features
      console.log('Maps shortcut activated');
    },
    weather: () => {
      // Integrate with your website's weather widget
      console.log('Weather shortcut activated');
    },
    timer: () => {
      // Integrate with your website's timer functionality
      console.log('Timer shortcut activated');
    },
    shortcuts: () => {
      // Show shortcuts management interface
      console.log('Shortcuts app activated');
    },
    automation: () => {
      // Show automation features
      console.log('Automation activated');
    },
    control: () => {
      // Show control center
      console.log('Control center activated');
    },
    media: () => {
      // Show media controls
      console.log('Media controls activated');
    }
  };

  if (shortcuts[shortcutName]) {
    shortcuts[shortcutName]();
  }
}

// Enter edit mode (like iOS)
function enterEditMode() {
  const appIcons = document.querySelectorAll('.app-icon');
  appIcons.forEach(icon => {
    icon.style.animation = 'iconWiggle 0.5s ease-in-out infinite alternate';
  });

  showIOSNotification('Edit mode activated');

  // Exit edit mode after 3 seconds or on tap
  setTimeout(() => {
    exitEditMode();
  }, 3000);
}

// Exit edit mode
function exitEditMode() {
  const appIcons = document.querySelectorAll('.app-icon');
  appIcons.forEach(icon => {
    icon.style.animation = 'none';
  });
}

/**
 * Filter Modal Functions
 */
function openFilterModal() {
  console.log('Opening filter modal');

  // Create modal if it doesn't exist
  let modal = document.getElementById('filter-modal');
  if (!modal) {
    modal = createFilterModal();
    // Append to screen-content instead of body to keep within iPhone frame
    const screenContent = document.querySelector('.screen-content');
    if (screenContent) {
      screenContent.appendChild(modal);
    } else {
      document.body.appendChild(modal);
    }
  }

  // Load current preferences
  const prefs = filterPreferences.getPreferences();
  updateSimplifiedModalValues(modal, prefs);

  // Show modal
  modal.classList.add('active');

  // Show notification
  showIOSNotification('Filter options opened', 'default');
}

function closeFilterModal() {
  const modal = document.getElementById('filter-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function createFilterModal() {
  const modal = document.createElement('div');
  modal.id = 'filter-modal';
  modal.className = 'filter-modal-overlay';

  modal.innerHTML = `
    <div class="filter-modal-content">
      <div class="filter-modal-header">
        <h2>Filter Shortcuts</h2>
        <button class="filter-modal-close" onclick="closeFilterModal()">&times;</button>
      </div>
      <div class="filter-modal-body">
        <div class="filter-form-group">
          <label>Categories:</label>
          <div class="filter-checkbox-group">
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-productivity" value="productivity">
              <label for="cat-productivity">Productivity</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-health" value="health">
              <label for="cat-health">Health</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-entertainment" value="entertainment">
              <label for="cat-entertainment">Entertainment</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-travel" value="travel">
              <label for="cat-travel">Travel</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-photography" value="photography">
              <label for="cat-photography">Photography</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-finance" value="finance">
              <label for="cat-finance">Finance</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-smart-home" value="smart-home">
              <label for="cat-smart-home">Smart Home</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-social" value="social">
              <label for="cat-social">Social</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-security" value="security">
              <label for="cat-security">Security</label>
            </div>
            <div class="filter-checkbox-item">
              <input type="checkbox" id="cat-wellness" value="wellness">
              <label for="cat-wellness">Wellness</label>
            </div>
          </div>
        </div>

        <div class="filter-form-group">
          <div class="filter-toggle-container">
            <label class="filter-toggle-main-label">AI-Generated Suggestions:</label>
            <input type="checkbox" id="ai-suggestions-toggle" class="filter-toggle">
            <label for="ai-suggestions-toggle" class="filter-toggle-icon-label">
              <span class="material-icons filter-toggle-icon">visibility</span>
            </label>
          </div>
        </div>

        <div class="filter-form-group">
          <label>Difficulty Level:</label>
          <select id="filter-difficulty" class="filter-select">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all">All Levels</option>
          </select>
        </div>

        <div class="filter-button-group">
          <button class="filter-button-primary" onclick="applySimplifiedFilters()">Apply Filters</button>
          <button class="filter-button-secondary" onclick="resetSimplifiedFilters()">Reset to Default</button>
        </div>
      </div>
    </div>
  `;

  // Close modal when clicking overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeFilterModal();
    }
  });

  // Add toggle event listener
  const aiToggle = modal.querySelector('#ai-suggestions-toggle');
  const toggleIcon = modal.querySelector('.filter-toggle-icon');
  if (aiToggle && toggleIcon) {
    aiToggle.addEventListener('change', () => {
      toggleIcon.textContent = aiToggle.checked ? 'visibility' : 'visibility_off';
    });
  }

  return modal;
}

function updateFilterModalValues(modal, prefs) {
  // This function is deprecated - using updateSimplifiedModalValues instead
  console.log('updateFilterModalValues is deprecated, please use updateSimplifiedModalValues');
  updateSimplifiedModalValues(modal, prefs);
}

function applyFilters() {
  // This function is deprecated - using applySimplifiedFilters instead
  console.log('applyFilters is deprecated, please use applySimplifiedFilters');
  applySimplifiedFilters();
}

function resetFilters() {
  // This function is deprecated - using resetSimplifiedFilters instead
  console.log('resetFilters is deprecated, please use resetSimplifiedFilters');
  resetSimplifiedFilters();
}

function applyFiltersToCurrentSet() {
  console.log('Applying filters to current shortcut set');

  const appIconsGrid = document.querySelector('.app-icons-grid');
  if (!appIconsGrid) return;

  // Close any currently flipped card
  if (currentlyFlippedCard) {
    currentlyFlippedCard.classList.remove('flipped');
    currentlyFlippedCard = null;
  }

  // Get filtered shortcuts
  const filteredShortcuts = filterPreferences.generateFilteredSet();

  // Clear existing cards with animation
  const existingCards = appIconsGrid.querySelectorAll('.shortcut-card');
  existingCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease-out';
      card.style.transform = 'scale(0.8) rotateY(90deg)';
      card.style.opacity = '0';

      setTimeout(() => {
        card.remove();
      }, 300);
    }, index * 50);
  });

  // Add new filtered cards
  setTimeout(() => {
    filteredShortcuts.forEach((shortcut, index) => {
      setTimeout(() => {
        const widget = createFlipCardWidget(shortcut, appIconsGrid);
        widget.style.transform = 'scale(0.8) rotateY(-90deg)';
        widget.style.opacity = '0';

        // Animate in
        setTimeout(() => {
          widget.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          widget.style.transform = 'scale(1) rotateY(0deg)';
          widget.style.opacity = '1';
        }, 50);
      }, index * 100);
    });
  }, existingCards.length * 50 + 200);
}

// iOS-style wiggle animation
const wiggleCSS = `
@keyframes iconWiggle {
  0% { transform: rotate(-1deg) scale(1.05); }
  100% { transform: rotate(1deg) scale(1.05); }
}
`;

// Add wiggle animation to stylesheet
const wiggleStyleSheet = document.createElement('style');
wiggleStyleSheet.textContent = wiggleCSS;
document.head.appendChild(wiggleStyleSheet);

// Filter modal CSS styles
const filterModalCSS = `
/* Filter Modal Overlay */
.filter-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border-radius: 26px;
  overflow: hidden;
}

.filter-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Filter Modal Content */
.filter-modal-content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: scale(0.8) translateY(20px);
  transition: all 0.3s ease;
  margin: auto;
}

.filter-modal-overlay.active .filter-modal-content {
  transform: scale(1) translateY(0);
}

/* Filter Modal Header */
.filter-modal-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-modal-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.filter-modal-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  padding: 4px;
  border-radius: 6px;
}

.filter-modal-close:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

/* Filter Modal Body */
.filter-modal-body {
  padding: 16px 20px 20px;
  color: white;
  max-height: 80vh;
  overflow-y: auto;
}

/* Filter Form Groups */
.filter-form-group {
  margin-bottom: 16px;
}

.filter-form-group label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.9);
}

/* Form Controls */
.filter-select,
.filter-range {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.filter-select:focus,
.filter-range:focus {
  outline: 2px solid #007AFF;
  outline-offset: 2px;
}

/* Range Input Styling */
.filter-range {
  appearance: none;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 0;
}

.filter-range::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007AFF;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

.filter-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007AFF;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

/* Range Value Display */
.filter-range-value {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

/* Checkbox Groups */
.filter-checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}

.filter-checkbox-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-checkbox-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.filter-checkbox-item input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #007AFF;
  transform: scale(1.1);
}

.filter-checkbox-item label {
  margin: 0;
  font-size: 0.85rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Toggle Switch Styles */
.filter-toggle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
  min-height: 32px;
}

.filter-toggle-main-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
}

.filter-toggle {
  display: none;
}

.filter-toggle-icon-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.filter-toggle-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  user-select: none;
}

.filter-toggle-icon:hover {
  color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

.filter-toggle:checked + .filter-toggle-icon-label .filter-toggle-icon {
  color: #007AFF;
}

/* Filter Buttons */
.filter-button-group {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-button-primary,
.filter-button-secondary {
  flex: 1;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button-primary {
  background: #007AFF;
  color: white;
}

.filter-button-primary:hover {
  background: #0056CC;
  transform: translateY(-1px);
}

.filter-button-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.filter-button-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* Modal Scrollbar */
.filter-modal-body::-webkit-scrollbar {
  width: 4px;
}

.filter-modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.filter-modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.filter-modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 480px) {
  .filter-modal-content {
    margin: 20px;
    width: calc(100vw - 40px);
  }

  .filter-checkbox-group {
    grid-template-columns: 1fr;
  }

  .filter-button-group {
    flex-direction: column;
  }
}
`;

// Add filter modal styles to stylesheet
const filterModalStyleSheet = document.createElement('style');
filterModalStyleSheet.textContent = filterModalCSS;
document.head.appendChild(filterModalStyleSheet);
console.log('Filter modal CSS injected successfully');

// iOS-style notification system with AI support
function showIOSNotification(message, type = 'default') {
  // Remove existing notifications
  const existing = document.querySelectorAll('.ios-notification');
  existing.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `ios-notification ${type}`;
  notification.textContent = message;

  // Style the notification
  const baseStyles = {
    position: 'fixed',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '1000',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'slideDown 0.3s ease-out forwards'
  };

  // AI-specific styling
  if (type === 'ai-generated') {
    baseStyles.background = 'linear-gradient(135deg, rgba(88, 86, 214, 0.9) 0%, rgba(175, 82, 222, 0.9) 100%)';
    baseStyles.border = '1px solid rgba(255, 255, 255, 0.2)';
    baseStyles.boxShadow = '0 8px 32px rgba(88, 86, 214, 0.3)';
  } else {
    baseStyles.background = 'rgba(28, 28, 30, 0.9)';
  }

  Object.assign(notification.style, baseStyles);
  document.body.appendChild(notification);

  // Remove notification after 2.5 seconds (longer for AI notifications)
  const duration = type === 'ai-generated' ? 3000 : 2000;
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease-in forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
}

// Add notification animations
const notificationCSS = `
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}
`;

// Add notification animations to stylesheet
const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);

// Simplified filter functions for checkbox-based categories
function getSelectedCategories() {
  const modal = document.getElementById('filter-modal');
  if (!modal) return [];

  const selectedCategories = [];
  const checkboxes = modal.querySelectorAll('input[type="checkbox"][id^="cat-"]:checked');
  checkboxes.forEach(checkbox => {
    selectedCategories.push(checkbox.value);
  });

  return selectedCategories.length > 0 ? selectedCategories : ['productivity'];
}

function applySimplifiedFilters() {
  const modal = document.getElementById('filter-modal');
  if (!modal) return;

  const selectedCategories = getSelectedCategories();

  // Get AI suggestions toggle state
  const aiToggle = modal.querySelector('#ai-suggestions-toggle');
  const aiEnabled = aiToggle ? aiToggle.checked : true;

  console.log('AI Toggle Debug:', {
    aiToggleChecked: aiToggle ? aiToggle.checked : 'not found',
    aiEnabled: aiEnabled
  });

  // Convert toggle state to content type
  let contentType = 'mixed'; // Default
  if (aiEnabled) {
    contentType = 'mixed'; // Show both AI and static
  } else {
    contentType = 'static'; // Show only static shortcuts
  }

  console.log('Filter Applied:', {
    contentType: contentType,
    aiEnabled: aiEnabled,
    categories: selectedCategories
  });

  const difficulty = modal.querySelector('#filter-difficulty').value;

  const newPreferences = {
    categories: selectedCategories,
    contentType: contentType,
    difficulty: difficulty
  };

  filterPreferences.savePreferences(newPreferences);
  applyFiltersToCurrentSet();
  closeFilterModal();

  showIOSNotification(`Filters applied! ${selectedCategories.length} categories selected`, 'default');
}

function resetSimplifiedFilters() {
  const modal = document.getElementById('filter-modal');
  if (!modal) return;

  // Check all category checkboxes (default: all categories selected)
  const checkboxes = modal.querySelectorAll('input[type="checkbox"][id^="cat-"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = true;
  });

  // Reset AI toggle to enabled (default: mixed content)
  const aiToggle = modal.querySelector('#ai-suggestions-toggle');
  if (aiToggle) {
    aiToggle.checked = true;

    // Update toggle icon
    const toggleIcon = modal.querySelector('.filter-toggle-icon');
    if (toggleIcon) {
      toggleIcon.textContent = 'visibility';
    }
  }

  // Reset difficulty level
  const difficultySelect = modal.querySelector('#filter-difficulty');
  if (difficultySelect) {
    difficultySelect.value = 'all';
  }

  const defaultPrefs = {
    categories: ['productivity', 'health', 'entertainment', 'travel', 'photography', 'finance', 'smart-home', 'social', 'security', 'wellness'],
    contentType: 'mixed',
    difficulty: 'all',
    aiRatio: 0.5 // 50% AI, 50% static for mixed content
  };

  filterPreferences.savePreferences(defaultPrefs);
  showIOSNotification('Filters reset to default', 'default');
}

function updateSimplifiedModalValues(modal, prefs) {
  // Update category checkboxes
  const checkboxes = modal.querySelectorAll('input[type="checkbox"][id^="cat-"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = prefs.categories.includes(checkbox.value);
  });

  // Update AI suggestions toggle - checked means AI is enabled
  const aiToggle = modal.querySelector('#ai-suggestions-toggle');
  if (aiToggle) {
    aiToggle.checked = (prefs.contentType === 'ai' || prefs.contentType === 'mixed');

    // Update toggle icon based on state
    const toggleIcon = modal.querySelector('.filter-toggle-icon');
    if (toggleIcon) {
      toggleIcon.textContent = aiToggle.checked ? 'visibility' : 'visibility_off';
    }
  }

  // Update difficulty level
  const difficultySelect = modal.querySelector('#filter-difficulty');
  if (difficultySelect) {
    difficultySelect.value = prefs.difficulty;
  }
}

// Make filter modal functions globally accessible for HTML onclick attributes
window.closeFilterModal = closeFilterModal;
window.applySimplifiedFilters = applySimplifiedFilters;
window.resetSimplifiedFilters = resetSimplifiedFilters;

// Share Modal Variables
let currentShareData = null;

// Show share modal for desktop
function showShareModal(content, title) {
  currentShareData = {
    title: title,
    content: content,
    url: 'https://techtonicliving.com/ios-shortcuts-wizard'
  };

  const modal = document.getElementById('shareModal');
  modal.classList.add('show');

  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Close share modal
function closeShareModal() {
  const modal = document.getElementById('shareModal');
  modal.classList.remove('show');

  // Restore body scroll
  document.body.style.overflow = '';

  // Clear data
  currentShareData = null;
}

// Share modal - Copy to clipboard
function shareModalCopyToClipboard() {
  if (!currentShareData) return;

  navigator.clipboard.writeText(currentShareData.content).then(() => {
    showIOSNotification('Copied to clipboard!', 'default');
    closeShareModal();
  }).catch(() => {
    // Fallback for older browsers
    fallbackCopyToClipboard(currentShareData.content);
    showIOSNotification('Copied to clipboard!', 'default');
    closeShareModal();
  });
}

// Share modal - Email
function shareModalEmail() {
  if (!currentShareData) return;

  const subject = encodeURIComponent(currentShareData.title);
  const body = encodeURIComponent(currentShareData.content);

  window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  closeShareModal();
}

// Share modal - Twitter
function shareModalTwitter() {
  if (!currentShareData) return;

  const text = encodeURIComponent(`${currentShareData.title}\n\n${currentShareData.content}`);
  const url = encodeURIComponent(currentShareData.url);

  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
  closeShareModal();
}

// Share modal - Facebook
function shareModalFacebook() {
  if (!currentShareData) return;

  const url = encodeURIComponent(currentShareData.url);
  const quote = encodeURIComponent(currentShareData.content);

  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'width=600,height=400');
  closeShareModal();
}

// Share modal - LinkedIn
function shareModalLinkedIn() {
  if (!currentShareData) return;

  const url = encodeURIComponent(currentShareData.url);
  const title = encodeURIComponent(currentShareData.title);
  const summary = encodeURIComponent(currentShareData.content);

  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
  closeShareModal();
}

// Share modal - Reddit
function shareModalReddit() {
  if (!currentShareData) return;

  const url = encodeURIComponent(currentShareData.url);
  const title = encodeURIComponent(currentShareData.title);

  window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
  closeShareModal();
}

// Share modal - WhatsApp
function shareModalWhatsApp() {
  if (!currentShareData) return;

  const text = encodeURIComponent(`${currentShareData.content}\n\n${currentShareData.url}`);

  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  closeShareModal();
}

// Make share modal functions globally accessible
window.closeShareModal = closeShareModal;
window.shareModalCopyToClipboard = shareModalCopyToClipboard;
window.shareModalEmail = shareModalEmail;
window.shareModalTwitter = shareModalTwitter;
window.shareModalFacebook = shareModalFacebook;
window.shareModalLinkedIn = shareModalLinkedIn;
window.shareModalReddit = shareModalReddit;
window.shareModalWhatsApp = shareModalWhatsApp;

// Close share modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('shareModal');
  if (e.target === modal) {
    closeShareModal();
  }
});

// Close share modal with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('shareModal');
    if (modal.classList.contains('show')) {
      closeShareModal();
    }
  }
});

// Generate Modal Functions
function showGenerateModal() {
  console.log('Opening generate modal');

  // Create modal if it doesn't exist
  let modal = document.getElementById('generateModal');
  if (!modal) {
    modal = createGenerateModal();
    // Append to screen-content instead of using existing HTML modal
    const screenContent = document.querySelector('.screen-content');
    if (screenContent) {
      screenContent.appendChild(modal);
    } else {
      document.body.appendChild(modal);
    }
  }

  // Show modal with active class like filter modal
  modal.classList.add('active');

  // Focus on textarea
  setTimeout(() => {
    const textarea = document.getElementById('shortcut-idea');
    if (textarea) {
      textarea.focus();
    }
  }, 300);

  // Show notification
  showIOSNotification('Generate custom shortcut', 'default');
}

function closeGenerateModal() {
  const modal = document.getElementById('generateModal');
  if (modal) {
    modal.classList.remove('active');
  }

  // Clear form
  const textarea = document.getElementById('shortcut-idea');
  const categorySelect = document.getElementById('generate-category');
  const complexitySelect = document.getElementById('generate-complexity');

  if (textarea) textarea.value = '';
  if (categorySelect) categorySelect.value = 'auto';
  if (complexitySelect) complexitySelect.value = 'beginner';
}

function createGenerateModal() {
  const modal = document.createElement('div');
  modal.id = 'generateModal';
  modal.className = 'generate-modal-overlay';

  modal.innerHTML = `
    <div class="generate-modal">
      <div class="generate-modal-header">
        <h3 class="generate-modal-title">Generate Custom Shortcut</h3>
        <button class="generate-modal-close" onclick="closeGenerateModal()">
          <span class="material-icons">close</span>
        </button>
      </div>
      <div class="generate-modal-content">
        <div class="generate-input-section">
          <label for="shortcut-idea" class="generate-label">Describe your shortcut idea:</label>
          <textarea
            id="shortcut-idea"
            class="generate-textarea"
            placeholder="Example: Create a shortcut that automatically texts my mom when I arrive home safely..."
            rows="4"
          ></textarea>
        </div>

        <div class="generate-options">
          <div class="generate-option-group">
            <label for="generate-category" class="generate-label">Category:</label>
            <select id="generate-category" class="generate-select">
              <option value="auto">Auto-detect</option>
              <option value="productivity">Productivity</option>
              <option value="communication">Communication</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health & Fitness</option>
              <option value="travel">Travel</option>
              <option value="automation">Automation</option>
              <option value="social">Social</option>
              <option value="utility">Utility</option>
            </select>
          </div>

          <div class="generate-option-group">
            <label for="generate-complexity" class="generate-label">Complexity:</label>
            <select id="generate-complexity" class="generate-select">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div class="generate-actions">
          <button class="generate-button secondary" onclick="closeGenerateModal()">
            Cancel
          </button>
          <button class="generate-button primary" onclick="generateCustomShortcut()">
            <span class="material-icons">auto_awesome</span>
            Generate Shortcut
          </button>
        </div>
      </div>
    </div>
  `;

  return modal;
}

function generateCustomShortcut() {
  const ideaInput = document.getElementById('shortcut-idea');
  const categorySelect = document.getElementById('generate-category');
  const complexitySelect = document.getElementById('generate-complexity');

  const idea = ideaInput.value.trim();
  const category = categorySelect.value;
  const complexity = complexitySelect.value;

  if (!idea) {
    showIOSNotification('Please describe your shortcut idea first!', 'error');
    ideaInput.focus();
    return;
  }

  // Close modal
  closeGenerateModal();

  // Show generating notification
  showIOSNotification('🤖 AI is generating your custom shortcut...', 'default');

  // Simulate AI generation process
  setTimeout(() => {
    const customShortcut = createCustomShortcut(idea, category, complexity);
    displayGeneratedShortcut(customShortcut);
    showIOSNotification('✨ Custom shortcut generated!', 'success');
  }, 2000);
}

function createCustomShortcut(idea, category, complexity) {
  // AI-inspired shortcut generation based on user input
  const categoryMap = {
    'productivity': ['Workflow', 'Task Management', 'Organization'],
    'communication': ['Messaging', 'Email', 'Social'],
    'entertainment': ['Media', 'Games', 'Fun'],
    'health': ['Health Tracking', 'Fitness', 'Wellness'],
    'travel': ['Navigation', 'Planning', 'Booking'],
    'automation': ['Smart Home', 'IoT', 'Automation'],
    'social': ['Social Media', 'Sharing', 'Community'],
    'utility': ['Tools', 'Utilities', 'System']
  };

  const complexityDescriptions = {
    'beginner': 'Simple and easy to set up',
    'intermediate': 'Moderate complexity with multiple steps',
    'advanced': 'Complex automation with conditional logic'
  };

  // Determine category if auto-detect
  let finalCategory = category;
  if (category === 'auto') {
    // Simple keyword detection for auto-category
    const keywords = {
      'productivity': ['work', 'task', 'reminder', 'schedule', 'meeting', 'note'],
      'communication': ['text', 'message', 'call', 'email', 'contact'],
      'entertainment': ['music', 'video', 'game', 'photo', 'movie'],
      'health': ['health', 'fitness', 'workout', 'steps', 'heart'],
      'travel': ['location', 'home', 'work', 'navigate', 'map'],
      'automation': ['automatic', 'smart', 'control', 'device', 'home'],
      'social': ['social', 'share', 'post', 'friend', 'follow'],
      'utility': ['battery', 'wifi', 'setting', 'system', 'tool']
    };

    const lowerIdea = idea.toLowerCase();
    for (const [cat, words] of Object.entries(keywords)) {
      if (words.some(word => lowerIdea.includes(word))) {
        finalCategory = cat;
        break;
      }
    }
    if (finalCategory === 'auto') finalCategory = 'utility';
  }

  // Generate shortcut name based on idea
  const shortcutName = generateShortcutName(idea);

  // Generate steps based on complexity and idea
  const steps = generateShortcutSteps(idea, complexity);

  // Generate description
  const description = `${complexityDescriptions[complexity]} custom shortcut: ${idea}`;

  return {
    id: `custom_${Date.now()}`,
    title: shortcutName,
    category: finalCategory,
    difficulty: complexity,
    description: description,
    steps: steps,
    isCustom: true,
    userIdea: idea
  };
}

function generateShortcutName(idea) {
  // Extract key action words and create a concise name
  const words = idea.split(' ').filter(word => word.length > 2);
  const actionWords = ['send', 'create', 'set', 'get', 'check', 'turn', 'start', 'stop', 'open', 'close'];
  const keyWords = words.filter(word =>
    actionWords.includes(word.toLowerCase()) ||
    word.length > 4
  ).slice(0, 3);

  if (keyWords.length === 0) {
    return 'Custom Shortcut';
  }

  return keyWords.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

function generateShortcutSteps(idea, complexity) {
  const stepCounts = {
    'beginner': 3,
    'intermediate': 5,
    'advanced': 8
  };

  const baseSteps = [
    'Open Shortcuts app',
    'Tap the automation trigger',
    'Configure the action parameters'
  ];

  const intermediateSteps = [
    'Add conditional logic',
    'Set up variable storage',
    'Configure notification settings'
  ];

  const advancedSteps = [
    'Create nested if-then conditions',
    'Implement error handling',
    'Add data validation',
    'Set up advanced automation triggers',
    'Configure complex text processing'
  ];

  let steps = [...baseSteps];

  if (complexity === 'intermediate' || complexity === 'advanced') {
    steps = steps.concat(intermediateSteps.slice(0, 2));
  }

  if (complexity === 'advanced') {
    steps = steps.concat(advancedSteps.slice(0, 3));
  }

  return steps.slice(0, stepCounts[complexity]);
}

function displayGeneratedShortcut(shortcut) {
  // Create the custom shortcut card
  const cardHTML = `
    <div class="flip-card custom-generated" data-category="${shortcut.category}" data-difficulty="${shortcut.difficulty}">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="shortcut-category">${shortcut.category.toUpperCase()}</div>
          <h3>${shortcut.title}</h3>
          <div class="difficulty-badge ${shortcut.difficulty}">${shortcut.difficulty.toUpperCase()}</div>
          <div class="custom-badge">✨ AI Generated</div>
        </div>
        <div class="flip-card-back">
          <h3>${shortcut.title}</h3>
          <div class="shortcut-description">${shortcut.description}</div>
          <div class="shortcut-steps">
            <h4>Steps:</h4>
            <ol>
              ${shortcut.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
          <div class="user-idea">
            <strong>Your Idea:</strong> "${shortcut.userIdea}"
          </div>
        </div>
      </div>
    </div>
  `;

  // Insert the card at the beginning of the grid
  const grid = document.querySelector('.shortcut-grid');
  if (grid) {
    grid.insertAdjacentHTML('afterbegin', cardHTML);

    // Animate the new card in
    const newCard = grid.querySelector('.custom-generated');
    if (newCard) {
      newCard.style.opacity = '0';
      newCard.style.transform = 'scale(0.8)';

      setTimeout(() => {
        newCard.style.transition = 'all 0.5s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'scale(1)';
      }, 100);

      // Add flip functionality
      newCard.addEventListener('click', () => {
        flipCard(newCard);
      });

      // Scroll to the new card
      setTimeout(() => {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }
  }
}

// Make generate modal functions globally accessible
window.showGenerateModal = showGenerateModal;
window.closeGenerateModal = closeGenerateModal;
window.generateCustomShortcut = generateCustomShortcut;

// Close generate modal when clicking outside
document.addEventListener('click', (e) => {
  const generateModal = document.getElementById('generateModal');
  if (e.target === generateModal) {
    closeGenerateModal();
  }
});

// Close generate modal with escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const generateModal = document.getElementById('generateModal');
    if (generateModal && generateModal.classList.contains('show')) {
      closeGenerateModal();
    }
  }
});

console.log('Pixel-perfect iPhone UI loaded successfully!');
