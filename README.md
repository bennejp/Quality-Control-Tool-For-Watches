# Watch QC Tool - Quality Control Overlay Analysis

A professional browser-based React application for watch quality control (QC) overlay analysis. Upload watch photos, apply precision overlays, and export annotated images - all running client-side with no server required.

![Watch QC Tool](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🎯 Features

- **📷 Image Upload**: Upload watch photos with drag-and-drop support
- **🎨 Multiple Overlays**: Pre-built QC overlays for comprehensive analysis
  - Center Circles - Concentric circles for bezel alignment
  - Hour Grid - 12 radial lines for hour marker alignment
  - Minute Grid - 60 radial lines for minute marker alignment
  - Crosshair - Precise center alignment tool
  - Date Window Guide - Frame for date wheel centering
  - Logo/Dial Guide - Alignment guides for dial printing
- **⚙️ Advanced Controls**:
  - Independent zoom for image (50% - 400%)
  - Image rotation (-180° to 180°)
  - Per-overlay size, rotation, opacity, and color customization
- **💾 Export**: Download high-quality PNG with overlays applied
- **📱 Responsive**: Works on both desktop and mobile devices
- **🔒 Privacy**: 100% client-side - no uploads, no server, no tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder. Deploy them to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## 🎓 How to Use

1. **Upload a Watch Photo**
   - Click "Upload Watch Photo" button
   - Select an image from your device
   - The image will appear in the canvas area

2. **Apply Overlays**
   - Enable desired overlays from the sidebar (checkboxes)
   - Adjust size, rotation, opacity, and color for each overlay
   - **Drag overlays** directly on the canvas to reposition them
   - Fine-tune overlay settings with the sliders

3. **Adjust Image**
   - Use zoom slider to resize the image
   - Use rotation slider to rotate the image
   - Pan by dragging the image

4. **Export Result**
   - Click "Export as PNG" to download
   - The exported image includes all active overlays

## 🔍 Watch QC Checklist

Use the overlays to check for these common quality issues:

- ✅ **Index Alignment**: Hour markers properly aligned
- ✅ **Date Wheel**: Date centering in window
- ✅ **Bezel**: Pip centered and engravings filled
- ✅ **SEL Gaps**: Solid End Link gaps between bracelet and case
- ✅ **Hand Alignment**: Hands point to correct positions
- ✅ **Dial Printing**: Text and logo alignment
- ✅ **Timegrapher**: Movement performance metrics

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **React Konva** - Canvas rendering
- **Konva** - 2D canvas library
- **CSS3** - Modern styling

## 📁 Project Structure

```
QC/
├── src/
│   ├── components/         # React components
│   │   ├── Canvas.tsx      # Main canvas with image and overlays
│   │   ├── ControlPanel.tsx # Control sliders and toggles
│   │   ├── ExportButton.tsx # Export functionality
│   │   └── ImageUploader.tsx # File upload
│   ├── overlays/           # Overlay components
│   │   ├── CenterCircle.tsx
│   │   ├── Crosshair.tsx
│   │   ├── DateGuide.tsx
│   │   ├── HourGrid.tsx
│   │   ├── LogoGuide.tsx
│   │   └── MinuteGrid.tsx
│   ├── types/              # TypeScript definitions
│   ├── styles/             # CSS styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Adding New Overlays

1. Create a new overlay component in `src/overlays/`
2. Import and add to the Canvas component's render logic
3. Add overlay configuration to `initialOverlays` in `App.tsx`

### Changing Colors

Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --accent-primary: #ec4899;  /* Pink */
  --accent-secondary: #8b5cf6; /* Purple */
}
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Created by dodommul8

---

**Happy QC'ing! 🔍⌚**

