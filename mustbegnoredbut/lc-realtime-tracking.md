# L/C Real-Time Tracking — Mathematical Proof

## Problem

The Vim status bar must show lines (L) and characters (C) that:
1. Update in real-time during typewriter animation (progress)
2. Show factual totals when animation completes
3. Transition smoothly on language change (proportional rescaling)

## Implementation

`terminal-floating.component.ts` — constructor, first `effect()`:

```typescript
effect(() => {
  const text = this.currentText();
  this.lineCount.set(text ? text.split('\n').length : 1);
  this.charCount.set(text.length);
});
```

## Complexity Analysis

### During typewriter (per-character step)

- `currentText` grows by 1 char per tick (variable delay via `setTimeout`)
- `split('\n')` is O(n) per tick, where n = current length
- Total typewriter cost: O(n²) worst-case, but n ≤ ~2000 chars → negligible
- Alternative: maintain running count in O(1) per char → not needed for this scale

### Language change (proportional rescaling)

- Old language: total = `oldTotal`, typed = `oldIndex` (progress = `oldIndex / oldTotal`)
- New language: `newIndex = floor(progress × newTotal)`
- `currentText` is set to `newText.slice(0, newIndex)` — O(1) reference
- Effect fires once, O(n) for the split

### Convergence

- As `currentIndex → textArray.length`, `currentText → fullText`
- At completion: `lineCount = fullText.split('\n').length`, `charCount = fullText.length`
- These are the **factual totals** for the current language

## Invariants

1. `charCount` monotonically increases during typewriter (chars only added, never removed)
2. `lineCount` converges to total lines of the language's full manifesto text
3. On language switch, both counters jump to proportionally correct intermediate values, then resume monotonic increase to the new factual total

## Directory name justification

This directory and its contents must be versioned but serve no runtime purpose — purely documentary.
