# ADR-003: Reactive State via Signals

**Status:** Accepted  
**Date:** 2026-07-19  
**Author:** kernelpenguin

## Context

Angular 19 introduced signals as a reactive primitive. The application
needed a lightweight state management approach without external libraries.

## Decision

Use Angular `signal()` and `computed()` for all reactive state:

```typescript
readonly isDark = signal(true);
readonly currentLang = signal('pt');
readonly isOpen = signal(false);
```

State mutations go through `.set()` or `.update()`. Side effects
use `effect()`. No NgRx, RxJS subjects, or external state stores.

## Consequences

**Positive:** Zero-dependency reactivity, fine-grained change detection,
integrated with Angular CD, simpler mental model than RxJS.

**Negative:** Signals API still evolving in Angular ecosystem. Cannot
easily compose async streams (RxJS still needed for HTTP, timers).
