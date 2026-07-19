import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-300/30 dark:border-gray-600/30 shadow-sm">
      <button 
        (click)="toggleLanguage($event)"
        class="language-toggle-btn"
        [attr.aria-label]="getCurrentLanguageLabel()"
        type="button"
      >
        <span class="flag">{{ getCurrentFlag() }}</span>
        <span class="lang-code">{{ getCurrentLanguageCode() }}</span>
      </button>
    </div>
  `,
  styles: [`
    .language-toggle-btn {
      @apply flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200;
      @apply hover:bg-gray-100 dark:hover:bg-gray-700;
      @apply focus:outline-none focus:ring-2 focus:ring-caricax-green/50;
      @apply cursor-pointer select-none;
      border: none;
      background: transparent;
      min-width: 60px;
      min-height: 44px;
    }
    
    .language-toggle-btn:hover {
      transform: scale(1.05);
      background: rgba(40, 170, 106, 0.1);
    }
    
    .language-toggle-btn:active {
      transform: scale(0.98);
    }
    
    .flag {
      @apply text-lg leading-none;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    }
    
    .lang-code {
      @apply text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide;
    }
    
    .language-toggle-btn:hover .lang-code {
      @apply text-caricax-green;
    }
  `]
})
export class LanguageSwitcherComponent {
  readonly languageService = inject(LanguageService);
  
  // Toggle entre idiomas com um único clique (PT -> EN -> ES -> PT)
  toggleLanguage(event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    
    const currentLang = this.languageService.currentLanguage().code;
    if (currentLang === 'pt') {
      this.languageService.setLanguage('en');
    } else if (currentLang === 'en') {
      this.languageService.setLanguage('es');
    } else {
      this.languageService.setLanguage('pt');
    }
  }
  
  // Métodos para o template do botão único
  getCurrentFlag(): string {
    const code = this.languageService.currentLanguage().code;
    if (code === 'pt') return '🇧🇷';
    if (code === 'en') return '🇬🇧';
    return '🇦🇷';
  }
  
  getCurrentLanguageCode(): string {
    const code = this.languageService.currentLanguage().code;
    return code.toUpperCase();
  }
  
  getCurrentLanguageLabel(): string {
    const code = this.languageService.currentLanguage().code;
    if (code === 'pt') return 'Português (Clique para English)';
    if (code === 'en') return 'English (Click for Español)';
    return 'Español (Clic para Português)';
  }
  
  
  isPortuguese(): boolean {
    return this.languageService.currentLanguage().code === 'pt';
  }
  
  isEnglish(): boolean {
    return this.languageService.currentLanguage().code === 'en';
  }
  
  isSpanish(): boolean {
    return this.languageService.currentLanguage().code === 'es';
  }
}
