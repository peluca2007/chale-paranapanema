import {
  Armchair,
  BellOff,
  CigaretteOff,
  Car,
  Clock,
  CookingPot,
  DoorOpen,
  House,
  KeyRound,
  Lightbulb,
  LockKeyhole,
  Microwave,
  PartyPopper,
  PawPrint,
  ShieldCheck,
  ShowerHead,
  Trash2,
  Tv,
  Users,
  Utensils,
  Wifi,
  Wind,
  type LucideIcon,
} from 'lucide-react'

/** Caminho de uma foto em /public/photos, respeitando o `base` do Vite. */
export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`

/* -------------------------------------------------------------------------- */
/*  CONFIGURAÇÃO — edite aqui antes de publicar                               */
/* -------------------------------------------------------------------------- */
export const site = {
  name: 'Chalé Paranapanema',
  city: 'Paranapanema, SP',

  /** Cole o link do anúncio no Airbnb. Vazio = o botão leva à seção de contato. */
  airbnbUrl: '',

  /** WhatsApp da anfitriã: só números com DDI+DDD (ex.: '5514999999999'). Vazio = botão oculto. */
  whatsapp: '',
  whatsappMessage: 'Olá! Vi o site do Chalé Paranapanema e gostaria de saber mais.',

  /** Wi-Fi. Deixe a senha vazia para o site mostrar "informada na chegada". */
  wifi: { network: 'Chalé 5G', password: '' },

  /** Rodapé do portfólio. Preencha o github para exibir o link. */
  author: { name: 'Peluca', github: '' },

  /** Informações turísticas oficiais da cidade (do manual). */
  tourism: {
    phone: '(14) 3550-9272',
    phoneHref: 'tel:+551435509272',
    address: 'Rua Manoel Domingues Leite, s/nº, Centro (Museu de Paranapanema)',
    site: 'https://www.paranapanema.sp.gov.br',
    siteLabel: 'www.paranapanema.sp.gov.br',
  },

  checkIn: '14h',
  checkOut: '12h',
  quietHours: '22h às 8h',
} as const

export const bookingHref = () => site.airbnbUrl || '#contato'
export const whatsappHref = () =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
    : ''

/* -------------------------------------------------------------------------- */
/*  CONTEÚDO                                                                  */
/* -------------------------------------------------------------------------- */

export const amenities: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Totalmente privativo', text: 'Uso exclusivo dos hóspedes, sem áreas compartilhadas.' },
  { icon: Wind, title: 'Ar-condicionado', text: 'Clima ajustável para dormir bem em qualquer estação.' },
  { icon: Wifi, title: 'Wi-Fi', text: 'Internet no chalé para trabalhar ou maratonar.' },
  { icon: Tv, title: 'TV com streaming', text: 'Netflix e YouTube já instalados.' },
  { icon: CookingPot, title: 'Cozinha equipada', text: 'Cooktop, micro-ondas, pia e utensílios.' },
  { icon: ShowerHead, title: 'Banho quente', text: 'Chuveiro com água aquecida.' },
  { icon: Car, title: 'Estacionamento', text: 'Dentro do terreno, em frente aos coqueiros.' },
  { icon: PawPrint, title: 'Pet friendly', text: 'Pets de pequeno porte, mediante aviso prévio.' },
]

export const stats = [
  { value: '2 + 1', label: 'hóspedes + criança de até 10 anos' },
  { value: site.checkIn, label: 'check-in a partir das' },
  { value: site.checkOut, label: 'check-out até as' },
  { value: '300 m', label: 'da Praça da Matriz' },
]

export const gallery: { file: string; alt: string; caption: string }[] = [
  { file: 'fachada.jpg', alt: 'Fachada do chalé em A vista do jardim', caption: 'Fachada em A' },
  { file: 'deck-entardecer.jpg', alt: 'Deck com mesa e cadeiras ao entardecer', caption: 'Deck ao entardecer' },
  { file: 'interior.jpg', alt: 'Interior do chalé em madeira com cama de casal', caption: 'Interior em madeira' },
  { file: 'cozinha.jpg', alt: 'Cozinha com bancada escura e pia', caption: 'Cozinha' },
  { file: 'quarto-amplo.jpg', alt: 'Quarto do chalé com cama de casal e teto inclinado', caption: 'Quarto amplo' },
  { file: 'cama.jpg', alt: 'Cama arrumada com roupa de cama cinza', caption: 'Roupa de cama' },
  { file: 'por-do-sol.jpg', alt: 'Chalé ao pôr do sol com casal à mesa no deck', caption: 'Pôr do sol' },
  { file: 'garagem.jpg', alt: 'Carro estacionado no gramado ao lado do chalé', caption: 'Estacionamento no terreno' },
  { file: 'quarto-janela.jpg', alt: 'Cama junto à grande janela com vista para o jardim', caption: 'Vista do quarto' },
  { file: 'luminaria.jpg', alt: 'Luminária trançada acesa', caption: 'Detalhes de luz' },
]

/* ----------------------------- Manual: check-in ---------------------------- */

export const checkInSteps: {
  icon: LucideIcon
  title: string
  text: string
  photo: string
  alt: string
}[] = [
  {
    icon: Clock,
    title: 'Horário de entrada',
    text: `O check-in está disponível a partir das ${site.checkIn}.`,
    photo: 'fachada.jpg',
    alt: 'Fachada do chalé',
  },
  {
    icon: KeyRound,
    title: 'Retire a chave',
    text: 'As chaves devem ser retiradas na residência ao lado do portão de entrada. Ao chegar, basta ir até a casa para receber as chaves e as orientações.',
    photo: 'entrada-casa.jpg',
    alt: 'Residência ao lado do portão de entrada',
  },
  {
    icon: LockKeyhole,
    title: 'Acesso ao portão',
    text: 'O molho contém também a chave do cadeado do portão e a chave do chalé.',
    photo: 'portao.jpg',
    alt: 'Portão de acesso ao terreno',
  },
  {
    icon: Car,
    title: 'Garagem',
    text: 'Entre pelo portão lateral e estacione na frente dos coqueiros.',
    photo: 'garagem.jpg',
    alt: 'Gramado onde se estaciona, em frente aos coqueiros',
  },
  {
    icon: DoorOpen,
    title: 'Entre no chalé',
    text: 'Abra o chalé com a chave do molho. Qualquer dificuldade no acesso, entre em contato imediatamente.',
    photo: 'quarto-amplo.jpg',
    alt: 'Interior do chalé',
  },
]

/* ----------------------------- Manual: itens ------------------------------- */

export type UsageItem = {
  id: 'wifi' | 'tv' | 'ar' | 'chuveiro' | 'cooktop' | 'microondas'
  icon: LucideIcon
  title: string
  text: string
  photo: string
  alt: string
}

export const usageItems: UsageItem[] = [
  { id: 'wifi', icon: Wifi, title: 'Wi-Fi', text: 'Conecte-se à rede do chalé.', photo: 'wifi.jpg', alt: 'Quadro com os dados do Wi-Fi sobre a mesa' },
  { id: 'tv', icon: Tv, title: 'TV', text: 'Use o controle remoto para ligar a TV. Apps disponíveis: Netflix e YouTube. Faça logout ao final da estadia.', photo: 'tv.jpg', alt: 'TV fixada na parede de madeira' },
  { id: 'ar', icon: Wind, title: 'Ar-condicionado', text: 'Ligue pelo controle remoto. Temperatura recomendada entre 22° e 24°. Desligue ao sair do quarto.', photo: 'ar.jpg', alt: 'Ar-condicionado instalado no alto da parede' },
  { id: 'chuveiro', icon: ShowerHead, title: 'Chuveiro', text: 'Ajuste a temperatura antes do banho e aguarde alguns segundos para a água aquecer corretamente.', photo: 'chuveiro.jpg', alt: 'Chuveiro do banheiro' },
  { id: 'cooktop', icon: CookingPot, title: 'Fogão / Cooktop', text: 'Utilize com cuidado. Verifique se as bocas ficaram desligadas após o uso.', photo: 'cooktop.jpg', alt: 'Cooktop e pia da cozinha' },
  { id: 'microondas', icon: Microwave, title: 'Micro-ondas', text: 'Disponível para melhor conforto da sua estadia. Use com cuidado e deixe o aparelho limpo após o uso.', photo: 'microondas.jpg', alt: 'Micro-ondas preto na bancada' },
]

/* ------------------------------ Manual: regras ----------------------------- */

export type RuleTone = 'ok' | 'warn' | 'no' | 'info'

export const rules: {
  id: string
  icon: LucideIcon
  chip: string
  verdict: string
  tone: RuleTone
  text: string
}[] = [
  { id: 'privativo', icon: House, chip: 'É compartilhado?', verdict: 'Chalé privativo', tone: 'info', text: 'Este imóvel é de uso exclusivo dos hóspedes da reserva. Não há áreas compartilhadas com outras pessoas.' },
  { id: 'pet', icon: PawPrint, chip: 'Posso levar pet?', verdict: 'Sim, com aviso prévio', tone: 'ok', text: 'Pets de pequeno porte são permitidos mediante aviso prévio.' },
  { id: 'fumar', icon: CigaretteOff, chip: 'Posso fumar?', verdict: 'Só em áreas externas', tone: 'warn', text: 'Não é permitido fumar dentro do chalé. Utilize apenas áreas externas.' },
  { id: 'festa', icon: PartyPopper, chip: 'Posso fazer festa?', verdict: 'Não', tone: 'no', text: 'Não são permitidas festas, eventos ou confraternizações no imóvel.' },
  { id: 'silencio', icon: BellOff, chip: 'Horário de silêncio', verdict: site.quietHours, tone: 'info', text: 'Evite som alto e barulhos excessivos nesse período.' },
  { id: 'hospedes', icon: Users, chip: 'Quantas pessoas?', verdict: '2 hóspedes + 1 criança', tone: 'info', text: 'Até 2 hóspedes + 1 criança de até 10 anos, conforme informado na reserva.' },
  { id: 'visitantes', icon: DoorOpen, chip: 'Posso receber visitas?', verdict: 'Só com autorização', tone: 'warn', text: 'A entrada de visitantes extras deve ser autorizada previamente pela anfitriã.' },
  { id: 'cuidados', icon: Armchair, chip: 'Cuidados com o imóvel', verdict: 'Preserve tudo', tone: 'info', text: 'Preserve móveis, roupas de cama, utensílios, eletrodomésticos e objetos decorativos.' },
]

export const limits = { adults: 2, children: 1, childMaxAge: 10 }

/* ----------------------------- Manual: saída ------------------------------- */

export const checkoutChecklist: {
  id: string
  icon: LucideIcon
  label: string
  hint: string
}[] = [
  { id: 'luzes', icon: Lightbulb, label: 'Apagar as luzes', hint: 'Apague todas as luzes internas e externas.' },
  { id: 'ar', icon: Wind, label: 'Desligar o ar-condicionado', hint: 'Desligue todos os aparelhos antes de sair.' },
  { id: 'portas', icon: DoorOpen, label: 'Fechar portas e janelas', hint: 'Feche tudo e confira se ficaram travadas.' },
  { id: 'pertences', icon: Armchair, label: 'Recolher pertences pessoais', hint: 'Dê uma última olhada em gavetas, banheiro e tomadas.' },
  { id: 'lixo', icon: Trash2, label: 'Retirar o lixo', hint: 'Leve os sacos até a lixeira externa, ao lado do portão de entrada.' },
  { id: 'louca', icon: Utensils, label: 'Deixar a louça organizada', hint: 'Deixe a louça lavada e organizada na cozinha.' },
  { id: 'chaves', icon: KeyRound, label: 'Trancar e devolver as chaves', hint: 'Tranque a porta do chalé e devolva as chaves no mesmo local onde foram retiradas.' },
  { id: 'avisar', icon: ShieldCheck, label: 'Avisar a anfitriã ao sair', hint: `O check-out é até as ${site.checkOut}.` },
]

/* -------------------------------- Arredores -------------------------------- */

export const discover: { title: string; text: string; photo: string; alt: string }[] = [
  { title: 'Represa Jurumirim', text: 'A represa encanta pelas belas paisagens. Ideal para passeios de barco, pesca e esportes náuticos.', photo: 'represa.jpg', alt: 'Vista aérea de chalés à beira da represa' },
  { title: 'Riviera de Santa Cristina V e XIII', text: 'As Rivieras contam com restaurantes, piscinas e diversas opções de lazer para toda a família, às margens da represa.', photo: 'riviera.jpg', alt: 'Riviera de Santa Cristina com piscinas e praia de represa' },
  { title: 'Gastronomia', text: 'A cidade oferece pizzarias, restaurantes japoneses, lanches artesanais e sorveterias, com opções para todos os gostos.', photo: 'gastronomia.jpg', alt: 'Rua com bares e restaurantes iluminados à noite' },
  { title: 'Clima, romance e família', text: 'Clima agradável o ano todo e o cenário ideal para momentos a dois ou com a família.', photo: 'igreja.jpg', alt: 'Igreja da cidade com arco-íris ao fundo' },
]

export type Place = {
  id: string
  name: string
  km: number
  label: string
  angle: number
  blurb: string
}

export const places: Place[] = [
  { id: 'recinto', name: 'Recinto de Festa', km: 0.1, label: '100 m', angle: 205, blurb: 'Pertinho do chalé, para quem gosta de acompanhar os eventos da cidade.' },
  { id: 'praca', name: 'Praça da Matriz', km: 0.3, label: '300 m', angle: 275, blurb: 'O centro da cidade, a uma caminhada curta do chalé.' },
  { id: 'riviera5', name: 'Riviera de Santa Cristina V', km: 5, label: '5 km', angle: 335, blurb: 'Restaurantes, piscinas e lazer para toda a família, às margens da represa.' },
  { id: 'ilha', name: 'Ilha do Sol', km: 6, label: '6 km', angle: 55, blurb: 'Um dos passeios imperdíveis da região.' },
  { id: 'holambra', name: 'Campos de Holambra', km: 20, label: '20 km', angle: 115, blurb: 'Um passeio de meio de tarde para quem quer conhecer a região.' },
  { id: 'riviera13', name: 'Riviera de Santa Cristina XIII', km: 30, label: '30 km', angle: 160, blurb: 'Outra Riviera às margens da represa, com restaurantes e lazer para a família.' },
]

export const mapsHref = (place: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, Paranapanema, SP`)}`
