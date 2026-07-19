import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { MenuService } from '../services/menu.service';
import { ContentModalService, OpenContentModalType } from '../services/content-modal.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Menu Sidebar Responsivo com Detalhes Neon -->
    <div class="h-full w-72 sm:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r shadow-2xl animate-slide-in"
         style="border-color: rgba(40, 170, 106, 0.2);">
      <!-- Menu Header -->
      <div class="p-3 sm:p-4 md:p-6 border-b animate-fade-in"
           style="border-color: rgba(40, 170, 106, 0.2);">
        <div class="text-center animate-bounce-subtle">
          <h2 class="text-fluid-base sm:text-fluid-lg md:text-xl font-bold text-black dark:text-white mb-1 font-brand">{{ translationService.translate('menu.title') }}</h2>
        </div>
      </div>

      <!-- Menu Content -->
      <div class="p-3 sm:p-4 md:p-6 flex-1 overflow-y-auto">
        <!-- Navigation Links with Modals -->
        <nav>
          <ul class="space-y-2 sm:space-y-3 md:space-y-4 text-fluid-sm sm:text-fluid-base">
            <!-- Branding Guidelines Button - Active -->
            <li class="animate-fade-in" style="animation-delay: 0.05s;">
              <button
                (click)="openContentModal('branding-guidelines')"
                class="w-full flex items-center gap-3 p-3 min-h-[44px] rounded-lg hover:bg-caricax-green/10 dark:hover:bg-caricax-green/20 transition-colors group cursor-pointer">
                <div class="w-10 h-10 min-w-[40px] bg-gradient-to-r from-caricax-orange to-caricax-green rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485A2 2 0 017 19.172V16.5a2 2 0 00-2-2z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <div class="font-semibold text-gray-900 dark:text-white group-hover:text-caricax-green transition-colors text-fluid-sm sm:text-fluid-base">
                    {{ translationService.translate('menu.branding') }}
                  </div>
                  <div class="text-fluid-xs text-gray-600 dark:text-gray-400">
                    {{ translationService.translate('menu.branding.desc') }}
                  </div>
                </div>
              </button>
            </li>

            <!-- Services Button - Active -->
            <li class="animate-fade-in" style="animation-delay: 0.1s;">
              <button
                (click)="openContentModal('services')"
                class="w-full flex items-center gap-3 p-3 min-h-[44px] rounded-lg hover:bg-caricax-orange/10 dark:hover:bg-caricax-orange/20 transition-colors group cursor-pointer">
                <div class="w-10 h-10 min-w-[40px] bg-gradient-to-r from-caricax-orange to-caricax-green rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div class="text-left">
                  <div class="font-semibold text-gray-900 dark:text-white group-hover:text-caricax-orange transition-colors text-fluid-sm sm:text-fluid-base">
                    {{ translationService.translate('menu.services') }}
                  </div>
                  <div class="text-fluid-xs text-gray-600 dark:text-gray-400">
                    {{ translationService.translate('menu.services.desc') }}
                  </div>
                </div>
              </button>
            </li>

            <!-- Produtos Button - Active with Submenu -->
            <li class="animate-fade-in" style="animation-delay: 0.175s;">
              <div class="w-full">
                <!-- Main Products Button -->
                <button
                  (click)="toggleProductsSubmenu()"
                  class="w-full flex items-center gap-3 p-3 min-h-[44px] rounded-lg hover:bg-caricax-green/10 dark:hover:bg-caricax-green/20 transition-colors group cursor-pointer">
                  <div class="w-10 h-10 min-w-[40px] bg-gradient-to-r from-caricax-green to-caricax-neon rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <!-- Heroicons open-source MIT -->
                    <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <div class="text-left flex-1">
                    <div class="font-semibold text-gray-900 dark:text-white group-hover:text-caricax-green transition-colors">
                      {{ translationService.translate('menu.produtos') }}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {{ translationService.translate('menu.produtos.desc') }}
                    </div>
                  </div>
                  <div class="transition-transform duration-200" [class.rotate-180]="isProductsSubmenuOpen()">
                    <svg aria-hidden="true" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </button>

                <!-- Products Submenu -->
                <div class="overflow-hidden transition-all duration-300 ease-in-out"
                     [style.max-height]="isProductsSubmenuOpen() ? '300px' : '0'">
                  <div class="ml-6 mt-2 space-y-2">
                    <!-- Labut.ai Button -->
                    <button
                      (click)="openContentModal('labut-ai')"
                      class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-caricax-orange/10 hover:to-caricax-green/10 transition-all group cursor-pointer border border-transparent hover:border-caricax-orange/20">
                      <div class="w-8 h-8 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <!-- Heroicons open-source MIT -->
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                      <div class="text-left">
                        <div class="font-medium text-gray-900 dark:text-white group-hover:text-caricax-orange transition-colors text-sm">
                          labut.ai
                        </div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">
                          {{ translationService.translate('menu.labut.desc') }}
                        </div>
                      </div>
                    </button>
                    
                    <!-- Rescisão Fácil Button -->
                    <a
                      href="https://calculadorarescisao.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      (click)="menuService.close()"
                      class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-caricax-green/10 hover:to-caricax-lime/10 transition-all group cursor-pointer border border-transparent hover:border-caricax-green/20 no-underline">
                      <div class="w-8 h-8 bg-gradient-to-r from-caricax-green to-caricax-lime rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <!-- Heroicons open-source MIT -->
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div class="text-left">
                        <div class="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors text-sm">
                          Rescisão Fácil
                        </div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">
                          @if (translationService.currentLanguage().code === 'pt') {
                            Simulador CLT Open-source
                          } @else if (translationService.currentLanguage().code === 'es') {
                            <span class="text-caricax-orange font-bold font-hack">¿Qué mirás, bobo? Andá p'allá!</span>
                          } @else {
                            <span class="text-caricax-orange font-bold font-hack">BRAZILIAN ONLY HUEHUHEUE BR</span>
                          }
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <!-- Portfolio Button - Coming Soon -->
            <li class="animate-fade-in" style="animation-delay: 0.2s;">
              <div class="relative group cursor-not-allowed">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-sm rounded-md z-10"></div>
                <div class="filter blur-[1px] select-none pointer-events-none">
                  <div class="w-full flex items-center gap-3 p-3 rounded-lg opacity-60">
                    <div class="w-10 h-10 bg-gradient-to-r from-caricax-green to-caricax-orange rounded-lg flex items-center justify-center">
                      <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="font-semibold text-gray-900 dark:text-white">{{ translationService.translate('menu.portfolio') }}</div>
                      <div class="text-xs text-gray-600 dark:text-gray-400">{{ translationService.translate('menu.development') }}</div>
                    </div>
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center z-20">
                  <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">{{ translationService.translate('menu.coming_soon_badge') }}</span>
                </div>
              </div>
            </li>

            <!-- Blog Button - Coming Soon -->
            <li class="animate-fade-in" style="animation-delay: 0.25s;">
              <div class="relative group cursor-not-allowed">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-sm rounded-md z-10"></div>
                <div class="filter blur-[1px] select-none pointer-events-none">
                  <div class="w-full flex items-center gap-3 p-3 rounded-lg opacity-60">
                    <div class="w-10 h-10 bg-gradient-to-r from-caricax-neon to-caricax-orange rounded-lg flex items-center justify-center">
                      <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="font-semibold text-gray-900 dark:text-white">{{ translationService.translate('menu.blog') }}</div>
                      <div class="text-xs text-gray-600 dark:text-gray-400">{{ translationService.translate('menu.development') }}</div>
                    </div>
                  </div>
                </div>
                <div class="absolute inset-0 flex items-center justify-center z-20">
                  <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">{{ translationService.translate('menu.coming_soon_badge') }}</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Menu Footer -->
      <div class="p-3 sm:p-4 md:p-6 bg-gradient-to-t from-gray-100/90 to-transparent dark:from-gray-800/90 backdrop-blur-md border-t"
           style="border-color: rgba(40, 170, 106, 0.2);">

        <!-- Social Links -->
        <div class="mb-3 sm:mb-4">
          <h3 class="text-fluid-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 text-center">{{ translationService.translate('social.connect') }}</h3>
          <div class="flex justify-center gap-3 sm:gap-4">
            <!-- GitHub -->
            <a
              href="https://github.com/caricax"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              [attr.aria-label]="translationService.translate('social.github')"
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://linkedin.com/company/caricax"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              [attr.aria-label]="translationService.translate('social.linkedin')"
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <!-- Instagram -->
            <a
              href="https://www.instagram.com/caricax.software/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              [attr.aria-label]="translationService.translate('social.instagram')"
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="text-center animate-bounce-subtle">
          <p class="text-fluid-xs sm:text-fluid-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
            {{ translationService.translate('menu.development') }}
          </p>
          <p class="text-fluid-xs text-gray-500 dark:text-gray-500">
            {{ translationService.translate('menu.coming_soon') }}
          </p>
          <div class="mt-2 sm:mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div class="h-1 rounded-full w-3/4 animate-neon-progress"
                 style="background: linear-gradient(90deg, #28aa6a, #25ac6c); background-size: 200% 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Animação neon pulse para detalhes */
    @keyframes neon-pulse {
      0%, 100% {
        box-shadow: 0 0 10px rgba(40, 170, 106, 0.5);
      }
      50% {
        box-shadow: 0 0 20px rgba(37, 172, 108, 0.8);
      }
    }

    .animate-neon-pulse {
      animation: neon-pulse 2s ease-in-out infinite;
    }

    /* Progress bar neon */
    @keyframes neon-progress {
      0%, 100% {
        background-position: 0% 50%;
        filter: drop-shadow(0 0 5px #28aa6a);
      }
      50% {
        background-position: 100% 50%;
        filter: drop-shadow(0 0 8px #25ac6c);
      }
    }

    .animate-neon-progress {
      animation: neon-progress 3s ease-in-out infinite;
    }

    /* Social Icons */
    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      color: #6b7280;
      background: rgba(40, 170, 106, 0.1);
      border: 1px solid rgba(40, 170, 106, 0.2);
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      color: #28aa6a;
      background: rgba(40, 170, 106, 0.2);
      border-color: rgba(40, 170, 106, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(40, 170, 106, 0.3);
    }

    :host-context(.dark) .social-icon {
      color: #9ca3af;
      background: rgba(40, 170, 106, 0.15);
    }

    :host-context(.dark) .social-icon:hover {
      color: #25ac6c;
    }
  `]
})
export class MenuComponent {
  readonly translationService = inject(LanguageService);
  readonly menuService = inject(MenuService);
  readonly contentModalService = inject(ContentModalService);

  private readonly _productsSubmenuOpen = signal(false);
  readonly isProductsSubmenuOpen = this._productsSubmenuOpen.asReadonly();

  toggleProductsSubmenu(): void {
    this._productsSubmenuOpen.set(!this._productsSubmenuOpen());
  }

  openContentModal(modalType: OpenContentModalType): void {
    this.contentModalService.openModal(modalType);
    this.menuService.close();
  }
}
