# CARICAX — Production SPA

**Author:** kernelpenguin  
**License:** MIT  
**Stack:** Angular 19 · Tailwind CSS · TypeScript

---

## Índice / Índice / Index

- [🇧🇷 Português](#pt)
- [🇦🇷 Español](#es)
- [🇬🇧 English](#en)

---

<a id="pt"></a>

# 🇧🇷 CARICAX — SPA de Produção

Plataforma institucional da CARICAX: landing page com terminais interativos, manifesto, diretrizes de marca, acessibilidade e conformidade LGPD/GDPR.

## Stack

| Camada        | Tecnologia                          |
|---------------|-------------------------------------|
| Framework     | Angular 19 (standalone, signals)    |
| Estilização   | Tailwind CSS + dark mode via class  |
| Tipografia    | Noto Serif (brand) + Hack (UI)      |
| Ícones        | SVG inline                          |
| Testes        | Jasmine + Karma (ChromeHeadless)    |
| Deploy        | GitHub Pages / Firebase / Docker    |

## Arquitetura

A aplicação segue arquitetura Angular standalone com componentes modulares:

- `App` — container raiz, tema, menu, acessibilidade, footer
- `MenuComponent` — navegação lateral com links institucionais
- `TerminalFloatingComponent` — terminal interativo com typewriter manifesto
- `ContentModalComponent` — modal exibindo conteúdos legais/documentação
- `BrandingGuidelinesComponent` — diretrizes de marca enterprise
- `LanguageSwitcherComponent` — seletor de idioma
- `CommunitySupportComponent` — links de apoio (GitHub Sponsors, BuyMeACoffee)

### Serviços

| Serviço                    | Responsabilidade                                  |
|----------------------------|---------------------------------------------------|
| `ThemeService`             | Tema dark/light com persistência localStorage     |
| `LanguageService`          | i18n com fallback en→pt, cache de textos longos   |
| `AccessibilityService`     | Alto contraste, redução de movimento              |
| `MenuService`              | Estado do menu lateral                            |
| `ContentModalService`      | Controle de modais                                |
| `EmailService`             | Contato via LinkedIn                              |
| `DevtoolsRecruitmentService`| Easter egg para recrutamento via console          |
| `TranslationService`       | Serviço legado de tradução                        |

## Performance

- **Typewriter:** O(n) — `fullText.slice()` a cada 5 ticks (sem concatenação O(n²))
- **Tradução:** cache de textos longos normalizados em `Map`
- **Overlay devtools:** O(1) — `appendChild`/`removeChild`
- **Regex:** escape sanitizado em chaves de tradução
- **Cache key:** separador `\x00` para evitar colisão

## Acessibilidade

- ARIA labels e roles em todos componentes interativos
- `touch-target` em botões e links
- `min-h-dvh` para viewport dinâmica em mobile
- Alto contraste via `AccessibilityService`
- Navegação por teclado no menu e modais

## SEO / AEO

- JSON-LD: Organization, WebSite, BreadcrumbList
- Open Graph + Twitter Cards completos
- hreflang (pt, en, es, de)
- sitemap.xml + robots.txt
- Meta tags descritivas por idioma

## Conformidade Legal

- MIT License (código aberto)
- LGPD (Lei 13.709/2018) — privacidade e dados
- GDPR (EU 2016/679) — proteção de dados
- Termos de uso e política de cookies
- Aviso de domínio temporário no footer

## Deploy

```bash
ng deploy --base-href=/caricax-production-spa/
firebase deploy --only hosting
docker build -t caricax-spa .
```

## Contribuição

1. Faça fork do repositório
2. Crie branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m "feat: descrição concisa"`
4. Push: `git push origin feature/minha-feature`
5. Abra Pull Request

Convenções de commit: [Conventional Commits](https://www.conventionalcommits.org/)

## Código de Conduta

Espera-se que todos os contribuidores e mantenedores deste projeto tratem uns aos outros com respeito, profissionalismo e empatia. Não será tolerado assédio, discriminação ou comportamento antiético de qualquer forma.

## Segurança

Vulnerabilidades devem ser reportadas diretamente ao mantenedor via LinkedIn oficial da CARICAX. Não abra issues públicas para problemas de segurança sensíveis.

---

<a id="es"></a>

# 🇦🇷 CARICAX — SPA de Producción

Plataforma institucional de CARICAX: landing page con terminales interactivos, manifiesto, directrices de marca, accesibilidad y conformidad LGPD/GDPR.

## Stack

| Capa           | Tecnología                           |
|----------------|--------------------------------------|
| Framework      | Angular 19 (standalone, signals)     |
| Estilización   | Tailwind CSS + dark mode via class   |
| Tipografía     | Noto Serif (brand) + Hack (UI)       |
| Iconos         | SVG inline                           |
| Tests          | Jasmine + Karma (ChromeHeadless)     |
| Deploy         | GitHub Pages / Firebase / Docker     |

## Arquitectura

Aplicación Angular standalone con componentes modulares.

### Servicios

`ThemeService`, `LanguageService`, `AccessibilityService`, `MenuService`, `ContentModalService`, `EmailService`, `DevtoolsRecruitmentService`.

## Rendimiento

Typewriter O(n), traducción con caché, overlay O(1), regex sanitizado.

## Conformidad Legal

MIT License, LGPD, GDPR, términos de uso, cookies.

## Despliegue

```bash
ng deploy --base-href=/caricax-production-spa/
firebase deploy --only hosting
docker build -t caricax-spa .
```

---

<a id="en"></a>

# 🇬🇧 CARICAX — Production SPA

CARICAX institutional platform: landing page with interactive terminals, manifesto, brand guidelines, accessibility and LGPD/GDPR compliance.

## Stack

| Layer          | Technology                           |
|----------------|--------------------------------------|
| Framework      | Angular 19 (standalone, signals)     |
| Styling        | Tailwind CSS + dark mode via class   |
| Typography     | Noto Serif (brand) + Hack (UI)       |
| Icons          | Inline SVG                           |
| Testing        | Jasmine + Karma (ChromeHeadless)     |
| Deploy         | GitHub Pages / Firebase / Docker     |

## Architecture

Standalone Angular application with modular components.

### Services

`ThemeService`, `LanguageService`, `AccessibilityService`, `MenuService`, `ContentModalService`, `EmailService`, `DevtoolsRecruitmentService`.

## Performance

Typewriter O(n), cached translation, O(1) overlay, sanitized regex.

## Legal Compliance

MIT License, LGPD, GDPR, terms of use, cookies.

## Deployment

```bash
ng deploy --base-href=/caricax-production-spa/
firebase deploy --only hosting
docker build -t caricax-spa .
```
