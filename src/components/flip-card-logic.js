/**
 * Flip Card Component Logic
 * Purpose: Interactive widget creation with 3D flip animations (React→Vanilla JS conversion)
 * Last Modified: August 4, 2025 at 11:51 PM
 * Original: archive/early-drafts/index.tsx
 */

// Shortcut data structure interface (TypeScript converted to JSDoc)
/**
 * @typedef {Object} Shortcut
 * @property {number} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} icon - Emoji icon
 * @property {string[]} instructions - Step-by-step guide
 */

/**
 * Creates a flip card widget for a shortcut
 * @param {Shortcut} shortcut - The shortcut data
 * @param {HTMLElement} container - Parent container element
 * @returns {HTMLElement} The created widget element
 */
function createFlipCardWidget(shortcut, container) {
  const widget = document.createElement('div');
  widget.className = 'widget-container';
  widget.setAttribute('role', 'button');
  widget.setAttribute('tabindex', '0');
  widget.setAttribute('aria-label', `Shortcut: ${shortcut.name}. Press to see instructions.`);

  let isFlipped = false;

  widget.innerHTML = `
    <div class="widget-flipper">
      <div class="widget-front">
        <span class="widget-icon" aria-hidden="true">${shortcut.icon}</span>
        <span class="widget-name">${shortcut.name}</span>
      </div>
      <div class="widget-back" aria-hidden="true">
        <h3>${shortcut.name}</h3>
        <ol>
          ${shortcut.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    </div>
  `;

  // Flip functionality
  function toggleFlip() {
    isFlipped = !isFlipped;
    const flipper = widget.querySelector('.widget-flipper');
    const backSide = widget.querySelector('.widget-back');

    flipper.classList.toggle('flipped', isFlipped);
    widget.setAttribute('aria-pressed', isFlipped.toString());
    backSide.setAttribute('aria-hidden', (!isFlipped).toString());
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

/**
 * Sample shortcut data for testing
 */
const sampleShortcuts = [
  {
    id: 1,
    name: "Quick Screenshot",
    icon: "📸",
    instructions: [
      "Open Shortcuts app",
      "Tap the '+' to create new shortcut",
      "Add 'Take Screenshot' action",
      "Add 'Save to Photos' action",
      "Name it 'Quick Screenshot'",
      "Add to Home Screen"
    ]
  },
  {
    id: 2,
    name: "Smart Home",
    icon: "🏠",
    instructions: [
      "Open Shortcuts app",
      "Create new shortcut",
      "Add 'Control Home' action",
      "Select your devices",
      "Set desired states",
      "Name it 'Smart Home'"
    ]
  }
];

export { createFlipCardWidget, sampleShortcuts };
