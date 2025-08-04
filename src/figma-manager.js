// Figma Asset Manager
export class FigmaAssetManager {
  constructor() {
    this.assetPath = '/images/';
    this.loadedAssets = new Set();
  }

  // Preload Figma assets
  preloadAssets(assetList) {
    assetList.forEach(asset => {
      const img = new Image();
      img.src = this.assetPath + asset;
      img.onload = () => this.loadedAssets.add(asset);
    });
  }

  // Get asset URL
  getAssetUrl(assetName) {
    return this.assetPath + assetName;
  }

  // Check if asset is loaded
  isAssetLoaded(assetName) {
    return this.loadedAssets.has(assetName);
  }

  // Create icon element with Material Icons
  createIcon(assetName, className = 'material-icon-md') {
    const icon = document.createElement('div');
    icon.className = `material-icon ${className}`;
    icon.style.backgroundImage = `url(${this.getAssetUrl(assetName)})`;
    return icon;
  }

  // Replace emoji icons with Material Icons
  replaceEmojiWithAssets(container) {
    const iconMap = {
      '🏠': 'home',
      '📚': 'book-5',
      '🔍': 'search',
      '⚙️': 'settings',
      '⚡':  'bolt',
      '📱': 'mobile',
      '🎨': 'palette',
      '📸': 'photo-camera',
      '🎵': 'music note',
      '📍': 'pin-drop'
    };

    const elementsWithEmojis = container.querySelectorAll('*');
    elementsWithEmojis.forEach(element => {
      Object.keys(iconMap).forEach(emoji => {
        if (element.textContent.includes(emoji)) {
          element.textContent = element.textContent.replace(emoji, '');
          const iconElement = this.createIcon(iconMap[emoji]);
          element.prepend(iconElement);
        }
      });
    });
  }

  // Apply Figma design tokens from extracted data
  applyDesignTokens(tokens) {
    const root = document.documentElement;

    // Apply colors
    if (tokens.colors) {
      Object.keys(tokens.colors).forEach(colorName => {
        root.style.setProperty(`--figma-${colorName}`, tokens.colors[colorName]);
      });
    }

    // Apply typography
    if (tokens.typography) {
      Object.keys(tokens.typography).forEach(fontName => {
        root.style.setProperty(`--figma-font-${fontName}`, tokens.typography[fontName]);
      });
    }

    // Apply spacing
    if (tokens.spacing) {
      Object.keys(tokens.spacing).forEach(spaceName => {
        root.style.setProperty(`--figma-space-${spaceName}`, tokens.spacing[spaceName]);
      });
    }
  }

  // Extract colors from Figma (to be called when you copy from Figma)
  extractColorsFromFigma(figmaData) {
    // This will be populated when you copy colors from Figma
    console.log('Figma colors extracted:', figmaData);
    return figmaData;
  }

  // Update component with Figma asset
  updateComponentAsset(selector, assetName) {
    const element = document.querySelector(selector);
    if (element) {
      element.style.backgroundImage = `url(${this.getAssetUrl(assetName)})`;
    }
  }
}

// Initialize Figma Asset Manager
export const figmaAssets = new FigmaAssetManager();

// Common Material Icons assets to preload
const commonAssets = [
  'logo.svg',
  'icon-home.svg',
  'icon-search.svg',
  'icon-settings.svg',
  'icon-add.svg',
  'icon-library.svg',
  'icon-lightning.svg',
  'icon-phone.svg',
  'icon-palette.svg',
  'icon-camera.svg',
  'icon-music.svg',
  'icon-location.svg'
];

// Preload assets when module loads
figmaAssets.preloadAssets(commonAssets);
