export const profile = {
  name: {
    first: 'Carlos Eduardo',
    last: 'Tiago',
  },
  role: 'Engenheiro de Software e Líder de Desenvolvimento da plataforma CHARLES. Eu assumo o ciclo inteiro: requisito, arquitetura, código, entrega.',
  available: 'DISPONÍVEL PARA NOVOS DESAFIOS',
  heroMeta: {
    left: ['GOIÂNIA · GO', 'ENG. SOFTWARE — UNIALFA', 'ORACLE APEX · PL/SQL · JS'],
    right: 'THREE.JS · SCROLL ↓',
  },
  bio: {
    lead: 'Engenheiro de Software formado, com experiência prática no desenvolvimento e gestão de sistemas corporativos.',
    body: 'Atuando como Líder de Desenvolvimento da plataforma CHARLES e sócio-fundador da Fenrys Tech, busco oportunidades que ampliem meu desenvolvimento profissional e permitam aplicar minhas habilidades em novos desafios.',
    photo: { url: `${import.meta.env.BASE_URL}CarlosFoto.jpg`, alt: 'Foto de Carlos Eduardo Tiago' },
  },
  stats: [
    { number: '2+', label: 'ANOS EM SISTEMA\nCORPORATIVO' },
    { number: '2026', label: 'FORMADO EM ENG.\nDE SOFTWARE' },
    { number: '1', label: 'PLATAFORMA SOB\nMINHA LIDERANÇA' },
  ],
  stack: ['JavaScript', 'Node.js', 'HTML', 'CSS', 'Bootstrap', 'Oracle APEX', 'SQL · PL/SQL', 'UX/UI'],
  learning: ['Java', 'Python', 'Linux'],
  languages: [
    { name: 'Inglês', level: 'Intermediário' },
    { name: 'Espanhol', level: 'Básico' },
  ],
  education: {
    course: 'Engenharia de Software',
    school: 'UNIALFA — Universidade Alves Faria',
    period: 'Fev 2022 — Jun 2026',
  },
  resume: {
    url: `${import.meta.env.BASE_URL}Curriculo_CarlosEduardoTiago.pdf`,
    filename: 'Curriculo_CarlosEduardoTiago.pdf',
  },
  contact: {
    email: 'carloseduardots24@gmail.com',
    phone: { display: '+55 (62) 98436-4247', href: '+5562984364247' },
    whatsapp: {
      number: '5562984364247',
      message: 'Olá, Carlos! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.',
    },
    github: { user: 'CarlosEdu141', url: 'https://github.com/CarlosEdu141' },
    location: 'Goiânia · Goiás, Brasil',
  },
  footer: {
    copyright: '© 2026 CARLOS EDUARDO TIAGO',
    tech: 'THREE.JS · GSAP · LENIS · MOTION',
  },
}
