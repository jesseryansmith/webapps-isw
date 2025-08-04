import './iphone-ui.css'
import './figma-assets.css'

// Dynamic time display
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
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

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateBattery();
  animateSignalBars();

  // Add subtle hover effects to the device
  const iphoneFrame = document.querySelector('.iphone-frame');
  if (iphoneFrame) {
    iphoneFrame.addEventListener('mouseenter', () => {
      iphoneFrame.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.02)';
    });

    iphoneFrame.addEventListener('mouseleave', () => {
      iphoneFrame.style.transform = 'rotateX(2deg) rotateY(-2deg) scale(1)';
    });
  }

  // Dynamic Island interaction
  const dynamicIsland = document.querySelector('.dynamic-island');
  if (dynamicIsland) {
    dynamicIsland.addEventListener('click', () => {
      dynamicIsland.style.animation = 'none';
      setTimeout(() => {
        dynamicIsland.style.animation = 'pulse 3s ease-in-out infinite';
      }, 100);
    });
  }

  // Initialize app interactions
  initializeAppInteractions();
});

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
      console.log('📷 Camera shortcut activated');
    },
    music: () => {
      // Integrate with your website's music player
      console.log('🎵 Music shortcut activated');
    },
    notes: () => {
      // Integrate with your website's note-taking feature
      console.log('📝 Notes shortcut activated');
    },
    maps: () => {
      // Integrate with your website's location features
      console.log('🗺️ Maps shortcut activated');
    },
    weather: () => {
      // Integrate with your website's weather widget
      console.log('☀️ Weather shortcut activated');
    },
    timer: () => {
      // Integrate with your website's timer functionality
      console.log('⏰ Timer shortcut activated');
    },
    shortcuts: () => {
      // Show shortcuts management interface
      console.log('⚡ Shortcuts app activated');
    },
    automation: () => {
      // Show automation features
      console.log('🔧 Automation activated');
    },
    control: () => {
      // Show control center
      console.log('🎛️ Control center activated');
    },
    media: () => {
      // Show media controls
      console.log('🎬 Media controls activated');
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

// iOS-style wiggle animation
const wiggleCSS = `
@keyframes iconWiggle {
  0% { transform: rotate(-1deg) scale(1.05); }
  100% { transform: rotate(1deg) scale(1.05); }
}
`;

// Add wiggle animation to stylesheet
const styleSheet = document.createElement('style');
styleSheet.textContent = wiggleCSS;
document.head.appendChild(styleSheet);// iOS-style notification system
function showIOSNotification(message) {
  // Remove existing notifications
  const existing = document.querySelectorAll('.ios-notification');
  existing.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = 'ios-notification';
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(28, 28, 30, 0.9)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '1000',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'slideDown 0.3s ease-out forwards'
  });

  document.body.appendChild(notification);

  // Remove notification after 2 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease-in forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
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

console.log('🍎 Pixel-perfect iPhone UI loaded successfully!');
