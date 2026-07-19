# Contributing

CARICAX Information Technology follows an open-source model under the MIT License.

## Pull Requests

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/description`.
3. Make changes following existing code conventions.
4. Run `npm test` to verify existing tests pass.
5. Open a PR against `main`.

## Commit Convention

```
type(scope): brief description

- type: feat | fix | chore | docs | refactor | test | style
- scope: component or area (optional)
```

## Code Standards

- All components use `ChangeDetectionStrategy.OnPush`.
- Services use Angular signals for reactive state.
- Translations are in `language.service.ts` under the correct language key.
- No dead code, no console.log in production paths.
