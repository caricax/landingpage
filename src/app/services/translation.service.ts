import { Injectable, signal } from '@angular/core';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [language: string]: Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _currentLanguage = signal<string>('pt');
  readonly currentLanguage = this._currentLanguage.asReadonly();

  private readonly translations: Translations = {
    pt: {
      // Header
      'menu.toggle': 'Abrir Menu',
      'theme.toggle': 'Alternar Tema',
      
      // Menu
      'menu.title': 'Menu Principal',
      'menu.dashboard': 'Dashboard',
      'menu.about': 'Sobre Nós',
      'menu.products': 'Produtos',
      'menu.services': 'Serviços',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog & Insights',
      'menu.docs': 'Documentação',
      'menu.support': 'Suporte',
      'menu.contact': 'Contato',
      'menu.development': '🚀 Em Desenvolvimento',
      'menu.coming_soon': 'Funcionalidades em breve',
      
      // Terminal
      'terminal.title': 'manifesto_caricax.txt',
      'terminal.command': 'cat manifesto_caricax.txt',
      'terminal.prompt': 'caricax@caricax:~$',
      
      // Branding
      'brand.name': 'CARICAX',
      'brand.manifesto': 'MANIFESTO',
      'brand.subtitle': 'Information Technology',
      'brand.slogan': 'Software as a Right',
      'brand.description': 'Democratizando soluções de TI sofisticadas para Micro e Pequenas Empresas',
      
      // Coming Soon
      'coming_soon.tooltip': 'Em breve',
      'coming_soon.badge': 'COMING SOON',
      
      // Social Media
      'social.connect': 'Conecte-se',
      'social.github': 'GitHub CARICAX',
      'social.linkedin': 'LinkedIn CARICAX',
      'social.instagram': 'Instagram CARICAX',
      
      // Language
      'language.switch': 'Trocar idioma',
      'language.english': 'Inglês',
      'language.spanish': 'Espanhol', 
      'language.portuguese': 'Português',
      'language.german': 'Alemão',
      'language.french': 'Francês',
      'language.russian': 'Russo',
      
      // CTAs
      'cta.learn_more': 'Saiba Mais',
      'cta.support': 'Apoie',
      
      // Contact Form
      'form.title': 'Entre em Contato',
      'form.subtitle': 'Conte-nos sobre seu projeto',
      'form.name': 'Nome',
      'form.name.placeholder': 'Seu nome completo',
      'form.email': 'Email',
      'form.email.placeholder': 'seu@email.com',
      'form.subject': 'Assunto',
      'form.subject.placeholder': 'Assunto da mensagem',
      'form.message': 'Mensagem',
      'form.message.placeholder': 'Descreva seu projeto ou dúvida...',
      'form.submit': 'Enviar Mensagem',
      'form.sending': 'Enviando...',
      'form.success': 'Mensagem enviada com sucesso!',
      'form.error': 'Erro ao enviar mensagem. Tente novamente.',
      'form.required': 'Campo obrigatório',
      'form.email.invalid': 'Email inválido',
      'form.close': 'Fechar',
      
      // Philosophy Text
      'philosophy.text': `A Caricax Information Technology surge da compreensão de que as tecnologias, cada vez mais sofisticadas e inerentes à produção econômica atual, enquanto privilégio de poucos, mantém-se atrás de paywalls e softwares proprietários de usabilidade contraintuitiva.

Nossa missão é democratizar soluções de TI sofisticadas, tornando-as bem comum de Micro e Pequenas Empresas (MPEs).

Defender Software como um Direito exprime a compreensão de que o profissional da tecnologia, independentemente de senioridade, é, antes, um trabalhador, assim como agentes engajados com o desenvolvimento de economias locais são.

Não se trata apenas de linhas de código; trata-se de concretizar o letramento tecnológico do empreendedor local, libertando-o de oligopólios, que se definem pela mais antiquada das maneiras de recusa à adoção de abordagens human-first.`
    },
    en: {
      // Header
      'menu.toggle': 'Open Menu',
      'theme.toggle': 'Toggle Theme',
      
      // Menu
      'menu.title': 'Main Menu',
      'menu.dashboard': 'Dashboard',
      'menu.about': 'About Us',
      'menu.products': 'Products',
      'menu.services': 'Services',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog & Insights',
      'menu.docs': 'Documentation',
      'menu.support': 'Support',
      'menu.contact': 'Contact',
      'menu.development': '🚀 Under Development',
      'menu.coming_soon': 'Features coming soon',
      
      // Terminal
      'terminal.title': 'caricax_manifesto.txt',
      'terminal.command': 'cat caricax_manifesto.txt',
      'terminal.prompt': 'caricax@caricax:~$',
      
      // Branding
      'brand.name': 'CARICAX',
      'brand.manifesto': 'MANIFESTO',
      'brand.subtitle': 'Information Technology',
      'brand.slogan': 'Software as a Right',
      'brand.description': 'Democratizing sophisticated IT solutions for Micro and Small Enterprises',
      
      // Coming Soon
      'coming_soon.tooltip': 'Coming soon',
      'coming_soon.badge': 'COMING SOON',
      
      // Social Media
      'social.connect': 'Connect',
      'social.github': 'GitHub CARICAX',
      'social.linkedin': 'LinkedIn CARICAX',
      'social.instagram': 'Instagram CARICAX',
      
      // Language
      'language.switch': 'Switch language',
      'language.english': 'English',
      'language.spanish': 'Spanish',
      'language.portuguese': 'Portuguese',
      'language.german': 'German',
      'language.french': 'French',
      'language.russian': 'Russian',
      
      // CTAs
      'cta.learn_more': 'Learn More',
      'cta.support': 'Support',
      
      // Contact Form
      'form.title': 'Get in Touch',
      'form.subtitle': 'Tell us about your project',
      'form.name': 'Name',
      'form.name.placeholder': 'Your full name',
      'form.email': 'Email',
      'form.email.placeholder': 'your@email.com',
      'form.subject': 'Subject',
      'form.subject.placeholder': 'Message subject',
      'form.message': 'Message',
      'form.message.placeholder': 'Describe your project or question...',
      'form.submit': 'Send Message',
      'form.sending': 'Sending...',
      'form.success': 'Message sent successfully!',
      'form.error': 'Error sending message. Please try again.',
      'form.required': 'Required field',
      'form.email.invalid': 'Invalid email',
      'form.close': 'Close',
      
      // Philosophy Text
      'philosophy.text': `Caricax Information Technology emerges from the understanding that technologies, increasingly sophisticated and inherent to current economic production, while remaining a privilege of the few, stay behind paywalls and proprietary software with counterintuitive usability.

Our mission is to democratize sophisticated IT solutions, making them a common good for Micro and Small Enterprises (MSEs).

Defending Software as a Right expresses the understanding that the technology professional, regardless of seniority, is, first and foremost, a worker, just as agents engaged with the development of local economies are.

It's not just about lines of code; it's about materializing the technological literacy of the local entrepreneur, freeing them from oligopolies, which are defined by the most antiquated ways of refusing to adopt human-first approaches.`
    },
    es: {
      // Header
      'menu.toggle': 'Abrir Menú',
      'theme.toggle': 'Cambiar Tema',
      
      // Menu
      'menu.title': 'Menú Principal',
      'menu.dashboard': 'Panel',
      'menu.about': 'Acerca de',
      'menu.products': 'Productos',
      'menu.services': 'Servicios',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog y Perspectivas',
      'menu.docs': 'Documentación',
      'menu.support': 'Soporte',
      'menu.contact': 'Contacto',
      'menu.development': '🚀 En Desarrollo',
      'menu.coming_soon': 'Funcionalidades próximamente',
      
      // Terminal
      'terminal.title': 'manifiesto_caricax.txt',
      'terminal.command': 'cat manifiesto_caricax.txt',
      'terminal.prompt': 'caricax@caricax:~$',
      
      // Branding
      'brand.name': 'CARICAX',
      'brand.manifesto': 'MANIFIESTO',
      'brand.subtitle': 'Tecnología de la Información',
      'brand.slogan': 'Software como Derecho',
      'brand.description': 'Democratizando soluciones de TI sofisticadas para Micro y Pequeñas Empresas',
      
      // Coming Soon
      'coming_soon.tooltip': 'Próximamente',
      'coming_soon.badge': 'PRÓXIMAMENTE',
      
      // Social Media
      'social.connect': 'Conectar',
      'social.github': 'GitHub CARICAX',
      'social.linkedin': 'LinkedIn CARICAX',
      'social.instagram': 'Instagram CARICAX',
      
      // Language
      'language.switch': 'Cambiar idioma',
      'language.english': 'Inglés',
      'language.spanish': 'Español',
      'language.portuguese': 'Portugués',
      'language.german': 'Alemán',
      'language.french': 'Francés',
      'language.russian': 'Ruso',
      
      // CTAs
      'cta.learn_more': 'Saber Más',
      'cta.support': 'Apoyar',
      
      // Contact Form
      'form.title': 'Ponerse en Contacto',
      'form.subtitle': 'Cuéntanos sobre tu proyecto',
      'form.name': 'Nombre',
      'form.name.placeholder': 'Tu nombre completo',
      'form.email': 'Email',
      'form.email.placeholder': 'tu@email.com',
      'form.subject': 'Asunto',
      'form.subject.placeholder': 'Asunto del mensaje',
      'form.message': 'Mensaje',
      'form.message.placeholder': 'Describe tu proyecto o pregunta...',
      'form.submit': 'Enviar Mensaje',
      'form.sending': 'Enviando...',
      'form.success': '¡Mensaje enviado con éxito!',
      'form.error': 'Error al enviar mensaje. Inténtalo de nuevo.',
      'form.required': 'Campo obligatorio',
      'form.email.invalid': 'Email inválido',
      'form.close': 'Cerrar',
      
      // Philosophy Text
      'philosophy.text': `Caricax Information Technology surge de la comprensión de que las tecnologías, cada vez más sofisticadas e inherentes a la producción económica actual, mientras siguen siendo privilegio de unos pocos, se mantienen detrás de muros de pago y software propietario con usabilidad contraintuitiva.

Nuestra misión es democratizar soluciones de TI sofisticadas, convirtiéndolas en bien común para Micro y Pequeñas Empresas (MYPEs).

Defender el Software como Derecho expresa la comprensión de que el profesional de la tecnología, independientemente de su nivel, es, ante todo, un trabajador, al igual que los agentes comprometidos con el desarrollo de economías locales.

No se trata solo de líneas de código; se trata de materializar la alfabetización tecnológica del emprendedor local, liberándolo de oligopolios que se definen por las formas más anticuadas de negarse a adoptar enfoques centrados en el ser humano.`
    }
  };

  translate(key: string): string {
    const currentLang = this._currentLanguage();
    return this.translations[currentLang]?.[key] || key;
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this._currentLanguage.set(language);
      localStorage.setItem('caricax-language', language);
    }
  }

  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  getLanguageName(code: string): string {
    const names: { [key: string]: string } = {
      'pt': 'Português',
      'en': 'English',
      'es': 'Español'
    };
    return names[code] || code;
  }

  constructor() {
    // Load language from localStorage or default to 'pt'
    const savedLanguage = localStorage.getItem('caricax-language');
    if (savedLanguage && this.translations[savedLanguage]) {
      this._currentLanguage.set(savedLanguage);
    }
  }
}
