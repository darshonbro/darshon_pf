import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://www.darshon.lol";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Allow AI & LLM Search Crawlers (ChatGPT Search, Perplexity, Claude, Gemini, Applebot)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "GoogleOther",
          "Applebot-Extended",
          "CCBot",
          "cohere-ai",
          "FacebookBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

