# Element Capture — macOS Desktop App

Works system-wide: Chrome, Safari, Figma, Finder, video players — everything.

## Quick start (development)

```bash
npm install
npm start
```

The app hides from the Dock and appears as **⊡** in the menu bar.

## Activate

Press **⌘⇧6** from anywhere — the capture overlay appears.
Drag across any area of the screen to make a selection.

## After selecting

| Action | How |
|--------|-----|
| Annotate | Pencil tool — draw freehand |
| Erase | Eraser tool |
| Change colour | Click a colour dot |
| Copy to clipboard | Click **Copy** or **⌘C** |
| Save to Desktop | Click **Save** or **Enter** |
| Cancel | **Escape** |

## Build a distributable .app

```bash
npm run dist
```

The `.app` and `.dmg` appear in `dist/`. Drag the `.app` to Applications.

> **Note:** macOS will ask for Screen Recording permission the first time you
> activate the shortcut. Grant it in System Preferences → Privacy & Security →
> Screen Recording.
