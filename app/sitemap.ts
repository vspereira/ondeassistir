import { MetadataRoute } from "next";

// Em produção, buscar da API/DB. Por ora, estático + dinâmico.
const staticRoutes = [
  "",
  "/futebol",
  "/formula-1",
  "/nba",
  "/ufc",
];

const upcomingGames = [
  "palmeiras-x-santos-onde-assistir",
  "flamengo-x-athletico-pr-onde-assistir",
  "corinthians-x-sao-paulo-onde-assistir",
  "fluminense-x-botafogo-onde-assistir",
  "real-madrid-x-manchester-city-onde-assistir",
  "formula-1-gp-monaco-onde-assistir",
  "nba-playoffs-celtics-x-heat-onde-assistir",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ondeassistir.digital";
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const gameEntries = upcomingGames.map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.9, // Páginas de jogo têm alta prioridade
  }));

  return [...staticEntries, ...gameEntries];
}
