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

    if (tag === 'div' && rect.width > 60 && rect.height > 28 && rect.width < vw * 0.88 && rect.height < vh * 0.65) {
      found = el; break;
    }

    if (tag === 'li' && rect.width > 20 && rect.height > 10) { found = el; break; }
  }

  if (!found) return null;

  const foundTag = found.tagName.toLowerCase();

  if (['img', 'svg'].includes(foundTag)) {
    const rect = found.getBoundingClientRect();
    if (rect.width < 40 && rect.height < 40) {
      const parentLink = found.closest('a, button');
      if (parentLink) found = parentLink;
    }
  }

  if (foundTag === 'span') {
    const parentLink = found.closest('a, button');
    if (parentLink) found = parentLink;
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

export function PixieGlobalOverlay() {
  const [box, setBox] = useState<{ x: number; y: number; w: number; h: number; radius: string } | null>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [inDemo, setInDemo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const targetRef = useRef<Element | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>(0);

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
          const r = target.getBoundingClientRect();
          const { pad, radius } = getOutline(target);
          setBox({ x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2, radius });
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

      setCapturing(true);
      try {
        const canvas = await html2canvas(target as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
        });

        canvas.toBlob(async (blob) => {
          if (!blob) return;
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopied(true);
            clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setCopied(false), 2000);
          } catch {
            // Clipboard write not permitted in this context
          }
        }, 'image/png');
      } catch {
        // Capture failed silently
      } finally {
        setCapturing(false);
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

  const labelText = copied ? 'Copied!' : capturing ? 'Capturing…' : 'Click to capture';
  const labelColor = copied ? '#34D399' : '#fff';

  return (
    <>
      {box && (
        <div
          style={{
            position: 'fixed',
            left: box.x,
            top: box.y,
            width: box.w,
            height: box.h,
            border: `2px solid ${copied ? '#34D399' : '#34D399'}`,
            borderRadius: box.radius,
            background: copied ? 'rgba(52,211,153,0.08)' : 'rgba(52,211,153,0.04)',
            pointerEvents: 'none',
            zIndex: 99999,
          }}
        />
      )}
      {mouse && box && !inDemo && (
        <div
          style={{
            position: 'fixed',
            left: mouse.x + 18,
            top: mouse.y - 28,
            background: '#171717',
            borderRadius: '8px',
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            pointerEvents: 'none',
            zIndex: 100000,
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transition: 'opacity 0.15s',
          }}
        >
          {copied ? (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span style={{ fontSize: '10px', fontWeight: 600, color: labelColor, fontFamily: 'Arial, sans-serif' }}>
            {labelText}
          </span>
        </div>
      )}
    </>
  );
}
