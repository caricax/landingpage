import { Component, inject, signal, computed, OnInit, OnDestroy, effect, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../services/language.service';
import { AccessibilityService } from '../services/accessibility.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-terminal-floating',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="w-full max-w-6xl 2xl:max-w-7xl mx-auto responsive-pad terminal-fade-in"
         [class.visible]="isVisible()">
      <div class="relative">
        <div class="absolute -inset-1 rounded-xl blur-sm opacity-75 transition-all duration-300"
             [style.background]="acc.highContrast() ? 'transparent' : 'linear-gradient(45deg, #28aa6a, #25ac6c)'"></div>

        <div class="relative rounded-xl border-2 shadow-2xl transition-colors duration-300"
             [class.bg-black]="!acc.highContrast()"
             [class.bg-gray-950]="acc.highContrast()"
             [class.border-white]="acc.highContrast()"
             [style.border-color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">
          
          <!-- Terminal Header (Vim style) -->
          <div class="px-3 sm:px-4 py-2 sm:py-3 border-b flex items-center justify-between transition-colors duration-300 font-hack text-fluid-xs sm:text-fluid-sm rounded-t-lg"
               [class.bg-gray-900]="!acc.highContrast()"
               [class.bg-black]="acc.highContrast()"
               [style.border-color]="acc.highContrast() ? '#ffffff' : 'rgba(40, 170, 106, 0.3)'">
            <div class="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <span class="px-2 sm:px-3 py-0.5 sm:py-1 font-bold rounded border text-fluid-xs shrink-0"
                    [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'"
                    [style.border-color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">NORMAL</span>
              <span class="truncate text-fluid-xs sm:text-fluid-sm" [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">manifesto_caricax.txt</span>
            </div>
            <div class="flex items-center shrink-0">
              <span class="font-bold tracking-wide text-fluid-xs sm:text-fluid-sm"
                    [style.color]="acc.highContrast() ? '#cccccc' : '#28aa6a'">CARICAX</span>
            </div>
          </div>

          <!-- Terminal Content -->
          <div class="p-4 sm:p-6 md:p-8 lg:p-10 transition-colors duration-300" 
               [class.bg-black]="!acc.highContrast()"
               [class.bg-gray-950]="acc.highContrast()"
               [class.cursor-pointer]="!isComplete()"
               (click)="skipAnimation()"
               style="font-family: 'Hack', monospace; min-height: 200px; min-height: clamp(200px, 50dvh, 400px);">
            <div class="mb-4 sm:mb-6 flex items-center font-hack flex-wrap gap-2">
              <span class="font-bold text-fluid-sm sm:text-fluid-base md:text-fluid-lg" [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">{{ languageService.translate('terminal.prompt') }}</span>
              <span class="text-fluid-sm sm:text-fluid-base md:text-fluid-lg" [style.color]="acc.highContrast() ? '#e5e5e5' : '#25ac6c'">{{ languageService.translate('terminal.command') }}</span>
            </div>

            <!-- Botão TTS (Estilo Vim / Abaixo do prompt) -->
            <div class="mb-6 sm:mb-8 font-hack">
              <button (click)="$event.stopPropagation(); toggleTTS()" 
                      class="touch-target flex items-center gap-2 px-3 py-2 rounded border transition-all duration-300 hover:bg-caricax-green/10 text-fluid-xs sm:text-fluid-sm"
                      [style.border-color]="acc.highContrast() ? '#ffffff' : '#28aa6a'"
                      [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">
                @if (acc.isSpeaking()) {
                  <svg aria-hidden="true" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  <span>{{ ttsStopText() }}</span>
                } @else {
                  <svg aria-hidden="true" class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 10v4a2 2 0 002 2h2l4 4V4L9 8H7a2 2 0 00-2 2z"></path></svg>
                  <span>{{ ttsPlayText() }}</span>
                }
              </button>
            </div>

            <!-- Formatted Output -->
            <div class="text-fluid-xs sm:text-fluid-sm md:text-fluid-base leading-relaxed whitespace-pre-wrap terminal-justified" 
                 [style.color]="acc.highContrast() ? '#ffffff' : '#25ac6c'" 
                 style="clear: both; display: block; width: 100%; position: relative; text-align: justify;">
              <span [innerHTML]="formattedText()"></span>
              @if (!isComplete()) {
                <span class="animate-pulse inline-block">█</span>
              }
            </div>

            @if (isComplete()) {
              <div class="mt-4 sm:mt-5 md:mt-6 flex items-center font-hack">
                <span class="font-bold text-fluid-sm sm:text-fluid-base md:text-fluid-lg" [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">{{ languageService.translate('terminal.prompt') }}</span>
                <span class="ml-2 animate-pulse text-fluid-sm sm:text-fluid-base md:text-fluid-lg" [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">█</span>
              </div>
            }

            <!-- Vim Status Bar (Bottom) -->
            <div class="mt-6 sm:mt-8 md:mt-10 pt-2 sm:pt-3 border-t flex flex-wrap justify-between items-center gap-1 text-fluid-xs sm:text-fluid-sm font-hack opacity-80"
                 [style.border-color]="acc.highContrast() ? '#ffffff' : 'rgba(40, 170, 106, 0.3)'"
                 [style.color]="acc.highContrast() ? '#ffffff' : '#28aa6a'">
              <span>-- NORMAL --</span>
              <span class="uppercase">{{ languageService.currentLanguage().code === 'es' ? 'ES-419' : languageService.currentLanguage().code === 'pt' ? 'PT-BR' : languageService.currentLanguage().code === 'en' ? 'EN-US' : 'DE-DE' }}</span>
              <span>{{ lineCount() }}L, {{ charCount() }}C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terminal-fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .terminal-fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .terminal-justified {
      text-align: justify;
      text-justify: inter-word;
    }
    /* Tooltip styles */
    .term-tooltip-trigger {
      position: relative;
      cursor: help;
      border-bottom: 1px dashed currentColor;
      font-weight: bold;
    }
    .term-tooltip-trigger:hover .term-tooltip-box {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .term-tooltip-box {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      width: max-content;
      max-width: 280px;
      padding: 14px;
      background: #000;
      border: 1px solid #28aa6a;
      border-radius: 8px;
      color: #fff;
      font-size: 0.85rem;
      line-height: 1.5;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0,0,0,0.8);
      pointer-events: none;
      text-align: justify;
      text-justify: inter-word;
    }
    html.high-contrast .term-tooltip-box {
      background: #000;
      border-color: #fff;
      color: #fff;
    }
    .term-tooltip-title {
      display: block;
      color: #28aa6a;
      font-weight: bold;
      margin-bottom: 6px;
      text-align: left;
      border-bottom: 1px solid rgba(40,170,106,0.3);
      padding-bottom: 4px;
    }
    html.high-contrast .term-tooltip-title {
      color: #fff;
      border-color: #fff;
    }
  `]
})
export class TerminalFloatingComponent implements OnInit, OnDestroy {
  readonly languageService = inject(LanguageService);
  readonly acc = inject(AccessibilityService);
  private sanitizer = inject(DomSanitizer);

  readonly currentText = signal<string>('');
  readonly isComplete = signal<boolean>(false);
  readonly isVisible = signal<boolean>(false);
  readonly isTransitioning = signal<boolean>(false);
  readonly lineCount = signal<number>(1);
  readonly charCount = signal<number>(0);

  private readonly typingSpeed: number = 35;
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private fullText: string = '';
  private currentLanguage: Language | null = null;
  private currentIndex: number = 0;
  private typewriterTick: number = 0;
  private textArray: string[] = [];

  readonly tooltipsInfo = computed(() => {
    const tooltips = this.languageService.getTerminalTooltips();
    const tooltipsLower: Record<string, { term: string, content: string }> = Object.fromEntries(
      Object.entries(tooltips).map(([k, v]) => [k.toLowerCase(), v])
    );
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const tooltipRegex = new RegExp(Object.keys(tooltips).map(escapeRegex).join('|'), 'gi');
    return { tooltipsLower, tooltipRegex };
  });

  /**
   * Sinal computado que processa o texto atual. 
   * Evita a execução repetida de regex em cada ciclo de detecção de mudanças (Change Detection) do Angular,
   * calculando apenas quando \`currentText\` é modificado.
   */
  readonly formattedText = computed<SafeHtml>(() => {
    let text: string = this.currentText();
    if (!text) return this.sanitizer.bypassSecurityTrustHtml('');

    const { tooltipsLower, tooltipRegex } = this.tooltipsInfo();

    // Substituição de tooltips (O(L) + inserção de ícone)
    let processedText = text.replace(tooltipRegex, (match: string): string => {
      const t = tooltipsLower[match.toLowerCase()];
      if (!t) return match;
      return `<span class="term-tooltip-trigger">${match}<svg aria-hidden="true" class="inline-block w-4 h-4 ml-1 opacity-70 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="term-tooltip-box"><span class="term-tooltip-title">${t.term}</span>${t.content}</span></span>`;
    });
    
    // Formatação de numeração de parágrafos (Vim style lines) com layout Flex para alinhar o texto e permitir justification real
    const paragraphs = processedText.split('\n\n').filter(p => p.length > 0);
    const color: string = this.acc.highContrast() ? '#888888' : '#1b7346';
    
    const finalHtml = paragraphs.map((p, index) => {
      return `<div class="flex mb-4 w-full" style="text-align: justify; text-justify: inter-word;">
                <div style="color: ${color}; min-width: 2.5rem; flex-shrink: 0; user-select: none; text-align: right; padding-right: 1rem;">${index + 1}</div>
                <div class="flex-grow">${p}</div>
              </div>`;
    }).join('');
    
    return this.sanitizer.bypassSecurityTrustHtml(finalHtml);
  });

  constructor() {
    // Sincroniza lineCount/charCount com currentText (inclui mudança de idioma)
    effect(() => {
      const text = this.currentText();
      this.lineCount.set(text ? text.split('\n').length : 1);
      this.charCount.set(text.length);
    });

    effect(() => {
      const newLanguage: Language = this.languageService.currentLanguage();
      
      // Retorno antecipado se o idioma não mudou
      if (this.currentLanguage && newLanguage.code === this.currentLanguage.code) return;
      
      const wasInitialLoad: boolean = !this.currentLanguage;
      this.currentLanguage = newLanguage;
      
      if (!wasInitialLoad) {
        this.updateTextContent();
      }
    });
  }

  ngOnInit(): void {
    this.initializeText();
    setTimeout(() => this.isVisible.set(true), 300);
    setTimeout(() => this.startTypewriter(), 1200);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.acc.stopSpeech();
  }

  /**
   * Retorna o texto do botão de iniciar TTS baseado no idioma.
   * Utiliza early returns no lugar de else.
   */
  ttsPlayText(): string {
    const code: string = this.currentLanguage?.code ?? 'pt';
    if (code === 'en') return 'Listen to manifesto (TTS)';
    if (code === 'es') return 'Escuchar manifiesto (TTS)';
    if (code === 'de') return 'Manifest anhören (TTS)';
    return 'Ouvir manifesto (TTS)';
  }

  /**
   * Retorna o texto do botão de parar TTS baseado no idioma.
   * Utiliza early returns.
   */
  ttsStopText(): string {
    const code: string = this.currentLanguage?.code ?? 'pt';
    if (code === 'en') return 'Stop narration (TTS)';
    if (code === 'es') return 'Detener narración (TTS)';
    if (code === 'de') return 'Erzählung stoppen (TTS)';
    return 'Parar narração (TTS)';
  }

  toggleTTS(): void {
    this.acc.toggleSpeech(this.fullText);
  }

  /**
   * Prepara o array de caracteres normalizando quebras de linha e pontuação
   */
  private initializeText(): void {
    let rawText: string = this.languageService.translate('terminal.philosophy');
    this.fullText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').normalize('NFC').trim();
    this.textArray = Array.from(this.fullText);
  }

  /**
   * Atualiza o conteúdo mantendo o progresso da animação atual.
   */
  private updateTextContent(): void {
    this.isTransitioning.set(true);
    const oldLength: number = this.textArray.length;
    
    this.initializeText();
    
    if (this.isComplete()) {
      this.currentText.set(this.fullText);
      setTimeout(() => this.isTransitioning.set(false), 300);
      return;
    }

    if (!this.intervalId) {
      setTimeout(() => this.isTransitioning.set(false), 300);
      return;
    }

    const progressPercentage: number = oldLength === 0 ? 0 : this.currentIndex / oldLength;
    this.currentIndex = Math.floor(progressPercentage * this.textArray.length);
    this.currentIndex = Math.min(this.currentIndex, this.textArray.length - 1);
    
    if (this.currentIndex >= 0 && this.currentIndex < this.textArray.length) {
      this.currentText.set(this.textArray.slice(0, this.currentIndex + 1).join(''));
    }
    
    setTimeout(() => this.isTransitioning.set(false), 300);
  }

  /**
   * Pula a animação de digitação, exibindo o texto completo imediatamente.
   */
  skipAnimation(): void {
    if (this.isComplete() || this.isTransitioning()) return;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    
    this.currentIndex = this.textArray.length;
    this.typewriterTick = 0;
    this.currentText.set(this.fullText);
  }

  /**
   * Inicia o efeito visual de máquina de escrever (typewriter).
   */
  private startTypewriter(): void {
    this.currentIndex = 0;
    this.typewriterTick = 0;
    this.currentText.set('');

    this.intervalId = setInterval(() => {
      if (this.currentIndex >= this.textArray.length) {
        clearInterval(this.intervalId);
        this.isComplete.set(true);
        this.currentText.set(this.fullText);
        return;
      }

      this.currentIndex++;
      this.typewriterTick++;
      if (this.typewriterTick % 5 === 0 || this.currentIndex >= this.textArray.length) {
        this.currentText.set(this.fullText.slice(0, this.currentIndex));
      }
    }, this.typingSpeed);
  }
}
