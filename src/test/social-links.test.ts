import { afterEach, describe, expect, it, vi } from "vitest";

import { copyText } from "@/lib/clipboard";
import { socialLinks } from "@/lib/social-links";

describe("social links", () => {
  it("points each platform to the requested profile", () => {
    const hrefs = Object.fromEntries(
      socialLinks.flatMap((l) => (l.kind === "link" ? [[l.id, l.href]] : [])),
    );
    expect(hrefs).toEqual({
      telegram: "https://t.me/maisonzxc",
      instagram: "https://www.instagram.com/maison.mrs",
      tiktok: "https://www.tiktok.com/@relax.mrs",
      steam: "https://steamcommunity.com/profiles/76561199697816452/",
    });
  });

  it("makes Discord copy maison.mrs instead of opening a link", () => {
    const discord = socialLinks.find((l) => l.id === "discord");
    expect(discord?.kind).toBe("copy");
    expect(discord && "value" in discord ? discord.value : null).toBe("maison.mrs");
    expect(discord && "href" in discord).toBe(false);
  });
});

describe("copyText", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("writes the text through the clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    await expect(copyText("maison.mrs")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("maison.mrs");
  });
});
