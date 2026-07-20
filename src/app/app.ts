import { Component, inject, OnInit, HostListener, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { MenuComponent } from './components/menu.component';
import { LanguageSwitcherComponent } from './components/language-switcher.component';
import { TerminalFloatingComponent } from './components/terminal-floating.component';
import { LearnMoreFormComponent } from './components/learn-more-form.component';
import { ContentModalComponent } from './components/content-modal.component';
import { CommunitySupportComponent } from './components/community-support.component';
import { ThemeService } from './services/theme.service';
import { MenuService } from './services/menu.service';
import { LanguageService } from './services/language.service';
import { ContentModalService } from './services/content-modal.service';
import { AccessibilityService } from './services/accessibility.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MenuComponent,
    TerminalFloatingComponent,
    ContentModalComponent,
    LanguageSwitcherComponent,
    CommunitySupportComponent
  ],
  template: `
    <div [class]="themeService.isDark() ? 'dark' : ''" class="min-h-dvh bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-x-hidden" [style.background-color]="themeService.isDark() ? '#000000' : ''">
      <!-- Fixed Menu Button (Left Island) — responsive touch target -->
      <div class="fixed top-0 left-0 z-50 safe-area-top safe-area-left p-2 sm:p-3 md:p-4">
        <button
          (click)="menuService.toggle()"
          class="touch-target p-2 sm:p-3 transition-all duration-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 border shadow-md bg-gray-50 dark:bg-black animate-pulse-glow"
          style="color: #28aa6a; border-color: rgba(40, 170, 106, 0.3);"
          [attr.aria-label]="translationService.translate('menu.toggle')"
        >
           <svg aria-hidden="true" class="w-5 h-5 sm:w-6 sm:h-6 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Fixed Switchers — independent controls, flat layout -->
      <div class="fixed top-0 right-0 z-50 safe-area-top safe-area-right p-2 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-3">
        <div class="bg-gray-50 dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden">
          <app-language-switcher></app-language-switcher>
        </div>
        <button (click)="acc.toggleHighContrast()" 
                class="touch-target px-3 py-2 rounded-xl border shadow-md font-bold text-fluid-sm transition-colors duration-200 bg-gray-50 dark:bg-black"
                [ngClass]="acc.highContrast() ? 'border-caricax-orange text-caricax-orange' : 'border-gray-200 dark:border-gray-800 hover:bg-caricax-green/10 dark:hover:bg-caricax-green/20'"
                [attr.aria-label]="translationService.translate('accessibility.title')">
          {{ translationService.translate('accessibility.title') }}
        </button>
        <button (click)="themeService.toggleTheme()" class="touch-target p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black shadow-md hover:bg-caricax-green/10 dark:hover:bg-caricax-green/20 transition-colors duration-200" aria-label="Alternar tema">
          <span *ngIf="themeService.isDark(); else lightIcon">
            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </span>
          <ng-template #lightIcon>
            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </ng-template>
        </button>
      </div>

      @if (menuService.isOpen()) {
        <div class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" (click)="menuService.close()"></div>
      }

      <div class="fixed top-0 left-0 h-full z-45 transform transition-transform duration-300 ease-in-out"
           [ngClass]="{
             'translate-x-0': menuService.isOpen(),
             '-translate-x-full': !menuService.isOpen()
           }">
        <app-menu></app-menu>
      </div>

      <!-- Main Container — fluid max-width with dynamic padding -->
      <div class="min-h-dvh flex flex-col items-center justify-center responsive-pad pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 max-w-screen-2xl mx-auto">
        <!-- Logo CARICAX Manifesto -->
        <div class="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center animate-fade-in">
          <div class="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div class="relative logo-manifesto">
              <img 
                src="new-caricax-logo.png" 
                alt="CARICAX Logo" 
                class="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 object-contain animate-neon-logo"
                style="filter: drop-shadow(0 0 15px rgba(40, 170, 106, 0.6)); transition: opacity 0.3s ease;"
                loading="eager"
                onerror="this.src='new-caricax-logo.ico'; this.onerror=null;"
              />
            </div>
          </div>
          <h2 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl 4xl:text-6xl font-brand font-bold text-transparent bg-gradient-to-r from-caricax-orange via-caricax-green to-caricax-orange bg-clip-text animate-gradient-shift" style="background-size: 200% 100%;">
            {{ translationService.translate('brand.manifesto').replace('Caricax', 'CARICAX').replace('caricax', 'CARICAX') }}
          </h2>
          <div class="h-0.5 w-32 sm:w-40 md:w-48 lg:w-56 bg-gradient-to-r from-transparent via-caricax-green to-transparent mx-auto mt-2 md:mt-3 lg:mt-4 animate-glow-pulse"></div>
        </div>
        <div class="mb-6 sm:mb-8 md:mb-12 lg:mb-16 w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <app-terminal-floating></app-terminal-floating>
        </div>
        
        <div class="text-center animate-fade-in w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl" style="animation-delay: 1s;">
          <div class="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-8xl 4xl:text-9xl font-brand font-bold bg-gradient-to-r from-caricax-orange via-caricax-green to-caricax-orange bg-clip-text text-transparent drop-shadow-lg animate-gradient-shift" style="background-size: 200% 100%;">
              {{ translationService.translate('brand.name').replace('caricax', 'CARICAX').replace('Caricax', 'CARICAX') }}
            </h1>
            <div class="h-1 w-24 sm:w-32 md:w-40 lg:w-48 bg-gradient-to-r from-caricax-orange to-caricax-green mx-auto mt-2 md:mt-4 lg:mt-5 rounded-full shadow-lg animate-glow-pulse"></div>
          </div>
          <div class="space-y-2 md:space-y-3 lg:space-y-4 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto responsive-pad">
            <p class="text-fluid-lg sm:text-fluid-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-hack font-medium">
              {{ translationService.translate('brand.subtitle') }}
            </p>
            <p class="text-fluid-base sm:text-fluid-lg md:text-xl lg:text-2xl text-caricax-green dark:text-caricax-green font-hack font-semibold">
              {{ translationService.translate('brand.slogan') }}
            </p>
            <p class="text-fluid-sm sm:text-fluid-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-hack leading-relaxed animate-fade-in" style="animation-delay: 1.6s;">
              {{ translationService.translate('brand.description') }}
            </p>
          </div>

          <!-- CTAs — full width on mobile, inline on wider -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 justify-center items-center animate-fade-in relative z-20 px-4 sm:px-0" style="animation-delay: 1.8s;">
            <button class="cta-button cta-primary" (click)="onLearnMore()">
              <svg aria-hidden="true" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ translationService.translate('cta.learn_more') }}
            </button>
            <button class="cta-button cta-secondary" (click)="onSupport()">
              <svg aria-hidden="true" class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              {{ translationService.translate('cta.support') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Profissional — responsive stack on mobile -->
      <footer class="mt-12 sm:mt-16 md:mt-24 border-t border-gray-200 dark:border-gray-800/60 pt-8 md:pt-12 pb-8 md:pb-12 w-full mx-auto transition-colors duration-300 relative z-20">
        <!-- Domain migration notice -->
        <div class="responsive-pad mb-6 pb-4 border-b border-gray-200 dark:border-gray-800/40 text-fluid-xs text-gray-400 dark:text-gray-500 text-center">
          {{ translationService.translate('footer.domain_migration') }}
        </div>
        <div class="responsive-pad grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 animate-fade-in max-w-5xl xl:max-w-6xl mx-auto items-start" style="animation-delay: 2s;">
          <!-- Logo & Rights -->
          <div class="flex flex-col gap-4 min-w-0 text-left sm:col-span-2 lg:col-span-1">
            <div class="flex items-center gap-3">
              <img src="new-caricax-logo.png" alt="CARICAX Logo" class="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" style="filter: drop-shadow(0 0 5px rgba(40, 170, 106, 0.4));" onerror="this.src='new-caricax-logo.ico'; this.onerror=null;">
              <span class="text-fluid-xl md:text-2xl font-brand font-bold text-transparent bg-gradient-to-r from-caricax-orange to-caricax-green bg-clip-text leading-none tracking-wide">CARICAX</span>
            </div>
            <p class="text-fluid-xs sm:text-fluid-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              2024-{{ currentYear }} {{ translationService.translate('footer.company') }}. {{ translationService.translate('footer.location') }}.
            </p>
            <div class="text-fluid-xs sm:text-fluid-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {{ translationService.translate('footer.license') }}
              <button (click)="contentModalService.openModal('legal-mit')" class="text-caricax-green hover:text-caricax-orange underline font-semibold transition-colors duration-200">
                {{ translationService.translate('footer.license.mit') }}
              </button>.
            </div>
          </div>
          
          <!-- Legal Links -->
          <div class="flex flex-col gap-3 min-w-0 text-left">
            <h3 class="text-fluid-xs sm:text-fluid-sm font-brand font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">{{ translationService.translate('footer.link.compliance') }}</h3>
            <ul class="space-y-2 text-fluid-xs sm:text-fluid-sm text-gray-500 dark:text-gray-400">
              <li><button (click)="contentModalService.openModal('legal-privacy')" class="block text-left leading-relaxed hover:text-caricax-green transition-colors">{{ translationService.translate('footer.link.privacy') }}</button></li>
              <li><button (click)="contentModalService.openModal('legal-terms')" class="block text-left leading-relaxed hover:text-caricax-green transition-colors">{{ translationService.translate('footer.link.terms') }}</button></li>
              <li><button (click)="contentModalService.openModal('legal-cookies')" class="block text-left leading-relaxed hover:text-caricax-green transition-colors">{{ translationService.translate('footer.link.cookies') }}</button></li>
              <li><button (click)="contentModalService.openModal('legal-lgpd')" class="block text-left leading-relaxed hover:text-caricax-green transition-colors">{{ translationService.translate('footer.link.lgpd') }}</button></li>
              <li><button (click)="contentModalService.openModal('accessibility')" class="block text-left leading-relaxed hover:text-caricax-green transition-colors">{{ translationService.translate('footer.link.accessibility') }}</button></li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div class="flex flex-col gap-3 min-w-0 text-left">
            <h3 class="text-fluid-xs sm:text-fluid-sm font-brand font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">{{ translationService.translate('menu.contact') }}</h3>
            <div class="text-fluid-xs sm:text-fluid-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              <p class="mb-1.5">{{ translationService.translate('footer.contact.prefix') }}</p>
              <a href="https://linkedin.com/company/caricax" target="_blank" rel="noopener noreferrer" class="inline-flex text-caricax-green hover:text-caricax-orange transition-colors duration-200 font-medium">
                {{ translationService.translate('contact.linkedin.label') }}
              </a>
            </div>
            <app-community-support></app-community-support>
          </div>
        </div>
      </footer>

      <!-- Content Modal -->
      <app-content-modal></app-content-modal>
    </div>

  `,
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly title = 'caricax-landing';
  readonly currentYear = new Date().getFullYear();

  readonly themeService = inject(ThemeService);
  readonly menuService = inject(MenuService);
  readonly translationService = inject(LanguageService);
  readonly contentModalService = inject(ContentModalService);
  readonly acc = inject(AccessibilityService);

  private readonly dialog = inject(MatDialog);

  constructor() {
    // Use Angular 20's effect for reactive theme changes
    effect(() => {
      this.applyBodyClasses();
    });
  }

  ngOnInit(): void {
    // Initialize body scroll behavior for SPA - allow scrolling for responsiveness
    document.body.style.overflow = 'auto';
    document.body.style.scrollBehavior = 'smooth';

    // Ensure proper viewport behavior on mobile
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(viewport);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.menuService.close();
  }

  onLearnMore(): void {
    this.dialog.open(LearnMoreFormComponent, {
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'learn-more-dialog',
      disableClose: false,
      autoFocus: true
    });
  }

  onSupport(): void {
    const lang = this.translationService.currentLanguage().code;
    if (lang === 'pt') {
      this.contentModalService.openModal('pix');
      return;
    }
    document.getElementById('community-support')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }


  /**
   * Aplica as classes e estilos globais no body do documento
   * correspondentes ao tema escolhido.
   * Utiliza classList.toggle e early returns no lugar de blocos if/else
   * preservando os princípios de Clean Code.
   */
  private applyBodyClasses(): void {
    const isDark: boolean = this.themeService.isDark();

    // Atualiza classes do body e documentElement de forma declarativa
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
    document.documentElement.classList.toggle('dark', isDark);

    // Retorno antecipado para modo claro
    if (!isDark) {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      return;
    }

    // Aplicação de estilos para modo escuro
    document.body.style.backgroundColor = '#000000';
    document.documentElement.style.backgroundColor = '#000000';
  }
}
