"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on desktop fine pointers (mouse/trackpad)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const leftEye = cursor.querySelector<SVGCircleElement>(".left-eye");
    const rightEye = cursor.querySelector<SVGCircleElement>(".right-eye");
    const mouth = cursor.querySelector<SVGPathElement>(".cursor-mouth");

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let curW = 44;
    let curH = 44;
    let curR = 22;
    let targetW = 44;
    let targetH = 44;
    let targetR = 22;
    let isVisible = false;
    let isHoveringInteractive = false;
    let cursorFrame = 0;

    // Gaze targets
    let eyeOffsetX = 0;
    let eyeOffsetY = 0;
    let curEyeX = 0;
    let curEyeY = 0;
    let mouthRotate = 0;
    let curMouthRotate = 0;

    interface ElementBounds {
      left: number;
      top: number;
      right: number;
      bottom: number;
      centerX: number;
      centerY: number;
      area: number;
    }
    let interactiveElements: HTMLElement[] = [];
    const interactiveBounds: ElementBounds[] = [];

    function scheduleCursorRender() {
      if (!cursorFrame) cursorFrame = requestAnimationFrame(renderCursor);
    }

    function renderCursor() {
      cursorFrame = 0;
      if (!cursor || !isVisible) {
        if (cursor) {
          cursor.style.opacity = "0";
          cursor.style.display = "none";
        }
        return;
      }

      cursor.style.display = "block";
      // Smooth butter interpolation
      curX += (mouseX - curX) * 0.24;
      curY += (mouseY - curY) * 0.24;

      if (isHoveringInteractive) {
        targetW = 9;
        targetH = 9;
        targetR = 5;
      } else {
        targetW = 44;
        targetH = 44;
        targetR = 22;
      }

      // Eye gaze calculation towards nearest interactive element
      let closestDist = Infinity;
      let closestArea = Infinity;
      let bestDx = 0;
      let bestDy = 0;

      for (let i = 0; i < interactiveBounds.length; i++) {
        const bounds = interactiveBounds[i];
        const nearestX = Math.max(bounds.left, Math.min(mouseX, bounds.right));
        const nearestY = Math.max(bounds.top, Math.min(mouseY, bounds.bottom));
        const dist = Math.hypot(mouseX - nearestX, mouseY - nearestY);
        if (dist > closestDist || (dist === closestDist && bounds.area >= closestArea)) continue;

        closestDist = dist;
        closestArea = bounds.area;
        bestDx = bounds.centerX - mouseX;
        bestDy = bounds.centerY - mouseY;
      }

      if (Number.isFinite(closestDist) && !isHoveringInteractive) {
        const gazeRange = Math.max(1, Math.hypot(window.innerWidth, window.innerHeight));
        const intensity = Math.max(1.4, (1 - Math.min(closestDist / gazeRange, 1)) * 4.5);
        const directionLength = Math.hypot(bestDx, bestDy);
        if (directionLength > 12) {
          eyeOffsetX = (bestDx / directionLength) * intensity;
          eyeOffsetY = (bestDy / directionLength) * intensity;
          mouthRotate = (bestDx / directionLength) * intensity * 3.0;
        } else {
          eyeOffsetX = 0;
          eyeOffsetY = 0;
          mouthRotate = 0;
        }
      } else {
        eyeOffsetX = 0;
        eyeOffsetY = 0;
        mouthRotate = 0;
      }

      curW += (targetW - curW) * 0.22;
      curH += (targetH - curH) * 0.22;
      curR += (targetR - curR) * 0.22;

      curEyeX += (eyeOffsetX - curEyeX) * 0.22;
      curEyeY += (eyeOffsetY - curEyeY) * 0.22;
      curMouthRotate += (mouthRotate - curMouthRotate) * 0.22;

      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      cursor.style.width = `${curW.toFixed(1)}px`;
      cursor.style.height = `${curH.toFixed(1)}px`;
      cursor.style.borderRadius = `${curR.toFixed(1)}px`;
      cursor.style.opacity = "1";

      if (leftEye && rightEye && mouth && !isHoveringInteractive) {
        leftEye.setAttribute("cx", (15 + curEyeX * 1.5).toFixed(2));
        leftEye.setAttribute("cy", (17 + curEyeY * 1.5).toFixed(2));
        rightEye.setAttribute("cx", (29 + curEyeX * 1.5).toFixed(2));
        rightEye.setAttribute("cy", (17 + curEyeY * 1.5).toFixed(2));
        mouth.style.transform = `translate(${(curEyeX * 0.6).toFixed(1)}px, ${(curEyeY * 0.6).toFixed(1)}px) rotate(${curMouthRotate.toFixed(1)}deg)`;
      }

      const needsMoreFrames =
        Math.abs(mouseX - curX) > 0.05 ||
        Math.abs(mouseY - curY) > 0.05 ||
        Math.abs(targetW - curW) > 0.05 ||
        Math.abs(targetH - curH) > 0.05 ||
        Math.abs(eyeOffsetX - curEyeX) > 0.01 ||
        Math.abs(eyeOffsetY - curEyeY) > 0.01 ||
        Math.abs(mouthRotate - curMouthRotate) > 0.01;
      if (needsMoreFrames) scheduleCursorRender();
    }

    function refreshInteractiveBounds() {
      let count = 0;
      for (let i = 0; i < interactiveElements.length; i++) {
        const el = interactiveElements[i];
        if (!el.isConnected) continue;
        const rect = el.getBoundingClientRect();
        if (
          rect.width <= 0 ||
          rect.height <= 0 ||
          rect.bottom < 0 ||
          rect.top > window.innerHeight ||
          rect.right < 0 ||
          rect.left > window.innerWidth
        )
          continue;

        let b = interactiveBounds[count];
        if (!b) {
          b = { left: 0, top: 0, right: 0, bottom: 0, centerX: 0, centerY: 0, area: 0 };
          interactiveBounds[count] = b;
        }
        b.left = rect.left;
        b.top = rect.top;
        b.right = rect.right;
        b.bottom = rect.bottom;
        b.centerX = rect.left + rect.width / 2;
        b.centerY = rect.top + rect.height / 2;
        b.area = rect.width * rect.height;
        count++;
      }
      interactiveBounds.length = count;
      scheduleCursorRender();
    }

    function collectInteractiveElements() {
      interactiveElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "a, button, [role='button'], input, textarea, select, .cursor-pointer, .btn-sheen, .btn-glow, .nav-cta, .nav-link, .tech-pill, .spring-tilt-card, .gloss-card"
        )
      );
      refreshInteractiveBounds();
    }

    collectInteractiveElements();

    const targetObserver = new MutationObserver(() => {
      collectInteractiveElements();
    });
    targetObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", refreshInteractiveBounds, { passive: true });
    window.addEventListener("resize", refreshInteractiveBounds, { passive: true });

    function updatePointerPosition(x: number, y: number) {
      mouseX = x;
      mouseY = y;
      if (!isVisible) {
        isVisible = true;
        document.documentElement.classList.add("has-custom-cursor");
        curX = mouseX;
        curY = mouseY;
      }
      scheduleCursorRender();
    }

    const onMouseMove = (e: MouseEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      isVisible = false;
      document.documentElement.classList.remove("has-custom-cursor");
      scheduleCursorRender();
    };

    const onMouseEnter = (e: MouseEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Interactive hover triggers morph to dot
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, .cursor-pointer, .btn-sheen, .btn-glow, .nav-cta, .nav-link, .tech-pill";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(interactiveSelector);
      if (interactive) {
        isHoveringInteractive = true;
        cursor.classList.add("is-dot");
        targetW = 9;
        targetH = 9;
        targetR = 5;
        scheduleCursorRender();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(interactiveSelector);
      if (interactive) {
        isHoveringInteractive = false;
        cursor.classList.remove("is-dot");
        targetW = 44;
        targetH = 44;
        targetR = 22;
        scheduleCursorRender();
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Click Shockwave System
    const createShockwave = (x: number, y: number) => {
      let container = document.querySelector<HTMLDivElement>(".shockwave-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "shockwave-container";
        document.body.appendChild(container);
      }
      const ring = document.createElement("div");
      ring.className = "shockwave-ring";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      container.appendChild(ring);
      setTimeout(() => ring.remove(), 900);
    };

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "button, a, [role='button'], .btn-sheen, .btn-glow, .nav-cta"
      );
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        createShockwave(cx, cy);
      }
    };
    document.addEventListener("click", onDocClick);

    // Magnetic Button Pull
    const onMagneticMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest<HTMLElement>(".btn-glow, .btn-sheen, .nav-cta, .magnetic-btn");
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pullX = (e.clientX - cx) * 0.28;
        const pullY = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0) scale(1.04)`;
        btn.style.transition = "transform 0.1s ease-out";
      }
    };

    const onMagneticOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest<HTMLElement>(".btn-glow, .btn-sheen, .nav-cta, .magnetic-btn");
      if (btn) {
        btn.style.transform = "";
        btn.style.transition = "transform 0.4s cubic-bezier(0.2, 1.2, 0.3, 1)";
      }
    };

    document.addEventListener("mousemove", onMagneticMove, { passive: true });
    document.addEventListener("mouseout", onMagneticOut, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      targetObserver.disconnect();
      window.removeEventListener("scroll", refreshInteractiveBounds);
      window.removeEventListener("resize", refreshInteractiveBounds);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onPointerMove, { capture: true });
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("mousemove", onMagneticMove);
      document.removeEventListener("mouseout", onMagneticOut);
      if (cursorFrame) cancelAnimationFrame(cursorFrame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="customCursor"
      className="custom-cursor"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <svg className="cursor-face" viewBox="0 0 44 44" fill="none">
        <circle
          className="cursor-eye left-eye"
          cx="15"
          cy="17"
          r="3"
          fill="rgba(255,255,255,0.95)"
        />
        <circle
          className="cursor-eye right-eye"
          cx="29"
          cy="17"
          r="3"
          fill="rgba(255,255,255,0.95)"
        />
        <path
          className="cursor-mouth"
          d="M13 28 Q22 35 31 28"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
