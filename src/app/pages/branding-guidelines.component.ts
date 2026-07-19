import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { RouterModule, Router } from '@angular/router';
import { MarkdownPipe } from '../pipes/markdown.pipe';

@Component({
  selector: 'app-branding-guidelines',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <!-- Back nav -->
      @if (!inModal) {
        <div class="sticky top-0 z-50 bg-gray-50/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <button (click)="goBack()" class="flex items-center gap-2 text-caricax-green hover:text-caricax-orange transition-colors font-hack text-sm">
              <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
              {{ languageService.translate('branding.back') }}
            </button>
            <span class="text-xs font-hack text-gray-400">CARICAX Brand Guidelines v1.0</span>
          </div>
        </div>
      }

      <!-- Hero Header -->
      <header class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-caricax-green/5 via-transparent to-transparent"></div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative">
          <div class="flex justify-center mb-8">
            <div class="relative">
              <div class="absolute inset-0 bg-caricax-green/20 blur-2xl rounded-full"></div>
              <img src="new-caricax-logo.png" alt="CARICAX Brand Guidelines" class="w-20 h-20 sm:w-24 sm:h-24 object-contain relative" />
            </div>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-caricax-orange via-caricax-green to-caricax-orange bg-clip-text text-transparent mb-4 font-brand leading-tight">
            {{ languageService.translate('branding.title') }}
          </h1>
          <div class="h-0.5 w-32 bg-gradient-to-r from-caricax-orange to-caricax-green mx-auto rounded-full mb-6"></div>
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {{ languageService.translate('branding.subtitle') }}
          </p>
          <div class="mt-10 inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl px-5 py-3 text-left max-w-2xl">
            <svg aria-hidden="true" class="w-5 h-5 shrink-0 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            <span class="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">{{ languageService.translate('branding.legal.content') }}</span>
          </div>
        </div>
      </header>

      <!-- Layout: sidebar nav + content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div class="flex gap-10 relative">
          <!-- Sidebar Navigation (Desktop) -->
          <nav class="hidden lg:block w-56 shrink-0">
            <div class="sticky top-20 space-y-1">
              <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-hack">Sections</div>
              <a href="#logo" class="block text-sm font-hack text-gray-500 dark:text-gray-400 hover:text-caricax-green transition-colors py-1.5 border-l-2 border-transparent hover:border-caricax-green pl-3">Logo & Symbol</a>
              <a href="#colors" class="block text-sm font-hack text-gray-500 dark:text-gray-400 hover:text-caricax-green transition-colors py-1.5 border-l-2 border-transparent hover:border-caricax-green pl-3">Color Palette</a>
              <a href="#typography" class="block text-sm font-hack text-gray-500 dark:text-gray-400 hover:text-caricax-green transition-colors py-1.5 border-l-2 border-transparent hover:border-caricax-green pl-3">Typography</a>
              <a href="#usage" class="block text-sm font-hack text-gray-500 dark:text-gray-400 hover:text-caricax-green transition-colors py-1.5 border-l-2 border-transparent hover:border-caricax-green pl-3">Usage Guidelines</a>
            </div>
          </nav>

          <!-- Content -->
          <div class="flex-1 min-w-0 space-y-20">

            <!-- Section 1: Logo -->
            <section id="logo">
              <div class="flex items-center gap-4 mb-8">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-caricax-green text-white text-xs font-bold font-hack">1</span>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-brand">{{ languageService.translate('branding.logo.title') }}</h2>
                  <span class="text-xs font-hack text-caricax-green font-semibold tracking-wide uppercase">Brand Identity</span>
                </div>
              </div>
              <div class="grid lg:grid-cols-5 gap-6">
                <div class="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="p-6 sm:p-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">{{ languageService.translate('branding.logo.primary') }}</h3>
                    <div class="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8 sm:p-12 mb-6">
                      <img src="new-caricax-logo.png" alt="CARICAX Primary Logo" class="w-24 h-24 sm:w-28 sm:h-28 object-contain" />
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{{ languageService.translate('branding.logo.primary.desc') }}</p>
                  </div>
                </div>
                <div class="lg:col-span-2 space-y-6">
                  <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 font-brand">{{ languageService.translate('branding.logo.specs.title') }}</h4>
                    <dl class="space-y-3 text-sm font-hack">
                      <div class="flex justify-between"><dt class="text-gray-500">{{ languageService.translate('branding.logo.specs.format') }}</dt><dd class="text-gray-900 dark:text-gray-100 font-medium">SVG, PNG, JPG</dd></div>
                      <div class="flex justify-between"><dt class="text-gray-500">{{ languageService.translate('branding.logo.specs.minsize') }}</dt><dd class="text-gray-900 dark:text-gray-100 font-medium">24px &times; 24px</dd></div>
                      <div class="flex justify-between"><dt class="text-gray-500">{{ languageService.translate('branding.logo.specs.clearspace') }}</dt><dd class="text-gray-900 dark:text-gray-100 font-medium">X/2 around logo</dd></div>
                      <div class="flex justify-between"><dt class="text-gray-500">{{ languageService.translate('branding.logo.specs.background') }}</dt><dd class="text-gray-900 dark:text-gray-100 font-medium">Light &amp; Dark</dd></div>
                    </dl>
                  </div>
                  <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
                    <h4 class="text-sm font-semibold text-red-800 dark:text-red-200 mb-3 font-brand">{{ languageService.translate('branding.logo.donts.title') }}</h4>
                    <ul class="space-y-2 text-xs sm:text-sm font-hack text-red-700 dark:text-red-300">
                      <li class="flex items-start gap-2"><span class="text-red-400 mt-0.5">&times;</span>{{ languageService.translate('branding.logo.donts.distort') }}</li>
                      <li class="flex items-start gap-2"><span class="text-red-400 mt-0.5">&times;</span>{{ languageService.translate('branding.logo.donts.rotate') }}</li>
                      <li class="flex items-start gap-2"><span class="text-red-400 mt-0.5">&times;</span>{{ languageService.translate('branding.logo.donts.recolor') }}</li>
                      <li class="flex items-start gap-2"><span class="text-red-400 mt-0.5">&times;</span>{{ languageService.translate('branding.logo.donts.shadow') }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div class="border-t border-gray-200 dark:border-gray-800"></div>

            <!-- Section 2: Color Palette -->
            <section id="colors">
              <div class="flex items-center gap-4 mb-8">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-caricax-orange text-white text-xs font-bold font-hack">2</span>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-brand">{{ languageService.translate('branding.colors.title') }}</h2>
                  <span class="text-xs font-hack text-caricax-orange font-semibold tracking-wide uppercase">Color System</span>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <!-- Green -->
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="h-28 bg-caricax-green relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">CARICAX Green</h3>
                    <p class="text-xs text-gray-500 mb-3 font-hack">Primary Color</p>
                    <div class="font-hack text-xs space-y-0.5 text-gray-600 dark:text-gray-400">
                      <div><span class="text-gray-400">HEX</span> #28aa6a</div>
                      <div><span class="text-gray-400">RGB</span> 40, 170, 106</div>
                      <div><span class="text-gray-400">HSL</span> 143&deg;, 62%, 41%</div>
                    </div>
                  </div>
                </div>
                <!-- Orange -->
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="h-28 bg-caricax-orange relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">CARICAX Orange</h3>
                    <p class="text-xs text-gray-500 mb-3 font-hack">Accent Color</p>
                    <div class="font-hack text-xs space-y-0.5 text-gray-600 dark:text-gray-400">
                      <div><span class="text-gray-400">HEX</span> #fe6d03</div>
                      <div><span class="text-gray-400">RGB</span> 254, 109, 3</div>
                      <div><span class="text-gray-400">HSL</span> 25&deg;, 99%, 50%</div>
                    </div>
                  </div>
                </div>
                <!-- Neon -->
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="h-28 bg-caricax-neon relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">CARICAX Neon</h3>
                    <p class="text-xs text-gray-500 mb-3 font-hack">Supporting Color</p>
                    <div class="font-hack text-xs space-y-0.5 text-gray-600 dark:text-gray-400">
                      <div><span class="text-gray-400">HEX</span> #25ac6c</div>
                      <div><span class="text-gray-400">RGB</span> 37, 172, 108</div>
                      <div><span class="text-gray-400">HSL</span> 143&deg;, 65%, 41%</div>
                    </div>
                  </div>
                </div>
                <!-- Lime -->
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="h-28 bg-caricax-lime relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">CARICAX Lime</h3>
                    <p class="text-xs text-gray-500 mb-3 font-hack">Highlight Color</p>
                    <div class="font-hack text-xs space-y-0.5 text-gray-600 dark:text-gray-400">
                      <div><span class="text-gray-400">HEX</span> #08c408</div>
                      <div><span class="text-gray-400">RGB</span> 8, 196, 8</div>
                      <div><span class="text-gray-400">HSL</span> 120&deg;, 92%, 40%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 font-brand">{{ languageService.translate('branding.colors.usage.title') }}</h3>
                <div class="grid sm:grid-cols-2 gap-6 text-sm">
                  <div class="flex items-start gap-3">
                    <span class="w-3 h-3 rounded-full bg-caricax-green shrink-0 mt-1"></span>
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">{{ languageService.translate('branding.colors.usage.primary') }}</h4>
                      <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-hack">{{ languageService.translate('branding.colors.usage.primary.desc') }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <span class="w-3 h-3 rounded-full bg-caricax-orange shrink-0 mt-1"></span>
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">{{ languageService.translate('branding.colors.usage.accent') }}</h4>
                      <p class="text-gray-600 dark:text-gray-400 leading-relaxed font-hack">{{ languageService.translate('branding.colors.usage.accent.desc') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div class="border-t border-gray-200 dark:border-gray-800"></div>

            <!-- Section 3: Typography -->
            <section id="typography">
              <div class="flex items-center gap-4 mb-8">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-caricax-green text-white text-xs font-bold font-hack">3</span>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-brand">{{ languageService.translate('branding.typography.title') }}</h2>
                  <span class="text-xs font-hack text-caricax-green font-semibold tracking-wide uppercase">Type System</span>
                </div>
              </div>

              <!-- Font Family Matrix -->
              <div class="grid sm:grid-cols-2 gap-6 mb-8">
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="p-6 sm:p-8">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-xs font-hack text-caricax-green font-semibold uppercase tracking-wider">Primary &middot; Display</span>
                      <span class="text-xs font-hack text-gray-400">font-brand</span>
                    </div>
                    <h3 class="text-2xl font-bold font-brand text-gray-900 dark:text-gray-100">{{ languageService.translate('branding.typography.primary') }}</h3>
                    <p class="text-sm text-gray-500 mb-4 font-brand">{{ languageService.translate('branding.typography.primary.desc') }}</p>
                    <div class="font-hack text-xs text-gray-600 dark:text-gray-400 space-y-1 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <div><span class="text-gray-400">Weights:</span> Regular 400, Bold 700</div>
                      <div><span class="text-gray-400">Styles:</span> Normal, Italic</div>
                      <div><span class="text-gray-400">Pairing:</span> Use with <code class="text-caricax-orange">font-hack</code> for body</div>
                      <div class="mt-3">
                        <span class="text-gray-400">CSS:</span>
                        <code class="text-caricax-green font-bold">font-family: 'Noto Serif', serif;</code>
                      </div>
                    </div>
                    <div class="mt-6 space-y-2 font-brand">
                      <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">Aa Bb Cc</div>
                      <div class="text-xl bg-gradient-to-r from-caricax-orange to-caricax-green bg-clip-text text-transparent font-bold">CARICAX &mdash; Brand Voice</div>
                    </div>
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div class="p-6 sm:p-8">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-xs font-hack text-caricax-orange font-semibold uppercase tracking-wider">Secondary &middot; UI</span>
                      <span class="text-xs font-hack text-gray-400">font-hack</span>
                    </div>
                    <h3 class="text-2xl font-bold font-hack text-gray-900 dark:text-gray-100">{{ languageService.translate('branding.typography.secondary') }}</h3>
                    <p class="text-sm text-gray-500 mb-4 font-hack">{{ languageService.translate('branding.typography.secondary.desc') }}</p>
                    <div class="font-hack text-xs text-gray-600 dark:text-gray-400 space-y-1 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <div><span class="text-gray-400">Weights:</span> Regular 400, Medium 500, Bold 700</div>
                      <div><span class="text-gray-400">Styles:</span> Normal, Italic</div>
                      <div><span class="text-gray-400">Pairing:</span> Use with <code class="text-caricax-green">font-brand</code> for headlines</div>
                      <div class="mt-3">
                        <span class="text-gray-400">CSS:</span>
                        <code class="text-caricax-orange font-bold">font-family: 'Hack', monospace;</code>
                      </div>
                    </div>
                    <div class="mt-6 space-y-2 font-hack">
                      <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">Aa Bb Cc</div>
                      <div class="text-lg text-caricax-green font-bold">caricax&#64;caricax:~$ _</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Type Scale Table -->
              <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
                <div class="px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 font-brand">Type Scale</h3>
                  <p class="text-xs text-gray-500 font-hack">Fluid responsive sizing scale &mdash; automatically adjusts across viewports</p>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left font-hack">
                    <thead>
                      <tr class="border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 uppercase tracking-wider">
                        <th class="px-6 sm:px-8 py-4 font-medium">Token</th>
                        <th class="px-4 py-4 font-medium">Base Size</th>
                        <th class="px-4 py-4 font-medium">Fluid Range</th>
                        <th class="px-6 sm:px-8 py-4 font-medium">Usage</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      <tr class="border-t border-gray-100 dark:border-gray-800">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-green">text-fluid-xs</code></td>
                        <td class="px-4 py-4 text-gray-500">0.75rem / 12px</td>
                        <td class="px-4 py-4 text-gray-500">0.75&ndash;0.875rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">Captions, legal, footer, labels</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-green">text-fluid-sm</code></td>
                        <td class="px-4 py-4 text-gray-500">0.875rem / 14px</td>
                        <td class="px-4 py-4 text-gray-500">0.875&ndash;1rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">Body small, UI labels, nav</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-green">text-fluid-base</code></td>
                        <td class="px-4 py-4 text-gray-500">1rem / 16px</td>
                        <td class="px-4 py-4 text-gray-500">1&ndash;1.125rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">Body text, paragraphs</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-green">text-fluid-lg</code></td>
                        <td class="px-4 py-4 text-gray-500">1.125rem / 18px</td>
                        <td class="px-4 py-4 text-gray-500">1.125&ndash;1.25rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">Large body, intro text</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-orange">text-fluid-xl</code></td>
                        <td class="px-4 py-4 text-gray-500">1.25rem / 20px</td>
                        <td class="px-4 py-4 text-gray-500">1.25&ndash;1.5rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">H4, subtitles</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-orange">text-fluid-2xl</code></td>
                        <td class="px-4 py-4 text-gray-500">1.5rem / 24px</td>
                        <td class="px-4 py-4 text-gray-500">1.5&ndash;1.875rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">H3, section headings</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-orange">text-fluid-3xl</code></td>
                        <td class="px-4 py-4 text-gray-500">1.875rem / 30px</td>
                        <td class="px-4 py-4 text-gray-500">1.875&ndash;2.25rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">H2, major headings</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-orange">text-fluid-4xl</code></td>
                        <td class="px-4 py-4 text-gray-500">2.25rem / 36px</td>
                        <td class="px-4 py-4 text-gray-500">2.25&ndash;3rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">H1, hero headings</td>
                      </tr>
                      <tr class="border-t border-gray-100 dark:border-gray-800">
                        <td class="px-6 sm:px-8 py-4"><code class="text-caricax-orange">text-fluid-5xl</code></td>
                        <td class="px-4 py-4 text-gray-500">3rem / 48px</td>
                        <td class="px-4 py-4 text-gray-500">3&ndash;4rem</td>
                        <td class="px-6 sm:px-8 py-4 text-gray-500">Display, wordmark hero</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Usage Examples -->
              <div class="grid sm:grid-cols-2 gap-6">
                <div class="bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 font-brand">Tailwind Usage</h3>
                  <div ngNonBindable class="font-hack text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">&lt;h1 class="<span class="text-caricax-green">font-brand</span> <span class="text-caricax-orange">text-fluid-4xl</span>"&gt;
  {{ 'brand.name' | translate }}
&lt;/h1&gt;

&lt;p class="<span class="text-caricax-green">font-hack</span> <span class="text-caricax-orange">text-fluid-base</span>"&gt;
  Body content here
&lt;/p&gt;</div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 font-brand">Responsive Patterns</h3>
                  <div class="font-hack text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">&lt;h2 class="<span class="text-caricax-green">font-brand</span>
  <span class="text-caricax-orange">text-fluid-xl</span>
  <span class="text-caricax-lime">sm:text-fluid-2xl</span>
  <span class="text-caricax-green">lg:text-fluid-3xl</span>"&gt;
  Responsive heading
&lt;/h2&gt;</div>
                </div>
              </div>
            </section>

            <div class="border-t border-gray-200 dark:border-gray-800"></div>

            <!-- Section 4: Usage Guidelines -->
            <section id="usage">
              <div class="flex items-center gap-4 mb-8">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-caricax-orange text-white text-xs font-bold font-hack">4</span>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 font-brand">{{ languageService.translate('branding.usage.title') }}</h2>
                  <span class="text-xs font-hack text-caricax-orange font-semibold tracking-wide uppercase">Maneirinho</span>
                </div>
              </div>

              <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
                <div class="prose max-w-none">
                  <div class="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-justify hyphens-auto font-hack text-sm" [innerHTML]="languageService.translate('branding.usage.intro') | markdown"></div>
                </div>
              </div>

              <div class="space-y-5">
                <div class="bg-caricax-green/5 dark:bg-caricax-green/10 rounded-xl border border-caricax-green/20 p-6 sm:p-8">
                  <h3 class="text-base font-semibold text-caricax-green dark:text-caricax-green mb-4 font-brand">{{ languageService.translate('branding.usage.dos.title') }}</h3>
                  <div class="space-y-4 text-sm font-hack text-gray-700 dark:text-gray-300">
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.dos.respect') | markdown"></div>
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.dos.permission') | markdown"></div>
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.dos.clearspace') | markdown"></div>
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.dos.contrast') | markdown"></div>
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.dos.attribution') | markdown"></div>
                  </div>
                </div>
                <div class="bg-caricax-green/5 dark:bg-caricax-green/10 rounded-xl border border-caricax-green/20 p-6 sm:p-8">
                  <h3 class="text-base font-semibold text-caricax-green dark:text-caricax-green mb-4 font-brand">{{ languageService.translate('branding.usage.section3.title') }}</h3>
                  <div class="text-sm font-hack text-gray-700 dark:text-gray-300">
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.section3.content') | markdown"></div>
                  </div>
                </div>
                <div class="bg-caricax-green/5 dark:bg-caricax-green/10 rounded-xl border border-caricax-green/20 p-6 sm:p-8">
                  <h3 class="text-base font-semibold text-caricax-green dark:text-caricax-green mb-4 font-brand">{{ languageService.translate('branding.usage.section4.title') }}</h3>
                  <div class="text-sm font-hack text-gray-700 dark:text-gray-300">
                    <div class="whitespace-pre-line text-justify hyphens-auto leading-relaxed" [innerHTML]="languageService.translate('branding.usage.section4.content') | markdown"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>


    </div>
  `,
  styles: [`
    .prose { line-height: 1.8; }
    .prose p { margin-bottom: 1rem; }
    pre { background: transparent !important; margin: 0; padding: 0; }
    code { background: rgba(40, 170, 106, 0.1); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.6s ease-out; }
    html { scroll-behavior: smooth; }
  `]
})
export class BrandingGuidelinesComponent {
  @Input() inModal = false;
  readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  goBack() {
    this.router.navigate(['/']);
  }
}
