# 🚀 Deploy — ondeassistir.digital

## Passo 1 — Subir para o GitHub

```bash
git init
git add .
git commit -m "feat: initial setup with SEO + Vercel Analytics"
gh repo create ondeassistir --public --push --source=.
```

---

## Passo 2 — Conectar na Vercel

1. Acesse https://vercel.com/new
2. Importe o repo `ondeassistir`
3. Framework: **Next.js** (detectado automático)
4. Clique em **Deploy** ✅

---

## Passo 3 — Conectar domínio ondeassistir.digital

### Na Vercel:
1. Settings → Domains → Add → `ondeassistir.digital`
2. Vercel mostrará 2 registros DNS para copiar

### No GoDaddy:
1. Acesse: My Products → ondeassistir.digital → DNS
2. Apague os registros A e CNAME existentes
3. Adicione:

| Tipo  | Nome | Valor                  | TTL  |
|-------|------|------------------------|------|
| A     | @    | 76.76.21.21            | 1h   |
| CNAME | www  | cname.vercel-dns.com   | 1h   |

4. Aguarde até 48h (geralmente 15-30 min)

---

## Passo 4 — Ativar Vercel Analytics

1. No dashboard da Vercel → seu projeto → **Analytics**
2. Clique em **Enable**
3. Pronto — o `<Analytics />` já está no layout.tsx ✅

---

## Passo 5 — Google Search Console

1. Acesse https://search.google.com/search-console
2. Adicione propriedade → `ondeassistir.digital`
3. Verificação via DNS (adicionar TXT no GoDaddy)
4. Submeta o sitemap: `https://ondeassistir.digital/sitemap.xml`

---

## Checklist pós-deploy

- [ ] Site abre em https://ondeassistir.digital
- [ ] https://ondeassistir.digital/sitemap.xml retorna XML
- [ ] https://ondeassistir.digital/robots.txt retorna texto
- [ ] Vercel Analytics mostrando pageviews
- [ ] Search Console com sitemap submetido
- [ ] Testar rich snippet: https://search.google.com/test/rich-results
- [ ] Testar Core Web Vitals: https://pagespeed.web.dev

---

## Próximos passos (semana 1)

1. Integrar API Football (football-data.org — free tier)
2. Criar páginas para os 10 jogos da semana
3. Configurar ISR (revalidate: 3600) para atualização automática
4. Instalar Google AdSense após 30 dias de tráfego
