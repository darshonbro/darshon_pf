"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { use3DCardTilt } from "@/hooks/use3DCardTilt";
import LazyTextReveal from "@/components/LazyTextReveal";
import {
  Volume2,
  VolumeX,
  ExternalLink,
  Zap,
  Eye,
  Key,
  Radio,
  Music2,
  Disc3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// =============================================================================
// SOCIAL NODES DATA WITH OFFICIAL BRAND VECTOR ICONS
// =============================================================================
interface SocialIconItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  color: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const SOCIAL_ITEMS_ROW1: SocialIconItem[] = [
  {
    id: "discord",
    name: "Discord",
    handle: "darshonbro",
    url: "https://discord.com/users/1281114279948582923",
    color: "#5865F2",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M107.7 22.8A99.4 99.4 0 0 0 83.2 15a70.9 70.9 0 0 0-3.2 6.5 92.4 92.4 0 0 0-28 0A68 68 0 0 0 48.8 15a99 99 0 0 0-24.5 7.8C8.5 46.2 4.3 69 6.4 91.5a99.8 99.8 0 0 0 30.6 15.5 76 76 0 0 0 6.5-10.6 64.9 64.9 0 0 1-10.3-5 50.8 50.8 0 0 0 2.5-2c19.7 9.2 41 9.2 60.5 0a51.6 51.6 0 0 0 2.6 2c-3.3 1.9-6.8 3.6-10.4 5a76 76 0 0 0 6.5 10.6A99.6 99.6 0 0 0 125.6 91.5c2.6-26.3-4.5-49-17.9-68.7ZM43.4 77.8c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Zm45.2 0c-6.1 0-11.2-5.6-11.2-12.5s4.9-12.5 11.2-12.5c6.3 0 11.3 5.7 11.2 12.5 0 6.9-4.9 12.5-11.2 12.5Z" />
      </svg>
    ),
  },
  {
    id: "telegram",
    name: "Telegram",
    handle: "@darshonbro1",
    url: "https://t.me/darshonbro1",
    color: "#229ED9",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0Zm29.6 43.1L83.5 90.9c-.8 3.5-2.8 4.3-5.8 2.7L62.4 82.3l-7.4 7.1c-.8.8-1.5 1.5-3.1 1.5l1.1-15.6 28.4-25.7c1.2-1.1-.3-1.7-1.9-.6L44.1 78.4 29 73.7c-3.3-1-3.3-3.3.7-4.9l59.1-22.8c2.7-1 5.1.7 4.8 3.1Z" />
      </svg>
    ),
  },
  {
    id: "spotify",
    name: "Spotify",
    handle: "darshonbro",
    url: "https://open.spotify.com/user/31mdzrw3lvotwznatedmukcxx35u?si=9092e0fecce54bb9",
    color: "#1DB954",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0Zm29.4 92.3c-1.1 1.9-3.6 2.5-5.5 1.3-15.1-9.2-34.1-11.3-56.5-6.2-2.2.5-4.3-.9-4.8-3.1-.5-2.2.9-4.3 3.1-4.8 24.5-5.6 45.6-3.2 62.4 7.1 1.9 1.2 2.5 3.7 1.3 5.7Zm7.8-17.4c-1.4 2.3-4.5 3.1-6.8 1.6-17.3-10.6-43.6-13.7-64.1-7.5-2.6.8-5.4-.7-6.2-3.3-.8-2.6.7-5.4 3.3-6.2 23.4-7.1 52.4-3.7 72.2 8.5 2.4 1.5 3.1 4.6 1.6 6.9Zm.7-18.1C80 43.7 49 42.6 31.1 48c-3.3 1-6.8-.9-7.8-4.2-1-3.3.9-6.8 4.2-7.8 20.9-6.3 55.1-5.1 77.8 8.4 3 1.8 3.9 5.6 2.2 8.5-1.8 3-5.7 3.9-8.6 2.1Z" />
      </svg>
    ),
  },
  {
    id: "bluesky",
    name: "Bluesky",
    handle: "darshon.bsky.social",
    url: "https://bsky.app/profile/darshon.bsky.social",
    color: "#0285FF",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M28.4 18.6C42.8 29.5 58 51.5 64 63.8c6-12.3 21.2-34.3 35.6-45.2 10.4-7.8 27.2-13.8 27.2 9.8 0 4.7-.6 24.3-1.3 30.1-2.9 22.6-14.7 28.4-25 26.6 18.1 3.1 22.8 18.3 12.8 28.6-19 19.6-37.1-7.1-45-22.3-1.5-2.9-2.9-5.9-4.3-9-1.4 3.1-2.8 6.1-4.3 9-7.9 15.2-26 41.9-45 22.3-10-10.3-5.3-25.5 12.8-28.6C17.1 86.8 5.3 81 2.4 58.4 1.7 52.6 1.1 33 1.1 28.3c0-23.6 16.8-17.6 27.3-9.7Z" />
      </svg>
    ),
  },
  {
    id: "steam",
    name: "Steam",
    handle: "darshonx",
    url: "https://steamcommunity.com/id/darshonx/",
    color: "#66C0F4",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.9 0 .4 28.3 0 63.3l34.4 14.2c2.9-2.2 6.5-3.5 10.5-3.5 1.4 0 2.7.2 4 .5l18.8-27.3c-.1-.7-.2-1.5-.2-2.3 0-12.7 10.3-23 23-23s23 10.3 23 23-10.3 23-23 23c-.7 0-1.4-.1-2.1-.2L61.2 95.1c.3 1.2.5 2.4.5 3.7 0 9.5-7.7 17.2-17.2 17.2-7.8 0-14.3-5.2-16.4-12.3L1.5 93.3C9.5 113.6 29.4 128 52.8 128c35.3 0 64-28.7 64-64S88.1 0 52.8 0H64Zm26.5 67.9c-8.5 0-15.4-6.9-15.4-15.4s6.9-15.4 15.4-15.4 15.4 6.9 15.4 15.4-6.9 15.4-15.4 15.4Zm0-23.1c-4.2 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7 7.7-3.5 7.7-7.7-3.4-7.7-7.7-7.7Z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@darshonbro",
    url: "https://github.com/darshonbro",
    color: "#FFFFFF",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M64 0C28.7 0 0 28.7 0 64c0 28.3 18.3 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1 0-1.5-.1-6.6-.1-12-17.8 3.9-21.6-7.6-21.6-7.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.7 5.3.6-4.1 2.2-7 4-8.6-14.2-1.6-29.2-7.1-29.2-31.6 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.1.6-17 0 0 5.4-1.7 17.6 6.6 5.1-1.4 10.6-2.1 16-2.1s10.9.7 16 2.1c12.2-8.3 17.6-6.6 17.6-6.6 3.5 8.9 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.6-15 30-29.3 31.5 2.3 2 4.4 5.9 4.4 11.9 0 8.6-.1 15.5-.1 17.6 0 1.7 1.2 3.7 4.4 3.1C109.7 116.3 128 92.3 128 64c0-35.3-28.7-64-64-64Z" />
      </svg>
    ),
  },
  {
    id: "key",
    name: "Keybase / PGP",
    handle: "darshonbro",
    url: "https://keybase.io/darshonbro",
    color: "#E5E7EB",
    icon: ({ className }) => <Key className={className} />,
  },
];

const SOCIAL_ITEMS_ROW2: SocialIconItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@darshonbro",
    url: "https://instagram.com/darshonbro",
    color: "#E1306C",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 11.5c17.1 0 19.1.1 25.9.4 6.2.3 9.6 1.3 11.9 2.2 3 1.2 5.1 2.6 7.4 4.8 2.2 2.2 3.7 4.4 4.8 7.4.9 2.2 1.9 5.6 2.2 11.9.3 6.7.4 8.8.4 25.9s-.1 19.1-.4 25.9c-.3 6.2-1.3 9.6-2.2 11.9-1.2 3-2.6 5.1-4.8 7.4-2.2 2.2-4.4 3.7-7.4 4.8-2.2.9-5.6 1.9-11.9 2.2-6.7.3-8.8.4-25.9.4s-19.1-.1-25.9-.4c-6.2-.3-9.6-1.3-11.9-2.2-3-1.2-5.1-2.6-7.4-4.8-2.2-2.2-3.7-4.4-4.8-7.4-.9-2.2-1.9-5.6-2.2-11.9-.3-6.7-.4-8.8-.4-25.9s.1-19.1.4-25.9c.3-6.2 1.3-9.6 2.2-11.9 1.2-3 2.6-5.1 4.8-7.4 2.2-2.2 4.4-3.7 7.4-4.8 2.2-.9 5.6-1.9 11.9-2.2 6.7-.3 8.8-.4 25.9-.4M64 0C46.6 0 44.4.1 37.6.4c-6.8.3-11.5 1.4-15.6 3-4.2 1.6-7.8 3.8-11.3 7.3C7.2 14.2 5 17.8 3.4 22 1.8 26.1.7 30.8.4 37.6.1 44.4 0 46.6 0 64s.1 19.6.4 26.4c.3 6.8 1.4 11.5 3 15.6 1.6 4.2 3.8 7.8 7.3 11.3 3.5 3.5 7.1 5.7 11.3 7.3 4.1 1.6 8.8 2.7 15.6 3 6.8.3 9 .4 26.4.4s19.6-.1 26.4-.4c6.8-.3 11.5-1.4 15.6-3 4.2-1.6 7.8-3.8 11.3-7.3 3.5-3.5 5.7-7.1 7.3-11.3 1.6-4.1 2.7-8.8 3-15.6.3-6.8.4-9 .4-26.4s-.1-19.6-.4-26.4c-.3-6.8-1.4-11.5-3-15.6-1.6-4.2-3.8-7.8-7.3-11.3C120.8 14.2 118.6 10.6 114.4 9c-4.1-1.6-8.8-2.7-15.6-3C92 5.7 89.8 5.6 72.4 5.6H64Zm0 31.1c-18.2 0-32.9 14.7-32.9 32.9s14.7 32.9 32.9 32.9 32.9-14.7 32.9-32.9-14.7-32.9-32.9-32.9Zm0 54.3c-11.8 0-21.4-9.6-21.4-21.4 0-11.8 9.6-21.4 21.4-21.4 11.8 0 21.4 9.6 21.4 21.4 0 11.8-9.6 21.4-21.4 21.4Zm41.8-56.1c0 4.2-3.4 7.7-7.7 7.7s-7.7-3.4-7.7-7.7 3.4-7.7 7.7-7.7c4.2 0 7.7 3.5 7.7 7.7Z" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@darshonbro",
    url: "https://x.com/darshonbro",
    color: "#FFFFFF",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M100.8 12H118L79.6 55.9 124.8 116H89.2L61.3 79.5 29.4 116H12.2l41.2-47.1L7.2 12h36.5l25.2 33.3L100.8 12Zm-6 93.7h9.5L38.4 21.8h-10.2l66.6 83.9Z" />
      </svg>
    ),
  },
  {
    id: "roblox",
    name: "Roblox",
    handle: "darshonbro",
    url: "https://www.roblox.com/user.aspx?username=darshonbro",
    color: "#00A2FF",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M26.4 0 0 98.4 101.6 128 128 29.6 26.4 0Zm54.4 75.8-23.2-6.2 6.2-23.2 23.2 6.2-6.2 23.2Z" />
      </svg>
    ),
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    handle: "darshonbro",
    url: "https://soundcloud.com/darshonbro",
    color: "#FF5500",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M106.6 60.4c-.9 0-1.8.1-2.6.3-2-9.4-10.3-16.5-20.2-16.5-6.1 0-11.7 2.7-15.5 7.1-.6-.2-1.3-.3-2-.3-6 0-11 4.7-11.3 10.6H54V99h52.6c11.8 0 21.4-9.6 21.4-21.4 0-11.8-9.6-17.2-21.4-17.2ZM3.8 77.2c-1.5 0-2.8 1.3-2.8 2.8v8.6c0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8V80c0-1.5-1.3-2.8-2.8-2.8Zm11.3-9.5c-1.5 0-2.8 1.3-2.8 2.8v22.8c0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8V70.5c0-1.5-1.3-2.8-2.8-2.8Zm11.3-3.8c-1.5 0-2.8 1.3-2.8 2.8v30.4c0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8V66.7c0-1.5-1.3-2.8-2.8-2.8Zm11.3-5.7c-1.5 0-2.8 1.3-2.8 2.8v38c0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8v-38c0-1.5-1.3-2.8-2.8-2.8Zm11.3-3.8c-1.5 0-2.8 1.3-2.8 2.8v41.8c0 1.5 1.3 2.8 2.8 2.8s2.8-1.3 2.8-2.8V57.2c0-1.5-1.3-2.8-2.8-2.8Z" />
      </svg>
    ),
  },
  {
    id: "pinterest",
    name: "Pinterest",
    handle: "darshonbro",
    url: "https://pinterest.com/darshonbro",
    color: "#E60023",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64 0C28.7 0 0 28.7 0 64c0 27.1 16.9 50.3 40.7 59.6-1.5-4.8-.3-10.7 1.2-17.1l5.7-24.1s-1.4-2.8-1.4-7c0-6.6 3.8-11.5 8.6-11.5 4 0 6 3 6 6.7 0 4.1-2.6 10.1-4 15.8-1.1 4.7 2.4 8.6 7 8.6 8.4 0 14.9-8.9 14.9-21.7 0-11.3-8.1-19.3-19.8-19.3-13.5 0-21.4 10.1-21.4 20.6 0 4.1 1.6 8.4 3.5 10.8.4.5.4.9.3 1.4l-1.3 5.4c-.2.9-.7 1.1-1.6.7-5.9-2.8-9.6-11.4-9.6-18.4 0-15 10.9-28.7 31.4-28.7 16.5 0 29.3 11.7 29.3 27.4 0 16.4-10.3 29.5-24.7 29.5-4.8 0-9.4-2.5-10.9-5.5l-3 11.3c-1.1 4.1-4 9.3-6 12.5C49.9 126.7 56.8 128 64 128c35.3 0 64-28.7 64-64S99.3 0 64 0Z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+880 1945-127274",
    url: "https://wa.me/8801945127274",
    color: "#25D366",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M64.2 0C28.9 0 .2 28.6.2 63.9c0 11.3 2.9 22.3 8.5 32L0 128l33.1-8.7c9.3 5.1 19.8 7.8 30.6 7.8h.1c35.3 0 64-28.6 64-63.9 0-17.1-6.6-33.1-18.8-45.2C96.9 5.8 80.9 0 64.2 0Zm37.4 90.6c-1.6 4.4-7.8 8.1-10.9 8.6-2.9.5-6.6.7-10.7-.6-2.5-.8-5.7-1.9-9.9-3.7-17.5-7.6-28.9-25.2-29.8-26.3-.9-1.2-7.1-9.5-7.1-18.1s4.5-12.8 6.1-14.5c1.6-1.7 3.5-2.2 4.7-2.2s2.3.1 3.3.1c1.1 0 2.5-.4 3.9 2.9 1.5 3.5 5 12.3 5.4 13.2.5.9.8 2 .2 3.2-.6 1.2-1 1.9-1.9 3-.9 1.1-1.9 2.4-2.7 3.2-.9.9-1.9 1.9-.8 3.7 1.1 1.8 4.7 7.7 10.1 12.5 7 6.2 12.8 8.1 14.6 9 1.8.9 2.9.8 4-.5 1.1-1.2 4.7-5.5 5.9-7.4 1.2-1.9 2.5-1.6 4.1-1 1.7.6 10.7 5.1 12.6 6 1.8 1 3.1 1.4 3.5 2.2.5.8.5 4.7-1.1 9Z" />
      </svg>
    ),
  },
  {
    id: "twitch",
    name: "Twitch",
    handle: "darshonbro",
    url: "https://twitch.tv/darshonbro",
    color: "#9146FF",
    icon: ({ className }) => (
      <svg viewBox="0 0 128 128" fill="currentColor" className={className}>
        <path d="M16 0 2.7 34.7V112h29.3v16H48l16-16h24l37.3-37.3V0H16Zm98.7 69.3-21.3 21.3H69.3L53.3 106.7v-16H24V10.7h90.7v58.6Zm-24-34.6H80v32h10.7v-32Zm-32 0H48v32h10.7v-32Z" />
      </svg>
    ),
  },
];

const ALL_SOCIAL_ITEMS: SocialIconItem[] = [
  ...SOCIAL_ITEMS_ROW1,
  ...SOCIAL_ITEMS_ROW2,
];

export default function DiscordPresenceSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<string>("5,417");

  // Real View Counter (Starting from 5,417 baseline)
  useEffect(() => {
    let isMounted = true;
    const fetchViews = async () => {
      try {
        const hasVisited =
          typeof window !== "undefined" &&
          sessionStorage.getItem("darshon_view_session");
        const method = hasVisited ? "GET" : "POST";
        const res = await fetch("/api/views", { method });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.formatted) {
            setViewCount(json.formatted);
            if (!hasVisited && typeof window !== "undefined") {
              sessionStorage.setItem("darshon_view_session", "true");
            }
          }
        }
      } catch (err) {
        console.error("View counter fetch error:", err);
      }
    };

    fetchViews();
    return () => {
      isMounted = false;
    };
  }, []);

  // ---------------------------------------------------------------------------
  // REAL DISCORD PROFILE STATE FOR USER: 1281114279948582923
  // Initial state pre-populated with his exact authentic Discord profile
  // ---------------------------------------------------------------------------
  const [profile, setProfile] = useState({
    userId: "1281114279948582923",
    username: "darshonbro",
    globalName: "!                              L",
    avatarUrl: "/avatar.gif",
    bannerUrl: "/banner.gif",
    avatarDecorationUrl: "/decoration.png",
    clanTag: "𝙻̲",
    clanBadgeUrl:
      "https://cdn.discordapp.com/clan-badges/1543198603718164501/86735389348f3eacfa519eb553df38fd.png",
    status: "online" as "online" | "idle" | "dnd" | "offline",
    customStatus: null as string | null,
  });

  // Fetch real-time live Discord profile from our API route
  useEffect(() => {
    let isMounted = true;
    const fetchDiscordProfile = async () => {
      try {
        const res = await fetch("/api/discord?userId=1281114279948582923");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && json.data) {
            setProfile((prev) => ({
              ...prev,
              username: json.data.username || prev.username,
              globalName: json.data.globalName || prev.globalName,
              avatarUrl: json.data.avatarUrl || prev.avatarUrl,
              bannerUrl: json.data.bannerUrl || prev.bannerUrl,
              avatarDecorationUrl:
                json.data.avatarDecorationUrl || prev.avatarDecorationUrl,
              clanTag: json.data.clanTag || prev.clanTag,
              clanBadgeUrl: json.data.clanBadgeUrl || prev.clanBadgeUrl,
              status: json.data.status || prev.status,
              customStatus:
                json.data.customStatus !== undefined
                  ? json.data.customStatus
                  : prev.customStatus,
            }));
          }
        }
      } catch (err) {
        console.error("Live Discord fetch:", err);
      }
    };

    fetchDiscordProfile();
    const interval = setInterval(fetchDiscordProfile, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // SCROLL-LINKED CINEMATIC FADE IN & FADE OUT ("aste aste hide hoye jabe")
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const tiltCardRef = use3DCardTilt<HTMLDivElement>({
    maxTilt: 7,
    scale: 1.025,
    glowColor: "rgba(147, 51, 234,",
  });

  const iconRowVariants: Variants = {
    hidden: {},
    visible: (customDelay: number = 0.1) => ({
      transition: {
        staggerChildren: 0.04,
        delayChildren: customDelay,
      },
    }),
  };

  const iconItemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 12,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.2, 1.2, 0.3, 1],
      },
    },
  };

  const cardOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.82, 0.98],
    [0, 1, 1, 0]
  );
  const cardY = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.82, 0.98],
    [20, 0, 0, -30]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.82, 0.98],
    [0.98, 1, 1, 0.96]
  );
  const cardFilter = useTransform(
    scrollYProgress,
    [0.02, 0.12, 0.82, 0.96],
    ["blur(6px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );
  const cardPointerEvents = useTransform(scrollYProgress, (p) =>
    p >= 0.05 && p <= 0.92 ? "auto" : "none"
  );

  // ---------------------------------------------------------------------------
  // REAL AUDIO ENGINE FOR DARSHON MUSIC TRACK (/audio/theme.mp3)
  // Strictly confined to the Discord Profile Card section (Zero leak across site)
  // ---------------------------------------------------------------------------
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying && !isMuted) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setAudioVolume(0.5);
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    const container = containerRef.current;
    if (!audio || !container) return;

    // Strictly limit playback: ONLY plays while user is viewing the Discord Hub section
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          // Inside Discord Hub section: play at 50% volume
          if (!isMuted && audioRef.current) {
            audioRef.current.volume = 0.5;
            setAudioVolume(0.5);
            audioRef.current
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          }
        } else {
          // Outside Discord Hub: completely pause and silence
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0;
          }
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(container);

    // Scroll volume scaling: only active when inside the section, smoothly fades on exit
    const handleScroll = () => {
      if (!containerRef.current || !audioRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if section is currently visible in viewport
      const isVisible = rect.top < viewportHeight && rect.bottom > 0;
      if (!isVisible) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        return;
      }

      // Proximity to viewport center
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      const maxReach = viewportHeight * 0.75;
      const proximity = Math.max(0, 1 - distance / maxReach);

      if (!isMuted) {
        const currentVol = Math.round(proximity * 0.5 * 100) / 100;
        audioRef.current.volume = Math.max(0, Math.min(0.5, currentVol));

        if (currentVol > 0.05 && audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else if (currentVol <= 0.01 && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (audio) {
        audio.pause();
      }
    };
  }, [isMuted]);

  return (
    <section
      id="discord-hub"
      ref={containerRef}
      className="relative py-8 sm:py-14 px-4 flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Real Audio Player for C:\Users\darsh\OneDrive\Pictures\MUSIC\1110 (1).mp3 */}
      <audio
        ref={audioRef}
        src="/audio/theme.mp3"
        loop
        preload="auto"
        playsInline
      />
      {/* Ambient Radial Dark Violet Glow Matching Reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18)_0%,rgba(168,85,247,0.05)_45%,transparent_70%)] blur-[140px] pointer-events-none -z-10" />

      {/* Floating Spark Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-rose-500/60 blur-[1px] animate-pulse" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-purple-400/70 blur-[1px] animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-400/50 blur-[1px] animate-pulse delay-700" />
      </div>

      {/* Outer Motion Wrapper: Handles scroll fade-out & fade-in ("aste aste hide hoye jabe") */}
      <motion.div
        style={{
          opacity: cardOpacity,
          y: cardY,
          scale: cardScale,
          filter: cardFilter,
          pointerEvents: cardPointerEvents,
        }}
        className="w-full max-w-[420px] sm:max-w-[440px] mx-auto"
      >
        {/* ===================================================================
            AUTHENTIC COMPACT OBSIDIAN DISCORD PROFILE CARD (REAL DATA: 1281114279948582923)
            WITH EINSAMVFX 3D PERSPECTIVE TILT & ELASTIC SPRING RECOIL
            =================================================================== */}
        <div
          ref={tiltCardRef}
          className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#131126]/95 via-[#0b0a16]/98 to-[#05040a] border border-white/[0.12] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(147,51,234,0.18),inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col items-center backdrop-blur-3xl group hover:border-purple-500/35 transition-all duration-300 overflow-visible spring-tilt-card"
        >
          <div className="tilt-inner-clip rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col items-center w-full">
            {/* Top Specular Edge Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

          {/* 1. REAL ANIMATED DISCORD BANNER (Clean Header - DISCORD LIVE badge removed) */}
          <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-[#100e1c] border-b border-white/[0.08]">
            <img
              src={profile.bannerUrl}
              alt="Discord Banner"
              className="w-full h-full object-cover select-none filter contrast-105"
            />
            {/* Gradient Shade for smooth blend into card body */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-[#0b0a16]" />
          </div>

          {/* 2. REAL ANIMATED AVATAR WITH AVATAR DECORATION & STATUS */}
          <div className="relative -mt-12 sm:-mt-14 mb-2 flex flex-col items-center z-10">
            {/* Halo backlight */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-b from-purple-500/40 to-pink-500/25 blur-2xl pointer-events-none" />

            {/* Avatar Frame (Proportionate & Centered) */}
            <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full p-1 bg-gradient-to-b from-white/40 via-white/15 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
              {/* Inner Avatar GIF Container */}
              <div className="w-full h-full rounded-full bg-[#0b0a16] border-2 border-white/30 overflow-hidden relative flex items-center justify-center">
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover rounded-full select-none"
                />

                {/* Real Discord Avatar Decoration Overlay */}
                {profile.avatarDecorationUrl && (
                  <img
                    src={profile.avatarDecorationUrl}
                    alt="Decoration"
                    className="absolute inset-0 w-full h-full scale-[1.2] pointer-events-none select-none z-10"
                  />
                )}
              </div>

              {/* Glowing Green Online Status Badge (Bottom Right) */}
              <div
                className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full bg-[#0b0a16] flex items-center justify-center p-0.5 z-20"
                title="Discord Status: Online"
              >
                <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.9)] border-2 border-[#0b0a16]" />
              </div>

              {/* Status Exclamation Pinned Badge (Bottom Left, matching reference) */}
              <div className="absolute bottom-0.5 left-0.5 w-6 h-6 rounded-full bg-white text-black font-black text-xs flex items-center justify-center shadow-lg border-2 border-[#0b0a16] z-20">
                !
              </div>
            </div>
          </div>

          {/* 3. PRIMARY DISPLAY NAME: "! L" */}
          <div className="text-center px-4 mb-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest font-sans drop-shadow-[0_4px_16px_rgba(255,255,255,0.25)]">
              {profile.globalName || "! L"}
            </h2>
          </div>

          {/* 4. REAL DISCORD INNER CAPSULE (Compact Snug Container) */}
          <div className="w-[90%] rounded-2xl bg-[#131124]/90 border border-white/[0.09] hover:border-purple-500/30 py-2.5 px-3.5 flex items-center justify-between mb-3.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mini Avatar with Online Dot */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/20 overflow-hidden">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#131124]" />
              </div>

              {/* Username & Status Quote */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-white text-sm sm:text-base font-sans tracking-tight">
                    <span className="text-rose-500 font-extrabold">d</span>
                    arshonbro
                  </span>

                  {/* Real Discord Clan Tag */}
                  {profile.clanTag && (
                    <span
                      title={`Clan Tag: ${profile.clanTag}`}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-[11px] font-mono font-bold text-zinc-100 shadow-sm transition-colors select-none"
                    >
                      {profile.clanBadgeUrl && (
                        <img
                          src={profile.clanBadgeUrl}
                          alt="Clan Badge"
                          className="w-3.5 h-3.5 object-contain"
                        />
                      )}
                      <span>{profile.clanTag}</span>
                    </span>
                  )}
                </div>

                {/* Custom Status Note */}
                <div className="text-xs text-zinc-300 mt-0.5 truncate font-sans">
                  {profile.customStatus || "Ba Bye"}
                </div>
              </div>
            </div>

            {/* Direct Connect Link */}
            <a
              href="https://discord.com/users/1281114279948582923"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all shrink-0 ml-2"
              title="Open Real Discord Profile"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 5. CIRCULAR FLOATING SOCIAL ICONS (2 Rows / 2 Grid Tiers of 7 Icons with Staggered Lazy Loading) */}
          <div className="w-full px-3 sm:px-4 flex flex-col items-center gap-2 mb-4">
            {/* Row 1 (7 Icons) */}
            <motion.div
              variants={iconRowVariants}
              initial="hidden"
              whileInView="visible"
              custom={0.12}
              viewport={{ once: false, amount: 0.2 }}
              className="flex items-center justify-center gap-1.5 sm:gap-2"
            >
              {SOCIAL_ITEMS_ROW1.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    variants={iconItemVariants}
                    className="relative group/btn"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setHoveredSocial(item.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] border border-white/[0.1] hover:border-white/35 hover:bg-white/[0.15] active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg text-white/90 hover:text-white group-hover/btn:scale-110"
                      style={{
                        boxShadow:
                          hoveredSocial === item.name
                            ? `0 0 16px ${item.color}50`
                            : undefined,
                      }}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover/btn:scale-110" />
                    </a>

                    {/* Micro Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-black/95 border border-white/20 text-[10px] font-mono text-zinc-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-2xl">
                      {item.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Row 2 (7 Icons) */}
            <motion.div
              variants={iconRowVariants}
              initial="hidden"
              whileInView="visible"
              custom={0.32}
              viewport={{ once: false, amount: 0.2 }}
              className="flex items-center justify-center gap-1.5 sm:gap-2"
            >
              {SOCIAL_ITEMS_ROW2.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    variants={iconItemVariants}
                    className="relative group/btn"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setHoveredSocial(item.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.06] border border-white/[0.1] hover:border-white/35 hover:bg-white/[0.15] active:scale-95 transition-all duration-200 flex items-center justify-center shadow-lg text-white/90 hover:text-white group-hover/btn:scale-110"
                      style={{
                        boxShadow:
                          hoveredSocial === item.name
                            ? `0 0 16px ${item.color}50`
                            : undefined,
                      }}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover/btn:scale-110" />
                    </a>

                    {/* Micro Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-black/95 border border-white/20 text-[10px] font-mono text-zinc-200 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-2xl">
                      {item.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 6. BOTTOM BAR: DYNAMIC REAL VIEW COUNTER (Starting from 5,417) + PROXIMITY AUDIO CONTROLLER */}
          <div className="w-full px-5 sm:px-6 py-2.5 sm:py-3 bg-black/45 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
            {/* Real View Counter */}
            <div className="flex items-center gap-2 text-zinc-400">
              <Eye className="w-4 h-4 text-zinc-500" />
              <span className="font-bold tracking-wider text-zinc-200 text-xs">
                {viewCount}
              </span>
            </div>

            {/* Darshon Music Track Audio Controller (Calibrated to 50% volume) */}
            <button
              type="button"
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer select-none"
              title={!isMuted ? "Click to mute music" : "Click to play music at 50% volume"}
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-purple-300 font-bold tracking-wider">
                    MUSIC (50%)
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-500 font-bold tracking-wider">
                    MUTED
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
