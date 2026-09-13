import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/formacion", "/privacidad"].map((path) => ({
    url: new URL(path, "https://www.isaaccalderon.me").href,
  }));
}
