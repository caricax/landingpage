import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-rescisao-facil',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto p-6 sm:p-8 font-hack text-gray-800 dark:text-gray-200">
      <div class="mb-8 text-center">
        <h1 class="text-3xl sm:text-4xl font-brand font-bold text-transparent bg-gradient-to-r from-caricax-green to-blue-500 bg-clip-text mb-4">RESCISÃO FÁCIL</h1>
        <p class="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Rescisão Fácil é uma aplicação open-source para simular cálculos rescisórios com base na legislação trabalhista brasileira (CLT, FGTS, IRRF). Single Page Application (SPA) responsiva -- cross-device.
        </p>
      </div>

      <div class="space-y-10 text-sm sm:text-base">
        <!-- É O QUÊ? -->
        <section>
          <h2 class="text-xl font-bold text-caricax-green mb-4 flex items-center gap-2">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            É O QUÊ?
          </h2>
          <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="w-full text-left">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th class="p-4 border-b dark:border-gray-700 font-semibold text-green-600 dark:text-green-400 w-1/2">É</th>
                  <th class="p-4 border-b dark:border-gray-700 font-semibold text-red-600 dark:text-red-400 w-1/2">NÃO É</th>
                </tr>
              </thead>
              <tbody class="divide-y dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                <tr>
                  <td class="p-4">Simulador contábil educacional baseado na legislação trabalhista vigente (CLT, FGTS, IRRF).</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400">Assessoria jurídica; não substitui advogado trabalhista ou sindicato.</td>
                </tr>
                <tr>
                  <td class="p-4">Single Page Application (SPA) executada localmente no navegador (client-side), sem envio de dados de cálculo para servidores.</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400">Ferramenta de folha de pagamento corporativa (ERP).</td>
                </tr>
                <tr>
                  <td class="p-4">Projeto open-source auditável.</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400">Rastreador de dados; não há cookies ocultos, pixel do Facebook ou captura para revenda (questionário final é opt-in e anônimo).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- PARA QUE(M)? -->
        <section>
          <h2 class="text-xl font-bold text-caricax-green mb-4 flex items-center gap-2">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            PARA QUE(M)?
          </h2>
          <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table class="w-full text-left">
              <thead class="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th class="p-4 border-b dark:border-gray-700 font-semibold text-green-600 dark:text-green-400 w-1/2">SERVE</th>
                  <th class="p-4 border-b dark:border-gray-700 font-semibold text-red-600 dark:text-red-400 w-1/2">NÃO SERVE</th>
                </tr>
              </thead>
              <tbody class="divide-y dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                <tr>
                  <td class="p-4">Prever cenários financeiros: estimar valores a receber ou descontar antes do pedido de demissão ou após demissão sem justa causa.</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400">Calcular rescisões de servidores estatutários (regime próprio), estagiários ou contratos PJ.</td>
                </tr>
                <tr>
                  <td class="p-4">Auditoria rápida: verificar se o TRCT entregue pela empresa está coerente com a lei.</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400">Resolver litígios com horas extras não pagas, adicionais retroativos ou comissões fora da folha; a calculadora assume relação regular e valores base.</td>
                </tr>
                <tr>
                  <td class="p-4">Educação financeira: visualizar efeitos de IRRF e INSS nas verbas rescisórias.</td>
                  <td class="p-4 text-gray-500 dark:text-gray-400"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- FUNCIONAMENTO -->
        <section>
          <h2 class="text-xl font-bold text-caricax-green mb-4 flex items-center gap-2">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            FUNCIONAMENTO
          </h2>
          <div class="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
            <p class="mb-4">O aplicativo opera de forma algorítmica e síncrona. O motor de cálculo possui complexidade constante <code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-caricax-green">O(1)</code>. Fluxo:</p>
            <ol class="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Entrada de dados:</strong> formulário com salário base, datas de admissão/demissão, motivo e férias vencidas.</li>
              <li><strong>Processamento local:</strong> mapeamento das regras legais (ex.: aviso prévio de 3 dias por ano, tabelas progressivas de INSS e IRRF 2026, pagamento em dobro quando aplicável).</li>
              <li><strong>Exibição:</strong> resultados na tela divididos em <span class="text-green-600 dark:text-green-400 font-semibold">Proventos</span>, <span class="text-red-600 dark:text-red-400 font-semibold">Descontos</span> e saldo de <span class="text-blue-600 dark:text-blue-400 font-semibold">FGTS / Seguro-Desemprego</span>.</li>
            </ol>
          </div>
        </section>

        <!-- FEATURES -->
        <section>
          <h2 class="text-xl font-bold text-caricax-green mb-4 flex items-center gap-2">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            FEATURES
          </h2>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg aria-hidden="true" class="w-5 h-5 text-caricax-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Motor CLT:</strong> tabelas de INSS e IRRF para o exercício de 2026.</span>
            </li>
            <li class="flex items-start gap-3">
              <svg aria-hidden="true" class="w-5 h-5 text-caricax-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Cálculo de férias:</strong> identificação de períodos concessivos vencidos (Art. 137 CLT) e cálculo de férias em dobro (isentas de retenção, conforme súmulas STJ).</span>
            </li>
            <li class="flex items-start gap-3">
              <svg aria-hidden="true" class="w-5 h-5 text-caricax-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Interface:</strong> tipografia Noto Serif e Hack.</span>
            </li>
            <li class="flex items-start gap-3">
              <svg aria-hidden="true" class="w-5 h-5 text-caricax-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Acessibilidade (a11y):</strong> modos escuro, claro e alto contraste; atalhos <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">Alt+Shift+T</kbd> e <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">Alt+Shift+H</kbd>.</span>
            </li>
            <li class="flex items-start gap-3">
              <svg aria-hidden="true" class="w-5 h-5 text-caricax-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span><strong>Privacidade:</strong> sem submissão automática de formulário; seção de envio de dados para o "Observatório do Trabalho" separada, com opt-in granular.</span>
            </li>
          </ul>
        </section>

        <!-- ARQUITETURA E SCRIPTS -->
        <section class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">ARQUITETURA?</h3>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Detalhes de decisões arquiteturais (Angular Zoneless, diagramas UML, Data Flow e mapeamento URI) em:</p>
            <a href="https://github.com/caricax/rescisao-facil/blob/main/docs/architecture.md" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-caricax-green hover:text-caricax-orange transition-colors font-bold">
              <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
              docs/architecture.md
            </a>
          </div>
          
          <div class="bg-black rounded-lg border border-gray-800 overflow-hidden">
            <div class="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="ml-2 text-xs text-gray-400 font-hack">bash</span>
            </div>
            <div class="p-4 text-sm font-hack text-gray-300">
              <div class="text-gray-500"># Instalar dependências</div>
              <div class="mb-3"><span class="text-caricax-green">npm</span> install</div>
              
              <div class="text-gray-500"># Iniciar servidor local</div>
              <div class="mb-3"><span class="text-caricax-green">npm</span> start</div>
              
              <div class="text-gray-500"># Executar suíte de testes unitários</div>
              <div><span class="text-caricax-green">npm</span> run test</div>
            </div>
          </div>
        </section>
        
        <div class="mt-20 relative">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-900/5 via-yellow-900/5 to-green-900/5 rounded-3xl"></div>
          <div class="relative bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div class="text-center max-w-4xl mx-auto">
              <h3 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-green-600 mb-6">
                Calcule sua rescisão trabalhista em minutos!
              </h3>
              <p class="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Tenha acesso ao cálculo detalhado de seus direitos de modo rápido, seguro e gratuito.
              </p>
              <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="https://calculadorarescisao.info/" target="_blank" rel="noopener noreferrer" class="group relative px-10 py-4 bg-gradient-to-r from-orange-500 via-yellow-400 to-green-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <span class="relative flex items-center gap-3">
                    <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4-4-4-4m8 8V7a4 4 0 00-4-4H7"/>
                    </svg>
                    Simule Agora
                  </span>
                </a>
                <a href="https://github.com/caricax/rescisao-facil" target="_blank" rel="noopener noreferrer" class="group px-10 py-4 border-2 border-orange-500 text-orange-500 dark:text-orange-400 rounded-2xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                  <span class="flex items-center gap-3">
                    <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                    Código Fonte
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RescisaoFacilComponent {}
