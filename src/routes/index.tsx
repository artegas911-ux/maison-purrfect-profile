import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { FaDiscord, FaInstagram, FaSteam, FaTelegram, FaTiktok } from "react-icons/fa6";
import { Check } from "lucide-react";

import avatar from "@/assets/black_cat_avatar.jpg.asset.json";
import background from "@/assets/supercars_monochrome.jpg.asset.json";
import { copyText } from "@/lib/clipboard";
import { socialLinks, type SocialId } from "@/lib/social-links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON — Artem's links" },
      {
        name: "description",
        content:
          "Artem from Ukraine — learning software development and AI programming. Find me on Telegram, Instagram, TikTok, Steam and Discord.",
      },
      { property: "og:title", content: "MAISON — Artem's links" },
      {
        property: "og:description",
        content: "Connect with Artem on Telegram, Instagram, TikTok, Steam and Discord.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons: Record<SocialId, ComponentType<{ className?: string }>> = {
  telegram: FaTelegram,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  steam: FaSteam,
  discord: FaDiscord,
};

const iconButton =
  "group relative flex size-[3.25rem] items-center justify-center rounded-2xl border border-glass-border bg-glass text-foreground backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 hover:border-silver/70 hover:bg-glass-strong hover:shadow-glow active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-16";

function Index() {
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleCopy = async (value: string) => {
    const ok = await copyText(value);
    setToast({ text: ok ? `Copied: ${value}` : `Discord: ${value}`, id: Date.now() });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2000);
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-8">
      {/* Background */}
      <div
        aria-hidden
        className="animate-bg-in absolute inset-0 bg-cover bg-[position:28%_center]"
        style={{ backgroundImage: `url(${background.url})` }}
      />
      <div aria-hidden className="bg-overlay absolute inset-0 backdrop-blur-[3px]" />

      {/* Card */}
      <section className="relative w-full max-w-sm rounded-[2rem] border border-glass-border bg-card px-5 pb-8 pt-10 text-center shadow-card backdrop-blur-2xl sm:max-w-md sm:px-10">
        <div className="animate-avatar-in mx-auto size-28 overflow-hidden rounded-full shadow-avatar sm:size-32">
          <img
            src={avatar.url}
            alt="Black cat avatar"
            className="size-full object-cover"
            width={128}
            height={128}
          />
        </div>

        <h1
          className="animate-fade-up text-silver-gradient mt-6 font-display text-[2.6rem] leading-none font-extrabold uppercase tracking-[0.06em] sm:text-6xl"
          style={{ animationDelay: "350ms" }}
        >
          MAISON
        </h1>

        <p
          className="animate-fade-up mx-auto mt-4 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "520ms" }}
        >
          Hi, I'm Artem from Ukraine. Currently learning software development and exploring
          programming with Artificial Intelligence. Feel free to connect with me via my social
          networks below.
        </p>

        <div
          className="animate-fade-up mx-auto mt-7 h-px w-16 bg-border"
          style={{ animationDelay: "650ms" }}
        />

        <ul className="mt-7 flex flex-nowrap items-center justify-center gap-2.5 sm:gap-4">
          {socialLinks.map((link, i) => {
            const Icon = icons[link.id];
            const delay = { animationDelay: `${800 + i * 110}ms` };
            return (
              <li key={link.id} className="animate-pop-in" style={delay}>
                {link.kind === "link" ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className={iconButton}
                  >
                    <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCopy(link.value)}
                    aria-label={`Copy Discord username ${link.value}`}
                    title={`Discord: ${link.value}`}
                    className={iconButton}
                  >
                    <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none">
        {toast && (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in fixed bottom-8 left-1/2 z-50 flex items-center gap-2 rounded-full border border-glass-border bg-popover/85 px-4 py-2.5 text-sm font-medium text-popover-foreground shadow-card backdrop-blur-xl"
          >
            <Check className="size-4" />
            {toast.text}
          </div>
        )}
      </div>
    </main>
  );
}
