"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Page-wide motion and the image lightbox, attached to server-rendered markup:
 *  - [data-reveal]  rises in when scrolled into view (visible by default without JS)
 *  - [data-count]   counts up from 0 once visible
 *  - [data-type]    types its text out
 *  - a[data-zoom]   opens in a lightbox instead of navigating
 * Everything is skipped under prefers-reduced-motion except the lightbox.
 */
export function Motion() {
  const [zoom, setZoom] = useState<{ src: string; caption: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) { root.classList.remove("js"); return; }
    root.classList.add("motion-ready");

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.count), dec = Number(el.dataset.decimals ?? 0), t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1100), eased = 1 - Math.pow(1 - k, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("is-in");
        el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    document.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
      const text = el.dataset.type ?? "";
      el.textContent = "";
      text.split("").forEach((ch, i) => setTimeout(() => { el.textContent += ch; }, 350 + i * 90));
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-zoom]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setZoom({ src: a.dataset.zoom ?? a.href, caption: a.dataset.caption ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (zoom && d && !d.open) d.showModal();
  }, [zoom]);

  return (
    <dialog ref={dialog} className="lightbox" aria-label={zoom?.caption || "Image viewer"} onClose={() => setZoom(null)}
      onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      {zoom && (
        <figure>
          <img src={zoom.src} alt={zoom.caption} />
          <figcaption><span>{zoom.caption}</span><button type="button" onClick={() => dialog.current?.close()} autoFocus>close ✕</button></figcaption>
        </figure>
      )}
    </dialog>
  );
}
