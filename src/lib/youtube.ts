const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export const parseYoutubeId = (input: string | null | undefined): string | null => {
  if (!input) return null;

  const trimmed = input.trim();
  if (!trimmed) return null;

  if (YOUTUBE_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const candidate = url.pathname.slice(1);
      return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const vParam = url.searchParams.get("v");
      if (vParam && YOUTUBE_ID_PATTERN.test(vParam)) {
        return vParam;
      }

      const pathSegments = url.pathname.split("/").filter(Boolean);
      const candidate = pathSegments.at(-1) ?? "";
      return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : null;
    }
  } catch {
    return null;
  }

  return null;
};

export const getYoutubeEmbedUrl = (
  input: string,
  params?: Record<string, string | number | boolean>
): string | null => {
  const youtubeId = parseYoutubeId(input);
  if (!youtubeId) return null;

  const searchParams = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return `https://www.youtube-nocookie.com/embed/${youtubeId}${query ? `?${query}` : ""}`;
};

export const getYoutubeThumbnailUrl = (
  input: string,
  quality: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault" = "maxresdefault"
): string | null => {
  const youtubeId = parseYoutubeId(input);
  if (!youtubeId) return null;

  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
};
