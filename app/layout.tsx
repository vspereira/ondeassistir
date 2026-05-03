import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ondeassistir.digital"),
  title: {
    default: "Onde Assistir — Jogos Ao Vivo Hoje | ondeassistir.digital",
    template: "%s | ondeassistir.digital",
  },
  description:
    "Descubra onde assistir futebol, F1, NBA e UFC ao vivo hoje. Guia completo de transmissões: Globo, SporTV, Premiere, Globoplay, Max e mais.",
  keywords: [
    "onde assistir",
    "jogos ao vivo hoje",
    "brasileirão onde assistir",
    "futebol ao vivo",
    "transmissão ao vivo",
    "premiere futebol",
    "globoplay futebol",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ondeassistir.digital",
    siteName: "ondeassistir.digital",
    title: "Onde Assistir — Jogos Ao Vivo Hoje",
    description:
      "Guia completo de transmissões esportivas. Futebol, F1, NBA e UFC — tudo em um lugar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ondeassistir.digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onde Assistir — Jogos Ao Vivo Hoje",
    description: "Guia completo de transmissões esportivas do Brasil.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://ondeassistir.digital",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
