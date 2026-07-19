# System Design — CARICAX Production SPA

## Overview

Single-page application (SPA) for CARICAX institutional landing page.
Architected as a client-side rendered Angular 19 application with zero
server dependencies beyond static file hosting.

## System Context

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Browser    │────→│  GitHub Pages    │────→│  Static SPA  │
│  (Client)    │←────│  / Firebase      │←────│  (Angular)   │
└──────────────┘     └──────────────────┘     └──────────────┘
       │                                              │
       │  External                                    │ Internal
       ▼                                              ▼
┌──────────────┐                            ┌──────────────────┐
│   LinkedIn   │                            │  ThemeService    │
│  (Contact)   │                            │  LanguageService │
└──────────────┘                            │  MenuService     │
                                            │  ModalService    │
                                            └──────────────────┘
```

## Data Flow

### Translation Pipeline
```
User input (lang switch)
       │
       ▼
LanguageService.setLanguage()
       │
       ▼
localStorage.setItem('caricax-language')
       │
       ▼
navigator.language → langMap → translate(key) → cache lookup
       │                                              │
       ▼                                              ▼
  Record<string,string>    ┌────────────────────────────┐
       │                   │  1. Current lang           │
       ▼                   │  2. Fallback en            │
  Template binding         │  3. Fallback pt            │
                           │  4. Raw key                │
                           └────────────────────────────┘
```

### Theme Flow
```
User toggle or system preference
       │
       ▼
ThemeService.toggleTheme()
       │
       ▼
localStorage.setItem('caricax-theme')
       │
       ├──→ document.documentElement.classList.toggle('dark')
       ├──→ document.body.className = 'dark-theme' | 'light-theme'
       └──→ <meta name="theme-color"> update
```

## Component Tree

```
App
├── MenuButton (fixed top-left)
├── ThemeToggle (fixed top-right)
├── HighContrastToggle
├── LanguageSwitcher
├── MenuComponent (overlay sidebar)
├── LogoSection
│   ├── <img> logo
│   ├── <h2> MANIFESTO
│   └── TerminalFloatingComponent
│       ├── typewriter text
│       └── language toggles
├── <h1> CARICAX (gradient text)
├── Subtitle section
├── FooterSection
│   ├── Logo + rights
│   ├── Legal links (modals)
│   └── Contact (LinkedIn)
│       └── CommunitySupportComponent
├── BrandingGuidelinesComponent (page/modal)
└── ContentModalComponent
    ├── Legal pages (privacy, terms, cookies, LGPD, MIT)
    ├── About / Products / Services / Portfolio / Blog / Docs / Support / Contact
    └── Branding guidelines
```

## State Management

All state is managed via Angular signals (no NgRx or external store):

| State            | Signal         | Persistence     |
|------------------|----------------|-----------------|
| Theme (dark/light)| `isDark()`    | localStorage    |
| Language         | `currentLang()`| localStorage    |
| Menu open        | `isOpen()`    | None (ephemeral)|
| Modal content    | `activeModal()`| None           |
| High contrast    | `highContrast()`| None           |
| Devtools detected| `isOpen()`    | None            |

## Performance Budget

- **Bundle size:** < 500KB gzip
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s
- **Lighthouse score:** > 90 (all categories)

## Security Constraints

- No server-side processing (static SPA)
- No cookies for tracking (only localStorage for preferences)
- External links use `rel="noopener noreferrer"`
- Content Security Policy via meta tags
- No form data collection (contact via LinkedIn redirect)
