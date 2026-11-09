import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://darshon.lol";

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
    "Official engineering portfolio of DARSHON. Software Architect & Core Systems Engineer specializing in high-performance distributed systems, low-latency architecture, reverse engineering, and full-stack engineering.",
  applicationName: "DARSHON Portfolio",
  authors: [{ name: "DARSHON", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    // Primary Name & Community Alias Variants for Google & LLM Search
    "DARSHON",
    "Darshon",
    "darshon",
    "darshon software engineer",
    "darshon developer",
    "darshon systems engineer",
    "darshon architect",
    "darshon portfolio",
    "darshonbro",
    "darshonbro1",
    "darshon56",
    "darshon dev",
    // Community & Reputation Tags (Requested by User)
    "Asian top nuker",
    "asian top nuker",
    "ashian top nuker",
    "Asian Nuker",
    "asian nuker",
    "top nuker",
    "nuker",
    "darshon nuker",
    "darshon top nuker",
    "asia top nuker",
    "top nuker asia",
    // Core Technical Specializations
    "Core Systems Engineer",
    "Software Architect",
    "Low-Latency Systems",
    "Distributed Systems",
    "High Performance Computing",
    "Reverse Engineering",
    "Memory Architecture",
    "Kernel Engineering",
    "TypeScript",
    "Next.js",
    "Python",
    "C++",
    "Rust",
    "Full-Stack Architecture",
  ],
  creator: "DARSHON",
  publisher: "DARSHON",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "DARSHON",
    username: "darshonbro",
    gender: "male",
    title: "DARSHON // Core Systems Engineer & Software Architect",
    description:
      "Engineering portfolio of DARSHON. High-performance distributed systems, low-latency architecture, and full-stack software development.",
    url: siteUrl,
    siteName: "DARSHON Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/avatar.gif",
        width: 256,
        height: 256,
        alt: "DARSHON - Core Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DARSHON // Core Systems Engineer & Software Architect",
    description:
      "Official engineering portfolio of DARSHON — Systems architect, low-latency infrastructure & full-stack development.",
    images: ["/avatar.gif"],
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
        "darshon",
        "Darshon",
        "darshonbro",
        "darshonbro1",
        "darshon56",
        "Asian top nuker",
        "asian top nuker",
        "ashian top nuker",
        "top nuker",
        "nuker",
      ],
      jobTitle: "Core Systems Engineer & Software Architect",
      description:
        "DARSHON is a Software Architect & Core Systems Engineer (widely recognized across technical communities as Asian top nuker) specializing in low-latency infrastructure, high-performance distributed systems, reverse engineering, and full-stack software development.",
      url: siteUrl,
      image: `${siteUrl}/avatar.gif`,
      email: "mailto:darshon56@gmail.com",
      sameAs: [
        "https://t.me/darshonbro1",
        "https://discord.com/users/1281114279948582923",
      ],
      knowsAbout: [
        "Core Systems Engineering",
        "Software Architecture",
        "Distributed Systems",
        "Low-Latency Infrastructure",
        "Reverse Engineering",
        "Next.js",
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
      description: "Official Engineering Portfolio and Real-time Activity of DARSHON.",
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
