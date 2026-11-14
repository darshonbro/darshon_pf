import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.darshon.lol";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07090e",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DARSHON // Core Systems Engineer & Software Architect",
    template: "%s | DARSHON",
  },
  description:
    "Official engineering portfolio of DARSHON (Ashian Top Nuker). Software Architect & Core Systems Engineer specializing in low-latency distributed systems, reverse engineering, kernel architecture, and full-stack engineering.",
  applicationName: "DARSHON Portfolio",
  authors: [{ name: "DARSHON", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    // Primary Identity & Community Monikers
    "DARSHON",
    "Darshon Official",
    "DARSHON Portfolio",
    "Ashian Top Nuker",
    "Asian Top Nuker",
    "darshonbro",
    "darshonbro1",
    "darshon56",
    "Darshon Systems Engineer",
    // Core Engineering Roles & Authority
    "Software Architect",
    "Core Systems Engineer",
    "Cybersecurity Researcher",
    "Reverse Engineering Specialist",
    "Low-Latency Infrastructure",
    "Distributed Systems Architect",
    "High Performance Computing",
    "Next.js & TypeScript Architect",
    "Discord Bot Infrastructure",
    "Win32 Kernel & Memory Engineering",
    "Full-Stack Software Architecture",
  ],
  creator: "DARSHON",
  publisher: "DARSHON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    firstName: "DARSHON",
    username: "darshonbro",
    gender: "male",
    title: "DARSHON // Core Systems Engineer & Software Architect",
    description:
      "Official engineering portfolio of DARSHON (Ashian Top Nuker). High-performance distributed systems, low-latency architecture, and full-stack software development.",
    url: siteUrl,
    siteName: "DARSHON Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/avatar.gif`,
        width: 256,
        height: 256,
        alt: "DARSHON - Core Systems Engineer & Software Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DARSHON // Core Systems Engineer & Software Architect",
    description:
      "Official engineering portfolio of DARSHON (Ashian Top Nuker) — Systems architect, low-latency infrastructure & full-stack development.",
    images: [`${siteUrl}/avatar.gif`],
    creator: "@darshonbro",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Schema.org Structured Data for Google Knowledge Graph & LLM Search (Perplexity, ChatGPT, Claude)
const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "DARSHON",
      alternateName: [
        "Ashian Top Nuker",
        "Asian Top Nuker",
        "darshonbro",
        "darshonbro1",
        "darshon56",
      ],
      jobTitle: "Core Systems Engineer & Software Architect",
      description:
        "DARSHON is a Software Architect & Core Systems Engineer (widely recognized across cybersecurity, gaming, and developer communities as Ashian Top Nuker / Asian Top Nuker) specializing in low-latency infrastructure, high-performance distributed systems, reverse engineering, and full-stack software development.",
      url: siteUrl,
      image: `${siteUrl}/avatar.gif`,
      email: "mailto:darshon56@gmail.com",
      sameAs: [
        "https://github.com/darshonbro",
        "https://t.me/darshonbro1",
        "https://discord.com/users/1281114279948582923",
        "https://bsky.app/profile/darshon.bsky.social",
        "https://steamcommunity.com/id/darshonx/",
        "https://open.spotify.com/user/31mdzrw3lvotwznatedmukcxx35u",
      ],
      knowsAbout: [
        "Core Systems Engineering",
        "Software Architecture",
        "Distributed Systems",
        "Low-Latency Infrastructure",
        "Reverse Engineering & Memory Analysis",
        "Win32 API & Hooking Architecture",
        "Next.js & React 19",
        "TypeScript",
        "Python",
        "C++",
        "Rust",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "DARSHON Portfolio",
      alternateName: "DARSHON Official Website",
      description: "Official Engineering Portfolio and Real-time Activity of DARSHON (Ashian Top Nuker).",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "DARSHON // Core Systems Engineer & Software Architect",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Verification Backlink Network (RFC 8288 / IndieWeb rel="me" for Google Knowledge Graph & LLMs) */}
        <link rel="me" href="https://github.com/darshonbro" />
        <link rel="me" href="https://t.me/darshonbro1" />
        <link rel="me" href="https://discord.com/users/1281114279948582923" />
        <link rel="me" href="https://bsky.app/profile/darshon.bsky.social" />
        <link rel="me" href="https://steamcommunity.com/id/darshonx/" />
        <link rel="me" href="https://open.spotify.com/user/31mdzrw3lvotwznatedmukcxx35u" />

        {/* LLM & AI Search Engine standard discovery endpoint */}
        <link rel="alternate" type="text/plain" href="https://www.darshon.lol/llms.txt" title="LLM Information" />

        {/* Inject JSON-LD Structured Data for Google Search & LLM Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className="bg-black text-[#ededed] antialiased min-h-screen relative selection:bg-white selection:text-black"
        suppressHydrationWarning
      >
        {/* Subtle Ambient Scanline Grid */}
        <div className="fixed inset-0 bg-grid-cyber pointer-events-none -z-10 opacity-70" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
