# Multi-Engine Optimization Strategy

**CARICAX Information Technology — Software as a Right**
**Date:** 2026-07-19

---

## Engine Referral to Index

| Engine       | Crawler                | Index Source         | Webmaster Tool                | Local Data Source     |
|--------------|------------------------|----------------------|-------------------------------|-----------------------|
| Google       | Googlebot              | Proprietary          | Google Search Console         | Google Business       |
| Brave Search | BraveBot               | Proprietary (40B+)   | search.brave.com/submit-url   | Apple Maps            |
| DuckDuckGo   | DuckDuckBot            | Bing + DuckDuckBot   | Bing Webmaster Tools          | Apple Maps            |
| Yandex       | YandexBot              | Proprietary          | webmaster.yandex.com          | Yandex Maps           |
| Firefox      | Googlebot (default)    | Google               | N/A (via Google)              | N/A                   |
| Opera        | Googlebot (default)    | Google               | N/A (via Google)              | N/A                   |

Firefox and Opera use Google as their default search engine — no separate optimization required beyond standard Google SEO. The differentiation is in browser-specific features (Pocket, Crypto Wallet, VPN, GX Gaming).

---

## Engine-Specific Keyword Maps

### 1. Brave Search — Privacy-First Independent Index

**User Profile:** Privacy-conscious, tech-savvy, likely to use crypto/BAT, values independence from Big Tech.

**Ranking Factors (descending importance):**
1. Crawlability (BraveBot independent index — must not be blocked)
2. Page speed / Core Web Vitals (tie-breaker without behavioral data)
3. Content depth + semantic NLP matching
4. JSON-LD structured data (Article, Organization, FAQPage, HowTo)
5. Backlinks from authoritative domains
6. Lean architecture (minimal trackers)
7. HTTPS + security headers

**Target Keywords (Portuguese):**
```
desenvolvimento de software florianópolis
soluções de ti para micro empresas
software como um direito
tecnologia acessível mpe
open source brasil
sustentabilidade digital
privacidade de dados empresa
software livre para pequenas empresas
```

**Target Keywords (English):**
```
software development for small business brazil
open source it solutions
privacy first software company
sustainable technology consulting
affordable it for micro enterprises
```

**Target Keywords (Spanish):**
```
software para pequeñas empresas
soluciones de ti abiertas
tecnología sostenible latinoamérica
```

**Actions:**
- Submit sitemap: `https://search.brave.com/submit-url`
- Drive initial Brave Browser traffic to trigger Web Discovery Project
- Add `navigator.brave.isBrave()` detection to track Brave traffic share

---

### 2. DuckDuckGo — Bing-Powered Privacy Engine

**User Profile:** Privacy maximizers, "bang" power users, non-personalized search advocates.

**Ranking Factors:**
1. Bing index eligibility (foundational — optimize for Bing first)
2. DuckDuckBot crawlability (robots.txt must allow)
3. Exact-match content relevance (no personalization to compensate)
4. Content freshness (higher weight than Google)
5. Backlink quality
6. Mobile speed
7. Apple Maps listing (for local queries)

**Target Keywords (Portuguese):**
```
desenvolvimento de sistemas florianópolis
consultoria ti para micro empresas
código aberto santa catarina
software acessível brasil
soluções digitais sustentáveis
segurança da informação mpe
```

**Target Keywords (English):**
```
florianopolis software developer
open source consulting brazil
it solutions for small business south america
privacy focused web development
sustainable tech company
```

**Target Keywords (Spanish):**
```
desarrollo de software florianópolis
soluciones informáticas para pymes
tecnología de código abierto
```

**Actions:**
- Verify site in Bing Webmaster Tools
- Enable IndexNow protocol
- Claim Apple Business Connect listing
- Add to Wikipedia / Wikidata for Instant Answers eligibility
- Structure content with direct answers in first paragraph for featured snippets
- Keep geo keywords explicit in titles and headings (no IP-based assumptions)

---

### 3. Yandex — Russian Market Leader

**User Profile:** Russian/CIS businesses, Eastern European market, Cyrillic searchers.

**Ranking Factors:**
1. Behavioral signals (dwell time >90s, scroll depth, bounce rate) — **most important**
2. Content localization (native Russian/Cyrillic)
3. Regional relevance
4. Exact-match keywords in titles and H1
5. Meta keywords tag (Yandex still reads it — unique among major engines)
6. Page speed + mobile optimization
7. Backlink quality
8. Yandex Metrica data integration

**Target Keywords (Portuguese → English → Russian transliteration):**
```
CARICAX информационные технологии
программное обеспечение с открытым исходным кодом
ИТ-решения для малого бизнеса
облачные технологии Бразилия
цифровая трансформация Флорианополис
```

**Target Keywords (Russian — Cyrillic):**
```
разработка программного обеспечения бразилия
открытое программное обеспечение для бизнеса
ит консалтинг флорианополис
облачная инфраструктура для стартапов
устойчивое развитие информационных технологий
кибербезопасность для малых предприятий
```

**Actions:**
- Register in Yandex Webmaster: `webmaster.yandex.com`
- Verify via meta tag
- Create Yandex Metrica account for behavioral analytics
- Submit XML sitemap to Yandex
- Maintain `meta name="keywords"` (active for Yandex)
- Add language alternates with hreflang for Russian (`ru`)
- Optimize for >90s dwell time with rich content, clear CTAs, interactive elements
- Use Turbo Pages for mobile speed on Yandex

---

### 4. Firefox (Mozilla) — Privacy Browser

**User Profile:** Privacy-aware, open-source advocates, Mozilla supporters, technically literate.

**Note:** Firefox uses Google/Bing search by default — standard SEO applies. Key differentiators:

- **Pocket Integration:** Firefox ships with Pocket for article saving and recommendations
- **Enhanced Tracking Protection:** Impacts analytics and third-party scripts
- **Open Source Culture:** Brand alignment matters

**Target Keywords:**
```
alternativa ao google analytics
software open source Brasil
tecnologia que respeita privacidade
sem tracker terceiros
código aberto e gratuito
```

**Actions:**
- Ensure site works with Enhanced Tracking Protection (ETP) strict mode
- Implement `meta name="pocket"` for article readiness
- Use first-party analytics to compensate for ETP blocking
- Brand alignment with open source / privacy values

---

### 5. Opera — Feature-First Browser

**User Profile:** Power users, gamers (Opera GX), VPN users, crypto wallet users, early adopters.

**Note:** Opera uses Google/Bing search by default — standard SEO applies. Key differentiators:

- **Opera GX:** Gaming-oriented browser with RAM/CPU limiter
- **Built-in VPN + Ad Blocker:** Affects page performance perception
- **Crypto Wallet:** Integrates with Web3
- **Workspaces:** Tab management features

**Target Keywords:**
```
site leve e rápido
otimizado para navegadores alternativos
funciona com vpn ativo
sem anúncios intrusivos
tecnologia web3
```

**Actions:**
- Test across Opera GX, Opera Crypto, standard Opera
- Verify performance under RAM/CPU limits (Opera GX feature)
- Ensure HTTPS works with built-in VPN
- Lightweight page weight for limited-resource environments

---

## Cross-Engine Keyword Matrix

### Category: Software Development

| Keyword (PT) | Google | Brave | DuckDuckGo | Yandex | Firefox | Opera |
|---|---|---|---|---|---|---|
| desenvolvimento de software florianópolis | HIGH | HIGH | HIGH | MED | MED | MED |
| agência de ti santa catarina | HIGH | HIGH | MED | LOW | MED | MED |
| fábrica de software brasil | HIGH | MED | MED | MED | MED | MED |
| desenvolvimento web mpe | MED | HIGH | HIGH | MED | MED | HIGH |

### Category: Open Source / Privacy

| Keyword (PT) | Google | Brave | DuckDuckGo | Yandex | Firefox | Opera |
|---|---|---|---|---|---|---|
| software livre empresa | MED | HIGH | HIGH | MED | HIGH | MED |
| código aberto negócio | MED | HIGH | HIGH | MED | HIGH | MED |
| alternativa google para empresas | MED | HIGH | HIGH | LOW | HIGH | MED |
| privacidade digital corporativa | MED | HIGH | HIGH | MED | HIGH | MED |

### Category: Geographic (Florianópolis, SC, Brasil)

| Keyword (PT) | Google | Brave | DuckDuckGo | Yandex | Firefox | Opera |
|---|---|---|---|---|---|---|
| ti florianópolis | HIGH | MED | MED | LOW | MED | MED |
| desenvolvimento softwares floripa | MED | MED | MED | LOW | MED | MED |
| tecnologia santa catarina | MED | MED | MED | LOW | MED | MED |

---

## Implementation Status

### Index.html — Meta Tags Update

| Tag | Google | Brave | DuckDuckGo | Yandex | Notes |
|---|---|---|---|---|---|
| `title` | ✓ | ✓ | ✓ | ✓ | 50-60 chars, primary keyword early |
| `description` | ✓ (30%) | ✓ | ✓ | ✓ | 150-160 chars, keyword naturally |
| `keywords` | ✗ ignored | ✗ ignored | ✗ ignored | **✓ used** | Keep for Yandex |
| `robots` | ✓ | ✓ | ✓ | ✓ | `index, follow` |
| `yandex` | ✗ | ✗ | ✗ | ✓ | Explicit Yandex directive |
| `geo.*` | ✓ | ✓ | ✓ | ✓ | Florianópolis, SC, BR |
| `og:*` | ✓ | ✓ | ✓ | ✓ | Social sharing |
| `twitter:*` | ✓ | ✓ | ✓ | ✓ | Twitter cards |
| JSON-LD Schema | ✓ | ✓ | ✓ | ✓ | Organization |
| `hreflang` | ✓ | ✓ | ✓ | ✓ | pt-BR, en, es |

### Pending Technical Actions

- [ ] Submit sitemap to Brave Search
- [ ] Verify in Bing Webmaster Tools → enables DuckDuckGo
- [ ] Claim Apple Business Connect → enables Brave + DuckDuckGo local
- [ ] Register in Yandex Webmaster + add Yandex Metrica
- [ ] Add Wikipedia / Wikidata entity for CARICAX
- [ ] Enable IndexNow protocol
- [ ] Create Russian-language page version for Yandex target
- [ ] Test ETP strict mode compatibility (Firefox)
- [ ] Performance audit across Opera GX RAM limits

---

## Exceptions Policy

The following Google references are **permitted exceptions** to the ungoogle policy:
- Google SEO / AEO best practices (structured data, schema.org, Core Web Vitals)
- Angular framework (maintained by Google — transitive dependency)
