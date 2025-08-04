# Figma Integration Guide

This project is set up for seamless integration with your Figma designs. Follow these steps to extract and implement your design assets.

## 🎨 Figma Configuration

Your Figma settings are already configured:
- **Export Directory**: `public/images`
- **Asset Path**: `/images`

## 📁 Project Structure

```
src/
├── figma-assets.css      # Design tokens and asset styles
├── figma-manager.js      # JavaScript utilities for assets
├── iphone-ui.css        # Base iPhone UI framework
└── main.js              # Main application logic

public/
└── images/              # Exported Figma assets go here
```

## 🚀 How to Use Figma Integration

### 1. Export Assets from Figma
1. Open your Figma design in VS Code (already connected)
2. Select any element in Figma
3. Right-click → "Export" or use the export panel
4. Choose SVG/PNG format
5. Assets will automatically save to `public/images/`

### 2. Copy Design Properties
1. Select an element in Figma
2. In the Figma VS Code panel, click "Copy CSS"
3. Paste the CSS into your component styles

### 3. Extract Design Tokens
1. Select text elements to get font properties
2. Select shapes/backgrounds to get colors
3. Update the CSS variables in `src/figma-assets.css`

### 4. Replace Icons
Use the `FigmaAssetManager` to replace emoji icons with your Figma assets:

```javascript
import { figmaAssets } from './figma-manager.js';

// Replace emojis with Figma icons
figmaAssets.replaceEmojiWithAssets(document.body);

// Update specific component
figmaAssets.updateComponentAsset('.nav-button', 'your-icon.svg');
```

## 🎯 Common Integration Tasks

### Update Colors
```css
:root {
  --figma-primary: #YOUR_COLOR;
  --figma-secondary: #YOUR_COLOR;
  /* Copy colors directly from Figma */
}
```

### Replace Icons
1. Export icon from Figma as SVG
2. Save to `public/images/icon-name.svg`
3. Update CSS class:
```css
.figma-icon-home {
  background-image: url('/images/icon-home.svg');
}
```

### Apply Typography
```css
:root {
  --figma-font-primary: 'Your Font', sans-serif;
}
```

### Use Components
Apply Figma design to existing components:
```html
<button class="figma-button figma-button-primary">
  Button Text
</button>
```

## 📱 Current UI Components Ready for Figma

- Navigation Header
- Search Bar
- Quick Actions Grid
- Shortcut Cards
- Tab Bar
- Status Bar
- Dynamic Island

## 🔄 Workflow

1. **Design in Figma** → Complete your UI mockup
2. **Export Assets** → Use Figma VS Code extension
3. **Copy Properties** → Get CSS from Figma elements
4. **Update Code** → Apply to iPhone UI components
5. **Test Live** → See changes instantly with hot reload

## 💡 Tips

- Use SVG format for icons (better quality, smaller size)
- Copy exact color values from Figma for pixel-perfect matching
- Export assets at @2x for retina displays
- Use the Figma dev mode for accurate measurements
- Test on different screen sizes

Your pixel-perfect iPhone UI is ready for your Figma design! 🎉
