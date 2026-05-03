"use client";

import { useState, useEffect } from "react";

const games = [
  {
    id: 1, sport: "futebol",
    league: "Brasileirão Série A", leagueBadge: "🏆",
    home: "Palmeiras", away: "Santos",
    homeShield: "🟢", awayShield: "⚫",
    date: "Hoje", time: "16:00",
    status: "ao_vivo", minute: "34'", score: "1 × 0",
    channels: [
      { name: "Globoplay", logo: "GP", color: "#e85d04", type: "stream", url: "https://globoplay.globo.com/?utm_source=ondeassistir&utm_medium=card&utm_campaign=palmeiras-santos" },
      { name: "Premiere", logo: "PR", color: "#c62828", type: "pay", url: "https://premiere.globo.com/?utm_source=ondeassistir&utm_medium=card&utm_campaign=palmeiras-santos" },
    ],
    tags: ["Ao Vivo", "Clássico"],
  },
  {
    id: 2, sport: "futebol",
    league: "Copa do Brasil", leagueBadge: "🇧🇷",
    home: "Flamengo", away: "Athletico-PR",
    homeShield: "🔴", awayShield: "⚫",
    date: "Hoje", time: "19:30",
    status: "em_breve", minute: null, score: null,
    channels: [
      { name: "SporTV", logo: "SP", color: "#0077b6", type: "pay", url: "https://globoplay.globo.com/?utm_source=ondeassistir&utm_medium=card&utm_campaign=flamengo-athletico" },
      { name: "Globoplay", logo: "GP", color: "#e85d04", type: "stream", url: "https://globoplay.globo.com/?utm_source=ondeassistir&utm_medium=card&utm_campaign=flamengo-athletico" },
    ],
    tags: ["Em breve", "Oitavas"],
  },
  {
    id: 3, sport: "futebol",
    league: "Champions League", leagueBadge: "⭐",
    home: "Real Madrid", away: "Man. City",
    homeShield: "⚪", awayShield: "🔵",
    date: "Hoje", time: "16:00",
    status: "encerrado", minute: null, score: "2 × 1",
    channels: [
      { name: "Max", logo: "MX", color: "#5a189a", type: "stream", url: "https://www.max.com/br?utm_source=ondeassistir&utm_medium=card&utm_campaign=champions" },
    ],
    tags: ["Encerrado", "Semifinal"],
  },
  {
    id: 4, sport: "formula1",
    league: "Formula 1 — GP Monaco", leagueBadge: "🏎️",
    home: "Verstappen", away: "Hamilton",
    homeShield: "🔵", awayShield: "🔴",
    date: "Amanhã", time: "09:00",
    status: "em_breve", minute: null, score: null,
    channels: [
      { name: "Band", logo: "BD", color: "#2d6a4f", type: "free", url: "https://www.band.com.br?utm_source=ondeassistir&utm_medium=card&utm_campaign=f1-monaco" },
      { name: "Bandplay", logo: "BP", color: "#1b4332", type: "stream", url: "https://www.bandplay.com.br?utm_source=ondeassistir&utm_medium=card&utm_campaign=f1-monaco" },
    ],
    tags: ["Amanhã", "Corrida"],
  },
  {
    id: 5, sport: "basquete",
    league: "NBA — Playoffs", leagueBadge: "🏀",
    home: "Boston Celtics", away: "Miami Heat",
    homeShield: "🟢", awayShield: "🔴",
    date: "Hoje", time: "21:30",
    status: "em_breve", minute: null, score: null,
    channels: [
      { name: "Disney+", logo: "D+", color: "#006d77", type: "stream", url: "https://www.disneyplus.com/pt-br?utm_source=ondeassistir&utm_medium=card&utm_campaign=nba-playoffs" },
      { name: "Prime Video", logo: "PV", color: "#e85d04", type: "stream", url: "https://www.amazon.com.br/prime?utm_source=ondeassistir&utm_medium=card&utm_campaign=nba" },
    ],
    tags: ["Playoffs", "Jogo 5"],
  },
  {
    id: 6, sport: "ufc",
    league: "UFC 311", leagueBadge: "🥊",
    home: "Makhachev", away: "Poirier",
    homeShield: "🟡", awayShield: "🔵",
    date: "Sábado", time: "23:00",
    status: "em_breve", minute: null, score: null,
    channels: [
      { name: "Combate", logo: "CB", color: "#c1121f", type: "pay", url: "https://www.combate.com.br?utm_source=ondeassistir&utm_medium=card&utm_campaign=ufc311" },
    ],
    tags: ["Luta Principal", "Cinturão"],
  },
];

const affiliates = [
  { name: "Globoplay", logo: "GP", color: "#e85d04", category: "Streaming", desc: "Brasileirão, Copa do Brasil e Série B ao vivo. A partir de R$26/mês.", cta: "Assinar agora", commission: "Comissão por assinatura", url: "https://globoplay.globo.com/?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=section" },
  { name: "Max", logo: "MX", color: "#5a189a", category: "Streaming", desc: "Champions League, NBA, F1 e catálogo Warner. A partir de R$34/mês.", cta: "Assinar agora", commission: "Comissão por assinatura", url: "https://www.max.com/br?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=section" },
  { name: "Prime Video", logo: "PV", color: "#e85d04", category: "Streaming", desc: "NFL, NBA e conteúdo exclusivo incluso no Amazon Prime por R$19/mês.", cta: "Testar grátis", commission: "Amazon Associates", url: "https://www.amazon.com.br/prime?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=section" },
  { name: "Betano", logo: "BT", color: "#d62828", category: "Apostas · +18", desc: "Aposte nos seus times com as melhores odds do mercado.", cta: "Apostar agora", commission: "Até R$300/cadastro", url: "https://www.betano.com.br?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=apostas" },
  { name: "Sportingbet", logo: "SB", color: "#1d3557", category: "Apostas · +18", desc: "Odds em tempo real e transmissão ao vivo de jogos selecionados.", cta: "Criar conta", commission: "CPA até R$250", url: "https://www.sportingbet.com/pt-br?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=apostas" },
  { name: "Disney+", logo: "D+", color: "#006d77", category: "Streaming", desc: "ESPN ao vivo, NBA, NFL, UFC e conteúdo Star+. A partir de R$43/mês.", cta: "Assinar agora", commission: "Comissão por assinatura", url: "https://www.disneyplus.com/pt-br?utm_source=ondeassistir&utm_medium=affiliate&utm_campaign=section" },
];

const sports = [
  { id: "todos", label: "Todos", icon: "🎯" },
  { id: "futebol", label: "Futebol", icon: "⚽" },
  { id: "formula1", label: "F1", icon: "🏎️" },
  { id: "basquete", label: "NBA", icon: "🏀" },
  { id: "ufc", label: "UFC", icon: "🥊" },
];

const statusConfig: Record<string, { label: string; cls: string; pulse: boolean }> = {
  ao_vivo: { label: "AO VIVO", cls: "status-live", pulse: true },
  em_breve: { label: "EM BREVE", cls: "status-soon", pulse: false },
  encerrado: { label: "ENCERRADO", cls: "status-done", pulse: false },
};

const channelTypeLabel: Record<string, string> = {
  free: "TV Aberta · Gratuito",
  pay: "TV Fechada",
  stream: "Streaming",
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [notified, setNotified] = useState<number[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = games.filter((g) => {
    const matchSport = activeFilter === "todos" || g.sport === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || g.home.toLowerCase().includes(q) || g.away.toLowerCase().includes(q) || g.league.toLowerCase().includes(q);
    return matchSport && matchSearch;
  });

  const liveCount = games.filter((g) => g.status === "ao_vivo").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        :root{--bg:#06080f;--surface:#0c1018;--surface2:#111827;--border:#1a2233;--red:#ff2442;--red-dim:rgba(255,36,66,.12);--orange:#ff7849;--text:#dde4f0;--muted:#5a6a7e;--muted2:#8899aa;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--text);}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp .45s ease both;}
        .pulse-dot{width:7px;height:7px;border-radius:50%;background:var(--red);animation:pulse 1.4s ease infinite;display:inline-block;}
        .status-live{background:rgba(255,36,66,.15);color:var(--red);border:1px solid rgba(255,36,66,.3);}
        .status-soon{background:rgba(244,162,97,.12);color:#f4a261;border:1px solid rgba(244,162,97,.3);}
        .status-done{background:rgba(90,106,126,.1);color:var(--muted);border:1px solid rgba(90,106,126,.2);}
        a{text-decoration:none;color:inherit;}
        button{cursor:pointer;font-family:'IBM Plex Sans',sans-serif;}
      `}</style>

      {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:100,background:"rgba(6,8,15,.9)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap" as const}}>
          <a href="/" style={{fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:20,letterSpacing:-1,marginRight:"auto",display:"flex",alignItems:"center",gap:8}}>
            📺 onde<span style={{fontWeight:400}}>assistir</span><span style={{color:"var(--red)"}}>digital</span>
          </a>
          <div style={{display:"flex",alignItems:"center",gap:6,background:"var(--red-dim)",border:"1px solid rgba(255,36,66,.3)",color:"#ff6b7a",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600}}>
            <span className="pulse-dot" /> {liveCount} ao vivo
          </div>
          <a href="#afiliados" style={{background:"var(--red)",color:"#fff",fontSize:13,fontWeight:700,padding:"8px 16px",borderRadius:10}}>🔔 Me avisar</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#0d1a2e 0%,var(--bg) 55%,#1c0a0f 100%)",padding:"56px 16px 44px",textAlign:"center" as const}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,36,66,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,36,66,.04) 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none" as const}} />
        <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(255,36,66,.12) 0%,transparent 70%)",pointerEvents:"none" as const}} />
        <span style={{position:"absolute",top:16,right:16,fontSize:12,color:"#1a2a3a",fontVariantNumeric:"tabular-nums"}}>{time}</span>
        <div style={{position:"relative",maxWidth:680,margin:"0 auto"}}>
          <p style={{fontSize:11,letterSpacing:3,textTransform:"uppercase" as const,color:"var(--red)",fontWeight:700,marginBottom:14}}>Guia de transmissões #1 do Brasil</p>
          <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(38px,9vw,72px)",fontWeight:900,lineHeight:1.0,letterSpacing:-3,marginBottom:24}}>
            Onde assistir<br />
            <span style={{background:"linear-gradient(90deg,var(--red),var(--orange))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>qualquer jogo</span><br />
            hoje?
          </h1>
          <div style={{display:"flex",alignItems:"center",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:14,padding:"0 16px",maxWidth:500,margin:"0 auto 16px",gap:10}}>
            <span>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Pesquise time, esporte ou campeonato…"
              style={{flex:1,background:"none",border:"none",outline:"none",color:"var(--text)",fontSize:15,padding:"14px 0",fontFamily:"IBM Plex Sans,sans-serif"}} />
          </div>
          <p style={{color:"var(--muted)",fontSize:13}}>⚽ Futebol &nbsp;·&nbsp; 🏎️ F1 &nbsp;·&nbsp; 🏀 NBA &nbsp;·&nbsp; 🥊 UFC</p>
        </div>
      </section>

      {/* AFFILIATE STRIP */}
      <div style={{background:"linear-gradient(90deg,#0d1a2e,#0c1018,#1c0a0f)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"12px 16px",overflowX:"auto" as const}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" as const,justifyContent:"center"}}>
          <span style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase" as const,letterSpacing:1,whiteSpace:"nowrap" as const}}>Assine e assista →</span>
          {[
            { name:"🟠 Globoplay", url:"https://globoplay.globo.com/?utm_source=ondeassistir&utm_medium=strip" },
            { name:"🟣 Max", url:"https://www.max.com/br?utm_source=ondeassistir&utm_medium=strip" },
            { name:"🔵 Prime Video", url:"https://www.amazon.com.br/prime?utm_source=ondeassistir&utm_medium=strip" },
            { name:"✨ Disney+", url:"https://www.disneyplus.com/pt-br?utm_source=ondeassistir&utm_medium=strip" },
            { name:"🎯 Aposte agora", url:"https://www.sportingbet.com/pt-br?utm_source=ondeassistir&utm_medium=strip" },
          ].map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener sponsored"
              style={{display:"inline-flex",alignItems:"center",gap:6,background:"var(--surface2)",border:"1px solid var(--border)",color:"var(--text)",fontSize:12,fontWeight:600,padding:"5px 12px",borderRadius:8,whiteSpace:"nowrap" as const,transition:"all .2s"}}>
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"16px",display:"flex",gap:8,overflowX:"auto" as const}}>
        {sports.map(s => (
          <button key={s.id} onClick={() => setActiveFilter(s.id)}
            style={{display:"flex",alignItems:"center",gap:6,background:activeFilter===s.id?"var(--red-dim)":"var(--surface)",border:`1px solid ${activeFilter===s.id?"rgba(255,36,66,.4)":"var(--border)"}`,color:activeFilter===s.id?"#ff6b7a":"var(--muted2)",borderRadius:10,padding:"8px 16px",fontSize:13,whiteSpace:"nowrap" as const,transition:"all .2s"}}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* GAMES GRID */}
      <main style={{maxWidth:1100,margin:"0 auto",padding:"0 16px 48px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
          {filtered.map((game, i) => {
            const st = statusConfig[game.status];
            const isLive = game.status === "ao_vivo";
            return (
              <article key={game.id} className="fade-up"
                style={{background:"var(--surface)",border:`1px solid ${isLive?"rgba(255,36,66,.35)":"var(--border)"}`,borderRadius:18,padding:20,display:"flex",flexDirection:"column" as const,gap:14,position:"relative",overflow:"hidden",boxShadow:isLive?"0 0 32px rgba(255,36,66,.1)":"none",animationDelay:`${i*0.06}s`}}>
                {isLive && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,var(--red),var(--orange))"}} />}

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,color:"var(--muted)",fontWeight:600,letterSpacing:.5}}>{game.leagueBadge} {game.league}</span>
                  <span className={st.cls} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,fontWeight:700,letterSpacing:1,padding:"3px 10px",borderRadius:20}}>
                    {st.pulse && <span className="pulse-dot" />}
                    {isLive ? game.minute : st.label}
                  </span>
                </div>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                  <div style={{display:"flex",flexDirection:"column" as const,alignItems:"center",gap:6,flex:1}}>
                    <span style={{fontSize:32,lineHeight:1}}>{game.homeShield}</span>
                    <span style={{fontSize:12,fontWeight:700,textAlign:"center" as const,color:"#aabbcc"}}>{game.home}</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column" as const,alignItems:"center",minWidth:72}}>
                    {game.score
                      ? <span style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:900,color:isLive?"var(--red)":"#2a3a4d",letterSpacing:-1}}>{game.score}</span>
                      : <><span style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:900,color:"#1a2233"}}>VS</span>
                         <span style={{fontSize:11,fontWeight:600,color:"#f4a261",marginTop:2}}>{game.date} · {game.time}</span></>
                    }
                  </div>
                  <div style={{display:"flex",flexDirection:"column" as const,alignItems:"center",gap:6,flex:1}}>
                    <span style={{fontSize:32,lineHeight:1}}>{game.awayShield}</span>
                    <span style={{fontSize:12,fontWeight:700,textAlign:"center" as const,color:"#aabbcc"}}>{game.away}</span>
                  </div>
                </div>

                <div style={{display:"flex",gap:6,flexWrap:"wrap" as const}}>
                  {game.tags.map(t => (
                    <span key={t} style={{fontSize:10,fontWeight:600,background:t==="Ao Vivo"||t==="Playoffs"?"rgba(255,36,66,.1)":"var(--surface2)",color:t==="Ao Vivo"||t==="Playoffs"?"#ff6b7a":"var(--muted)",padding:"3px 10px",borderRadius:20,letterSpacing:.5}}>{t}</span>
                  ))}
                </div>

                <div>
                  <p style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase" as const,letterSpacing:1,fontWeight:700,marginBottom:8}}>
                    {game.status==="encerrado"?"Foi transmitido em":"Onde assistir"}
                  </p>
                  <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                    {game.channels.map(ch => (
                      <a key={ch.name} href={ch.url} target="_blank" rel="noopener sponsored"
                        style={{display:"flex",alignItems:"center",gap:10,background:"var(--surface2)",border:"1px solid transparent",borderRadius:12,padding:"10px 12px",transition:"all .2s"}}>
                        <div style={{width:38,height:38,borderRadius:8,background:ch.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",flexShrink:0}}>{ch.logo}</div>
                        <div style={{flex:1}}>
                          <span style={{display:"block",fontSize:13,fontWeight:700}}>{ch.name} <span style={{fontSize:9,fontWeight:700,background:"rgba(255,120,73,.15)",color:"var(--orange)",border:"1px solid rgba(255,120,73,.3)",borderRadius:4,padding:"1px 5px",letterSpacing:.5}}>AFILIADO</span></span>
                          <span style={{display:"block",fontSize:11,color:"var(--muted)"}}>{channelTypeLabel[ch.type]}</span>
                        </div>
                        <span style={{color:ch.color,fontSize:16,fontWeight:700,opacity:.7}}>→</span>
                      </a>
                    ))}
                  </div>
                </div>

                {game.status === "em_breve" && (
                  <button onClick={() => setNotified(n => [...n, game.id])}
                    style={{background:notified.includes(game.id)?"rgba(76,175,80,.1)":"none",border:`1px dashed ${notified.includes(game.id)?"rgba(76,175,80,.4)":"var(--border)"}`,color:notified.includes(game.id)?"#4caf50":"var(--muted)",borderRadius:10,padding:10,fontSize:12,width:"100%",fontWeight:600,transition:"all .2s"}}>
                    {notified.includes(game.id) ? "✅ Você será avisado!" : "🔔 Avisar quando começar"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </main>

      {/* AFFILIATE SECTION */}
      <section id="afiliados" style={{background:"linear-gradient(135deg,#0a1520,#0c0a18)",borderTop:"1px solid var(--border)",padding:"48px 16px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <p style={{fontFamily:"Syne,sans-serif",fontSize:13,fontWeight:700,letterSpacing:2,textTransform:"uppercase" as const,color:"var(--muted)",marginBottom:20}}>Plataformas parceiras</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
            {affiliates.map(a => (
              <a key={a.name} href={a.url} target="_blank" rel="noopener sponsored"
                style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,padding:18,display:"flex",flexDirection:"column" as const,gap:10,transition:"all .2s",color:"var(--text)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:44,height:44,borderRadius:10,background:a.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff",flexShrink:0}}>{a.logo}</div>
                  <div>
                    <div style={{fontSize:15,fontWeight:700}}>{a.name}</div>
                    <div style={{fontSize:11,color:"var(--muted)"}}>{a.category}</div>
                  </div>
                </div>
                <p style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{a.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--surface2)",borderRadius:8,padding:"8px 12px",marginTop:4}}>
                  <span style={{fontSize:12,fontWeight:700}}>{a.cta} →</span>
                  <span style={{fontSize:11,color:a.category.includes("Apostas")?"#ff6b6b":"var(--orange)",fontWeight:600}}>💰 {a.commission}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#040609",borderTop:"1px solid var(--border)",padding:"48px 16px 24px"}}>
        <div style={{maxWidth:1100,margin:"0 auto 32px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:32,flexWrap:"wrap" as const}}>
          <div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:900,letterSpacing:-1,marginBottom:10}}>📺 ondeassistir<span style={{color:"var(--red)"}}>.digital</span></div>
            <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.7}}>O guia completo de transmissões esportivas do Brasil. Futebol, F1, NBA, UFC e muito mais — tudo em um lugar.</p>
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase" as const,color:"var(--muted)",marginBottom:12}}>Esportes</h4>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column" as const,gap:8}}>
              {["Futebol Brasileiro","Champions League","Fórmula 1","NBA","UFC"].map(s => (
                <li key={s}><a href="#" style={{color:"#445566",fontSize:13}}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase" as const,color:"var(--muted)",marginBottom:12}}>Onde assistir</h4>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column" as const,gap:8}}>
              {["Palmeiras x Santos","Flamengo x Fluminense","Corinthians x São Paulo","GP Monaco F1","NBA Playoffs"].map(m => (
                <li key={m}><a href="#" style={{color:"#445566",fontSize:13}}>{m}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",borderTop:"1px solid var(--border)",paddingTop:16,display:"flex",justifyContent:"space-between",flexWrap:"wrap" as const,gap:8,fontSize:12,color:"#2a3a4a"}}>
          <span>© 2025 ondeassistir.digital</span>
          <span>Este site não transmite conteúdo. Apenas indexa informações de canais oficiais.</span>
        </div>
        <p style={{maxWidth:1100,margin:"12px auto 0",fontSize:11,color:"#1e2a36",textAlign:"center" as const,lineHeight:1.6}}>
          ⚠️ Apostas esportivas são para maiores de 18 anos. Jogue com responsabilidade. Links marcados como AFILIADO podem gerar comissão para o site.
        </p>
      </footer>
    </>
  );
}
