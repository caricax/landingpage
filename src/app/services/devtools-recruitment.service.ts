import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevtoolsRecruitmentService {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Private BehaviorSubject para manter o estado atual do DevTools
  private readonly _isOpen = new BehaviorSubject<boolean>(false);
  
  // Observable público que componentes podem assinar
  public readonly isOpen$: Observable<boolean> = this._isOpen.asObservable();
  
  // Flag para controlar se já foi detectado nesta sessão
  private hasTriggered = false;
  
  // Intervalo de verificação para detecção robusta
  private detectionInterval: number | undefined;

  constructor(private ngZone: NgZone) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeDetection();
    }
  }

  private initializeDetection(): void {
    // Executar verificação fora da zone do Angular para evitar change detection desnecessário
    this.ngZone.runOutsideAngular(() => {
      // Método 1: Verificação de dimensões da janela (para DevTools docked)
      this.setupWindowDimensionCheck();
      
      // Método 2: Verificação de timing do debugger (mais robusta)
      this.setupDebuggerTimingCheck();
      
      // Método 3: Interceptação de teclas de atalho
      this.setupKeyboardShortcutDetection();
    });
  }

  private setupWindowDimensionCheck(): void {
    let lastInnerHeight = window.innerHeight;
    let lastInnerWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      const heightDifference = Math.abs(window.outerHeight - window.innerHeight);
      const widthDifference = Math.abs(window.outerWidth - window.innerWidth);
      
      // Detectar se DevTools está docked (diferença significativa nas dimensões)
      const isLikelyDocked = heightDifference > 150 || widthDifference > 150;
      
      if (isLikelyDocked && !this.hasTriggered) {
        this.triggerDetection();
      }
    });
  }

  private setupDebuggerTimingCheck(): void {
    // Verificação periódica usando timing do debugger
    this.detectionInterval = setInterval(() => {
      if (this.hasTriggered) {
        clearInterval(this.detectionInterval);
        return;
      }

      const startTime = performance.now();
      
      // Usando debugger de forma não-bloqueante
      try {
        // eslint-disable-next-line no-debugger
        debugger;
      } catch (e) {
        // Ignorar erros
      }
      
      const endTime = performance.now();
      const timeDifference = endTime - startTime;
      
      // Se demorou mais que 100ms, provavelmente DevTools está aberto
      if (timeDifference > 100) {
        this.triggerDetection();
      }
    }, 3000); // Verificar a cada 3 segundos
  }

  private setupKeyboardShortcutDetection(): void {
    const devToolsShortcuts = [
      { key: 'F12' },
      { key: 'I', ctrlKey: true, shiftKey: true },
      { key: 'C', ctrlKey: true, shiftKey: true },
      { key: 'J', ctrlKey: true, shiftKey: true },
      { key: 'U', ctrlKey: true }
    ];

    window.addEventListener('keydown', (event) => {
      const matchesShortcut = devToolsShortcuts.some(shortcut => {
        return event.key === shortcut.key &&
               event.ctrlKey === !!shortcut.ctrlKey &&
               event.shiftKey === !!shortcut.shiftKey;
      });

      if (matchesShortcut && !this.hasTriggered) {
        // Pequeno delay para dar tempo do DevTools abrir
        setTimeout(() => {
          this.triggerDetection();
        }, 1000);
      }
    });
  }

  private triggerDetection(): void {
    if (this.hasTriggered) return;
    
    this.hasTriggered = true;

    this.showRecruitmentMessage();

    // Re-entrar na zone do Angular para atualizar o BehaviorSubject
    this.ngZone.run(() => {
      this._isOpen.next(true);
    });

    // Limpar interval para economizar recursos
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
  }

  private showRecruitmentMessage(): void {
    const lang = navigator.language;

    const messages: Record<string, string> = {
      pt: 'Então quer dizer que você tem curiosidade sobre nosso código, é?! Se estiver procurando emprego, envie seu CV via LinkedIn.',
      en: "So you're curious about our code, huh?! If you're looking for a job, send your CV via LinkedIn.",
      ru: 'Значит, вам интересен наш код, да?! Если вы ищете работу, отправьте резюме через LinkedIn.',
      es: '¿Entonces tienes curiosidad por nuestro código, ¿eh?! Si estás buscando trabajo, envía tu CV por LinkedIn.',
      zh: '所以你对我们的代码很好奇，是吗？！如果你正在找工作，请通过LinkedIn发送你的简历。'
    };

    const map: Record<string, string> = {
      pt: 'pt', 'pt-BR': 'pt', 'pt-PT': 'pt',
      en: 'en', 'en-US': 'en', 'en-GB': 'en',
      ru: 'ru', 'ru-RU': 'ru',
      es: 'es', 'es-ES': 'es', 'es-419': 'es',
      zh: 'zh', 'zh-CN': 'zh', 'zh-TW': 'zh', 'zh-Hans': 'zh', 'zh-Hant': 'zh'
    };

    const code = map[lang] ?? 'en';
    const msg = messages[code] ?? messages['en'];

    console.clear();
    console.log(`%c👀 ${msg}`, 'font-size:18px; font-weight:bold; color:#28aa6a;');

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#000;color:#28aa6a;font-family:Hack,monospace;font-size:clamp(1.25rem,4vw,2rem);padding:2rem;text-align:center;line-height:1.6;z-index:99999;';
    overlay.textContent = msg;
    document.body.appendChild(overlay);
  }

  public resetDetection(): void {
    this.hasTriggered = false;
    this._isOpen.next(false);
    if (isPlatformBrowser(this.platformId)) {
      this.initializeDetection();
    }
  }

  public get hasAlreadyTriggered(): boolean {
    return this.hasTriggered;
  }
}
