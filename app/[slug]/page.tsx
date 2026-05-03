import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Channel {
  name: string;
  type: "free" | "pay" | "stream";
  url: string;
}

interface Game {
  slug: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  sport: string;
  date: string;
  status: "scheduled" | "live" | "finished";
  score?: string;
  channels: Channel[];
  description: string;
}

const games: Game[] = [
  {
    slug: "palmeiras-x-santos-onde-assistir",
    homeTeam: "Palmeiras",
    awayTeam: "Santos",
    league: "Brasileirão Série A",
    sport: "Futebol",
    date: "2025-05-10T16:00:00-03:00",
    status: "scheduled",
    channels: [
      { name: "Premiere", type: "pay", url: "#" },
      { name: "Globoplay", type: "stream", url: "#" },
    ],
    description: "Clássico paulista entre Palmeiras e Santos pelo Brasileirão Série A. Veja onde assistir ao vivo e online.",
  },
  {
    slug: "flamengo-x-athletico-pr-onde-assistir",
    homeTeam: "Flamengo",
    awayTeam: "Athletico-PR",
    league: "Copa do Brasil",
    sport: "Futebol",
    date: "2025-05-10T19:30:00-03:00",
    status: "scheduled",
    channels: [
      { name: "SporTV", type: "pay", url: "#" },
      { name: "Globoplay", type: "stream", url: "#" },
    ],
    description: "Flamengo x Athletico-PR pela Copa do Brasil. Saiba onde assistir ao vivo na TV e streaming.",
  },
];

function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
  });
}

const channelTypeLabel: Record<string, string> = {
  free: "TV Aberta",
  pay: "TV Fechada",
  stream: "Streaming",
};

export async function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = getGame(params.slug);
  if (!game) return {};

  const title = `${game.homeTeam} x ${game.awayTeam} — Onde Assistir Ao Vivo`;
  const channelNames = game.channels.map((c) => c.name).join(", ");
  const description = `${game.homeTeam} x ${game.awayTeam} ao vivo em ${formatDate(game.date)} às ${formatTime(game.date)}. Assista em: ${channelNames}. ${game.description}`;

  return {
    title,
    description,
    keywords: [
      `${game.homeTeam} x ${game.awayTeam} onde assistir`,
      `${game.homeTeam} x ${game.awayTeam} ao vivo`,
      game.league,
      "onde assistir futebol hoje",
    ],
    openGraph: {
      title,
      description,
      url: `https://ondeassistir.digital/${game.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://ondeassistir.digital/${game.slug}`,
    },
  };
}

function JsonLd({ game }: { game: Game }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${game.homeTeam} x ${game.awayTeam}`,
    description: game.description,
    startDate: game.date,
    sport: game.sport,
    league: { "@type": "SportsOrganization", name: game.league },
    homeTeam: { "@type": "SportsTeam", name: game.homeTeam },
    awayTeam: { "@type": "SportsTeam", name: game.awayTeam },
    location: { "@type": "Place", name: "Brasil" },
    url: `https://ondeassistir.digital/${game.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGame(params.slug);
  if (!game) notFound();

  return (
    <>
      <JsonLd game={game} />
      <main className="min-h-screen bg-[#070b12] text-[#e8eaf0] px-4 py-12 max-w-2xl mx-auto">
        <nav className="text-sm text-[#445566] mb-6">
          <a href="/" className="hover:text-white">Início</a>
          <span className="mx-2">/</span>
          <a href={`/${game.sport.toLowerCase()}`} className="hover:text-white">{game.sport}</a>
          <span className="mx-2">/</span>
          <span className="text-[#8899aa]">{game.homeTeam} x {game.awayTeam}</span>
        </nav>

        <h1 className="text-3xl font-black leading-tight mb-2">
          {game.homeTeam} x {game.awayTeam}:{" "}
          <span className="text-[#ff0040]">Onde Assistir Ao Vivo</span>
        </h1>

        <p className="text-[#667788] mb-8">
          {game.league} · {formatDate(game.date)} · {formatTime(game.date)}
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-[#8899aa] uppercase tracking-widest text-sm">
            Onde assistir
          </h2>
          <div className="flex flex-col gap-3">
            {game.channels.map((ch) => (
              <a
                key={ch.name}
                href={ch.url}
                className="flex items-center justify-between bg-[#0e1520] border border-[#1a2233] rounded-xl p-4 hover:border-[#ff004044] transition-colors"
              >
                <div>
                  <span className="font-bold text-lg">{ch.name}</span>
                  <span className="block text-sm text-[#667788]">{channelTypeLabel[ch.type]}</span>
                </div>
                <span className="text-[#ff0040] text-xl font-bold">→</span>
              </a>
            ))}
          </div>
        </section>

        <section className="prose prose-invert max-w-none text-[#8899aa] text-sm leading-relaxed">
          <h2 className="text-white text-xl font-bold mb-3">
            Como assistir {game.homeTeam} x {game.awayTeam} ao vivo?
          </h2>
          <p>{game.description}</p>
          <p className="mt-4">
            A partida entre <strong>{game.homeTeam}</strong> e{" "}
            <strong>{game.awayTeam}</strong> está programada para{" "}
            <strong>{formatDate(game.date)}</strong> às{" "}
            <strong>{formatTime(game.date)}</strong> (horário de Brasília), válida pelo{" "}
            <strong>{game.league}</strong>.
          </p>
          <p className="mt-4">
            A transmissão ao vivo estará disponível em{" "}
            {game.channels.map((c) => c.name).join(" e ")}. Acesse os links
            acima para assistir online ou verifique a disponibilidade na sua
            operadora de TV.
          </p>
        </section>
      </main>
    </>
  );
}
