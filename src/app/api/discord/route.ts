import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DISCORD_USER_ID = "1281114279948582923";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || DISCORD_USER_ID;

  let lanyardData: any = null;
  let lookupData: any = null;

  // 1. Fetch public profile from JAPI (Avatar, banner, decoration, clan tag)
  try {
    const res = await fetch(`https://japi.rest/discord/v1/user/${userId}`, {
      next: { revalidate: 30 },
      headers: { "User-Agent": "DarshonPortfolio/2.0" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        lookupData = json.data;
      }
    }
  } catch (err) {
    // Silent fallback
  }

  // 2. Fetch live presence from Lanyard (Real-time Custom Status Note, Activities, Spotify, Online state)
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
      next: { revalidate: 5 },
      headers: { "User-Agent": "DarshonPortfolio/2.0" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        lanyardData = json.data;
      }
    }
  } catch (err) {
    // Silent fallback
  }

  // Normalize real user details
  const user = lookupData || lanyardData?.discord_user;
  const username = user?.username || "darshonbro";
  const globalName = user?.global_name || "!                              L";
  const avatarHash = user?.avatar;
  const bannerHash = user?.banner;
  const bannerColor = user?.banner_color || "#131122";
  const accentColor = user?.accent_color;

  let avatarUrl =
    "https://cdn.discordapp.com/avatars/1281114279948582923/a_6e876478cad012f7e56259015854b4bf.gif?size=512";
  if (avatarHash) {
    const isAnimated = avatarHash.startsWith("a_");
    avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${
      isAnimated ? "gif" : "png"
    }?size=512`;
  } else if (lookupData?.avatarURL) {
    avatarUrl = lookupData.avatarURL;
  }

  let bannerUrl =
    "https://cdn.discordapp.com/banners/1281114279948582923/a_68ce90163b990d310f3ab98f3d0d43be.gif?size=1024";
  if (bannerHash) {
    const isAnimated = bannerHash.startsWith("a_");
    bannerUrl = `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${
      isAnimated ? "gif" : "png"
    }?size=1024`;
  } else if (lookupData?.bannerURL) {
    bannerUrl = lookupData.bannerURL;
  }

  const avatarDecorationUrl = user?.avatar_decoration_data?.asset
    ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=240`
    : "https://cdn.discordapp.com/avatar-decoration-presets/a_ab6beffdbc7e82cd59af53b845f13a3c.png?size=240";

  // Real Clan / Guild Tag
  const clan = user?.clan || user?.primary_guild;
  const clanTag = clan?.tag || "𝙻̲";
  const clanBadgeUrl =
    clan?.badge && clan?.identity_guild_id
      ? `https://cdn.discordapp.com/clan-badges/${clan.identity_guild_id}/${clan.badge}.png`
      : "https://cdn.discordapp.com/clan-badges/1543198603718164501/86735389348f3eacfa519eb553df38fd.png";

  const status = lanyardData?.discord_status || "online";

  // Real Custom Status (Activity Type 4 = Custom Status note)
  // ONLY set if Discord/Lanyard genuinely returns it (zero fake fallback)
  const customStatusActivity = lanyardData?.activities?.find(
    (a: any) => a.type === 4
  );
  let customStatus = null;
  if (customStatusActivity?.state) {
    const emoji = customStatusActivity.emoji?.name || "";
    customStatus = emoji
      ? `${emoji} ${customStatusActivity.state}`
      : customStatusActivity.state;
  }

  const spotify = lanyardData?.spotify || null;
  const activities = lanyardData?.activities || [];

  return NextResponse.json({
    success: true,
    data: {
      userId,
      username,
      globalName,
      avatarUrl,
      bannerUrl,
      avatarDecorationUrl,
      bannerColor,
      accentColor,
      status,
      customStatus,
      isMonitoredByLanyard: !!lanyardData,
      spotify,
      activities,
      clanTag,
      clanBadgeUrl,
    },
  });
}
