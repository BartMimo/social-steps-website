# Social Steps — Website

Static marketing site for the Social Steps iOS app.
Pages: Home, FAQ, Privacy Policy, Terms of Use. Multilingual (EN/NL/DE/FR/ES/IT/PT).

No build step — plain HTML/CSS/JS. Deploy the folder as-is (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Android / Google Play

- Privacy (`/privacy`) has an Android section (Health Connect, accessibility service, usage access,
  server + CloudKit) and a deletion section at `/privacy#delete-data`. Google Play links to that URL:
  keep the `id="delete-data"` anchor.
- Legal pages and FAQ are English only; i18n.js translates the navigation, footer and homepage.

### Google Play badge aanzetten

De badge staat al op de homepage (hero en onderaan), maar verborgen tot de app live is.

1. Open `index.html` en zoek `data-play` (2 plekken).
2. Haal bij beide het attribuut `hidden` weg.
3. Commit en push naar `main`.

Officiele badges van https://play.google.com/intl/en_us/badges/, per taal als WebP (108 px hoog, transparante rand weggesneden) in
`assets/google-play/<taal>.webp`. `i18n.js` kiest de juiste taal en alt-tekst.
