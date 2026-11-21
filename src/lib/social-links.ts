export type SocialId = "telegram" | "instagram" | "tiktok" | "steam" | "discord";

export type SocialLink =
  | { id: Exclude<SocialId, "discord">; label: string; kind: "link"; href: string }
  | { id: "discord"; label: string; kind: "copy"; value: string };

export const socialLinks: SocialLink[] = [
  { id: "telegram", label: "Telegram", kind: "link", href: "https://t.me/maisonzxc" },
  { id: "instagram", label: "Instagram", kind: "link", href: "https://www.instagram.com/maison.mrs" },
  { id: "tiktok", label: "TikTok", kind: "link", href: "https://www.tiktok.com/@relax.mrs" },
  {
    id: "steam",
    label: "Steam",
    kind: "link",
    href: "https://steamcommunity.com/profiles/76561199697816452/",
  },
  { id: "discord", label: "Discord", kind: "copy", value: "maison.mrs" },
];
