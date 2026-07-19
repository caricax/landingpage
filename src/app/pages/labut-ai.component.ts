import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-labut-ai',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto p-8">
      <!-- Hero Section with Brand Identity -->
      <div class="text-center mb-12">
        <!-- Custom labut.ai Logo -->
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-caricax-orange via-orange-500 to-caricax-green rounded-3xl mb-6 shadow-2xl">
          <div class="relative">
            <!-- AI Brain Icon with Circuit Pattern -->
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              <!-- Circuit lines overlay -->
              <circle cx="12" cy="10" r="1" fill="currentColor" opacity="0.7"/>
              <circle cx="8" cy="8" r="0.5" fill="currentColor" opacity="0.5"/>
              <circle cx="16" cy="8" r="0.5" fill="currentColor" opacity="0.5"/>
              <line x1="12" y1="9" x2="8" y2="8" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
              <line x1="12" y1="9" x2="16" y2="8" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
            </svg>
            <!-- Pulse effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400 to-green-400 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        
        <!-- Brand Typography -->
        <div class="mb-6">
          <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-caricax-orange via-orange-500 to-caricax-green mb-2 tracking-tight">
            labut<span class="text-caricax-green">.ai</span>
          </h1>
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 rounded-full">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-orange-700 dark:text-orange-300">{{ languageService.translate('labut.status') }}</span>
          </div>
        </div>
        
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
          {{ languageService.translate('labut.hero.subtitle') }}
        </p>
        
        <!-- Brand Pattern Background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-caricax-orange to-orange-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500 to-caricax-green rounded-full blur-3xl"></div>
        </div>
      </div>

      <!-- Main Content with Brand Integration -->
      <div class="grid md:grid-cols-2 gap-12 items-start relative">
        <!-- Left Column - Description with Brand Elements -->
        <div class="space-y-8">
          <!-- Company Branding -->
          <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div class="w-10 h-10 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <p class="font-bold text-gray-900 dark:text-white">CARICAX</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Information Technology</p>
            </div>
          </div>
          
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div class="w-1 h-8 bg-gradient-to-b from-caricax-orange to-caricax-green rounded-full"></div>
              {{ languageService.translate('labut.about.title') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {{ languageService.translate('labut.about.description') }}
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-6 h-6 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              {{ languageService.translate('labut.features.title') }}
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ languageService.translate('labut.features.automation') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Redução de até 80% no tempo de execução de tarefas repetitivas</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ languageService.translate('labut.features.optimization') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Economia média de 40% nos custos operacionais</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ languageService.translate('labut.features.integration') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Compatível com 200+ plataformas empresariais</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">{{ languageService.translate('labut.features.analytics') }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Insights em tempo real com 99.9% de precisão</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Technical Details with Enhanced Branding -->
        <!-- Right Column - Technical Details with Enhanced Branding -->
        <div class="space-y-8">
          <!-- Tech Stack Showcase -->
          <div class="bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 dark:from-orange-900/20 dark:via-yellow-900/20 dark:to-green-900/20 rounded-3xl p-8 border border-orange-200 dark:border-orange-800/30 relative overflow-hidden">
            <!-- Brand Pattern Overlay -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-caricax-orange/10 to-orange-500/10 rounded-full blur-2xl"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-caricax-green/10 rounded-full blur-2xl"></div>
            
            <div class="relative">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-xl flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                {{ languageService.translate('labut.tech.title') }}
              </h3>
              
              <div class="space-y-6">
                <div class="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
                  <div class="w-12 h-12 bg-gradient-to-br from-caricax-orange to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ languageService.translate('labut.tech.ai') }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ languageService.translate('labut.tech.ai.desc') }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">TensorFlow</span>
                      <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">PyTorch</span>
                      <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-full">Vertex AI</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
                  <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ languageService.translate('labut.tech.workflow') }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ languageService.translate('labut.tech.workflow.desc') }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">Zapier</span>
                      <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">n8n</span>
                      <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">RPA</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
                  <div class="w-12 h-12 bg-gradient-to-br from-caricax-green to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ languageService.translate('labut.tech.cloud') }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ languageService.translate('labut.tech.cloud.desc') }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">AWS</span>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">Docker</span>
                      <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">Kubernetes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Metrics with Brand Colors -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800/30">
              <div class="text-3xl font-black text-green-600 dark:text-green-400 mb-2">80%</div>
              <div class="text-sm font-medium text-green-700 dark:text-green-300">Redução de Tempo</div>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30">
              <div class="text-3xl font-black text-blue-600 dark:text-blue-400 mb-2">40%</div>
              <div class="text-sm font-medium text-blue-700 dark:text-blue-300">Economia de Custos</div>
            </div>
          </div>

          <!-- Status Badge with Enhanced Design -->
          <div class="text-center">
            <div class="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-transform">
              <div class="relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                </svg>
                <div class="absolute inset-0 animate-ping bg-white rounded-full opacity-30"></div>
              </div>
              {{ languageService.translate('labut.status') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced CTA Section with Full Brand Integration -->
      <div class="mt-20 relative">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-r from-orange-900/5 via-yellow-900/5 to-green-900/5 rounded-3xl"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.1),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_50%)]"></div>
        
        <div class="relative bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <!-- CARICAX Watermark -->
          <div class="flex justify-center mb-8">
            <div class="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full border border-gray-300 dark:border-gray-600">
              <div class="w-8 h-8 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">C</span>
              </div>
              <span class="font-bold text-gray-700 dark:text-gray-300">CARICAX Information Technology</span>
            </div>
          </div>
          
          <div class="text-center max-w-4xl mx-auto">
            <h3 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-caricax-orange via-orange-500 to-caricax-green mb-6">
              {{ languageService.translate('labut.cta.title') }}
            </h3>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              {{ languageService.translate('labut.cta.description') }}
            </p>
            
            <!-- Enhanced CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button class="group relative px-10 py-4 bg-gradient-to-r from-caricax-orange via-orange-500 to-caricax-green text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div class="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span class="relative flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ languageService.translate('labut.cta.contact') }}
                </span>
              </button>
              
              <button class="group px-10 py-4 border-2 border-caricax-orange text-caricax-orange dark:text-orange-400 rounded-2xl font-bold text-lg hover:bg-caricax-orange hover:text-white transition-all duration-300 transform hover:scale-105">
                <span class="flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  {{ languageService.translate('labut.cta.learn_more') }}
                </span>
              </button>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                ISO 27001 Certified
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                LGPD Compliant
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                99.9% Uptime SLA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    /* Custom brand animations */
    @keyframes brand-pulse {
      0%, 100% { 
        opacity: 1; 
        transform: scale(1); 
      }
      50% { 
        opacity: 0.8; 
        transform: scale(1.05); 
      }
    }
    
    @keyframes brand-float {
      0%, 100% { 
        transform: translateY(0px); 
      }
      50% { 
        transform: translateY(-10px); 
      }
    }
    
    @keyframes gradient-shift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    /* Brand gradient backgrounds */
    .brand-gradient {
      background: linear-gradient(-45deg, #f97316, #eab308, #22c55e, #f97316);
      background-size: 400% 400%;
      animation: gradient-shift 8s ease infinite;
    }
    
    /* Custom shadows for brand elements */
    .brand-shadow {
      box-shadow: 
        0 4px 15px 0 rgba(249, 115, 22, 0.2),
        0 2px 4px 0 rgba(249, 115, 22, 0.1);
    }
    
    .brand-shadow-lg {
      box-shadow: 
        0 20px 25px -5px rgba(249, 115, 22, 0.15),
        0 10px 10px -5px rgba(249, 115, 22, 0.1),
        0 0 0 1px rgba(249, 115, 22, 0.05);
    }
    
    /* Brand hover effects */
    .brand-hover:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 25px 50px -12px rgba(249, 115, 22, 0.25),
        0 0 0 1px rgba(249, 115, 22, 0.1);
    }
    
    /* Custom scrollbar for brand consistency */
    :host ::ng-deep ::-webkit-scrollbar {
      width: 8px;
    }
    
    :host ::ng-deep ::-webkit-scrollbar-track {
      background: rgba(249, 115, 22, 0.1);
      border-radius: 4px;
    }
    
    :host ::ng-deep ::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #f97316, #22c55e);
      border-radius: 4px;
    }
    
    :host ::ng-deep ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #ea580c, #16a34a);
    }
    
    /* Brand text selection */
    :host ::ng-deep ::selection {
      background-color: rgba(249, 115, 22, 0.2);
      color: #f97316;
    }
    
    /* Enhanced focus states for accessibility */
    :host ::ng-deep button:focus {
      outline: 2px solid #f97316;
      outline-offset: 2px;
    }
    
    /* Brand-specific responsive typography */
    @media (max-width: 640px) {
      .brand-title {
        font-size: 2.5rem;
        line-height: 1.2;
      }
    }
    
    @media (min-width: 1024px) {
      .brand-title {
        font-size: 4rem;
        line-height: 1.1;
      }
    }
    
    /* Glassmorphism effects for modern brand feel */
    .glass-card {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(255, 255, 255, 0.75);
      border: 1px solid rgba(209, 213, 219, 0.3);
    }
    
    :host-context(.dark) .glass-card {
      background-color: rgba(17, 24, 39, 0.75);
      border: 1px solid rgba(75, 85, 99, 0.3);
    }
    
    /* Brand loading states */
    .loading-shimmer {
      background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `]
})
export class LabutAiComponent {
  readonly languageService = inject(LanguageService);
}
