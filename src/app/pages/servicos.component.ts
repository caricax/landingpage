import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-6 py-8 max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-brand font-bold text-caricax-green mb-6">
          {{ getTranslation('services.title') }}
        </h1>
        <p class="text-xl font-hack text-gray-700 leading-relaxed max-w-4xl mx-auto">
          {{ getTranslation('services.subtitle') }}
        </p>
      </div>

      <!-- Service Card - Presença Digital -->
      <div class="mb-16">
        <div class="bg-white rounded-2xl shadow-xl border-2 border-caricax-green/20 hover:border-caricax-green/40 transition-all duration-300 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-caricax-green to-green-600 p-8">
            <div class="flex items-center justify-center mb-6">
              <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                <svg aria-hidden="true" class="w-12 h-12 text-caricax-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
            <h2 class="text-3xl font-brand font-bold text-white text-center mb-4">
              {{ getTranslation('services.digital_boost.title') }}
            </h2>
            <p class="text-white/90 font-hack text-center text-lg leading-relaxed">
              {{ getTranslation('services.digital_boost.subtitle') }}
            </p>
          </div>

          <!-- Card Body -->
          <div class="p-8">
            <!-- Description -->
            <div class="mb-8">
              <p class="text-gray-700 font-hack text-lg leading-relaxed text-justify mb-6">
                {{ getTranslation('services.digital_boost.description') }}
              </p>
            </div>

            <!-- Service Modules -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Landing Page -->
              <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-caricax-orange">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-caricax-orange rounded-lg flex items-center justify-center mr-3">
                    <svg aria-hidden="true" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-brand font-bold text-gray-800">
                    {{ getTranslation('services.modules.landing.title') }}
                  </h3>
                </div>
                <p class="text-gray-600 font-hack leading-relaxed text-justify">
                  {{ getTranslation('services.modules.landing.description') }}
                </p>
              </div>

              <!-- Website Institucional -->
              <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-caricax-green">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-caricax-green rounded-lg flex items-center justify-center mr-3">
                    <svg aria-hidden="true" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-brand font-bold text-gray-800">
                    {{ getTranslation('services.modules.website.title') }}
                  </h3>
                </div>
                <p class="text-gray-600 font-hack leading-relaxed text-justify">
                  {{ getTranslation('services.modules.website.description') }}
                </p>
              </div>

              <!-- Parcerias Estratégicas -->
              <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <svg aria-hidden="true" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-brand font-bold text-gray-800">
                    {{ getTranslation('services.modules.partnerships.title') }}
                  </h3>
                </div>
                <p class="text-gray-600 font-hack leading-relaxed text-justify">
                  {{ getTranslation('services.modules.partnerships.description') }}
                </p>
              </div>

              <!-- Gestão de Tráfego -->
              <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-500">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <svg aria-hidden="true" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-brand font-bold text-gray-800">
                    {{ getTranslation('services.modules.traffic.title') }}
                  </h3>
                </div>
                <p class="text-gray-600 font-hack leading-relaxed text-justify">
                  {{ getTranslation('services.modules.traffic.description') }}
                </p>
              </div>
            </div>

            <!-- Technology & Infrastructure -->
            <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 mb-8">
              <h3 class="text-2xl font-brand font-bold text-gray-800 mb-6 text-center">
                {{ getTranslation('services.technology.title') }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Hostinger -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-caricax-green rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div class="text-2xl font-brand font-bold text-white">H</div>
                  </div>
                  <h4 class="font-brand font-bold text-gray-800 mb-2">Hostinger</h4>
                  <p class="text-sm font-hack text-gray-600">{{ getTranslation('services.technology.hostinger') }}</p>
                </div>
                <!-- WordPress -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div class="text-2xl font-brand font-bold text-white">WP</div>
                  </div>
                  <h4 class="font-brand font-bold text-gray-800 mb-2">WordPress</h4>
                  <p class="text-sm font-hack text-gray-600">{{ getTranslation('services.technology.wordpress') }}</p>
                </div>
                <!-- Cloud Infrastructure -->
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <div class="text-2xl font-brand font-bold text-white">CLD</div>
                  </div>
                  <h4 class="font-brand font-bold text-gray-800 mb-2">Cloud</h4>
                  <p class="text-sm font-hack text-gray-600">{{ getTranslation('services.technology.gcp') }}</p>
                </div>
              </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center">
              <button class="bg-gradient-to-r from-caricax-green to-green-600 hover:from-green-600 hover:to-caricax-green text-white font-hack font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                {{ getTranslation('services.cta') }}
              </button>
              <p class="text-sm font-hack text-gray-500 mt-4">
                {{ getTranslation('services.cta.subtitle') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Coming Soon Services -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Desenvolvimento de Apps -->
        <div class="relative group cursor-not-allowed">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-sm rounded-xl z-10"></div>
          <div class="filter blur-[1px] select-none pointer-events-none">
            <div class="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200/60">
              <div class="w-16 h-16 bg-gradient-to-r from-caricax-orange to-caricax-green rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-brand font-bold text-gray-800 text-center mb-3">
                {{ getTranslation('services.coming_soon.apps.title') }}
              </h3>
              <p class="text-gray-600 font-hack text-center">
                {{ getTranslation('services.coming_soon.apps.description') }}
              </p>
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center z-20">
            <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
              EM BREVE
            </span>
          </div>
        </div>

        <!-- Consultoria em TI -->
        <div class="relative group cursor-not-allowed">
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-sm rounded-xl z-10"></div>
          <div class="filter blur-[1px] select-none pointer-events-none">
            <div class="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200/60">
              <div class="w-16 h-16 bg-gradient-to-r from-caricax-green to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg aria-hidden="true" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-xl font-brand font-bold text-gray-800 text-center mb-3">
                {{ getTranslation('services.coming_soon.consulting.title') }}
              </h3>
              <p class="text-gray-600 font-hack text-center">
                {{ getTranslation('services.coming_soon.consulting.description') }}
              </p>
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center z-20">
            <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
              EM BREVE
            </span>
          </div>
        </div>
      </div>

      <!-- Legal Compliance Section -->
      <div class="mt-16 bg-gray-50 rounded-xl p-8 border-l-4 border-caricax-green">
        <h3 class="text-xl font-brand font-bold text-gray-800 mb-4">
          {{ getTranslation('services.legal.title') }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-brand font-bold text-gray-700 mb-2">
              {{ getTranslation('services.legal.lgpd.title') }}
            </h4>
            <p class="text-gray-600 font-hack text-sm leading-relaxed text-justify">
              {{ getTranslation('services.legal.lgpd.description') }}
            </p>
          </div>
          <div>
            <h4 class="font-brand font-bold text-gray-700 mb-2">
              {{ getTranslation('services.legal.transparency.title') }}
            </h4>
            <p class="text-gray-600 font-hack text-sm leading-relaxed text-justify">
              {{ getTranslation('services.legal.transparency.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ServicosComponent {
  
  constructor(private languageService: LanguageService) {}

  getTranslation(key: string): string {
    const lang = this.languageService.currentLanguage().code;
    const translations: Record<string, Record<string, string>> = {
      pt: {
        'services.title': 'Nossos Serviços',
        'services.subtitle': 'Transformamos pequenas e médias empresas através de soluções digitais completas e estratégicas. Desde a criação da sua presença online até a gestão contínua do seu crescimento digital.',
        'services.digital_boost.title': 'Impulsionamento de Presença Digital',
        'services.digital_boost.subtitle': 'Solução completa para PMEs, profissionais liberais e startups construírem uma identidade digital robusta e eficaz.',
        'services.digital_boost.description': 'Nosso serviço principal é projetado para capacitar seu negócio a prosperar no ambiente digital. Oferecemos uma solução end-to-end que abrange desde a infraestrutura básica até estratégias avançadas de crescimento, complementada por parcerias estratégicas que agregam valor ao seu ecossistema digital.',
        'services.modules.landing.title': 'Landing Page Profissional',
        'services.modules.landing.description': 'Páginas de alta conversão com design responsivo, otimização de velocidade, formulários integrados e copywriting persuasivo para capturar leads qualificados.',
        'services.modules.website.title': 'Website Institucional',
        'services.modules.website.description': 'Websites completos com CMS WordPress, permitindo atualizações autônomas. Inclui páginas institucionais, blog e área administrativa.',
        'services.modules.partnerships.title': 'Parcerias Estratégicas',
        'services.modules.partnerships.description': 'Integração de ferramentas recomendadas (Stone, Hostinger, GCP) que agregam valor ao seu negócio e geram receita adicional através de parcerias transparentes.',
        'services.modules.traffic.title': 'Gestão de Tráfego',
        'services.modules.traffic.description': 'Campanhas de anúncios (Search Ads, Social Ads) e criação de conteúdo para redes sociais, direcionando tráfego qualificado para sua presença digital.',
        'services.technology.title': 'Tecnologia & Infraestrutura',
        'services.technology.hostinger': 'Hospedagem otimizada com excelente custo-benefício',
        'services.technology.wordpress': 'CMS intuitivo para gestão autônoma de conteúdo',
        'services.technology.gcp': 'Infraestrutura escalável para projetos complexos',
        'services.cta': 'Solicitar Consultoria Gratuita',
        'services.cta.subtitle': 'Conversa inicial sem compromisso para entender suas necessidades',
        'services.coming_soon.apps.title': 'Desenvolvimento de Apps',
        'services.coming_soon.apps.description': 'Aplicações móveis nativas e híbridas para iOS e Android',
        'services.coming_soon.consulting.title': 'Consultoria em TI',
        'services.coming_soon.consulting.description': 'Estratégias tecnológicas personalizadas para crescimento empresarial',
        'services.legal.title': 'Conformidade Legal & Transparência',
        'services.legal.lgpd.title': 'LGPD Compliance',
        'services.legal.lgpd.description': 'Todos os projetos seguem rigorosamente a Lei Geral de Proteção de Dados, com políticas de privacidade, consentimento explícito e gestão adequada de cookies.',
        'services.legal.transparency.title': 'Transparência nas Parcerias',
        'services.legal.transparency.description': 'Divulgação clara sobre links de afiliados e parcerias, seguindo diretrizes do CONAR e Código de Defesa do Consumidor para garantir transparência total.'
      },
      en: {
        'services.title': 'Our Services',
        'services.subtitle': 'We transform small and medium enterprises through complete and strategic digital solutions. From creating your online presence to continuous management of your digital growth.',
        'services.digital_boost.title': 'Digital Presence Boost',
        'services.digital_boost.subtitle': 'Complete solution for SMEs, freelancers and startups to build a robust and effective digital identity.',
        'services.digital_boost.description': 'Our main service is designed to empower your business to thrive in the digital environment. We offer an end-to-end solution that covers from basic infrastructure to advanced growth strategies, complemented by strategic partnerships that add value to your digital ecosystem.',
        'services.modules.landing.title': 'Professional Landing Page',
        'services.modules.landing.description': 'High-conversion pages with responsive design, speed optimization, integrated forms and persuasive copywriting to capture qualified leads.',
        'services.modules.website.title': 'Institutional Website',
        'services.modules.website.description': 'Complete websites with WordPress CMS, allowing autonomous updates. Includes institutional pages, blog and administrative area.',
        'services.modules.partnerships.title': 'Strategic Partnerships',
        'services.modules.partnerships.description': 'Integration of recommended tools (Stone, Hostinger, GCP) that add value to your business and generate additional revenue through transparent partnerships.',
        'services.modules.traffic.title': 'Traffic Management',
        'services.modules.traffic.description': 'Ad campaigns (Search Ads, Social Ads) and social media content creation, directing qualified traffic to your digital presence.',
        'services.technology.title': 'Technology & Infrastructure',
        'services.technology.hostinger': 'Optimized hosting with excellent cost-benefit',
        'services.technology.wordpress': 'Intuitive CMS for autonomous content management',
        'services.technology.gcp': 'Scalable infrastructure for complex projects',
        'services.cta': 'Request Free Consultation',
        'services.cta.subtitle': 'Initial conversation without commitment to understand your needs',
        'services.coming_soon.apps.title': 'App Development',
        'services.coming_soon.apps.description': 'Native and hybrid mobile applications for iOS and Android',
        'services.coming_soon.consulting.title': 'IT Consulting',
        'services.coming_soon.consulting.description': 'Personalized technology strategies for business growth',
        'services.legal.title': 'Legal Compliance & Transparency',
        'services.legal.lgpd.title': 'GDPR Compliance',
        'services.legal.lgpd.description': 'All projects strictly follow the General Data Protection Law, with privacy policies, explicit consent and proper cookie management.',
        'services.legal.transparency.title': 'Partnership Transparency',
        'services.legal.transparency.description': 'Clear disclosure about affiliate links and partnerships, following CONAR guidelines and Consumer Protection Code to ensure total transparency.'
      },
      es: {
        'services.title': 'Nuestros Servicios',
        'services.subtitle': 'Transformamos pequeñas y medianas empresas a través de soluciones digitales completas y estratégicas. Desde crear tu presencia online hasta la gestión continua de tu crecimiento digital.',
        'services.digital_boost.title': 'Impulso de Presencia Digital',
        'services.digital_boost.subtitle': 'Solución completa para PYMEs, profesionales independientes y startups para construir una identidad digital robusta y eficaz.',
        'services.digital_boost.description': 'Nuestro servicio principal está diseñado para capacitar a tu negocio a prosperar en el entorno digital. Ofrecemos una solución integral que abarca desde la infraestructura básica hasta estrategias avanzadas de crecimiento, complementada por asociaciones estratégicas que agregan valor a tu ecosistema digital.',
        'services.modules.landing.title': 'Landing Page Profesional',
        'services.modules.landing.description': 'Páginas de alta conversión con diseño responsivo, optimización de velocidad, formularios integrados y copywriting persuasivo para capturar leads calificados.',
        'services.modules.website.title': 'Sitio Web Institucional',
        'services.modules.website.description': 'Sitios web completos con CMS WordPress, permitiendo actualizaciones autónomas. Incluye páginas institucionales, blog y área administrativa.',
        'services.modules.partnerships.title': 'Asociaciones Estratégicas',
        'services.modules.partnerships.description': 'Integración de herramientas recomendadas (Stone, Hostinger, GCP) que agregan valor a tu negocio y generan ingresos adicionales a través de asociaciones transparentes.',
        'services.modules.traffic.title': 'Gestión de Tráfico',
        'services.modules.traffic.description': 'Campañas publicitarias (Search Ads, Social Ads) y creación de contenido para redes sociales, dirigiendo tráfico calificado a tu presencia digital.',
        'services.technology.title': 'Tecnología e Infraestructura',
        'services.technology.hostinger': 'Hosting optimizado con excelente costo-beneficio',
        'services.technology.wordpress': 'CMS intuitivo para gestión autónoma de contenido',
        'services.technology.gcp': 'Infraestructura escalable para proyectos complejos',
        'services.cta': 'Solicitar Consulta Gratuita',
        'services.cta.subtitle': 'Conversación inicial sin compromiso para entender tus necesidades',
        'services.coming_soon.apps.title': 'Desarrollo de Apps',
        'services.coming_soon.apps.description': 'Aplicaciones móviles nativas e híbridas para iOS y Android',
        'services.coming_soon.consulting.title': 'Consultoría en TI',
        'services.coming_soon.consulting.description': 'Estrategias tecnológicas personalizadas para crecimiento empresarial',
        'services.legal.title': 'Cumplimiento Legal y Transparencia',
        'services.legal.lgpd.title': 'Cumplimiento RGPD',
        'services.legal.lgpd.description': 'Todos los proyectos siguen estrictamente la Ley General de Protección de Datos, con políticas de privacidad, consentimiento explícito y gestión adecuada de cookies.',
        'services.legal.transparency.title': 'Transparencia en Asociaciones',
        'services.legal.transparency.description': 'Divulgación clara sobre enlaces de afiliados y asociaciones, siguiendo las directrices de CONAR y Código de Defensa del Consumidor para garantizar transparencia total.'
      }
    };

    return translations[lang]?.[key] || translations['pt'][key] || key;
  }
}
