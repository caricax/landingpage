import { Injectable, signal, PLATFORM_ID, inject, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Translations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly availableLanguages: ReadonlyArray<Language> = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇦🇷' }
  ];

  // Use signal for reactive state
  readonly currentLanguage = signal<Language>(this.availableLanguages[0]);

  // Precomputed maps avoid linear scans on every language switch/set operation.
  private readonly languageByCode = new Map<string, Language>(
    this.availableLanguages.map((language) => [language.code, language])
  );

  private readonly languageIndexByCode = new Map<string, number>(
    this.availableLanguages.map((language, index) => [language.code, index])
  );

  // Long legal and manifesto texts are normalized once and then served from cache.
  private readonly normalizedLongTextCache = new Map<string, string>();

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly languageStorageKey = 'caricax-language';

  private readonly translations: Record<string, Translations> = {
    pt: {
      // Menu
      'menu.title': 'MENU',
      'menu.dashboard': 'Dashboard',
      'menu.about': 'Sobre nós',
      'menu.products': 'Produtos',
      'menu.services': 'Serviços',
      'menu.services.desc': 'Soluções digitais completas',
      'menu.portfolio': 'Portfólio',
      'menu.blog': 'Blog',
      'menu.docs': 'Documentação',
      'menu.support': 'Suporte',
      'menu.contact': 'Contato',
      'menu.development': 'Em desenvolvimento',
      'menu.coming_soon': 'Produtos & serviços em breve',
      'menu.coming_soon_badge': 'EM BREVE',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Diretrizes da marca CARICAX',
      'menu.produtos': 'Produtos',
      'menu.produtos.desc': 'Nossas soluções tecnológicas',
      'menu.labut.desc': 'Automação inteligente',

      // Labut.ai
      'labut.hero.subtitle': 'Automação inteligente para maximizar a produtividade empresarial',
      'labut.about.title': 'Sobre o labut.ai',
      'labut.about.description': 'Uma plataforma de automação empresarial baseada em inteligência artificial que otimiza processos, reduz custos operacionais e acelera a tomada de decisões através de análise preditiva e workflows inteligentes.',
      'labut.features.title': 'Principais Recursos',
      'labut.features.automation': 'Automação de processos repetitivos com IA',
      'labut.features.optimization': 'Otimização de recursos e custos operacionais',
      'labut.features.integration': 'Integração perfeita com sistemas existentes',
      'labut.features.analytics': 'Analytics avançados e relatórios em tempo real',
      'labut.tech.title': 'Tecnologia Avançada',
      'labut.tech.ai': 'Inteligência Artificial',
      'labut.tech.ai.desc': 'Machine Learning e processamento de linguagem natural',
      'labut.tech.workflow': 'Automação de Workflows',
      'labut.tech.workflow.desc': 'Processos empresariais automatizados e otimizados',
      'labut.tech.cloud': 'Infraestrutura em Nuvem',
      'labut.tech.cloud.desc': 'Escalabilidade e segurança garantidas',
      'labut.status': 'EM DESENVOLVIMENTO',
      'labut.cta.title': 'Interessado no labut.ai?',
      'labut.cta.description': 'Entre em contato conosco para saber mais sobre como nossa solução pode transformar seus processos empresariais.',
      'labut.cta.contact': 'Entrar em Contato',
      'labut.cta.learn_more': 'Saiba Mais',

      // Social
      'social.connect': 'Conecte-se',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'MANIFESTO',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Information Technology',
      'brand.slogan': 'Software as a Right!',
      'brand.description': 'Soluções de TI sofisticadas para Micro e Pequenas Empresas (MPEs).',


      // CTA
      'cta.learn_more': 'SAIBA MAIS',
      'cta.support': 'APOIE',
      'contact.linkedin.label': 'LinkedIn CARICAX',
      'support.community.eyebrow': 'Apoio comunitário',
      'support.community.title': 'Ajude a CARICAX a renovar o domínio',
      'support.community.body': 'Enquanto o domínio próprio está indisponível, esta SPA fica temporariamente no GitHub Pages. Se a CARICAX já te ajudou, inspirou ou economizou tempo, considere contribuir voluntariamente para apoiar a renovação do domínio e manter a presença digital da empresa acessível.',
      'support.community.note': 'Os links de apoio usam o mantenedor kernelpenguin, mas o pedido é para sustentar a presença digital temporária da CARICAX.',
      'support.community.footer': 'Contribuição voluntária para apoiar a renovação do domínio. Os links usam o mantenedor kernelpenguin em benefício da presença digital temporária da CARICAX.',
      'support.community.github': 'Apoiar no GitHub Sponsors',
      'support.community.coffee': 'Apoiar no Buy Me a Coffee',
      'support.community.linkedin': 'Falar com a CARICAX no LinkedIn',

      // Form
      'form.learn_more.title': 'Saiba Mais sobre a Caricax',
      'form.learn_more.subtitle': 'O domínio próprio está temporariamente indisponível. Para contato institucional, fale com a CARICAX pelo LinkedIn.',
      'form.learn_more.subject': 'Solicitação de Mais Informações',
      'form.learn_more.linkedin_note': 'Não estamos coletando mensagens por formulário nesta fase. O botão abaixo abre o LinkedIn oficial da CARICAX em uma nova aba.',
      'form.linkedin.cta': 'Abrir LinkedIn',
      'form.name': 'Nome',
      'form.name.placeholder': 'Seu nome completo',
      'form.email': 'Email',
      'form.email.placeholder': 'seu@email.com',
      'form.company': 'Empresa',
      'form.company.placeholder': 'Nome da sua empresa (opcional)',
      'form.message': 'Mensagem',
      'form.message.placeholder': 'Conte-nos sobre seu projeto ou necessidades...',
      'form.send': 'Enviar',
      'form.sending': 'Enviando...',
      'form.cancel': 'Cancelar',
      'form.close': 'Fechar',
      'form.success': 'LinkedIn aberto para contato institucional.',
      'form.error': 'Não foi possível abrir o canal de contato. Tente pelo menu social.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Carianos, Florianópolis, Santa Catarina, Brasil',
      'footer.rights': 'Direitos reservados',
      'footer.full': '2025 Caricax Information Technology. Carianos, Florianópolis, Santa Catarina, Brasil.',
      'footer.license': 'Licenciado sob a',
      'footer.license.mit': 'Licença MIT',
      'footer.inquiries': 'Para dúvidas:',
      'footer.legal.summary': 'Privacidade em primeiro lugar. Informações legais essenciais no modal.',
      'footer.link.privacy': 'Política de Privacidade',
      'footer.link.terms': 'Termos de Uso',
      'footer.link.cookies': 'Política de Cookies',
      'footer.link.lgpd': 'LGPD / GDPR e Direitos do Titular',
      'footer.link.mit': 'Licença MIT',
      'footer.link.compliance': 'Privacidade, LGPD e GDPR',
      'footer.link.accessibility': 'Doc. Acessibilidade',
      'footer.contact.prefix': 'Contato temporário via LinkedIn:',
      'footer.domain_migration': 'Este site está temporariamente rodando fora do domínio caricax.software.',

      // Accessibility modal content
      'accessibility.title': 'Alto Contraste',
      'accessibility.desc': 'Ative para maximizar legibilidade e separar claramente elementos interativos.',
      'accessibility.btn.activate': 'Ativar Alto Contraste',
      'accessibility.btn.deactivate': 'Desativar Alto Contraste',
      'accessibility.p1': 'Acessibilidade é requisito de engenharia, não adereço visual. Na Caricax, ela sustenta Letramento Tecnológico, autonomia operacional e participação no espaço digital.',
      'accessibility.li1': 'Navegação completa por teclado em fluxos essenciais.',
      'accessibility.li2': 'Compatibilidade com leitores de tela e semântica previsível.',
      'accessibility.li3': 'Mensagens claras, técnicas e acionáveis em linguagem objetiva.',
      'accessibility.li4': 'Modo de Alto Contraste para leitura robusta em ambientes críticos (agora a um clique no menu superior).',

      // Legal modal content
      'legal.compliance.title': 'Privacidade, Termos, LGPD e GDPR',
      'legal.privacy.title': 'Política de Privacidade',
      'legal.privacy.body': 'Adotamos postura privacy-first com minimização de dados. Coletamos apenas o necessário para contato institucional e segurança operacional da plataforma.\n\nDurante a publicação temporária no GitHub Pages, o contato institucional é encaminhado ao LinkedIn oficial da CARICAX. Não vendemos dados pessoais e não realizamos perfilização comercial de usuários desta landing.\n\nA base legal é aplicada conforme o caso concreto: consentimento, medidas pré-contratuais e legítimo interesse para segurança e prevenção de abuso.\n\nO tratamento de dados observa integralmente os princípios estabelecidos pelo Art. 6 da LGPD: finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.\n\nNão realizamos decisões automatizadas (Art. 20 da LGPD) que produzam efeitos jurídicos significativos sobre o titular nesta plataforma.\n\nVocê pode solicitar acesso, correção, eliminação quando cabível e demais direitos previstos na LGPD e GDPR pelos canais oficiais da plataforma.',
      'legal.terms.title': 'Termos de Uso',
      'legal.terms.body': 'Este ambiente é uma SPA institucional da Caricax Information Technology. O uso pressupõe respeito à legislação brasileira e a estes termos.\n\nO conteúdo tem finalidade informativa e pode ser atualizado para refletir mudanças técnicas, jurídicas ou operacionais.\n\nÉ vedado tentar acesso indevido, comprometer disponibilidade, realizar coleta automatizada abusiva ou praticar engenharia reversa maliciosa.\n\nA marca CARICAX e seus sinais distintivos permanecem protegidos. O software segue modelo open-source sob licença MIT.',
      'legal.cookies.title': 'Política de Cookies',
      'legal.cookies.body': 'Utilizamos somente recursos técnicos estritamente necessários para funcionamento, acessibilidade e segurança da aplicação.\n\nNão adotamos cookies de rastreamento comportamental por padrão nesta landing institucional.\n\nSe houver futura ativação de medição opcional, ela será condicionada a consentimento prévio e informado, implementado por mecanismo de opt-in granular com possibilidade de revogação a qualquer momento.',
      'legal.lgpd.title': 'LGPD / GDPR e Direitos do Titular',
      'legal.lgpd.body': `A CARICAX Information Technology tem um compromisso inegociável com a privacidade e a segurança dos dados. Operamos em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) do Brasil e com o Regulamento Geral sobre a Proteção de Dados (GDPR - Regulamento UE 2016/679).

Princípios Fundamentais:
Todo tratamento de dados realizado pela CARICAX é guiado pelos princípios da finalidade, adequação, minimização (necessidade), livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.

Direitos do Titular dos Dados:
Conforme estabelecido pela LGPD (Art. 18) e pela GDPR (Capítulo III), garantimos aos nossos usuários, de forma facilitada e gratuita, o exercício dos seguintes direitos:
• Confirmação e Acesso: Obter a confirmação da existência de tratamento e o acesso aos dados pessoais que possuímos sobre você.
• Retificação: Correção de dados incompletos, inexatos ou desatualizados.
• Eliminação e Esquecimento: Solicitar a exclusão dos seus dados tratados com consentimento ou desnecessários para a finalidade original, exceto nos casos de guarda obrigatória por lei.
• Portabilidade: Requerer a transferência dos seus dados para outro fornecedor de serviço ou produto, mediante requisição expressa.
• Restrição e Oposição: Opor-se ao tratamento realizado com fundamento em uma das hipóteses de dispensa de consentimento ou solicitar a limitação do tratamento (GDPR).
• Revogação do Consentimento: Retirar o seu consentimento a qualquer momento, bem como solicitar informações sobre as consequências da negativa.
• Informação de Compartilhamento: Saber com quais entidades públicas ou privadas compartilhamos seus dados.

Exercício de Direitos e DPO:
Para exercer qualquer um destes direitos ou sanar dúvidas sobre como processamos suas informações, utilize os canais oficiais temporários indicados na plataforma, com prioridade para o LinkedIn da CARICAX.

Para a proteção do próprio titular e a fim de evitar vazamentos, a CARICAX poderá solicitar uma validação mínima de identidade antes de fornecer informações ou executar deleções.`,
      'legal.mit.title': 'Licença MIT',
      'legal.mit.body': 'Esta aplicação adota licença MIT para o código-fonte, permitindo uso, cópia, modificação e distribuição, desde que o aviso de copyright e o texto da licença sejam preservados.\n\nA licença é fornecida "como está", sem garantias expressas ou implícitas.',
      'legal.mit.link.label': 'Ler texto oficial da Licença MIT',
      'legal.mit.link.url': 'https://opensource.org/licenses/MIT',

      // Theme
      'theme.toggle': 'Alternar tema',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Ativar modo claro',
      'header.theme.dark': 'Ativar modo escuro',
      'header.language': 'Alternar idioma',
      'header.accessibility': 'Configurações de acessibilidade',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'Transformamos suas ideias em realidade digital com soluções inovadoras e design excepcional.',
      'hero.cta.service': 'Solicitar Serviço',
      'hero.cta.portfolio': 'Conhecer Portfólio',

      // Features
      'features.fast.title': 'Rápido',
      'features.fast.description': 'Desenvolvimento ágil e entrega no prazo',
      'features.innovative.title': 'Inovador',
      'features.innovative.description': 'Tecnologias modernas e soluções criativas',
      'features.dedicated.title': 'Dedicado',
      'features.dedicated.description': 'Suporte completo e relacionamento próximo',

      // Philosophy Section
      'philosophy.title': 'Nossa Filosofia',
      'philosophy.subtitle': 'Democratizando o acesso à tecnologia e promovendo o desenvolvimento sustentável',

      // Navigation
      'nav.title': 'Navegação',
      'nav.services': 'Serviços',
      'nav.services.desc': 'Nossas soluções',
      'nav.portfolio': 'Portfólio',
      'nav.portfolio.desc': 'Nossos projetos',
      'nav.about': 'Sobre',
      'nav.about.desc': 'Quem somos',
      'nav.contact': 'Contato',
      'nav.contact.desc': 'Fale conosco',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat manifesto_caricax.txt',
      'terminal.philosophy': `A Caricax Information Technology surge da compreensão de que as tecnologias, cada vez mais sofisticadas e inerentes à produção econômica atual, enquanto privilégio de poucos, mantêm-se atrás de paywalls e softwares proprietários de usabilidade contraintuitiva.

Nossa missão é democratizar soluções de TI sofisticadas, tornando-as bem comum de Micro e Pequenas Empresas (MPEs). Defender Software como um Direito exprime a compreensão de que o profissional da tecnologia, independentemente de senioridade, é, antes, um trabalhador, assim como agentes engajados com o desenvolvimento de economias locais são.

Não se trata apenas de linhas de código; trata-se de concretizar o letramento tecnológico do empreendedor local, libertando-o de oligopólios, que se definem pela mais antiquada das maneiras de recusa à adoção de abordagens human-first.`,

      // Manifesto
      'manifesto.back': 'Voltar ao início',
      'manifesto.title': 'MANIFESTO',
      'manifesto.intro': 'A Caricax Information Technology surge da compreensão de que as tecnologias, cada vez mais sofisticadas e inerentes à produção econômica atual, enquanto privilégio de poucos, mantêm-se atrás de paywalls e softwares proprietários de usabilidade contraintuitiva.',
      'manifesto.mission': 'Nossa missão é democratizar soluções de TI sofisticadas, tornando-as bem comum de Micro e Pequenas Empresas (MPEs).',
      'manifesto.section1.title': '1. Em defesa do open source: Software as a Right',
      'manifesto.section1.content1': 'Defender Software como um Direito exprime a compreensão de que o profissional da tecnologia, independentemente de senioridade, é, antes, um trabalhador, assim como agentes engajados com o desenvolvimento de economias locais são.',
      'manifesto.section1.code': `java
public Trabalhador(int id, String nome) throws Exception {
   this.id = id;
   if (nome != null && !nome.isEmpty())
      throw new Exception("Nome? Pff! You're just another database numbered key!");
}`,
      'manifesto.section1.content2': 'Não se trata apenas de linhas de código; trata-se de concretizar o letramento tecnológico do empreendedor local, libertando-o de oligopólios, que se definem pela mais antiquada das maneiras de recusa à adoção de abordagens human-first.',
      'manifesto.section1.quote.title': 'Justificativa:',
      'manifesto.section1.quote.content': 'Na era digital, as grandes corporações alienam o ser humano, transformando sua identidade e suas interações em mercadorias para lucro. O software livre é uma revolta contra essa alienação: é a recusa de se submeter a um conjunto de práticas que atenta contra a possibilidade de autodeterminação do individuo; um chamado à emancipação digital!',
      'manifesto.section2.title': '2. Logo',
      'manifesto.section2.intro': 'Nosso logotipo consiste em dois elementos principais: o Símbolo e o Wordmark. Eles podem ser usados separadamente ou juntos: basta tão somente respeitar a licença.',
      'manifesto.section2.symbol.title': 'Símbolo',
      'manifesto.section2.symbol.content': 'Uma forma que, em termos de semiótica, representa a relação fenomenológica que geralmente se tem ao adentrar à Ilha de Santa Catarina. A referência à Ponte Hercílio Luz, bem como uma abstrata representação do contorno viário que dá acesso ao bairro Carianos.',
      'manifesto.section2.wordmark.title': 'Wordmark',
      'manifesto.section2.wordmark.content': 'O nome "CARICAX" na fonte Noto Serif, com um gradiente que vai de #fe6d03 para #08c408.',
      'manifesto.section2.quote.title': 'Justificativa:',
      'manifesto.section2.quote.content': 'O sistema de logotipo foi projetado para comunicar visualmente os valores de conexão, crescimento e inovação, alinhados com a missão central da Caricax.',
      'manifesto.section3.title': '3. Paleta de Cores',
      'manifesto.section3.primary': 'Cores Primárias',
      'manifesto.section3.gradients': 'Gradientes',
      'manifesto.section4.title': '4. Tipografia',
      'manifesto.section4.primary': 'Noto Serif',
      'manifesto.section4.primary.desc': 'Fonte primária para títulos e wordmark',
      'manifesto.section4.secondary': 'Hack',
      'manifesto.section4.secondary.desc': 'Fonte secundária para texto e interface',
      'manifesto.section5.title': '5. Tom de Voz',
      'manifesto.section5.content': 'Trata-se, antes, de um grito a plenos pulmões: Open Source!',
      'manifesto.section5.keywords': 'Palavras-chave:',
      'manifesto.license.title': 'Informações da Licença',
      'manifesto.contact.title': 'Contato',
      'manifesto.keywords.software_right': 'Software como um Direito',
      'manifesto.keywords.sustainability': 'Sustentabilidade',
      'manifesto.keywords.accessibility': 'Acessibilidade',
      'manifesto.keywords.ethics': 'Ética',
      'manifesto.keywords.ai': 'IA',
      'manifesto.keywords.security': 'Segurança',
      'manifesto.keywords.privacy': 'Privacidade',
      'manifesto.brand_usage.title': 'Diretrizes de Uso da Marca',

      // Branding Guidelines
      'branding.back': 'Voltar ao início',
      'branding.title': 'BRAND GUIDELINES',
      'branding.subtitle': 'Diretrizes completas para uso correto da marca CARICAX em todas as aplicações comerciais e educacionais.',
      'branding.legal.title': 'Aviso Legal',
      'branding.legal.content': 'Todas as cores, tipografias e elementos visuais são de uso livre sob a licença MIT.',

      // Logo Section
      'branding.logo.title': 'Logo e Símbolo',
      'branding.logo.primary': 'Logo Primário',
      'branding.logo.primary.desc': 'Versão principal do logo CARICAX para uso em fundos claros e escuros.',
      'branding.logo.specs.title': 'Especificações Técnicas',
      'branding.logo.specs.format': 'Formatos',
      'branding.logo.specs.minsize': 'Tamanho Mínimo',
      'branding.logo.specs.clearspace': 'Área de Proteção',
      'branding.logo.specs.background': 'Fundos',
      'branding.logo.donts.title': 'O que NÃO fazer',
      'branding.logo.donts.distort': 'Não distorcer ou esticar o logo',
      'branding.logo.donts.rotate': 'Não rotacionar ou inclinar',
      'branding.logo.donts.recolor': 'Não alterar cores sem autorização',
      'branding.logo.donts.shadow': 'Não adicionar sombras ou efeitos',

      // Colors Section
      'branding.colors.title': 'Paleta de Cores',
      'branding.colors.usage.title': 'Diretrizes de Uso',
      'branding.colors.usage.primary': 'Cores Primárias',
      'branding.colors.usage.primary.desc': 'Use CARICAX Green (#28aa6a) como cor principal para elementos de destaque e identidade.',
      'branding.colors.usage.accent': 'Cores de Destaque',
      'branding.colors.usage.accent.desc': 'CARICAX Orange (#fe6d03) para acentos e chamadas de ação importantes.',

      // Typography Section
      'branding.typography.title': 'Tipografia',
      'branding.typography.primary': 'Noto Serif',
      'branding.typography.primary.desc': 'Fonte principal para títulos, marca e wordmark.',
      'branding.typography.secondary': 'Hack',
      'branding.typography.secondary.desc': 'Fonte para corpo, UI, botões, formulários, menus, terminais e textos técnicos.',

      // Usage Guidelines
      'branding.usage.title': 'O COMBINADO NÃO SAI CARO: AS REGRA DA CARICAX IT',
      'branding.usage.intro': '**1. PRA COMEÇO DE CONVERSA**\nSe liga no nosso papo, quiridx. A gente fez essas regra pra não dar rolo depois. Aqui a gente separa o que é o sistema (o código) do que é a nossa cara (a marca). A gente pode dar uma espiada no que tás fazendo e, se pá, mandar tu te picares com o nosso logo se fizeres cagada.',
      'branding.usage.dos.title': '2. AS REGRA DO JOGO DA MARCA\nA marca Caricax e o logo são tudo nosso. O código até é livre, mas a nossa marca não é festa, visse?',
      'branding.usage.dos.respect': '* **2.1. A Principal:** Não te faz de doido pra cima da galera. Nem inventa mentira dizendo que somos cupincha se não for verdade. Tua marca tem que aparecer mais que a nossa. E não mexe no nosso logo, mô quiridu, ele já dá um banho do jeito que tá. Um salve pro mano Tábila, nosso designer.',
      'branding.usage.dos.permission': '* **2.2. Propaganda e Rolo de Grana:** Vai usar nosso logo onde rola uma moeda? Ô, chega aí trocar uma ideia por escrito antes. Agora, se for só pra falar que és cliente e curtes o trampo, só dale, fei!',
      'branding.usage.dos.clearspace': '* **2.3. Pra Ensinar os Ganiza (Cursos e Livros):** Queres usar pra ensinar a raça? Tá sussa. Mas não deixa a galera achar que o material é nosso. Nem pensar em botar o logo na capa de livro, tás tolo? Bota um recadinho assim: *"[Nome da tua parada] foi inspirada pela Caricax IT, a firma é forte!"*',
      'branding.usage.dos.contrast': '* **2.4. Nome e Site:** Não usa "Caricax" no teu produto se não fores da área e sem pedir bênção. E te pica da ideia de registrar site (domínio) com nosso nome ou parecido, senão o bambu ronca.',
      'branding.usage.dos.attribution': '* **2.5. Camiseta e Pá:** A gente que faz as nossas peita e os brindes, ei. Não te mete a vender coisa com nosso logo.',
      'branding.usage.section3.title': '3. DÁ OS CRÉDITO',
      'branding.usage.section3.content': 'Se fores usar certinho, bota essa linhazinha lá no finzinho, na miúda:\n\n> *"A marca Caricax e o desenho do logo são propriedade registrada da Caricax Information Technology, Florianópolis, Santa Catarina, Brasil."*',
      'branding.usage.section4.title': '4. O CÓDIGO É LIVRE, A MARCA NÃO (A TAL DA LICENÇA MIT)',
      'branding.usage.section4.content': 'O código dos nossos programa aberto tu podes usar de boa, mas te liga na pegadinha da marca:\n\n> **Copyright (c) 2026 Caricax Information Technology**\n> Tá liberado, na faixa, pra qualquer um que pegar esse software fazer o que quiser: usar, copiar, mexer, juntar, dar pros outros ou até vender o código. Mas tem uma condição, seu istepô:\n> Esse aviso aqui de cima tem que ir junto em toda cópia que tu fizeres.\n> *O Aviso da Marca:* Essa liberação é só pro código! Não te dá direito nenhum de usar nosso nome "Caricax" ou nosso logo pra vender as tuas coisas, a não ser pra dizer de onde o código veio.\n> O SISTEMA VAI DO JEITO QUE TÁ, sem garantia nenhuma. Se der chabú, se não servir pro que tu queres ou der rolo, não vem chorar as pitanga. A gente não se responsabiliza por prejuízo nenhum que der usando isso aí, visse?',

      // Footer
      'branding.footer.title': 'Tás com Dúvida, Istepô?',
      'branding.footer.subtitle': 'Se ainda tás com pulga atrás da orelha, chama a CARICAX pelo LinkedIn oficial. Facilita a vida se tu já mandares um desenho de como vai ficar; muito trampo por aqui. A ideia é responder ligeiro, mas te acalma e espera umas duas semanas, belê? Ei! E te liga, pô: a ausência de resposta não quer dizer que tá tudo liberado. Não te fresqueia, que silêncio não é "sim". Tendeu?',
    },

    en: {
      // Menu
      'menu.title': 'MENU',
      'menu.dashboard': 'Dashboard',
      'menu.about': 'About us',
      'menu.products': 'Products',
      'menu.services': 'Services',
      'menu.services.desc': 'Complete digital solutions',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog',
      'menu.docs': 'Documentation',
      'menu.support': 'Support',
      'menu.contact': 'Contact',
      'menu.development': 'Under development',
      'menu.coming_soon': 'Products & services coming soon',
      'menu.coming_soon_badge': 'COMING SOON',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Brand guidelines and identity',
      'menu.produtos': 'Products',
      'menu.produtos.desc': 'Our technology solutions',
      'menu.labut.desc': 'Intelligent automation',

      // Labut.ai
      'labut.hero.subtitle': 'Intelligent automation to maximize business productivity',
      'labut.about.title': 'About labut.ai',
      'labut.about.description': 'An AI-powered business automation platform that optimizes processes, reduces operational costs, and accelerates decision-making through predictive analytics and intelligent workflows.',
      'labut.features.title': 'Key Features',
      'labut.features.automation': 'AI-powered automation of repetitive processes',
      'labut.features.optimization': 'Resource and operational cost optimization',
      'labut.features.integration': 'Seamless integration with existing systems',
      'labut.features.analytics': 'Advanced analytics and real-time reporting',
      'labut.tech.title': 'Advanced Technology',
      'labut.tech.ai': 'Artificial Intelligence',
      'labut.tech.ai.desc': 'Machine Learning and natural language processing',
      'labut.tech.workflow': 'Workflow Automation',
      'labut.tech.workflow.desc': 'Automated and optimized business processes',
      'labut.tech.cloud': 'Cloud Infrastructure',
      'labut.tech.cloud.desc': 'Guaranteed scalability and security',
      'labut.status': 'IN DEVELOPMENT',
      'labut.cta.title': 'Interested in labut.ai?',
      'labut.cta.description': 'Contact us to learn more about how our solution can transform your business processes.',
      'labut.cta.contact': 'Get in Touch',
      'labut.cta.learn_more': 'Learn More',

      // Social
      'social.connect': 'Connect',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'MANIFESTO',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Information Technology',
      'brand.slogan': 'Software as a Right!',
      'brand.description': 'Sophisticated IT solutions for Micro and Small Enterprises (MSEs).',

      // CTA
      'cta.learn_more': 'LEARN MORE',
      'cta.support': 'SUPPORT',
      'contact.linkedin.label': 'CARICAX LinkedIn',
      'support.community.eyebrow': 'Community support',
      'support.community.title': 'Help CARICAX renew its domain',
      'support.community.body': 'While the custom domain is unavailable, this SPA is temporarily hosted on GitHub Pages. If CARICAX has helped, inspired, or saved you time, consider a voluntary contribution to support the domain renewal and keep the company\'s digital presence accessible.',
      'support.community.note': 'Support links use the maintainer kernelpenguin, but this request is for CARICAX\'s temporary digital presence.',
      'support.community.footer': 'Voluntary support for the domain renewal. Links use the kernelpenguin maintainer profile for CARICAX\'s temporary digital presence.',
      'support.community.github': 'Support on GitHub Sponsors',
      'support.community.coffee': 'Support on Buy Me a Coffee',
      'support.community.linkedin': 'Contact CARICAX on LinkedIn',

      // Form
      'form.service.title': 'Service Request',
      'form.learn_more.title': 'Learn More about Caricax',
      'form.learn_more.subtitle': 'The custom domain is temporarily unavailable. For institutional contact, reach CARICAX on LinkedIn.',
      'form.learn_more.subject': 'Request for More Information',
      'form.learn_more.linkedin_note': 'We are not collecting form messages during this phase. The button below opens the official CARICAX LinkedIn in a new tab.',
      'form.linkedin.cta': 'Open LinkedIn',
      'form.name': 'Name',
      'form.name.placeholder': 'Your full name',
      'form.email': 'Email',
      'form.email.placeholder': 'your@email.com',
      'form.company': 'Company',
      'form.company.placeholder': 'Your company name (optional)',
      'form.message': 'Message',
      'form.message.placeholder': 'Tell us about your project or needs...',
      'form.send': 'Send',
      'form.sending': 'Sending...',
      'form.cancel': 'Cancel',
      'form.close': 'Close',
      'form.success': 'LinkedIn opened for institutional contact.',
      'form.error': 'Could not open the contact channel. Try the social menu instead.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Carianos, Florianópolis, Santa Catarina, Brazil',
      'footer.rights': 'All rights reserved',
      'footer.full': '2025 Caricax Information Technology. Carianos, Florianópolis, Santa Catarina, Brazil.',
      'footer.license': 'Licensed under the',
      'footer.license.mit': 'MIT License',
      'footer.inquiries': 'For inquiries:',
      'footer.legal.summary': 'Privacy-first legal surface with essential links only.',
      'footer.link.privacy': 'Privacy Policy',
      'footer.link.terms': 'Terms of Use',
      'footer.link.cookies': 'Cookie Policy',
      'footer.link.lgpd': 'LGPD / GDPR and Data Subject Rights',
      'footer.link.mit': 'MIT License',
      'footer.link.compliance': 'Privacy, LGPD and GDPR',
      'footer.link.accessibility': 'Accessibility Docs',
      'footer.contact.prefix': 'Temporary contact via LinkedIn:',
      'footer.domain_migration': 'This site is temporarily running outside the caricax.software domain.',

      // Accessibility modal content
      'accessibility.title': 'High Contrast',
      'accessibility.desc': 'Activate to maximize legibility and clearly separate interactive elements.',
      'accessibility.btn.activate': 'Enable High Contrast',
      'accessibility.btn.deactivate': 'Disable High Contrast',
      'accessibility.p1': 'Accessibility is an engineering requirement, not a visual ornament. At Caricax, it sustains Technological Literacy, operational autonomy, and participation in the digital space.',
      'accessibility.li1': 'Full keyboard navigation in essential flows.',
      'accessibility.li2': 'Screen reader compatibility and predictable semantics.',
      'accessibility.li3': 'Clear, technical, and actionable messages in objective language.',
      'accessibility.li4': 'High Contrast mode for robust reading in critical environments (now one click away in the top menu).',

      // Legal modal content
      'legal.compliance.title': 'Privacy, Terms, LGPD and GDPR',
      'legal.privacy.title': 'Privacy Policy',
      'legal.privacy.body': 'We follow a privacy-first model with strict data minimization. We process only what is necessary for institutional contact and platform security.\n\nDuring the temporary GitHub Pages publication, institutional contact is routed to the official CARICAX LinkedIn. Personal data is not sold and this landing does not perform behavioral profiling.\n\nLegal basis is applied case by case: consent, pre-contractual measures, and legitimate interest for abuse prevention and security.\n\nData processing fully observes the principles established by LGPD Art. 6: purpose, adequacy, necessity, free access, data quality, transparency, security, prevention, non-discrimination, and accountability.\n\nAutomated decision-making (LGPD Art. 20) producing significant legal effects on the data subject is not performed on this platform.\n\nYou may exercise your data rights under LGPD through the platform\'s official support channels.',
      'legal.terms.title': 'Terms of Use',
      'legal.terms.body': 'This environment is an institutional SPA by Caricax Information Technology. Use of the platform requires compliance with Brazilian law and these terms.\n\nContent is informational and may be updated to reflect legal, technical, or operational changes.\n\nUnauthorized access attempts, malicious reverse engineering, abusive scraping, or availability disruption are prohibited.\n\nThe CARICAX trademark and distinctive signs remain protected. The software follows an open-source MIT model.',
      'legal.cookies.title': 'Cookie Policy',
      'legal.cookies.body': 'Only strictly necessary technical resources are used for operation, accessibility, and security.\n\nBehavioral tracking cookies are not enabled by default on this institutional landing page.\n\nIf optional analytics or personalization is added in the future, prior informed consent will be required, implemented through a granular opt-in mechanism with the possibility of revocation at any time.',
      'legal.lgpd.title': 'LGPD / GDPR and Data Subject Rights',
      'legal.lgpd.body': `CARICAX Information Technology has an uncompromising commitment to privacy and data security. We operate in strict compliance with the Brazilian General Data Protection Law (LGPD - Law No. 13,709/2018) and the EU General Data Protection Regulation (GDPR - Regulation EU 2016/679).

Fundamental Principles:
All data processing performed by CARICAX is guided by the principles of purpose limitation, data minimization, accuracy, storage limitation, integrity, confidentiality, transparency, and accountability.

Data Subject Rights:
As established by LGPD (Art. 18) and GDPR (Chapter III), we guarantee our users the facilitated and free exercise of the following rights:
• Access and Confirmation: Obtain confirmation as to whether or not personal data concerning you are being processed, and access your data.
• Rectification: Correction of incomplete, inaccurate, or outdated data.
• Erasure (Right to be Forgotten): Request the deletion of data processed with your consent or no longer necessary for the original purpose, except where legal retention is required.
• Data Portability: Request the transfer of your data to another service provider.
• Restriction and Objection: Object to data processing based on legitimate interests or request the restriction of processing.
• Withdrawal of Consent: Withdraw your consent at any time, and be informed about the consequences of refusal.
• Information on Data Sharing: Know which public and private entities we share your data with.

Exercising Rights and DPO:
To exercise any of these rights or if you have questions about how we process your information, use the temporary official channels indicated on the platform, with priority to CARICAX LinkedIn.

For the protection of the data subject and to prevent breaches, CARICAX may request minimal identity validation before providing information or executing deletions.`,
      'legal.mit.title': 'MIT License',
      'legal.mit.body': 'This application uses the MIT License for source code, allowing use, copy, modification, and distribution, provided the copyright notice and license text are preserved.\n\nMIT-licensed software is provided "as is", without express or implied warranties.',
      'legal.mit.link.label': 'Read the official MIT License text',
      'legal.mit.link.url': 'https://opensource.org/licenses/MIT',

      // Theme
      'theme.toggle': 'Toggle theme',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Enable light mode',
      'header.theme.dark': 'Enable dark mode',
      'header.language': 'Switch language',
      'header.accessibility': 'Accessibility settings',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'We transform your ideas into digital reality with innovative solutions and exceptional design.',
      'hero.cta.service': 'Request Service',
      'hero.cta.portfolio': 'View Portfolio',

      // Features
      'features.fast.title': 'Fast',
      'features.fast.description': 'Agile development and on-time delivery',
      'features.innovative.title': 'Innovative',
      'features.innovative.description': 'Modern technologies and creative solutions',
      'features.dedicated.title': 'Dedicated',
      'features.dedicated.description': 'Complete support and close relationships',

      // Philosophy Section
      'philosophy.title': 'Our Philosophy',
      'philosophy.subtitle': 'Democratizing access to technology and promoting sustainable development',

      // Navigation
      'nav.title': 'Navigation',
      'nav.services': 'Services',
      'nav.services.desc': 'Our solutions',
      'nav.portfolio': 'Portfolio',
      'nav.portfolio.desc': 'Our projects',
      'nav.about': 'About',
      'nav.about.desc': 'Who we are',
      'nav.contact': 'Contact',
      'nav.contact.desc': 'Talk to us',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat caricax_philosophy.txt',
      'terminal.philosophy': `Caricax Information Technology emerges from the understanding that technologies, increasingly sophisticated and inherent to current economic production, while being the privilege of few, remain behind paywalls and proprietary software with counterintuitive usability.

Our mission is to democratize sophisticated IT solutions, making them common good for Micro and Small Enterprises (MSEs). Defending Software as a Right expresses the understanding that the technology professional, regardless of seniority, is, first and foremost, a worker, just like agents engaged with the development of local economies are.

It's not just about lines of code; it's about materializing the technological literacy of the local entrepreneur, freeing them from oligopolies, which define themselves in the most antiquated ways of refusing to adopt human-first approaches.`,

      // Branding Guidelines
      'branding.back': 'Back to home',
      'branding.title': 'BRAND GUIDELINES',
      'branding.subtitle': 'Complete guidelines for correct use of CARICAX brand in all commercial and educational applications.',
      'branding.legal.title': 'Legal Notice',
      'branding.legal.content': 'All colors, typography and visual elements are free to use under the MIT license.',

      // Logo Section
      'branding.logo.title': 'Logo and Symbol',
      'branding.logo.primary': 'Primary Logo',
      'branding.logo.primary.desc': 'Main version of CARICAX logo for use on light and dark backgrounds.',
      'branding.logo.specs.title': 'Technical Specifications',
      'branding.logo.specs.format': 'Formats',
      'branding.logo.specs.minsize': 'Minimum Size',
      'branding.logo.specs.clearspace': 'Clear Space',
      'branding.logo.specs.background': 'Backgrounds',
      'branding.logo.donts.title': 'What NOT to do',
      'branding.logo.donts.distort': 'Do not distort or stretch the logo',
      'branding.logo.donts.rotate': 'Do not rotate or tilt',
      'branding.logo.donts.recolor': 'Do not change colors without authorization',
      'branding.logo.donts.shadow': 'Do not add shadows or effects',

      // Colors Section
      'branding.colors.title': 'Color Palette',
      'branding.colors.usage.title': 'Usage Guidelines',
      'branding.colors.usage.primary': 'Primary Colors',
      'branding.colors.usage.primary.desc': 'Use CARICAX Green (#28aa6a) as main color for highlights and brand identity.',
      'branding.colors.usage.accent': 'Accent Colors',
      'branding.colors.usage.accent.desc': 'CARICAX Orange (#fe6d03) for accents and important call-to-actions.',

      // Typography Section
      'branding.typography.title': 'Typography',
      'branding.typography.primary': 'Noto Serif',
      'branding.typography.primary.desc': 'Primary font for titles, brand and wordmark.',
      'branding.typography.secondary': 'Hack',
      'branding.typography.secondary.desc': 'Font for body copy, UI, buttons, forms, menus, terminals and technical text.',

      // Usage Guidelines
      'branding.usage.title': 'TERMS OF USE, TRADEMARK GUIDELINES, AND LICENSING: CARICAX INFORMATION TECHNOLOGY',
      'branding.usage.intro': '**1. PRELIMINARY PROVISIONS**\nPrior agreements preserve institutional integrity and prevent litigation. This instrument regulates the use of Caricax Information Technology\'s intellectual property assets, expressly distinguishing the source code (software) from its visual identity (trademark). We reserve the right to audit your use and, at our sole discretion, modify these guidelines or summarily revoke authorization to display our logo.',
      'branding.usage.dos.title': '2. TRADEMARK USAGE GUIDELINES\nThe "Caricax" brand, as well as all rights and benefits arising from its logo, are the exclusive property of our headquarters. The permissiveness granted to our software (see Section 4) does not extend to our visual identity.',
      'branding.usage.dos.respect': '* **2.1. Core Rule:** Strict public probity is required. It is strictly forbidden to publish false statements suggesting a lack of support from Caricax or omitting the lawful nature of our institutional partnership. Your own brand or company name must hold greater visual prominence than our logo. Altering our logo is strictly prohibited; its original design must remain unchanged, respecting the moral and economic rights of its author, graphic designer Mr. Tábila.',
      'branding.usage.dos.permission': '* **2.2. Advertising and Commercial Use:** If you intend to use our logo on websites, physical products, or any materials linked to financial transactions, prior written consent is mandatory. However, if the purpose is strictly declaratory—limited to communicating your status as a client or expressing institutional satisfaction—such use is authorized.',
      'branding.usage.dos.clearspace': '* **2.3. Educational Purposes (Courses, Books, and Lectures):** Using our brand for public instruction is permitted. However, you must not mislead the target audience into believing the educational material belongs to Caricax. For example, placing our logo on book covers is strictly prohibited. A discrete mention is recommended: *"[Your Project Name] was inspired by the expertise of Caricax IT."*',
      'branding.usage.dos.contrast': '* **2.4. Product Naming and Domains:** Using the term "Caricax" to name third-party products is prohibited, except with authorization for agents within the same technological niche. Juxtaposing or overlapping our logo with yours is forbidden. Under no circumstances is it permitted to register internet domains (URLs) containing our name or phonetically similar terms.',
      'branding.usage.dos.attribution': '* **2.5. Apparel and Promotional Materials:** Caricax maintains centralized and exclusive production for its apparel and institutional gifts. Third parties are forbidden from producing or selling physical items bearing our name or logo.',
      'branding.usage.section3.title': '3. TRADEMARK ATTRIBUTION',
      'branding.usage.section3.content': 'When making lawful and referential use of our brand, the following statement must be included in a reduced font size (e.g., in the footer):\n\n> *"The Caricax brand and logo design are registered trademarks of Caricax Information Technology, Florianópolis, Santa Catarina, Brazil."*',
      'branding.usage.section4.title': '4. SOFTWARE LICENSING AND TRADEMARK EXCEPTION (MIT LICENSE)',
      'branding.usage.section4.content': 'The source code and open software solutions provided by Caricax Information Technology are governed by the MIT License, the scope of which is strictly limited to the code and does not encompass the trademark rights outlined in Sections 1 through 3.\n\n> **Copyright (c) 2026 Caricax Information Technology**\n> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n> *Trademark Disclaimer:* This license does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor (including the name "Caricax" and its respective logos), except as required for reasonable and customary use in describing the origin of the Software and reproducing the content of the copyright notice.\n> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',

      // Footer
      'branding.footer.title': 'Legal Information',
      'branding.footer.subtitle': 'For proper use of the CARICAX brand, consult these guidelines and contact us for clarifications.',
      // Manifesto
      'manifesto.license.title': 'License Information',
      'manifesto.contact.title': 'Contact',
      'manifesto.keywords.software_right': 'Software as a Right',
      'manifesto.keywords.sustainability': 'Sustainability',
      'manifesto.keywords.accessibility': 'Accessibility',
      'manifesto.keywords.ethics': 'Ethics',
      'manifesto.keywords.ai': 'AI',
      'manifesto.keywords.security': 'Security',
      'manifesto.keywords.privacy': 'Privacy',
      'manifesto.brand_usage.title': 'Brand Usage Guidelines',
    },

    es: {
      // Menu
      'menu.title': 'MENÚ',
      'menu.dashboard': 'Panel',
      'menu.about': 'Acerca de nosotros',
      'menu.products': 'Productos',
      'menu.services': 'Servicios',
      'menu.services.desc': 'Soluciones digitales completas',
      'menu.portfolio': 'Portafolio',
      'menu.blog': 'Blog',
      'menu.docs': 'Documentación',
      'menu.support': 'Soporte',
      'menu.contact': 'Contacto',
      'menu.development': 'En desarrollo',
      'menu.coming_soon': 'Productos y servicios próximamente',
      'menu.coming_soon_badge': 'PRÓXIMAMENTE',
      'menu.manifesto': 'Manifiesto',
      'menu.manifesto.desc': 'Nuestra filosofía y valores',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Directrices de la marca CARICAX',
      'menu.produtos': 'Productos',
      'menu.produtos.desc': 'Nuestras soluciones tecnológicas',
      'menu.labut.desc': 'Automatización inteligente',

      // Labut.ai
      'labut.hero.subtitle': 'Automatización inteligente para maximizar la productividad empresarial',
      'labut.about.title': 'Acerca de labut.ai',
      'labut.about.description': 'Una plataforma de automatización empresarial basada en inteligencia artificial que optimiza procesos, reduce costos operacionales y acelera la toma de decisiones a través de análisis predictivo y flujos de trabajo inteligentes.',
      'labut.features.title': 'Características Principales',
      'labut.features.automation': 'Automatización de procesos repetitivos con IA',
      'labut.features.optimization': 'Optimización de recursos y costos operacionales',
      'labut.features.integration': 'Integración perfecta con sistemas existentes',
      'labut.features.analytics': 'Analytics avanzados e informes en tiempo real',
      'labut.tech.title': 'Tecnología Avanzada',
      'labut.tech.ai': 'Inteligencia Artificial',
      'labut.tech.ai.desc': 'Machine Learning y procesamiento de lenguaje natural',
      'labut.tech.workflow': 'Automatización de Flujos de Trabajo',
      'labut.tech.workflow.desc': 'Procesos empresariales automatizados y optimizados',
      'labut.tech.cloud': 'Infraestructura en la Nube',
      'labut.tech.cloud.desc': 'Escalabilidad y seguridad garantizadas',
      'labut.status': 'EN DESARROLLO',
      'labut.cta.title': '¿Interesado en labut.ai?',
      'labut.cta.description': 'Contáctanos para saber más sobre cómo nuestra solución puede transformar tus procesos empresariales.',
      'labut.cta.contact': 'Ponerse en Contacto',
      'labut.cta.learn_more': 'Saber Más',

      // Social
      'social.connect': 'Conectar',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'MANIFIESTO',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Tecnología de la Información',
      'brand.slogan': '¡Software como Derecho!',
      'brand.description': 'Soluciones de TI sofisticadas para Micro y Pequeñas Empresas (MYPEs).',

      // CTA
      'cta.learn_more': 'SABER MÁS',
      'cta.support': 'APOYE',
      'contact.linkedin.label': 'LinkedIn CARICAX',
      'support.community.eyebrow': 'Apoyo comunitario',
      'support.community.title': 'Ayuda a CARICAX a renovar su dominio',
      'support.community.body': 'Mientras el dominio propio no está disponible, esta SPA queda publicada temporalmente en GitHub Pages. Si CARICAX te ayudó, inspiró o ahorró tiempo, considera contribuir voluntariamente para apoyar la renovación del dominio y mantener accesible la presencia digital de la empresa.',
      'support.community.note': 'Los enlaces de apoyo usan el mantenedor kernelpenguin, pero el pedido es para sostener la presencia digital temporal de CARICAX.',
      'support.community.footer': 'Contribución voluntaria para apoyar la renovación del dominio. Los enlaces usan el mantenedor kernelpenguin para la presencia digital temporal de CARICAX.',
      'support.community.github': 'Apoyar en GitHub Sponsors',
      'support.community.coffee': 'Apoyar en Buy Me a Coffee',
      'support.community.linkedin': 'Contactar a CARICAX en LinkedIn',

      // Form
      'form.service.title': 'Solicitud de Servicio',
      'form.learn_more.title': 'Saber Más sobre CARICAX',
      'form.learn_more.subtitle': 'El dominio propio no está disponible temporalmente. Para contacto institucional, habla con CARICAX por LinkedIn.',
      'form.learn_more.subject': 'Solicitud de Más Información',
      'form.learn_more.linkedin_note': 'No estamos recolectando mensajes por formulario en esta fase. El botón de abajo abre el LinkedIn oficial de CARICAX en una nueva pestaña.',
      'form.linkedin.cta': 'Abrir LinkedIn',
      'form.name': 'Nombre',
      'form.name.placeholder': 'Tu nombre completo',
      'form.email': 'Email',
      'form.email.placeholder': 'tu@email.com',
      'form.company': 'Empresa',
      'form.company.placeholder': 'Nombre de tu empresa (opcional)',
      'form.message': 'Mensaje',
      'form.message.placeholder': 'Cuéntanos sobre tu proyecto o necesidades...',
      'form.send': 'Enviar',
      'form.sending': 'Enviando...',
      'form.cancel': 'Cancelar',
      'form.close': 'Cerrar',
      'form.success': 'LinkedIn abierto para contacto institucional.',
      'form.error': 'No se pudo abrir el canal de contacto. Intenta por el menú social.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Carianos, Florianópolis, Santa Catarina, Brasil',
      'footer.rights': 'Derechos reservados',
      'footer.full': '2025 Caricax Information Technology. Carianos, Florianópolis, Santa Catarina, Brasil. Licencia MIT',
      'footer.license': 'Licenciado bajo la',
      'footer.license.mit': 'Licencia MIT',
      'footer.inquiries': 'Para consultas:',
      'footer.legal.summary': 'Superficie legal privacy-first con enlaces esenciales.',
      'footer.link.privacy': 'Política de Privacidad',
      'footer.link.terms': 'Términos de Uso',
      'footer.link.cookies': 'Política de Cookies',
      'footer.link.lgpd': 'LGPD / GDPR y Derechos del Titular',
      'footer.link.mit': 'Licencia MIT',
      'footer.link.compliance': 'Privacidad, LGPD y GDPR',
      'footer.link.accessibility': 'Doc. Accesibilidad',
      'footer.contact.prefix': 'Contacto temporal por LinkedIn:',
      'footer.domain_migration': 'Este sitio está funcionando temporalmente fuera del dominio caricax.software.',

      // Accessibility modal content
      'accessibility.title': 'Alto Contraste',
      'accessibility.desc': 'Activar para maximizar la legibilidad y separar claramente los elementos interactivos.',
      'accessibility.btn.activate': 'Activar Alto Contraste',
      'accessibility.btn.deactivate': 'Desactivar Alto Contraste',
      'accessibility.p1': 'La accesibilidad es un requisito de ingeniería, no un adorno visual. En Caricax, sustenta la Alfabetización Tecnológica, la autonomía operativa y la participación en el espacio digital.',
      'accessibility.li1': 'Navegación completa por teclado en flujos esenciales.',
      'accessibility.li2': 'Compatibilidad con lectores de pantalla y semántica predecible.',
      'accessibility.li3': 'Mensajes claros, técnicos y procesables en lenguaje objetivo.',
      'accessibility.li4': 'Modo de Alto Contraste para lectura robusta en entornos críticos (ahora a un clic en el menú superior).',

      // Legal modal content
      'legal.compliance.title': 'Privacidad, Términos, LGPD y GDPR',
      'legal.privacy.title': 'Política de Privacidad',
      'legal.privacy.body': 'Adoptamos un enfoque privacy-first con minimización estricta de datos. Solo tratamos lo necesario para contacto institucional y seguridad de la plataforma.\n\nDurante la publicación temporal en GitHub Pages, el contacto institucional se dirige al LinkedIn oficial de CARICAX. No vendemos datos personales ni realizamos perfilado conductual en esta landing.\n\nLa base legal se aplica según cada caso: consentimiento, medidas precontractuales e interés legítimo para seguridad y prevención de abuso.\n\nEl tratamiento de datos observa integralmente los principios establecidos por el Art. 6 de la LGPD: finalidad, adecuación, necesidad, libre acceso, calidad de los datos, transparencia, seguridad, prevención, no discriminación y responsabilización.\n\nNo realizamos decisiones automatizadas (Art. 20 de la LGPD) que produzcan efectos jurídicos significativos sobre el titular en esta plataforma.\n\nPuedes ejercer tus derechos bajo la LGPD por los canales oficiales de la plataforma.',
      'legal.terms.title': 'Términos de Uso',
      'legal.terms.body': 'Este entorno es una SPA institucional de Caricax Information Technology. El uso de la plataforma exige cumplimiento de la legislación brasileña y de estos términos.\n\nEl contenido es informativo y puede actualizarse por cambios técnicos, legales u operativos.\n\nSe prohíben accesos no autorizados, ingeniería inversa maliciosa, recolección automatizada abusiva y acciones que afecten la disponibilidad.\n\nLa marca CARICAX y sus signos distintivos permanecen protegidos. El software adopta modelo open-source bajo licencia MIT.',
      'legal.cookies.title': 'Política de Cookies',
      'legal.cookies.body': 'Solo usamos recursos técnicos estrictamente necesarios para funcionamiento, accesibilidad y seguridad.\n\nNo activamos cookies de rastreo conductual por defecto en esta landing institucional.\n\nSi en el futuro se incorporan mediciones opcionales, se requerirá consentimiento previo e informado, implementado mediante un mecanismo de opt-in granular con posibilidad de revocación en cualquier momento.',
      'legal.lgpd.title': 'LGPD / GDPR y Derechos del Titular',
      'legal.lgpd.body': `CARICAX Information Technology tiene un compromiso innegociable con la privacidad y la seguridad de los datos. Operamos en estricto cumplimiento con la Ley General de Protección de Datos (LGPD - Ley N° 13.709/2018) de Brasil y el Reglamento General de Protección de Datos (GDPR - Reglamento UE 2016/679).

Principios Fundamentales:
Todo tratamiento de datos realizado por CARICAX se guía por los principios de limitación de la finalidad, minimización de datos, exactitud, limitación del plazo de conservación, integridad, confidencialidad, transparencia y responsabilidad proactiva.

Derechos del Interesado:
Conforme a lo establecido por la LGPD (Art. 18) y el GDPR (Capítulo III), garantizamos a nuestros usuarios el ejercicio facilitado y gratuito de los siguientes derechos:
• Acceso y Confirmación: Obtener confirmación sobre si se están tratando o no datos personales que le conciernen y acceder a los mismos.
• Rectificación: Corrección de datos incompletos, inexactos o desactualizados.
• Supresión (Derecho al Olvido): Solicitar la eliminación de los datos tratados con su consentimiento o que ya no sean necesarios para los fines recogidos, salvo obligación legal de conservación.
• Portabilidad: Solicitar la transferencia de sus datos a otro proveedor de servicios.
• Restricción y Oposición: Oponerse al tratamiento de datos basado en intereses legítimos o solicitar la limitación del tratamiento.
• Retirada del Consentimiento: Retirar su consentimiento en cualquier momento e informarse sobre las consecuencias de su negativa.
• Información sobre Cesiones: Conocer con qué entidades públicas y privadas compartimos sus datos.

Ejercicio de Derechos y DPO:
Para ejercer cualquiera de estos derechos o si tiene dudas sobre cómo procesamos su información, utilice los canales oficiales temporales indicados en la plataforma, con prioridad para el LinkedIn de CARICAX.

Para la protección del propio interesado y para evitar filtraciones, CARICAX podrá solicitar una validación mínima de identidad antes de proporcionar información o ejecutar supresiones.`,
      'legal.mit.title': 'Licencia MIT',
      'legal.mit.body': 'Esta aplicación adopta licencia MIT para el código fuente, permitiendo uso, copia, modificación y distribución, siempre que se preserve el aviso de copyright y el texto de licencia.\n\nEl software bajo MIT se ofrece "tal cual", sin garantías expresas o implícitas.',
      'legal.mit.link.label': 'Leer el texto oficial de la Licencia MIT',
      'legal.mit.link.url': 'https://opensource.org/licenses/MIT',

      // Theme
      'theme.toggle': 'Cambiar tema',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Activar modo claro',
      'header.theme.dark': 'Activar modo oscuro',
      'header.language': 'Cambiar idioma',
      'header.accessibility': 'Configuración de accesibilidad',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'Transformamos tus ideas en realidad digital con soluciones innovadoras y diseño excepcional.',
      'hero.cta.service': 'Solicitar Servicio',
      'hero.cta.portfolio': 'Ver Portafolio',

      // Features
      'features.fast.title': 'Rápido',
      'features.fast.description': 'Desarrollo ágil y entrega puntual',
      'features.innovative.title': 'Innovador',
      'features.innovative.description': 'Tecnologías modernas y soluciones creativas',
      'features.dedicated.title': 'Dedicado',
      'features.dedicated.description': 'Soporte completo y relaciones cercanas',

      // Philosophy Section
      'philosophy.title': 'Nuestra Filosofía',
      'philosophy.subtitle': 'Democratizando el acceso a la tecnología y promoviendo el desarrollo sostenible',

      // Navigation
      'nav.title': 'Navegación',
      'nav.services': 'Servicios',
      'nav.services.desc': 'Nuestras soluciones',
      'nav.portfolio': 'Portafolio',
      'nav.portfolio.desc': 'Nuestros proyectos',
      'nav.about': 'Acerca',
      'nav.about.desc': 'Quiénes somos',
      'nav.contact': 'Contacto',
      'nav.contact.desc': 'Habla con nosotros',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat manifiesto_caricax.txt',
      'terminal.philosophy': `Caricax Information Technology surge de la comprensión de que las tecnologías, cada vez más sofisticadas e inherentes a la producción económica actual, mientras son privilegio de pocos, se mantienen detrás de paywalls y software propietario con usabilidad contraintuitiva.

Nuestra misión es democratizar soluciones de TI sofisticadas, convirtiéndolas en bien común para Micro y Pequeñas Empresas (MYPEs). Defender el Software como un Derecho expresa la comprensión de que el profesional de tecnología, independientemente de la antigüedad, es, ante todo, un trabajador, así como los agentes comprometidos con el desarrollo de economías locales.

No se trata solo de líneas de código; se trata de materializar la alfabetización tecnológica del emprendedor local, liberándolo de oligopolios, que se definen de las maneras más anticuadas de negarse a adoptar enfoques human-first.`,

      // Manifesto
      'manifesto.license.title': 'Información de Licencia',
      'manifesto.contact.title': 'Contacto',
      'manifesto.keywords.software_right': 'Software como un Derecho',
      'manifesto.keywords.sustainability': 'Sostenibilidad',
      'manifesto.keywords.accessibility': 'Accesibilidad',
      'manifesto.keywords.ethics': 'Ética',
      'manifesto.keywords.ai': 'IA',
      'manifesto.keywords.security': 'Seguridad',
      'manifesto.keywords.privacy': 'Privacidad',
      'manifesto.brand_usage.title': 'Directrices de Uso de Marca',
      'branding.typography.title': 'Tipografía',
      'branding.typography.primary': 'Noto Serif',
      'branding.typography.primary.desc': 'Fuente principal para títulos, marca y wordmark.',
      'branding.typography.secondary': 'Hack',
      'branding.typography.secondary.desc': 'Fuente para cuerpo, UI, botones, formularios, menús, terminales y textos técnicos.',

      // Usage Guidelines
      'branding.usage.title': 'TÉRMINOS DE USO, DIRECTRICES DE MARCA Y LICENCIAS: CARICAX INFORMATION TECHNOLOGY',
      'branding.usage.intro': '**1. DISPOSICIONES PRELIMINARES**\nLos acuerdos establecidos previamente preservan la integridad institucional y evitan litigios. El presente instrumento tiene por objeto regular el uso de los activos de propiedad intelectual de Caricax Information Technology, distinguiendo expresamente el código fuente (software) de su identidad visual (marca). Nos reservamos el derecho de auditar su uso y, a nuestra entera discreción, modificar las normas de uso o revocar sumariamente la autorización para exhibir nuestro logotipo.',
      'branding.usage.dos.title': '2. DIRECTRICES DE USO DE LA MARCA REGISTRADA\nLa marca "Caricax", así como todos los derechos y beneficios derivados de su logotipo, son propiedad exclusiva de nuestra sede. La permisividad conferida a nuestro software (ver Sección 4) no se extiende a nuestra identidad visual.',
      'branding.usage.dos.respect': '* **2.1. Regla Fundamental:** Se exige absoluta probidad ante el público. Queda terminantemente prohibido difundir declaraciones falsas que sugieran la falta de apoyo de Caricax u omitan la naturaleza lícita de nuestra asociación institucional. Su propia marca o nombre comercial debe tener mayor prominencia visual que nuestro logotipo. Queda expresamente prohibida la alteración de nuestro logotipo; su diseño original debe mantenerse inalterado, respetando los derechos morales y patrimoniales de su autor, el diseñador gráfico Sr. Tábila.',
      'branding.usage.dos.permission': '* **2.2. Publicidad y Fines Comerciales:** En caso de que exista la intención de utilizar nuestro logotipo en sitios web, productos físicos o en cualquier material vinculado a transacciones financieras, es obligatorio obtener nuestro consentimiento previo por escrito. Sin embargo, si el propósito es estrictamente declarativo —limitándose a comunicar su condición de cliente o expresar satisfacción institucional—, el uso está autorizado.',
      'branding.usage.dos.clearspace': '* **2.3. Fines Educativos (Cursos, Libros y Conferencias):** Se permite el uso de nuestra marca para fines de instrucción pública. No obstante, no se debe inducir al público objetivo a creer que la autoría del material didáctico pertenece a Caricax. A modo de ejemplo: queda expresamente prohibida la colocación de nuestro logotipo en portadas de libros. Se recomienda únicamente una mención discreta: *"[Nombre de su proyecto] fue inspirado por la experiencia de Caricax IT."*',
      'branding.usage.dos.contrast': '* **2.4. Nomenclatura de Productos y Dominios:** El uso del término "Caricax" para nombrar productos de terceros está prohibido, excepto mediante autorización para agentes del mismo nicho tecnológico. Queda terminantemente prohibida la yuxtaposición o superposición de nuestro logotipo con el suyo. Bajo ninguna circunstancia se permite el registro de dominios de internet (URLs) que contengan nuestra denominación o términos de fonética similar.',
      'branding.usage.dos.attribution': '* **2.5. Vestimenta y Materiales Promocionales:** Caricax mantiene la producción centralizada y exclusiva de su indumentaria y obsequios institucionales. Queda prohibida a terceros la producción o comercialización de artículos físicos que ostenten nuestro nombre o logotipo.',
      'branding.usage.section3.title': '3. ATRIBUCIÓN DE CRÉDITOS DE LA MARCA',
      'branding.usage.section3.content': 'Al hacer un uso lícito y referencial de nuestra marca, se exige la inclusión de la siguiente declaración en un tamaño de fuente reducido (por ejemplo, en el pie de página):\n\n> *"La marca Caricax y el diseño respectivo del logotipo son marcas registradas de Caricax Information Technology, Florianópolis, Santa Catarina, Brasil."*',
      'branding.usage.section4.title': '4. LICENCIA DE SOFTWARE Y EXCEPCIÓN DE MARCA (LICENCIA MIT)',
      'branding.usage.section4.content': 'El código fuente y las soluciones de software de código abierto proporcionadas por Caricax Information Technology se rigen por la Licencia MIT, cuyo alcance se restringe estrictamente al código y no abarca los derechos de marca descritos en las Secciones 1 a 3.\n\n> **Copyright (c) 2026 Caricax Information Technology**\n> Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), a utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software a hacer lo mismo, sujeto a las siguientes condiciones:\n> El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes sustanciales del Software.\n> *Cláusula de Excepción de Marca (Trademark Disclaimer):* Esta licencia no otorga permiso para usar los nombres comerciales, marcas registradas, marcas de servicio o nombres de productos del Licenciante (incluido el nombre "Caricax" y sus respectivos logotipos), excepto según sea requerido para el uso razonable y habitual al describir el origen del Software y reproducir el contenido del aviso de copyright.\n> EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR E INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.',
    },

    de: {
      // Menu
      'menu.title': 'MENÜ',
      'menu.dashboard': 'Dashboard',
      'menu.about': 'Über uns',
      'menu.products': 'Produkte',
      'menu.services': 'Dienstleistungen',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog',
      'menu.docs': 'Dokumentation',
      'menu.support': 'Support',
      'menu.contact': 'Kontakt',
      'menu.development': 'In Entwicklung',
      'menu.coming_soon': 'Produkte & Dienstleistungen kommen bald',
      'menu.manifesto': 'Manifest',
      'menu.manifesto.desc': 'Unsere Philosophie und Werte',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Markenrichtlinien',
      'menu.produtos': 'Produkte',
      'menu.produtos.desc': 'Unsere Technologielösungen',
      'menu.labut.desc': 'Intelligente Automatisierung',

      // Social
      'social.connect': 'Verbinden',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'MANIFEST',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Informationstechnologie',
      'brand.slogan': 'Software als Recht!',
      'brand.description': 'Ausgeklügelte IT-Lösungen für Kleinst- und Kleinunternehmen.',

      // CTA
      'cta.learn_more': 'MEHR ERFAHREN',
      'cta.support': 'UNTERSTÜTZEN',

      // Form
      'form.service.title': 'Serviceanfrage',
      'form.learn_more.title': 'Mehr über CARICAX erfahren',
      'form.learn_more.subtitle': 'Kontaktieren Sie uns, um zu erfahren, wie wir Ihrem Unternehmen helfen können.',
      'form.learn_more.subject': 'Anfrage für weitere Informationen',
      'form.name': 'Name',
      'form.name.placeholder': 'Ihr vollständiger Name',
      'form.email': 'E-Mail',
      'form.email.placeholder': 'ihre@email.de',
      'form.company': 'Unternehmen',
      'form.company.placeholder': 'Name Ihres Unternehmens (optional)',
      'form.message': 'Nachricht',
      'form.message.placeholder': 'Erzählen Sie uns von Ihrem Projekt oder Ihren Bedürfnissen...',
      'form.send': 'Senden',
      'form.sending': 'Wird gesendet...',
      'form.cancel': 'Abbrechen',
      'form.close': 'Schließen',
      'form.success': 'Nachricht erfolgreich gesendet! Wir werden uns bald bei Ihnen melden.',
      'form.error': 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Carianos, Florianópolis, Brasilien',
      'footer.rights': 'Alle Rechte vorbehalten',
      'footer.full': '2025 Caricax Information Technology. Carianos, Florianópolis, Santa Catarina, Brasilien. MIT-Lizenz',
      'footer.license': 'Lizenziert unter der',
      'footer.license.mit': 'MIT-Lizenz',
      'footer.inquiries': 'Für Anfragen:',

      // Theme
      'theme.toggle': 'Theme wechseln',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Hellen Modus aktivieren',
      'header.theme.dark': 'Dunklen Modus aktivieren',
      'header.language': 'Sprache wechseln',
      'header.accessibility': 'Barrierefreiheitseinstellungen',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'Wir verwandeln Ihre Ideen in digitale Realität mit innovativen Lösungen und außergewöhnlichem Design.',
      'hero.cta.service': 'Service anfordern',
      'hero.cta.portfolio': 'Portfolio ansehen',

      // Features
      'features.fast.title': 'Schnell',
      'features.fast.description': 'Agile Entwicklung und pünktliche Lieferung',
      'features.innovative.title': 'Innovativ',
      'features.innovative.description': 'Moderne Technologien und kreative Lösungen',
      'features.dedicated.title': 'Engagiert',
      'features.dedicated.description': 'Vollständiger Support und enge Beziehungen',

      // Philosophy Section
      'philosophy.title': 'Unsere Philosophie',
      'philosophy.subtitle': 'Demokratisierung des Zugangs zur Technologie und Förderung nachhaltiger Entwicklung',

      // Navigation
      'nav.title': 'Navigation',
      'nav.services': 'Dienstleistungen',
      'nav.services.desc': 'Unsere Lösungen',
      'nav.portfolio': 'Portfolio',
      'nav.portfolio.desc': 'Unsere Projekte',
      'nav.about': 'Über uns',
      'nav.about.desc': 'Wer wir sind',
      'nav.contact': 'Kontakt',
      'nav.contact.desc': 'Sprechen Sie mit uns',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat manifest_caricax.txt',
      'terminal.philosophy': `Caricax Information Technology entsteht aus dem Verständnis, dass Technologien, die zunehmend ausgeklügelt und der aktuellen Wirtschaftsproduktion inhärent sind, während sie das Privileg weniger bleiben, hinter Bezahlschranken und proprietärer Software mit kontraintuitiver Benutzerfreundlichkeit stehen.

Unsere Mission ist es, ausgeklügelte IT-Lösungen zu demokratisieren und sie zu einem Gemeingut für Kleinst- und Kleinunternehmen zu machen. Die Verteidigung von Software als Recht drückt das Verständnis aus, dass der Technologiefachmann, unabhängig von seiner Erfahrung, in erster Linie ein Arbeiter ist, genau wie Akteure, die sich für die Entwicklung lokaler Volkswirtschaften einsetzen.

Es geht nicht nur um Codezeilen; es geht darum, die technologische Alphabetisierung des lokalen Unternehmers zu verwirklichen und ihn von Oligopolen zu befreien, die sich durch die antiquiertesten Wege der Verweigerung menschenzentrierter Ansätze definieren.`
    },

    fr: {
      // Menu
      'menu.title': 'MENU',
      'menu.dashboard': 'Tableau de bord',
      'menu.about': 'À propos de nous',
      'menu.products': 'Produits',
      'menu.services': 'Services',
      'menu.portfolio': 'Portfolio',
      'menu.blog': 'Blog',
      'menu.docs': 'Documentation',
      'menu.support': 'Support',
      'menu.contact': 'Contact',
      'menu.development': 'En développement',
      'menu.coming_soon': 'Produits et services à venir',
      'menu.manifesto': 'Manifeste',
      'menu.manifesto.desc': 'Notre philosophie et valeurs',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Directives de la marque',
      'menu.produtos': 'Produits',
      'menu.produtos.desc': 'Nos solutions technologiques',
      'menu.labut.desc': 'Automatisation intelligente',

      // Social
      'social.connect': 'Se connecter',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'MANIFESTE',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Technologie de l\'Information',
      'brand.slogan': 'Le Logiciel comme Droit !',
      'brand.description': 'Solutions IT sophistiquées pour les Micro et Petites Entreprises (MPE).',

      // CTA
      'cta.learn_more': 'EN SAVOIR PLUS',
      'cta.support': 'SOUTENIR',

      // Form
      'form.service.title': 'Demande de Service',
      'form.learn_more.title': 'En savoir plus sur CARICAX',
      'form.learn_more.subtitle': 'Contactez-nous pour découvrir comment nous pouvons aider votre entreprise.',
      'form.learn_more.subject': 'Demande d\'informations supplémentaires',
      'form.name': 'Nom',
      'form.name.placeholder': 'Votre nom complet',
      'form.email': 'Email',
      'form.email.placeholder': 'votre@email.fr',
      'form.company': 'Entreprise',
      'form.company.placeholder': 'Nom de votre entreprise (optionnel)',
      'form.message': 'Message',
      'form.message.placeholder': 'Parlez-nous de votre projet ou de vos besoins...',
      'form.send': 'Envoyer',
      'form.sending': 'Envoi en cours...',
      'form.cancel': 'Annuler',
      'form.close': 'Fermer',
      'form.success': 'Message envoyé avec succès ! Nous vous contacterons bientôt.',
      'form.error': 'Erreur lors de l\'envoi du message. Veuillez réessayer.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Carianos, Florianópolis, Brésil',
      'footer.rights': 'Tous droits réservés',
      'footer.full': '2025 Caricax Information Technology. Carianos, Florianópolis, Santa Catarina, Brésil. Licence MIT',
      'footer.license': 'Sous licence',
      'footer.license.mit': 'Licence MIT',
      'footer.inquiries': 'Pour les demandes:',

      // Theme
      'theme.toggle': 'Changer de thème',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Activer le mode clair',
      'header.theme.dark': 'Activer le mode sombre',
      'header.language': 'Changer de langue',
      'header.accessibility': 'Paramètres d\'accessibilité',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'Nous transformons vos idées en réalité numérique avec des solutions innovantes et un design exceptionnel.',
      'hero.cta.service': 'Demander un service',
      'hero.cta.portfolio': 'Voir le portfolio',

      // Features
      'features.fast.title': 'Rapide',
      'features.fast.description': 'Développement agile et livraison dans les délais',
      'features.innovative.title': 'Innovant',
      'features.innovative.description': 'Technologies modernes et solutions créatives',
      'features.dedicated.title': 'Dévoué',
      'features.dedicated.description': 'Support complet et relations étroites',

      // Philosophy Section
      'philosophy.title': 'Notre philosophie',
      'philosophy.subtitle': 'Démocratiser l\'accès à la technologie et promouvoir le développement durable',

      // Navigation
      'nav.title': 'Navigation',
      'nav.services': 'Services',
      'nav.services.desc': 'Nos solutions',
      'nav.portfolio': 'Portfolio',
      'nav.portfolio.desc': 'Nos projets',
      'nav.about': 'À propos',
      'nav.about.desc': 'Qui nous sommes',
      'nav.contact': 'Contact',
      'nav.contact.desc': 'Parlez-nous',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat manifeste_caricax.txt',
      'terminal.philosophy': `Caricax Information Technology émerge de la compréhension que les technologies, de plus en plus sophistiquées et inhérentes à la production économique actuelle, tout en restant un privilège de quelques-uns, demeurent derrière des paywalls et des logiciels propriétaires à l'utilisabilité contre-intuitive.

Notre mission est de démocratiser les solutions informatiques sophistiquées, en les rendant bien commun pour les micro et petites entreprises. Défendre le logiciel comme droit exprime la compréhension que le professionnel de la technologie, indépendamment de son ancienneté, est, avant tout, un travailleur, tout comme les agents engagés dans le développement des économies locales.

Il ne s'agit pas seulement de lignes de code ; il s'agit de concrétiser l'alphabétisation technologique de l'entrepreneur local, en le libérant des oligopoles, qui se définissent par les façons les plus désuètes de refuser d'adopter des approches centrées sur l'humain.`
    },

    ru: {
      // Menu
      'menu.title': 'МЕНЮ',
      'menu.dashboard': 'Панель управления',
      'menu.about': 'О нас',
      'menu.products': 'Продукты',
      'menu.services': 'Услуги',
      'menu.portfolio': 'Портфолио',
      'menu.blog': 'Блог',
      'menu.docs': 'Документация',
      'menu.support': 'Поддержка',
      'menu.contact': 'Контакты',
      'menu.development': 'В разработке',
      'menu.coming_soon': 'Продукты и услуги скоро',
      'menu.manifesto': 'Манифест',
      'menu.manifesto.desc': 'Наша философия и ценности',
      'menu.branding': 'Brand Guidelines',
      'menu.branding.desc': 'Руководство по бренду',
      'menu.produtos': 'Продукты',
      'menu.produtos.desc': 'Наши технологические решения',
      'menu.labut.desc': 'Интеллектуальная автоматизация',

      // Social
      'social.connect': 'Подключиться',
      'social.github': 'GitHub',
      'social.linkedin': 'LinkedIn',
      'social.instagram': 'Instagram',

      // Brand
      'brand.manifesto': 'МАНИФЕСТ',
      'brand.name': 'CARICAX',
      'brand.subtitle': 'Информационные Технологии',
      'brand.slogan': 'Программное обеспечение как Право!',
      'brand.description': 'Сложные ИТ-решения для микро- и малых предприятий.',

      // CTA
      'cta.learn_more': 'УЗНАТЬ БОЛЬШЕ',
      'cta.support': 'ПОДДЕРЖАТЬ',

      // Form
      'form.service.title': 'Запрос на Обслуживание',
      'form.learn_more.title': 'Узнать больше о CARICAX',
      'form.learn_more.subtitle': 'Свяжитесь с нами, чтобы узнать, как мы можем помочь вашей компании.',
      'form.learn_more.subject': 'Запрос дополнительной информации',
      'form.name': 'Имя',
      'form.name.placeholder': 'Ваше полное имя',
      'form.email': 'Электронная почта',
      'form.email.placeholder': 'ваш@email.ru',
      'form.company': 'Компания',
      'form.company.placeholder': 'Название вашей компании (необязательно)',
      'form.message': 'Сообщение',
      'form.message.placeholder': 'Расскажите нам о вашем проекте или потребностях...',
      'form.send': 'Отправить',
      'form.sending': 'Отправка...',
      'form.cancel': 'Отмена',
      'form.close': 'Закрыть',
      'form.success': 'Сообщение успешно отправлено! Мы скоро свяжемся с вами.',
      'form.error': 'Ошибка при отправке сообщения. Попробуйте еще раз.',

      // Footer
      'footer.company': 'Caricax Information Technology',
      'footer.location': 'Карианос, Флорианополис, Бразилия',
      'footer.rights': 'Все права защищены',
      'footer.full': '2025 Caricax Information Technology. Карианос, Флорианополис, Санта-Катарина, Бразилия. MIT лицензия',
      'footer.license': 'Лицензия',
      'footer.license.mit': 'MIT лицензия',
      'footer.inquiries': 'Для запросов:',

      // Theme
      'theme.toggle': 'Переключить тему',

      // Header
      'header.logo': 'CARICAX',
      'header.theme.light': 'Включить светлый режим',
      'header.theme.dark': 'Включить тёмный режим',
      'header.language': 'Сменить язык',
      'header.accessibility': 'Настройки доступности',

      // Hero Section
      'hero.title': 'CARICAX',
      'hero.subtitle': 'Мы превращаем ваши идеи в цифровую реальность с помощью инновационных решений и исключительного дизайна.',
      'hero.cta.service': 'Запросить услугу',
      'hero.cta.portfolio': 'Посмотреть портфолио',

      // Features
      'features.fast.title': 'Быстро',
      'features.fast.description': 'Гибкая разработка и своевременная доставка',
      'features.innovative.title': 'Инновационно',
      'features.innovative.description': 'Современные технологии и креативные решения',
      'features.dedicated.title': 'Преданно',
      'features.dedicated.description': 'Полная поддержка и близкие отношения',

      // Philosophy Section
      'philosophy.title': 'Наша философия',
      'philosophy.subtitle': 'Демократизация доступа к технологиям и содействие устойчивому развитию',

      // Navigation
      'nav.title': 'Навигация',
      'nav.services': 'Услуги',
      'nav.services.desc': 'Наши решения',
      'nav.portfolio': 'Портфолио',
      'nav.portfolio.desc': 'Наши проекты',
      'nav.about': 'О нас',
      'nav.about.desc': 'Кто мы',
      'nav.contact': 'Контакты',
      'nav.contact.desc': 'Поговорите с нами',

      // Terminal
      'terminal.title': 'caricax@caricax:~$',
      'terminal.prompt': 'caricax@caricax:~$',
      'terminal.command': 'cat манифест_caricax.txt',
      'terminal.philosophy': `Caricax Information Technology возникает из понимания того, что технологии, становящиеся все более сложными и неотъемлемыми от современного экономического производства, оставаясь привилегией немногих, остаются за платными барьерами и проприетарным программным обеспечением с контринтуитивным удобством использования.

Наша миссия - демократизировать сложные ИТ-решения, делая их общим благом для микро- и малых предприятий. Защита программного обеспечения как права выражает понимание того, что технологический специалист, независимо от стажа, является, прежде всего, работником, так же как и агенты, занимающиеся развитием местных экономик.

Речь идет не только о строках кода; речь идет о реализации технологической грамотности местного предпринимателя, освобождении его от олигополий, которые определяются самыми устаревшими способами отказа от принятия человеко-ориентированных подходов.`
    }
  };

  constructor() {
    if (this.isBrowser) {
      const savedLanguageCode = this.readSavedLanguageCode();
      if (savedLanguageCode) {
        const savedLanguage = this.languageByCode.get(savedLanguageCode);
        if (savedLanguage) {
          this.currentLanguage.set(savedLanguage);
        }
      }

      effect(() => {
        const languageCode = this.currentLanguage().code;
        if (this.readSavedLanguageCode() !== languageCode) {
          this.persistLanguageCode(languageCode);
        }
      });
    }
  }

  getTerminalTooltips(): Record<string, { term: string, content: string }> {
    const code = this.currentLanguage().code;
    if (code === 'en') {
      return {
        'paywalls': { term: 'paywalls', content: 'Access barriers by subscription or recurring payment for essential features.<br><br>Impact: increases fixed monthly costs and reduces decision autonomy.<br><br>Next step: compare open alternatives to reduce financial dependency.' },
        'proprietary software': { term: 'Proprietary software', content: 'Systems whose source code is closed and restricted.' },
        'Software as a Right': { term: 'Software as a Right', content: 'Vision that access to excellent digital tools is fundamental for development and not a mere luxury.<br><br>Impact: alters market dynamics, demanding accessible tools without abusive lock-in.' },
        'technological literacy': { term: 'Technological literacy', content: 'Capacity to not only be a user, but to understand and shape technology in favor of one\'s own business.<br><br>Impact: reduces dependency on predatory suppliers and empowers the SME.' },
        'oligopolies': { term: 'Oligopolies', content: 'Small group of large companies dominating the market, dictating prices and rules.' },
        'human-first': { term: 'Human-first', content: 'Design and engineering approach that prioritizes people and real contexts of use.<br><br>Impact: understanding this concept improves technical autonomy and operational resilience.<br><br>Learn more: connect this term with a real process of your business and document the result.' }
      };
    } else if (code === 'es') {
      return {
        'paywalls': { term: 'paywalls', content: 'Barreras de acceso por suscripción o pago recurrente para características esenciales.<br><br>Impacto: aumenta los costos fijos mensuales y reduce la autonomía de decisión.<br><br>Próximo paso: compare alternativas abiertas para reducir la dependencia financiera.' },
        'software propietario': { term: 'Software propietario', content: 'Sistemas cuyo código fuente está cerrado y restringido.' },
        'Software como un Derecho': { term: 'Software como un Derecho', content: 'Visión de que el acceso a excelentes herramientas digitales es fundamental para el desarrollo y no un mero lujo.<br><br>Impacto: altera la dinámica del mercado, exigiendo herramientas accesibles sin bloqueos abusivos.' },
        'alfabetización tecnológica': { term: 'Alfabetización tecnológica', content: 'Capacidad de no solo ser un usuario, sino de comprender y dar forma a la tecnología a favor del propio negocio.<br><br>Impacto: reduce la dependencia de proveedores depredadores y empodera a la MYPE.' },
        'oligopolios': { term: 'Oligopolios', content: 'Pequeño grupo de grandes empresas que dominan el mercado, dictando precios y reglas.' },
        'human-first': { term: 'Human-first', content: 'Enfoque de diseño e ingeniería que prioriza a las personas y los contextos reales de uso.<br><br>Impacto: comprender este concepto mejora la autonomía técnica y la resiliencia operativa.<br><br>Aprenda más: conecte este término con un proceso real de su negocio y documente el resultado.' }
      };
    }
    // Default to PT
    return {
      'paywalls': { term: 'paywalls', content: 'Barreiras de acesso por assinatura ou pagamento recorrente para funcionalidades essenciais.<br><br>Impacto: aumenta custo fixo mensal e reduz autonomia de decisão.<br><br>Próximo passo: compare alternativas abertas para reduzir dependência financeira.' },
      'softwares proprietários': { term: 'Softwares proprietários', content: 'Sistemas cujo código-fonte é fechado e restrito.' },
      'Software como um Direito': { term: 'Software como um Direito', content: 'Visão de que o acesso a ferramentas digitais de excelência é fundamental para o desenvolvimento e não mero luxo.<br><br>Impacto: altera a dinâmica de mercado, exigindo ferramentas acessíveis sem lock-in abusivo.' },
      'letramento tecnológico': { term: 'Letramento tecnológico', content: 'Capacidade de não ser apenas usuário, mas compreender e moldar a tecnologia a favor do próprio negócio.<br><br>Impacto: reduz a dependência de fornecedores predatórios e empodera a MPE.' },
      'oligopólios': { term: 'Oligopólios', content: 'Pequeno grupo de grandes empresas dominando o mercado, ditando preços e regras.' },
      'human-first': { term: 'Human-first', content: 'Enfoque de design e engenharia que prioriza pessoas e contextos reais de uso.<br><br>Impacto: compreender este conceito melhora a autonomia técnica e a resiliência operativa.<br><br>Aprender mais: conecte este termo com um processo real do seu negócio e documente o resultado.' }
    };
  }

  translate(key: string): string {
    const languageCode = this.currentLanguage().code;
    const currentTranslations = this.translations[languageCode];
    let text = currentTranslations?.[key];

    if (text === undefined) {
      // Fallback to English, then Portuguese
      text = this.translations['en']?.[key] ?? this.translations['pt']?.[key];
      if (text === undefined) {
        return key;
      }
    }

    if (text.length <= 100) {
      return text;
    }

    const cacheKey = `${languageCode}\x00${key}`;
    const cachedNormalizedText = this.normalizedLongTextCache.get(cacheKey);
    if (cachedNormalizedText !== undefined) {
      return cachedNormalizedText;
    }

    const normalizedText = text
      .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]|(\r\n?)/g, (_, crlf) => crlf !== undefined ? '\n' : '')
      .trim();

    this.normalizedLongTextCache.set(cacheKey, normalizedText);
    return normalizedText;
  }

  switchLanguage(): void {
    const currentLanguageCode = this.currentLanguage().code;
    const currentIndex = this.languageIndexByCode.get(currentLanguageCode) ?? 0;
    const nextIndex = (currentIndex + 1) % this.availableLanguages.length;
    this.currentLanguage.set(this.availableLanguages[nextIndex]);
  }

  setLanguage(languageCode: string): void {
    const language = this.languageByCode.get(languageCode);
    if (!language || language.code === this.currentLanguage().code) {
      return;
    }

    this.currentLanguage.set(language);
    this.persistLanguageCode(language.code);
  }

  private readSavedLanguageCode(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      return localStorage.getItem(this.languageStorageKey);
    } catch (error) {
      console.warn('Could not read language preference:', error);
      return null;
    }
  }

  private persistLanguageCode(languageCode: string): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(this.languageStorageKey, languageCode);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  }
}
