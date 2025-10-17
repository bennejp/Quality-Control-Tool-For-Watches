# Watch QC Tool

A browser-based quality control tool for watch enthusiasts. Upload watch photos, apply precision overlays, and systematically document your observations with a built-in checklist system.

## About

This tool was created to help watch collectors and enthusiasts perform thorough quality control inspections. Whether you're examining alignment, checking dial printing, or verifying bezel positioning, this tool provides the overlays and structure you need to conduct a complete QC inspection.

All processing happens entirely in your browser. Your photos never leave your device, and no account or login is required.

## Features

### Precision Overlay System
- Multiple overlay types: Hour Grid, Minute Grid (60 markers), Crosshair, Date Window Guide, and more
- Independent controls for each overlay: position, size, rotation, opacity, and line thickness
- Drag overlays with mouse or use arrow keys for pixel-perfect positioning
- Layer management with "bring to front" functionality for multiple overlays
- Default cyan overlay color optimized for visibility

### Quality Control Checklist
- Structured checklist covering all major QC points: index alignment, dial printing, date wheel, bezel, SELs, hand alignment, timegrapher numbers, and overall quality
- Add detailed notes for each checkpoint
- Optional fields for dealer information, factory, model details, price, and album links
- Export your completed QC report to clipboard or download as text file

### Image Controls
- Upload and analyze watch photos directly in your browser
- Independent zoom and rotation controls for the image
- Drag to reposition images
- Mobile-friendly touch controls: pinch-to-zoom and drag gestures
- Export annotated images with overlays included

### Mobile Optimization
- Collapsible sidebar on mobile devices for full-screen canvas viewing
- Touch-optimized controls and large tap targets
- Responsive design that works on phones, tablets, and desktops

## Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/QC.git
cd QC
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Basic Workflow

1. **Upload an Image**: Click the upload button and select a watch photo from your device
2. **Apply Overlays**: Enable the overlays you need (Hour Grid for index alignment, Crosshair for center alignment, etc.)
3. **Adjust Overlays**: Use the controls to position, rotate, and resize overlays to match your watch
4. **Fine-tune**: Use arrow keys to move overlays with precision (hold Shift for 10px jumps)
5. **Document Findings**: Switch to the "QC Guide" tab and fill out the checklist with your observations
6. **Export**: Copy your report to clipboard for posting online, or download as a text file

### Keyboard Shortcuts

- **Arrow Keys**: Move selected overlay by 1 pixel
- **Shift + Arrow Keys**: Move selected overlay by 10 pixels
- **Click Slider + Arrow Keys**: Fine-adjust slider values

### Tips for Best Results

- Use top-down photos for most accurate overlay alignment
- Start with the center alignment overlays (Crosshair or Center Circles) to establish your reference point
- Adjust overlay opacity if you need to see the watch details more clearly
- Use the "Bring to Front" button when working with multiple overlays
- On mobile, collapse the sidebar for full-screen analysis

## Technology Stack

- React 18
- TypeScript
- Vite
- Konva (canvas manipulation)
- React Konva (React bindings for Konva)

## Feature Toggles

The project includes feature flags that can be easily enabled or disabled. See `src/App.tsx`:

```typescript
const ENABLE_WATCH_GUIDE_SELECTOR = false; // Set to true to enable watch model guides
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Canvas.tsx      # Main canvas with overlays
│   ├── ControlPanel.tsx # Sidebar controls
│   ├── ImageUploader.tsx
│   ├── ExportButton.tsx
│   └── QCGuide/        # QC checklist components
├── overlays/           # Overlay shape components
│   ├── MinuteGrid.tsx
│   ├── HourGrid.tsx
│   ├── Crosshair.tsx
│   └── ...
├── data/               # Static data
│   ├── checklistData.ts
│   └── watchGuides.ts
├── types/              # TypeScript type definitions
├── styles/             # CSS styling
└── App.tsx            # Main application component
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Modern browsers with ES2020+ support required.

## Deployment

This project is configured for deployment to GitHub Pages. The workflow is defined in `.github/workflows/deploy.yml`.

To deploy:
1. Push to the main branch
2. GitHub Actions will automatically build and deploy to GitHub Pages

Alternatively, you can deploy to any static hosting service (Netlify, Vercel, etc.) by building and uploading the `dist` folder.

## Privacy

All image processing and overlay manipulation happens entirely in your browser using client-side JavaScript. No images, data, or information is sent to any server. No analytics, tracking, or data collection is implemented.

## Disclaimer

This is an educational tool for watch photography and quality control overlay analysis. It is intended for educational and informational purposes only. The tool provides measurement and documentation capabilities for watch inspection, regardless of the watch's origin or authenticity.

This project does not endorse, promote, or facilitate the sale of counterfeit goods.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features or overlays
- Submit pull requests
- Improve documentation

Please ensure your code follows the existing style and includes appropriate TypeScript types.

## License

MIT License - see LICENSE file for details

## Acknowledgments

Built for the watch enthusiast community. Inspired by the need for better quality control tools and systematic inspection methods.

Special thanks to the communities that helped shape the requirements and features of this tool.

## Support

If you encounter issues or have questions:
- Open an issue on GitHub
- Check existing issues for similar problems
- Provide detailed information including browser version and steps to reproduce

---

Made with care for watch enthusiasts by watch enthusiasts.
