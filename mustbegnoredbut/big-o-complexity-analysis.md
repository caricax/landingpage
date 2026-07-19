# Análise de Complexidade Assintótica — CARICAX Production SPA

**Autor:** kernelpenguin  
**Paradigma:** Computational Mathematics / Algorithmic Analysis  
**Método:** Big O notation (Bachmann–Landau) + Amortized Analysis

---

## 1. Typewriter — Terminal Floating Component

### Algoritmo Original (O(n²))

```typescript
// Antes: concatenação incremental por caractere
for (let i = 0; i < n; i++) {
  this.currentText += this.fullText[i];  // O(k) por iteração
}
```

**Análise formal:** Seja `n` o comprimento do texto manifesto (~1500 caracteres).
A cada tick `i` (i = 1..n), ocorre uma concatenação de string de tamanho `i`.
Em JavaScript, strings são imutáveis: cada concatenação cria uma nova string
copiando todos os `i` caracteres anteriores.

O custo total é a soma aritmética:

$$T(n) = \sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

Portanto:

$$T(n) \in O(n^2)$$

Para `n = 1500`: T ≈ 1.125.000 operações de cópia de caractere por ciclo completo.

### Algoritmo Otimizado (O(n²/10) ≈ O(n²) na prática, O(n) por tick)

```typescript
// Depois: slice() a cada 5 ticks
if (tick % 5 === 0) {
  this.currentText = this.fullText.slice(0, this.currentIndex);
}
```

**Análise formal:** A cada 5 ticks, executamos `slice(0, k)` onde `k` cresce
de 5 em 5 até `n`. O método `String.prototype.slice()` tem complexidade
O(k) pois precisa copiar a substring.

O conjunto de índices onde `slice` é chamado: `S = {5, 10, 15, ..., n}`.
O custo total é:

$$T(n) = \sum_{j=1}^{\lfloor n/5 \rfloor} 5j = 5 \cdot \frac{\lfloor n/5 \rfloor(\lfloor n/5 \rfloor + 1)}{2}$$

Para `n = 1500`: T ≈ 5 + 10 + 15 + ... + 1500 = 225.750 operações.

**Relação com o algoritmo original:**

$$\frac{T_{otimizado}(1500)}{T_{original}(1500)} = \frac{225.750}{1.125.000} \approx 0.20$$

Redução de ~80% nas operações de cópia. Assintoticamente, ambos são O(n²),
mas o coeficiente constante é 5× menor. Para o domínio de `n ≤ 2000`,
o custo é irrelevante no contexto de renderização DOM (que domina).

### Complexidade por Tick (Modelo de Custo Uniforme)

- Tick sem `slice`: O(1) — apenas incrementa contador
- Tick com `slice`: O(k) — cópia de substring
- **Amortizado:** O(k/5) por tick

---

## 2. Devtools Recruitment Service

### Overlay DOM (O(1))

```typescript
// Criação do overlay
const overlay = document.createElement('div');
document.body.appendChild(overlay);       // O(1)
document.body.removeChild(overlay);       // O(1)
```

Operações DOM de `appendChild` e `removeChild` são O(1) amortizado:
a árvore DOM é manipulada por ponteiros, sem cópia de elementos.

### Detecção de Devtools (O(1))

```typescript
// Keyboard shortcut detection
this.shortcuts.some(s => e.ctrlKey && e.shiftKey && e.key === s.key);
```

`Array.prototype.some()` sobre array de tamanho fixo (5 elementos): O(5) = O(1).

```typescript
// Window dimension check
const threshold = 160;
const widthDiff = window.outerWidth - window.innerWidth;
const heightDiff = window.outerHeight - window.innerHeight;
```

Operações aritméticas O(1). Acesso a propriedades de `window` é O(1).

```typescript
// Debugger timing check
const start = performance.now();
debugger;
const elapsed = performance.now() - start;
if (elapsed > 100) { /* devtools detected */ }
```

`performance.now()` é O(1). A instrução `debugger;` é interpretada pelo motor
JS com custo variável (depende se devtools está aberto), mas a medição
de tempo é O(1).

### Complexidade Geral do Serviço

**O(1)** — todas as operações são constantes ou sobre tamanho fixo.

---

## 3. Language Service — Translation Pipeline

### Função `translate(key)` — Amortized O(1)

```typescript
translate(key: string): string {
  let value = this.translations[this.currentLang()]?.[key];    // O(1)
  if (value === undefined) {
    value = this.translations['en']?.[key];                     // O(1)
  }
  if (value === undefined) {
    value = this.translations['pt']?.[key];                     // O(1)
  }
  if (value === undefined) {
    return key;                                                  // O(1)
  }
  if (value.length > 100) {
    return this.normalizeLongText(value, key);                   // O(L) na primeira chamada, O(1) em cache
  }
  return value;
}
```

**Acesso a dicionário:** JavaScript objects são implementados como tabelas hash.
Acesso por chave string: O(1) caso médio, O(n) pior caso (colisão hash).

**Cadeia de fallback:** 3 acessos de dicionário → 3 × O(1) = O(1).

### Normalização de Textos Longos — Caching com Map

```typescript
private readonly normalizedLongTextCache = new Map<string, string>();

private normalizeLongText(value: string, key: string): string {
  const cached = this.normalizedLongTextCache.get(key);         // O(1)
  if (cached) return cached;

  const normalized = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
                           .replace(/\s+/g, ' ')
                           .trim();

  this.normalizedLongTextCache.set(key, normalized);            // O(1) amortizado
  return normalized;
}
```

**Regex:** A operação `replace(regex, replacement)` percorre a string
uma vez: O(L) onde L é o comprimento do texto. Para os manifestos
(~1500 caracteres), L ≈ 1500.

**Cache Hit:** `Map.get()` e `Map.set()` são O(1) amortizado (tabela hash).

**Custo amortizado:** Na primeira chamada para uma chave, O(L) para
normalização + O(1) para cache. Em chamadas subsequentes, O(1) (cache hit).

### Complexidade Geral

| Operação                     | Complexidade     | Amortizado |
|------------------------------|------------------|------------|
| `translate(key)` curto       | O(1)             | O(1)       |
| `translate(key)` longo       | O(L) + O(1)      | O(1)*      |
| `setLanguage(lang)`          | O(1)             | O(1)       |
| `switchLanguage(index)`      | O(1)             | O(1)       |
| Construtor (build maps)      | O(5)             | O(1)       |

\* *Amortizado O(1) porque cada chave longa é normalizada exatamente uma vez.*

---

## 4. Tabela Resumo — Complexidade Assintótica

| Componente / Serviço              | Pior Caso     | Caso Médio     | Amortizado     |
|-----------------------------------|---------------|----------------|----------------|
| Typewriter (original)             | O(n²)         | O(n²)          | O(n²)          |
| Typewriter (otimizado)            | O(n²)         | O(n²)          | O(n²/5)        |
| Devtools detection                | O(1)          | O(1)           | O(1)           |
| Devtools overlay                  | O(1)          | O(1)           | O(1)           |
| `translate(key)` sem cache        | O(1)          | O(1)           | O(1)           |
| `translate(key)` com normalização | O(L)          | O(1)           | O(1)*          |
| Toggle theme                      | O(1)          | O(1)           | O(1)           |
| Renderização de template          | O(n_dom)      | O(n_dom)       | O(n_dom)       |

## 5. Notas Matemáticas

### Definição Formal de Big O

$$f(n) \in O(g(n)) \iff \exists c > 0, n_0 \geq 0 : 0 \leq f(n) \leq c \cdot g(n) \quad \forall n \geq n_0$$

### Teorema da Soma

Se $f_1(n) \in O(g_1(n))$ e $f_2(n) \in O(g_2(n))$, então:

$$(f_1 + f_2)(n) \in O(\max(g_1(n), g_2(n)))$$

Aplicado à pipeline de tradução: O(L) + O(1) = O(L) para primeira chamada,
O(1) + O(1) = O(1) para chamadas subsequentes.

### Invariante de Cache

Para qualquer chave `k` e tempo `t`:

$$Custo_t(k) = \begin{cases} O(L_k) & \text{se } t = t_0(k) \\ O(1) & \text{se } t > t_0(k) \end{cases}$$

Onde $t_0(k)$ é o tempo da primeira chamada para chave `k`.
