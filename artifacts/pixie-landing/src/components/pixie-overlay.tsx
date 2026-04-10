import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const SEMANTIC = new Set(['a', 'button', 'input', 'textarea', 'select', 'img', 'video', 'canvas', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'kbd', 'label']);
const SKIP = new Set(['html', 'body', 'path', 'circle', 'rect', 'g', 'polygon', 'line', 'polyline', 'defs', 'use', 'stop', 'clippath', 'lineargradient', 'radialgradient', 'ellipse']);

function isInDemoArea(el: Element): boolean {
  return !!el.closest('.pixie-demo-area');
}

function findTarget(x: number, y: number): Element | null {
  const elements = document.elementsFromPoint(x, y);
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let found: Element | null = null;

  for (const el of elements) {
    const tag = el.tagName.toLowerCase();
    if (SKIP.has(tag)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width > vw * 0.95 || rect.height > vh * 0.88) continue;
    if (tag === 'svg' && rect.width < 30 && rect.height < 30) continue;
    if (SEMANTIC.has(tag) && rect.width > 10 && rect.height > 6) { found = el; break; }
    if (tag === 'svg') { found = el; break; }
    if (tag === 'span' && rect.width > 10 && rect.height > 8) { found = el; break; }
    if (tag === 'div' && rect.width > 60 && rect.height > 28 && rect.width < vw * 0.88 && rect.height < vh * 0.65) { found = el; break; }
    if (tag === 'li' && rect.width > 20 && rect.height > 10) { found = el; break; }
  }

  if (!found) return null;
  const foundTag = found.tagName.toLowerCase();

  if (['img', 'svg'].includes(foundTag)) {
    const rect = found.getBoundingClientRect();
    if (rect.width < 40 && rect.height < 40) {
      const parent = found.closest('a, button');
      if (parent) found = parent;
    }
  }
  if (foundTag === 'span') {
    const parent = found.closest('a, button');
    if (parent) found = parent;
  }
  if (!isInDemoArea(found)) {
    const card = found.closest('[data-pixie-card]');
    if (card) return card;
  }
  return found;
}

function getOutline(el: Element): { pad: number; radius: string } {
  const tag = el.tagName.toLowerCase();
  let br = '4px';
  try { br = window.getComputedStyle(el).borderRadius || '4px'; } catch {}
  if (br === '0px') br = '4px';
  if ((el as HTMLElement).dataset?.pixieCard) return { pad: 3, radius: br };
  if (['a', 'button'].includes(tag)) return { pad: 1, radius: br };
  if (['h1', 'h2', 'h3'].includes(tag)) return { pad: 3, radius: '8px' };
  if (tag === 'p') return { pad: 2, radius: '6px' };
  if (tag === 'img') return { pad: 1, radius: br };
  return { pad: 2, radius: br };
}

async function captureElement(target: Element): Promise<void> {
  const raw = await html2canvas(target as HTMLElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null,
  });

  // Apply rounded corners matching the element's computed border-radius
  const br = parseFloat(window.getComputedStyle(target as HTMLElement).borderRadius) || 0;
  const r = br * 2; // scaled at 2x

  const out = document.createElement('canvas');
  out.width = raw.width;
  out.height = raw.height;
  const ctx = out.getContext('2d');
  if (!ctx) return;

  if (r > 0) {
    const w = raw.width, h = raw.height;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.clip();
  }

  ctx.drawImage(raw, 0, 0);

  await new Promise<void>((resolve) => {
    out.toBlob(async (blob) => {
      if (!blob) { resolve(); return; }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      resolve();
    }, 'image/png');
  });
}

export function PixieGlobalOverlay() {
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number; radius: string } | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [inDemo, setInDemo] = useState(false);
  const [status, setStatus] = useState<'idle' | 'capturing' | 'copied'>('idle');
  const targetRef = useRef<Element | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>(0);

  // Force default cursor across the whole page
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'pixie-cursor-override';
    style.textContent = '* { cursor: default !important; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({ x: e.clientX, y: e.clientY });
        const target = findTarget(e.clientX, e.clientY);
        targetRef.current = target;
        const demo = target ? isInDemoArea(target) : false;
        setInDemo(demo);
        if (target) {
          const r2 = target.getBoundingClientRect();
          const { pad, radius } = getOutline(target);
          setBox({ x: r2.left - pad, y: r2.top - pad, w: r2.width + pad * 2, h: r2.height + pad * 2, radius });
        } else {
          setBox(null);
        }
      });
    }

    async function onClick(e: MouseEvent) {
      const target = targetRef.current;
      if (!target || isInDemoArea(target)) return;
      e.preventDefault();
      e.stopPropagation();
      setStatus('capturing');
      try {
        await captureElement(target);
        setStatus('copied');
        clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setStatus('idle'), 2200);
      } catch {
        setStatus('idle');
      }
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => { setBox(null); setMouse(null); });
    document.addEventListener('click', onClick, { capture: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick, { capture: true });
      cancelAnimationFrame(rafRef.current);
      clearTimeout(copiedTimer.current);
    };
  }, []);

  const labelText = status === 'copied' ? 'Copied!' : status === 'capturing' ? 'Capturing…' : 'Click to capture';

  return (
    <>
      {box && (
        <div style={{
          position: 'fixed',
          left: box.x,
          top: box.y,
          width: box.w,
          height: box.h,
          border: '2px solid #34D399',
          borderRadius: box.radius,
          background: status === 'copied' ? 'rgba(52,211,153,0.09)' : 'rgba(52,211,153,0.04)',
          pointerEvents: 'none',
          zIndex: 99999,
        }} />
      )}
      {mouse && box && !inDemo && (
        <div style={{
          position: 'fixed',
          left: mouse.x + 34,
          top: mouse.y - 50,
          background: '#171717',
          borderRadius: '8px',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          pointerEvents: 'none',
          zIndex: 100000,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(0,0,0,0.22)',
        }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', fontFamily: 'Arial, sans-serif' }}>
            {labelText}
          </span>
        </div>
      )}
    </>
  );
}
