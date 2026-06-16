import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/Admin/", "/api/"],
      },
      {
        userAgent: "GoogleBot",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    sitemap: "https://agriculture-blogs.example.com/sitemap.xml",
    host: "https://agriculture-blogs.example.com",
  };
}
