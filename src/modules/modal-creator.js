// Modal Creator - Dynamic modal generation system
// Optimized for performance with lazy loading

export function createModal(type, options = {}) {
  return new Promise((resolve) => {
    const modalId = `${type}Modal`;

    // Remove existing modal if present
    const existing = document.getElementById(modalId);
    if (existing) {
      existing.remove();
    }

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal-overlay';
    // modal.style.cssText is removed

    // Create modal content based on type
    const content = createModalContent(type, options);
    modal.appendChild(content);

    // Append to screen content for proper containment
    const screenContent = document.querySelector('.screen-content');
    if (screenContent) {
      screenContent.appendChild(modal);
    } else {
      document.body.appendChild(modal);
    }

    // Animate in
    requestAnimationFrame(() => {
      modal.classList.add('visible');
      resolve(modal);
    });
  });
}

function createModalContent(type, options) {
  const content = document.createElement('div');
  content.className = 'modal-content';

  // Animate content in - This is now handled by the 'visible' class on the overlay
  // and the corresponding CSS animations in unified-modals.css.
  // requestAnimationFrame(() => {
  //   content.style.transform = 'scale(1)';
  // });

  switch (type) {
    case 'share':
      content.innerHTML = createShareModalContent(options);
      break;
    case 'filter':
      content.innerHTML = createFilterModalContent(options);
      break;
    case 'generate':
      content.innerHTML = createGenerateModalContent(options);
      break;
    default:
      content.innerHTML = '<p>Modal content not found</p>';
  }

  return content;
}

function createShareModalContent(options) {
  const { isCardFlipped, shortcut } = options;
  const url = 'https://techtonicliving.com/ios-shortcuts-wizard';

  let title, text, shareTitle, copyButtonText, copyButtonIcon;

  if (isCardFlipped && shortcut) {
    shareTitle = 'Share Shortcut';
    title = shortcut.name;
    text = shortcut.description;
    copyButtonText = 'Copy Details';
    copyButtonIcon = 'content_copy';
  } else {
    shareTitle = 'Share App';
    title = 'iOS Shortcut Wizard';
    text = 'Create powerful iOS shortcuts instantly with this interactive wizard!';
    copyButtonText = 'Copy Link';
    copyButtonIcon = 'link';
  }

  return `
    <div class="modal-header">
      <h2 class="modal-title">${shareTitle}</h2>
      <button class="modal-close" id="share-modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <div class="share-preview">
        <div class="share-preview-icon">
          ${isCardFlipped ? `<span class="material-icons">${shortcut.icon}</span>` : '🚀'}
        </div>
        <div class="share-preview-text">
          <h4>${title}</h4>
          <p>${text}</p>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="modal-button secondary" id="copy-link-btn">
        <span class="material-icons">${copyButtonIcon}</span>
        ${copyButtonText}
      </button>
      <button class="modal-button primary" id="native-share-btn">
        <span class="material-icons">share</span>
        Share
      </button>
    </div>
  `;
}

function createFilterModalContent(options) {
  const { categories = [], preferences = {} } = options;

  // Create category pills
  const categoryPills = categories.map(category => {
    const isSelected = preferences.categories && preferences.categories.includes(category);
    const displayName = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
    return `
      <button class="category-pill ${isSelected ? 'selected' : ''}" data-category="${category}">
        ${displayName}
      </button>
    `;
  }).join('');

  return `
    <div class="modal-header">
      <h2 class="modal-title">Filter Shortcuts</h2>
      <button class="modal-close" id="filter-modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <div class="filter-input-section">
        <label class="filter-label">Categories</label>
        <div class="category-pills-grid">
          ${categoryPills}
        </div>
      </div>

      <div class="filter-input-section">
        <label class="filter-label">AI-Generated Suggestions</label>
        <div class="ai-toggle-container">
          <label class="ai-toggle-switch">
            <input type="checkbox" id="ai-enabled-toggle" ${preferences.aiEnabled !== false ? 'checked' : ''}>
            <span class="ai-toggle-slider"></span>
            <span class="ai-toggle-label">Include AI suggestions</span>
          </label>
        </div>
      </div>

      <div class="filter-input-section" id="ai-ratio-section" style="display: ${preferences.aiEnabled !== false ? 'block' : 'none'};">
        <label for="ai-ratio-slider" class="filter-label">AI Ratio: <span id="ai-ratio-value">${Math.round((preferences.aiRatio || 0.5) * 100)}%</span></label>
        <input type="range" id="ai-ratio-slider" min="0" max="1" step="0.1" value="${preferences.aiRatio || 0.5}">
      </div>

      <div class="filter-input-section">
        <label for="difficulty-select" class="filter-label">Difficulty Level</label>
        <select id="difficulty-select" class="filter-select">
          <option value="all" ${preferences.difficulty === 'all' ? 'selected' : ''}>All</option>
          <option value="beginner" ${preferences.difficulty === 'beginner' ? 'selected' : ''}>Beginner</option>
          <option value="intermediate" ${preferences.difficulty === 'intermediate' ? 'selected' : ''}>Intermediate</option>
          <option value="advanced" ${preferences.difficulty === 'advanced' ? 'selected' : ''}>Advanced</option>
        </select>
      </div>
    </div>
    <div class="modal-actions">
      <button class="modal-button secondary" id="filter-cancel-btn">Cancel</button>
      <button class="modal-button secondary" id="filter-reset-btn">Reset</button>
      <button class="modal-button primary" id="apply-filters-btn">Apply</button>
    </div>
  `;
}

function createGenerateModalContent(options) {
  const { userShortcuts = [] } = options;

  const shortcutsListHtml = userShortcuts.length > 0
    ? userShortcuts.map(s => `
        <div class="user-shortcut-item" data-shortcut-id="${s.id}">
            <div class="user-shortcut-info">
                <span class="material-icons">${s.icon}</span>
                <span class="user-shortcut-name">${s.name}</span>
            </div>
            <div class="user-shortcut-actions">
              <button class="modal-button tertiary view-shortcut-btn" title="View this shortcut">visibility</button>
              <button class="modal-button secondary reuse-shortcut-btn" title="Edit this shortcut">edit</button>
            </div>
        </div>
      `).join('')
    : '<div class="no-shortcuts-message"><span class="material-icons">history</span><p>Your generated shortcuts will appear here.</p></div>';

  return `
    <div class="modal-header">
      <h2 class="modal-title">Generate with AI</h2>
      <button class="modal-close" id="generate-modal-close">&times;</button>
    </div>
    <div class="modal-body" id="generate-modal-body">
      <div id="generate-step-1">
        <div class="generate-input-section">
          <label for="shortcut-prompt-input" class="generate-label">What shortcut would you like to create?</label>
          <textarea id="shortcut-prompt-input" class="generate-textarea" placeholder="e.g., 'A timer for 25-minute focus sessions' or 'Help me create a weekly shopping list' or 'Quickly message my family when I'm running late'" rows="4"></textarea>
        </div>

        <div class="generate-input-section">
          <label for="difficulty-slider" class="generate-label">Complexity Level: <span id="difficulty-value">Beginner</span></label>
          <div class="difficulty-slider-container">
            <span class="difficulty-label-min">Simple</span>
            <input type="range" id="difficulty-slider" min="1" max="3" value="1" step="1" class="difficulty-slider">
            <span class="difficulty-label-max">Advanced</span>
          </div>
          <div class="difficulty-description" id="difficulty-description">
            Perfect for getting started - straightforward shortcuts with simple steps.
          </div>
        </div>
      </div>

      <div id="generate-step-2" style="display: none;">
        <!-- AI-generated preview will be populated here -->
      </div>
    </div>
    <div class="modal-actions" id="generate-modal-actions">
      <button class="modal-button secondary" id="generate-cancel-btn">Cancel</button>
      <button class="modal-button primary" id="generate-ai-btn">
        <span class="material-icons">auto_awesome</span>
        Generate
      </button>
    </div>
    <div class="user-creations-section">
      <div class="user-creations-header">
        <h4 class="user-creations-title">Your Recent Creations</h4>
        ${userShortcuts.length > 0 ? '<button class="clear-user-shortcuts-btn" id="clear-user-shortcuts-btn">Clear</button>' : ''}
      </div>
      <div class="user-shortcuts-list">
        ${shortcutsListHtml}
      </div>
    </div>
  `;
}
