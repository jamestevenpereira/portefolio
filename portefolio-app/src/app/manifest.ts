import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Desenvolvimento Web`,
    short_name: SITE_NAME,
    start_url: "/",
    display: "standalone",
    background_color: "#0F0C0A",
    theme_color: "#0F0C0A",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
