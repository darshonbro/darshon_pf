"use client";

import { useEffect, useRef } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  glowColor?: string; // e.g. "rgba(147, 51, 234," or "rgba(16, 185, 129,"
  enabled?: boolean;
}

export function use3DCardTilt<T extends HTMLElement>({
  maxTilt = 8,
  scale = 1.025,
  glowColor = "rgba(16, 185, 129,",
  enabled = true,
}: TiltOptions = {}) {
  const cardRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const card = cardRef.current;
    if (!card) return;

    let isHovered = false;
    let leaveTimer: NodeJS.Timeout | null = null;

    card.style.transformStyle = "preserve-3d";
    card.style.perspective = "800px";
    card.style.backfaceVisibility = "hidden";

    const onMouseEnter = () => {
      isHovered = true;
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
      card.style.transition =
        "transform 0.12s ease-out, box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1), border-color 360ms cubic-bezier(0.22, 1, 0.36, 1)";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = (px * maxTilt).toFixed(2);
      const rotX = (-py * maxTilt).toFixed(2);

      card.style.transform = `perspective(800px) scale3d(${scale}, ${scale}, ${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

      const tiltMag = Math.sqrt(px * px + py * py);
      const glowAlpha = (tiltMag * 0.35).toFixed(3);
      const shadowAlpha = (0.4 + tiltMag * 0.3).toFixed(3);
      card.style.boxShadow = `0 24px 70px rgba(0, 0, 0, ${shadowAlpha}), 0 0 50px ${glowColor} ${glowAlpha})`;
    };

    const onMouseLeave = () => {
      isHovered = false;
      card.style.transition =
        "transform 0.55s cubic-bezier(0.2, 1.2, 0.3, 1), box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1), border-color 360ms cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = `perspective(800px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`;
      card.style.boxShadow = "";

      leaveTimer = setTimeout(() => {
        if (!isHovered && card) {
          card.style.transform = "";
          card.style.transition = "";
        }
      }, 550);
    };

    card.addEventListener("mouseenter", onMouseEnter);
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [maxTilt, scale, glowColor, enabled]);

  return cardRef;
}

