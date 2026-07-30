import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SurDev — strony i aplikacje internetowe",
    template: "%s — SurDev",
  },
  description: "SurDev tworzy szybkie, użyteczne strony i aplikacje internetowe.",
};

const themeScript = `
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch (_) {}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        {children}
        <footer className="site-footer">
          <div className="container">© {new Date().getFullYear()} SurDev</div>
        </footer>
      </body>
    </html>
  );
}
