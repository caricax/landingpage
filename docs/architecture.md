# Architecture — CARICAX Production SPA

## Principles

1. **Standalone** — All components use Angular standalone API (no NgModules).
2. **Signal-first** — State management via `signal()` and `computed()`.
3. **Tree-shakable** — Services use `providedIn: 'root'`.
4. **i18n-by-design** — Every user-facing string goes through `LanguageService.translate()`.
5. **Dark-first** — Default theme is dark; light is opt-out.
6. **Privacy-first** — No tracking, no cookies, no data collection.

## Module Structure

```
src/
├── main.ts                    # Bootstrap
├── index.html                 # Shell with meta tags + JSON-LD
├── styles.css                 # Global styles + Tailwind directives
├── app/
│   ├── app.config.ts          # App configuration (providers)
│   ├── app.routes.ts          # Route definitions
│   ├── app.ts                 # Root component
│   ├── app.css                # Root styles
│   ├── app.spec.ts            # Root tests
│   ├── components/            # Reusable UI components
│   │   ├── terminal-floating.component.ts
│   │   ├── menu.component.ts
│   │   ├── content-modal.component.ts
│   │   ├── language-switcher.component.ts
│   │   ├── community-support.component.ts
│   │   └── learn-more-form.component.ts
│   ├── pages/                 # Page-level components
│   │   ├── branding-guidelines.component.ts
│   │   ├── labut-ai.component.ts
│   │   ├── rescisao-facil.component.ts
│   │   └── servicos.component.ts
│   ├── services/              # Application services
│   │   ├── theme.service.ts
│   │   ├── language.service.ts
│   │   ├── accessibility.service.ts
│   │   ├── menu.service.ts
│   │   ├── content-modal.service.ts
│   │   ├── email.service.ts
│   │   ├── devtools-recruitment.service.ts
│   │   └── translation.service.ts
│   ├── pipes/                 # Angular pipes
│   │   └── markdown.pipe.ts
│   └── data/                  # Static data
│       └── terminal-texts.ts
```

## Dependency Graph

```
app.ts
├── ThemeService (root)
├── LanguageService (root)
├── AccessibilityService (root)
├── MenuService (root)
├── ContentModalService (root)
├── EmailService (root)
│
├── TerminalFloatingComponent
│   └── LanguageService
│
├── MenuComponent
│   └── LanguageService
│
├── ContentModalComponent
│   └── LanguageService
│
├── LanguageSwitcherComponent
│   └── LanguageService
│
├── CommunitySupportComponent
│   └── LanguageService
│
├── BrandingGuidelinesComponent
│   └── LanguageService
│
└── DevtoolsRecruitmentService
    └── (standalone, no deps)
```

## Internationalization Strategy

- 4 languages: PT-BR, EN, ES, DE
- Translation keys stored in `LanguageService.translations` as nested records
- Fallback chain: `current → en → pt → raw key`
- Long texts (>100 chars) normalized and cached in `normalizedLongTextCache`
- `navigator.language` detected on first visit; persisted to localStorage

## Styling Architecture

- Tailwind CSS utility-first with custom `caricax-*` color tokens
- Dark mode via `class` strategy on `<html>`
- Fluid type scale: `text-fluid-xs` through `text-fluid-5xl` (clamp-based)
- `touch-target` class on all interactive elements (≥ 44px touch area)
- CSS animations: `animate-gradient-shift`, `animate-glow-pulse`, `animate-fade-in`
