import { useEffect, useRef, useState } from "react";

const SEMANTIC = new Set(['a', 'button', 'input', 'textarea', 'select', 'img', 'video', 'canvas', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'kbd', 'label']);
const SKIP = new Set(['html', 'body', 'path', 'circle', 'rect', 'g', 'polygon', 'line', 'polyline', 'defs', 'use', 'stop', 'clippath', 'lineargradient', 'radialgradient', 'ellipse']);

function findTarget(x: number, y: number): Element | null {
  const elements = document.elementsFromPoint(x, y);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  for (const el of elements) {
    const tag = el.tagName.toLowerCase();
    if (SKIP.has(tag)) continue;

    const rect = el.getBoundingClientRect();

    // Skip page-spanning containers
    if (rect.width > vw * 0.95 || rect.height > vh * 0.88) continue;

    // Skip tiny SVG icons (decorative)
    if (tag === 'svg' && rect.width < 30 && rect.height < 30) continue;

    // Semantic content & interactive elements
    if (SEMANTIC.has(tag) && rect.width > 10 && rect.height > 6) return el;

    // Larger SVGs (logos etc.)
    if (tag === 'svg') return el;

    // Inline elements with real size
    if (tag === 'span' && rect.width > 10 && rect.height > 8) return el;

    // Card-like divs
    if (tag === 'div' && rect.width > 60 && rect.height > 28 && rect.width < vw * 0.88 && rect.height < vh * 0.65) {
      return el;
    }

    if (tag === 'li' && rect.width > 20 && rect.height > 10) return el;
  }
  return null;
}

function getOutline(el: Element): { pad: number; radius: string } {
  const tag = el.tagName.toLowerCase();
  let br = '4px';
  try { br = window.getComputedStyle(el).borderRadius || '4px'; } catch {}
  if (br === '0px') br = '4px';
  if (['a', 'button'].includes(tag)) return { pad: 2, radius: br };
  if (['h1', 'h2', 'h3'].includes(tag)) return { pad: 5, radius: '8px' };
  if (tag === 'p') return { pad: 4, radius: '6px' };
  if (tag === 'img') return { pad: 2, radius: br };
  return { pad: 3, radius: br };
}

export function PixieGlobalOverlay() {
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number; radius: string } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const target = findTarget(e.clientX, e.clientY);
        if (target) {
          const r = target.getBoundingClientRect();
          const { pad, radius } = getOutline(target);
          setBox({ x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2, radius });
        } else {
          setBox(null);
        }
      });
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => setBox(null));
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!box) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        border: '2px solid #34D399',
        borderRadius: box.radius,
        background: 'rgba(52,211,153,0.04)',
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}
