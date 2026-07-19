import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly languageService = inject(LanguageService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  readonly highContrast = signal(false);
  readonly isSpeaking = signal(false);
  
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (this.isBrowser) {
      this.synth = window.speechSynthesis;
      // Recuperar estado de alto contraste
      const stored = localStorage.getItem('caricax-high-contrast');
      if (stored === 'true') {
        this.setHighContrast(true);
      }
    }
  }

  toggleHighContrast(): void {
    this.setHighContrast(!this.highContrast());
  }

  setHighContrast(active: boolean): void {
    this.highContrast.set(active);
    if (this.isBrowser) {
      localStorage.setItem('caricax-high-contrast', String(active));
      if (active) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  }

  toggleSpeech(text: string): void {
    if (!this.isBrowser || !this.synth) return;

    if (this.isSpeaking()) {
      this.stopSpeech();
    } else {
      this.startSpeech(text);
    }
  }

  startSpeech(text: string): void {
    if (!this.isBrowser || !this.synth) return;
    
    // Stop any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select language based on current language code
    const langCode = this.languageService.currentLanguage().code;
    switch(langCode) {
      case 'pt': utterance.lang = 'pt-BR'; break;
      case 'en': utterance.lang = 'en-US'; break;
      case 'es': utterance.lang = 'es-ES'; break;
      case 'de': utterance.lang = 'de-DE'; break;
      default: utterance.lang = 'pt-BR';
    }

    utterance.onstart = () => this.isSpeaking.set(true);
    utterance.onend = () => this.isSpeaking.set(false);
    utterance.onerror = () => this.isSpeaking.set(false);

    this.synth.speak(utterance);
  }

  stopSpeech(): void {
    if (this.isBrowser && this.synth) {
      this.synth.cancel();
      this.isSpeaking.set(false);
    }
  }
}
