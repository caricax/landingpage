# ADR-001: Fluid Type Scale via Tailwind

**Status:** Accepted  
**Date:** 2026-07-19  
**Author:** kernelpenguin

## Context

The application needed a responsive type system that scales fluidly
across viewports without media query breakpoints at every size.

## Decision

Implement a custom `text-fluid-*` scale in Tailwind using `clamp()`:

- `text-fluid-xs`: `clamp(0.75rem, 0.65rem + 0.5vw, 0.875rem)`
- `text-fluid-sm`: `clamp(0.875rem, 0.8rem + 0.5vw, 1rem)`
- `text-fluid-base`: `clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`
- `text-fluid-lg`: `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)`
- `text-fluid-xl`: `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)`
- `text-fluid-2xl`: `clamp(1.5rem, 1.3rem + 1vw, 1.875rem)`
- `text-fluid-3xl`: `clamp(1.875rem, 1.5rem + 1.5vw, 2.25rem)`
- `text-fluid-4xl`: `clamp(2.25rem, 1.8rem + 2vw, 3rem)`
- `text-fluid-5xl`: `clamp(3rem, 2rem + 3vw, 4rem)`

## Consequences

**Positive:** Single class per element, no breakpoint-specific overrides,
smooth scaling on all viewports.

**Negative:** `clamp()` not supported in IE11 (irrelevant for modern SPA).
Custom utility classes must be maintained alongside standard Tailwind sizes.
