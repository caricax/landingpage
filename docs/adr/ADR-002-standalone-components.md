# ADR-002: Standalone Components (No NgModules)

**Status:** Accepted  
**Date:** 2026-07-19  
**Author:** kernelpenguin

## Context

Angular 19 supports both NgModule-based and standalone architectures.
The application needed to choose between them.

## Decision

All components use Angular standalone API: `standalone: true`,
`imports` array directly in component metadata. No `NgModule` declarations.

## Consequences

**Positive:** Reduced boilerplate, simpler dependency graph, better
tree-shaking, easier lazy loading, aligned with Angular future direction.

**Negative:** Cannot use some older third-party libraries that require
NgModule. All dependencies must be imported explicitly per component.
