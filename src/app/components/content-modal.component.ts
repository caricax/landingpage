import { Component, inject, ElementRef, ViewChild, AfterViewInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentModalService, ContentModalType } from '../services/content-modal.service';
import { AccessibilityService } from '../services/accessibility.service';
import { LanguageService } from '../services/language.service';
import { BrandingGuidelinesComponent } from '../pages/branding-guidelines.component';
import { ServicosComponent } from '../pages/servicos.component';
import { LabutAiComponent } from '../pages/labut-ai.component';
import { RescisaoFacilComponent } from '../pages/rescisao-facil.component';

type LegalBodyTranslationKey =
  | 'legal.privacy.body'
  | 'legal.terms.body'
  | 'legal.cookies.body'
  | 'legal.lgpd.body'
  | 'legal.mit.body';

type ModalTitleTranslationKey =
  | 'menu.branding'
  | 'menu.services'
  | 'menu.dashboard'
  | 'menu.about'
  | 'menu.products'
  | 'menu.portfolio'
  | 'menu.blog'
  | 'menu.docs'
  | 'menu.support'
  | 'menu.contact'
  | 'legal.compliance.title'
  | 'legal.privacy.title'
  | 'legal.terms.title'
  | 'legal.cookies.title'
  | 'legal.lgpd.title'
  | 'legal.mit.title';

@Component({
  selector: 'app-content-modal',
  standalone: true,
  imports: [CommonModule, BrandingGuidelinesComponent, ServicosComponent, LabutAiComponent, RescisaoFacilComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'onEscapeKey()'
  },
  template: `
    @if (contentModalService.isOpen) {
      <!-- Modal Backdrop -->
      <div
        class="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        (click)="closeModal($event)"
      >
        <!-- Modal Content -->
        <div
          #modalContainer
          tabindex="-1"
          class="relative w-full max-w-6xl max-h-[90dvh] min-h-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden animate-scale-in mx-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between p-3 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 gap-2">
            <h2 class="text-fluid-base sm:text-fluid-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
              {{ getModalTitle() }}
            </h2>
            <button
              #closeButton
              (click)="contentModalService.closeModal()"
              class="touch-target p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors shrink-0"
              [attr.aria-label]="'Fechar modal'"
              autofocus
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="overflow-y-auto max-h-[calc(90dvh-80px)]">
            @switch (contentModalService.activeModal()) {
              @case ('branding-guidelines') {
                <div class="p-0">
                  <app-branding-guidelines [inModal]="true"></app-branding-guidelines>
                </div>
              }
              @case ('services') {
                <div class="p-0">
                  <app-servicos></app-servicos>
                </div>
              }
              @case ('labut-ai') {
                <div class="p-0">
                  <app-labut-ai></app-labut-ai>
                </div>
              }
              @case ('rescisao-facil') {
                <div class="p-0">
                  <app-rescisao-facil></app-rescisao-facil>
                </div>
              }
              @case ('legal-compliance') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-6 sm:space-y-8 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <section class="space-y-2 sm:space-y-3">
                      <h3 class="text-fluid-sm sm:text-fluid-base md:text-fluid-lg font-semibold text-caricax-green">{{ languageService.translate('legal.privacy.title') }}</h3>
                      <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.privacy.body') }}</p>
                    </section>
                    <section class="space-y-3">
                      <h3 class="text-base sm:text-lg font-semibold text-caricax-green">{{ languageService.translate('legal.terms.title') }}</h3>
                      <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.terms.body') }}</p>
                    </section>
                    <section class="space-y-3">
                      <h3 class="text-base sm:text-lg font-semibold text-caricax-green">{{ languageService.translate('legal.cookies.title') }}</h3>
                      <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.cookies.body') }}</p>
                    </section>
                    <section class="space-y-3">
                      <h3 class="text-base sm:text-lg font-semibold text-caricax-green">{{ languageService.translate('legal.lgpd.title') }}</h3>
                      <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.lgpd.body') }}</p>
                    </section>
                  </article>
                </div>
              }
              @case ('legal-privacy') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-3 sm:space-y-4 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.privacy.body') }}</p>
                  </article>
                </div>
              }
              @case ('legal-terms') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-3 sm:space-y-4 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.terms.body') }}</p>
                  </article>
                </div>
              }
              @case ('legal-cookies') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-3 sm:space-y-4 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.cookies.body') }}</p>
                  </article>
                </div>
              }
              @case ('legal-lgpd') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-3 sm:space-y-4 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.lgpd.body') }}</p>
                  </article>
                </div>
              }
              @case ('accessibility') {
                <div class="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 text-gray-700 dark:text-gray-300 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack leading-relaxed">
                  <p>{{ languageService.translate('accessibility.p1') }}</p>
                  
                  <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700/50">
                    <ul class="space-y-3 list-disc pl-5">
                      <li>{{ languageService.translate('accessibility.li1') }}</li>
                      <li>{{ languageService.translate('accessibility.li2') }}</li>
                      <li>{{ languageService.translate('accessibility.li3') }}</li>
                      <li>{{ languageService.translate('accessibility.li4') }}</li>
                    </ul>
                  </div>

                  <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-caricax-green/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 class="text-caricax-green font-bold text-lg mb-1">{{ languageService.translate('accessibility.title') }}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ languageService.translate('accessibility.desc') }}</p>
                    </div>
                    <button (click)="accessibilityService.toggleHighContrast()" 
                            class="px-6 py-3 rounded-lg border-2 font-bold transition-all duration-300 w-full sm:w-auto"
                            [ngClass]="accessibilityService.highContrast() ? 'border-caricax-orange text-caricax-orange hover:bg-caricax-orange/10' : 'border-caricax-green text-caricax-green hover:bg-caricax-green/10'">
                      {{ accessibilityService.highContrast() ? languageService.translate('accessibility.btn.deactivate') : languageService.translate('accessibility.btn.activate') }}
                    </button>
                  </div>
                </div>
              }
              @case ('legal-mit') {
                <div class="p-4 sm:p-6 md:p-8">
                  <article class="space-y-3 sm:space-y-4 text-fluid-xs sm:text-fluid-sm md:text-fluid-base font-hack text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    <p class="whitespace-pre-line text-justify">{{ getLegalBody('legal.mit.body') }}</p>
                    <p>
                      <a
                        [href]="languageService.translate('legal.mit.link.url')"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-caricax-green hover:text-caricax-orange underline underline-offset-4 transition-colors"
                      >
                        {{ languageService.translate('legal.mit.link.label') }}
                      </a>
                    </p>
                  </article>
                </div>
              }
              @case ('dashboard') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Dashboard</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('about') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.about') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('products') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.products') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('services') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.services') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('portfolio') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.portfolio') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('blog') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.blog') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('docs') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.docs') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('support') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.support') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('contact') {
                <div class="p-4 sm:p-6 md:p-8 text-center">
                  <div class="max-w-md mx-auto">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{{ languageService.translate('menu.contact') }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6 text-fluid-sm">
                      {{ languageService.translate('menu.coming_soon') }}
                    </p>
                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-fluid-xs sm:text-fluid-sm font-bold px-4 py-2 rounded-full">
                      {{ languageService.translate('menu.development') }}
                    </div>
                  </div>
                </div>
              }
              @case ('pix') {
                <div class="p-6 sm:p-8 md:p-10 text-center">
                  <div class="max-w-sm mx-auto space-y-6">
                    <div class="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg aria-hidden="true" class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-fluid-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">PIX</h3>
                      <p class="text-fluid-sm text-gray-500 dark:text-gray-400">Chave Aleatória — CNPJ</p>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-5 space-y-3">
                      <p class="text-fluid-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">Chave PIX</p>
                      <p id="pix-cnpj" class="text-fluid-lg sm:text-fluid-xl font-mono font-bold text-caricax-green select-all">54.222.825/0001-80</p>
                      <button
                        onclick="navigator.clipboard.writeText('54.222.825/0001-80').then(() => { const btn = this; const orig = btn.textContent; btn.textContent = 'Copiado!'; setTimeout(() => btn.textContent = orig, 2000); }).catch(() => {})"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-caricax-green/60 text-caricax-green hover:bg-caricax-green hover:text-white transition-colors text-fluid-sm font-semibold"
                      >
                        <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                        Copiar chave
                      </button>
                    </div>
                    <p class="text-fluid-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                      Escaneie o QR Code ou copie a chave acima para fazer um PIX. Sua contribuição mantém o projeto ativo e independente.
                    </p>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }

    .animate-scale-in {
      animation: scaleIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class ContentModalComponent implements AfterViewInit {
  readonly contentModalService = inject(ContentModalService);
  readonly accessibilityService = inject(AccessibilityService);
  readonly languageService = inject(LanguageService);

  @ViewChild('modalContainer', { static: false }) modalContainer?: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton?: ElementRef;

  // Constant-time lookup keeps title resolution simple and avoids branch-heavy switch chains.
  private readonly modalTitleByType: Partial<Record<Exclude<ContentModalType, null>, ModalTitleTranslationKey>> = {
    'branding-guidelines': 'menu.branding',
    'services': 'menu.services',
    'dashboard': 'menu.dashboard',
    'about': 'menu.about',
    'products': 'menu.products',
    'portfolio': 'menu.portfolio',
    'blog': 'menu.blog',
    'docs': 'menu.docs',
    'support': 'menu.support',
    'contact': 'menu.contact',
    'legal-compliance': 'legal.compliance.title',
    'legal-privacy': 'legal.privacy.title',
    'legal-terms': 'legal.terms.title',
    'legal-cookies': 'legal.cookies.title',
    'legal-lgpd': 'legal.lgpd.title',
    'legal-mit': 'legal.mit.title',
    'pix': 'menu.support'
  };

  onEscapeKey(): void {
    this.contentModalService.closeModal();
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.contentModalService.closeModal();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Tab' && this.modalContainer && this.contentModalService.isOpen) {
      this.trapTabFocus(event);
    }
  }

  private trapTabFocus(event: KeyboardEvent): void {
    const modalElement: HTMLElement = this.modalContainer!.nativeElement;
    const focusableElements: string = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent: NodeListOf<HTMLElement> = modalElement.querySelectorAll(focusableElements);

    if (focusableContent.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusable: HTMLElement = focusableContent[0];
    const lastFocusable: HTMLElement = focusableContent[focusableContent.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  ngAfterViewInit(): void {
    if (this.closeButton) {
      this.closeButton.nativeElement.focus();
    }
  }

  getModalTitle(): string {
    const modalType = this.contentModalService.activeModal();

    if (modalType === null) {
      return '';
    }

    if (modalType === 'labut-ai') {
      return 'labut.ai';
    }

    if (modalType === 'rescisao-facil') {
      return 'Rescisão Fácil';
    }

    if (modalType === 'accessibility') {
      return this.languageService.translate('accessibility.title');
    }

    const translationKey = this.modalTitleByType[modalType];
    if (!translationKey) {
      return '';
    }

    return this.languageService.translate(translationKey);
  }

  getLegalBody(key: LegalBodyTranslationKey): string {
    return this.languageService.translate(key);
  }
}
