# 🚀 Quick Start Guide - Watch QC Tool

Get up and running in 3 simple steps!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18.2
- React Konva 18.2
- Konva 9.2
- TypeScript 5.3
- Vite 5.0

## Step 2: Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 3: Open in Browser

Navigate to **http://localhost:5173** and you're ready to go!

---

## 🎯 First Steps in the App

1. **Upload a Watch Photo**
   - Click the "📷 Upload Watch Photo" button
   - Select any watch image from your computer
   - The image appears on the canvas

2. **Try the Hour Grid Overlay**
   - Scroll down to "Overlays" section
   - Check the box next to "Hour Grid (12 markers)"
   - You'll see 12 radial lines appear on your watch
   - Drag the overlay to center it on your watch dial
   - Adjust the size slider to match your watch size

3. **Customize the Overlay**
   - Change the **Size** slider to resize the overlay
   - Adjust **Rotation** if needed
   - Change **Opacity** to make it more/less visible
   - Pick a different **Color** if pink isn't your style

4. **Export Your Result**
   - Scroll to the bottom
   - Click "💾 Export as PNG"
   - Your annotated image downloads automatically!

---

## 📱 Mobile Access

The app works on mobile devices too!

1. Start the dev server with network access:
   ```bash
   npm run dev -- --host
   ```

2. Look for the "Network" URL in the terminal
3. Open that URL on your phone
4. Upload photos from your phone's camera or gallery

---

## ⚙️ Build for Production

```bash
npm run build
```

The optimized production files will be in the `dist/` folder.

You can preview the production build:
```bash
npm run preview
```

---

## 🆘 Troubleshooting

### Port Already in Use?
If port 5173 is busy, Vite will automatically use the next available port.

### Dependencies Won't Install?
Make sure you have Node.js 16+ installed:
```bash
node --version
```

### Image Won't Upload?
Make sure the file is a valid image format (JPG, PNG, WEBP, etc.)

---

## 💡 Tips & Tricks

- **Multiple Overlays**: Enable multiple overlays at once for comprehensive analysis
- **Keyboard Shortcuts**: Arrow keys to fine-tune overlay positions (when dragging)
- **High-Res Export**: The exported image is 2x the display resolution for crisp prints
- **Reset View**: Click "Clear Image" to start fresh with a new watch photo

---

**Happy QC'ing! 🔍⌚**

