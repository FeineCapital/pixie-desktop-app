# Pixie — macOS Desktop App

System-wide screenshot and annotation tool for macOS.

## Quick start

```bash
npm install
npm start
```

The app hides from the Dock and appears as **⊡** in your menu bar.

## Shortcuts

| Shortcut | Action |
|----------|--------|
| **⌘⇧6** | Activate capture overlay — drag to select an area |
| **⌘⇧7** | Instant full-screen capture (copied + saved to Desktop) |

### After selecting (⌘⇧6)

| Action | How |
|--------|-----|
| Annotate | Pencil tool — draw freehand |
| Erase | Eraser tool |
| Change colour | Click a colour dot |
| Toggle corners | Round ↔ Sharp corners |
| Move selection | Drag inside the selection |
| Copy to clipboard | Click **Copy** or **⌘C** |
| Save to Desktop | Click **Save** or **Enter** |
| Cancel | **Escape** |

## Build a distributable .app

```bash
npm run dist
```

The `.app` and `.dmg` appear in `dist/`. Drag the `.app` to Applications.

> **Note:** macOS will ask for Screen Recording permission the first time.
> Grant it in System Preferences → Privacy & Security → Screen Recording.
