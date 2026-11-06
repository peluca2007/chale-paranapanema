import {
  Armchair,
  Bath,
  BedDouble,
  Lock,
  Sparkles,
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

/* --------------------------------- Fotos --------------------------------- */

/** Fotos originais do anúncio no Airbnb (1200 px), servidas pelo CDN do próprio Airbnb. */
const AIRBNB_CDN = 'https://a0.muscache.com/im/pictures/hosting/Hosting-1755963782047461849/original/'
export const AB = {
  fachada: '5fdbfe82-5e1e-4fb5-8d79-df52c8e2147a',
  quartoJanela: '6e33c624-9ecd-4add-a22b-573a98dc50e5',
  cozinha: '19e1d460-0735-46f5-a2d8-768e800fa762',
  interior: 'fd47ac9e-43e5-4ae0-9937-bb9dd599105a',
  bancadaBanheiro: '507a5d06-0810-4312-aa2e-7731b42f8e0d',
  chuveiro: '1ac70112-779b-47a4-9451-6e45f69e7afb',
  tvTrabalho: '86ddb874-d6f9-4761-a831-cb7cab81d4ad',
  tv: '1178c317-c745-43ce-89f0-32c4d4b1bfed',
  bancada: '44315a82-4cf4-4635-918a-4d4709fd756a',
  cama: '9c4e33a9-be7c-4d98-8156-b09a698fd063',
  pia: '53f15db3-11fa-483e-b8e2-0e9753f36a3a',
  lateral: '8911612f-5ede-4837-bbff-67df11c1ebff',
  banheiro: 'c7faea33-4a39-42ad-a183-c34d8716b569',
} as const
const ab = (key: keyof typeof AB) => `ab:${AB[key]}`

/**
 * Endereço de uma foto. `ab:<id>` = foto do Airbnb; o resto vem de /public/photos
 * (respeitando o `base` do Vite).
 */
export const photo = (name: string, width = 1200) =>
  name.startsWith('ab:')
    ? `${AIRBNB_CDN}${name.slice(3)}.jpeg?im_w=${width}`
    : `${import.meta.env.BASE_URL}photos/${name}`

/** srcset responsivo: o celular baixa uma versão menor e a tela grande, a maior. */
export const photoSrcSet = (name: string) =>
  name.startsWith('ab:') ? [480, 720, 1200].map((w) => `${photo(name, w)} ${w}w`).join(', ') : undefined

const env = (key: string): string => String(import.meta.env[key] ?? '').trim()

/* -------------------------------------------------------------------------- */
/*  CONFIGURAÇÃO                                                              */
/* -------------------------------------------------------------------------- */
export const site = {
  name: 'Chalé Paranapanema',
  city: 'Paranapanema, SP',

  /** Dados privados vêm de variáveis de ambiente (veja .env.example): não ficam no repositório. */
  airbnbUrl: env('VITE_AIRBNB_URL') || 'https://www.airbnb.com.br/rooms/1755963782047461849',

  /** WhatsApp da anfitriã, só números com DDI+DDD (ex.: 5514999999999). */
  whatsapp: env('VITE_WHATSAPP'),
  whatsappMessage: 'Olá! Vi o site do Chalé Paranapanema e gostaria de saber mais.',

  /** Quem entrega a chave no check-in (Magali). Só números com DDI+DDD. */
  keyContact: { name: 'Magali', whatsapp: env('VITE_KEY_WHATSAPP') },

  /** Sem senha configurada, o site mostra "informada na chegada". */
  wifi: { network: env('VITE_WIFI_NETWORK') || 'Chalé 5G', password: env('VITE_WIFI_PASSWORD') },

  /** Crédito no rodapé. */
  author: { name: 'Peluca', github: env('VITE_GITHUB_URL') },

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

export const whatsappHref = () =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
    : ''

export const keyWhatsappHref = () =>
  site.keyContact.whatsapp
    ? `https://wa.me/${site.keyContact.whatsapp}?text=${encodeURIComponent(
        `Olá, ${site.keyContact.name}! Sou hóspede do Chalé Paranapanema e vou retirar a chave.`,
      )}`
    : ''

/** 5511999990000 -> (11) 99999-0000 */
export const formatPhone = (digits: string) => {
  const m = digits.replace(/^55/, '').match(/^(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : digits
}

/** Botão principal de reserva: Airbnb, senão WhatsApp, senão a seção de contato. */
export function booking() {
  if (site.airbnbUrl) return { href: site.airbnbUrl, label: 'Reservar no Airbnb', external: true }
  const wa = whatsappHref()
  if (wa) return { href: wa, label: 'Reservar pelo WhatsApp', external: true }
  return { href: '#contato', label: 'Como reservar', external: false }
}

/* -------------------------------------------------------------------------- */
/*  CONTEÚDO                                                                  */
/* -------------------------------------------------------------------------- */

export const amenities: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Totalmente privativo', text: 'Uso exclusivo dos hóspedes, sem áreas compartilhadas.' },
  { icon: Wind, title: 'Ar-condicionado', text: 'Clima ajustável para dormir bem em qualquer estação.' },
  { icon: Wifi, title: 'Wi-Fi', text: 'Internet no chalé para trabalhar ou maratonar.' },
  { icon: Tv, title: 'TV com streaming', text: 'Netflix e YouTube já instalados.' },
  { icon: BedDouble, title: 'Cama de casal + auxiliar', text: 'Uma cama de casal e uma cama auxiliar de solteiro.' },
  { icon: CookingPot, title: 'Cozinha compacta', text: 'Cooktop, frigobar, micro-ondas, pia e bancada.' },
  { icon: Lock, title: 'Cofre', text: 'Para guardar documentos e objetos de valor.' },
  { icon: Sparkles, title: 'Fachada em vidro', text: 'Cabana A-frame moderna, com deck e muita luz natural.' },
  { icon: ShowerHead, title: 'Banho quente', text: 'Chuveiro com água aquecida.' },
  { icon: Car, title: 'Estacionamento', text: 'Dentro do terreno, em frente aos coqueiros.' },
  { icon: PawPrint, title: 'Pet friendly', text: 'Pets de pequeno porte, mediante aviso prévio.' },
]

export const stats = [
  { value: '3', label: 'hóspedes, contando crianças' },
  { value: site.checkIn, label: 'check-in a partir das' },
  { value: site.checkOut, label: 'check-out até as' },
  { value: '300 m', label: 'da Praça da Matriz' },
]

export type GalleryItem = { file: string; alt: string; caption: string; tall?: boolean }

export const gallery: GalleryItem[] = [
  { file: ab('fachada'), alt: 'Fachada do chalé em A, toda em vidro, com a cama aparecendo lá dentro', caption: 'Fachada em vidro' },
  { file: ab('quartoJanela'), alt: 'Cama de casal diante do janelão triangular com vista para o gramado', caption: 'Acordar com essa vista' },
  { file: ab('interior'), alt: 'Interior em madeira com teto em A, cama de casal e luminária', caption: 'Tudo em um só ambiente' },
  { file: ab('chuveiro'), alt: 'Box do chuveiro com revestimento de madeira e janela alta', caption: 'Banheiro', tall: true },
  { file: ab('tvTrabalho'), alt: 'TV na parede, prateleiras e a área de trabalho ao fundo', caption: 'TV e área de trabalho' },
  { file: ab('cozinha'), alt: 'Bancada escura com pia, cooktop, cadeira e frigobar', caption: 'Cozinha compacta' },
  { file: ab('cama'), alt: 'Cama de casal arrumada sob o teto inclinado de madeira', caption: 'Cama de casal' },
  { file: ab('lateral'), alt: 'Lateral do chalé com telhado metálico escuro descendo até o chão', caption: 'Arquitetura A-frame' },
  { file: ab('pia'), alt: 'Pia redonda em pedra preta com espelho redondo', caption: 'Detalhes do banheiro', tall: true },
  { file: ab('bancadaBanheiro'), alt: 'Bancada da cozinha ao lado da porta do banheiro', caption: 'Bancada e banheiro' },
  { file: ab('tv'), alt: 'TV fixada na parede de madeira, com prateleiras ao lado', caption: 'Smart TV' },
  { file: ab('bancada'), alt: 'Bancada com pia, cooktop e espaço de apoio', caption: 'Bancada' },
]

/** Fotos da vitrine "Por dentro" (rolagem horizontal). */
export const tour: { file: string; title: string; text: string }[] = [
  { file: ab('fachada'), title: 'Fachada em vidro', text: 'Cabana A-frame moderna, com deck e luz natural o dia inteiro.' },
  { file: ab('quartoJanela'), title: 'O janelão', text: 'A cama fica de frente para o vidro: dá para acordar vendo o céu.' },
  { file: ab('interior'), title: 'Madeira e aconchego', text: 'Um ambiente único, com teto alto em A e iluminação quente.' },
  { file: ab('tvTrabalho'), title: 'TV e trabalho', text: 'Smart TV com Netflix e YouTube, e uma bancada para o notebook.' },
  { file: ab('cozinha'), title: 'Cozinha compacta', text: 'Cooktop, frigobar, micro-ondas e pia para as refeições rápidas.' },
  { file: ab('banheiro'), title: 'Banheiro sofisticado', text: 'Pedra preta, madeira e chuveiro quente.' },
]

/** Avaliação real do anúncio. */
export const review = { text: 'Amei a estadia!! Voltaremos mais vezes!', author: 'Paula', source: 'hóspede pelo Airbnb' }

/* ----------------------------- Manual: check-in ---------------------------- */

export const checkInSteps: {
  icon: LucideIcon
  title: string
  text: string
  photo: string
  alt: string
  contact?: 'key'
}[] = [
  {
    icon: Clock,
    title: 'Horário de entrada',
    text: `O check-in está disponível a partir das ${site.checkIn}.`,
    photo: ab('fachada'),
    alt: 'Fachada do chalé',
  },
  {
    icon: KeyRound,
    title: 'Retire a chave',
    text: 'As chaves devem ser retiradas na residência ao lado do portão de entrada. Ao chegar, basta ir até a casa para receber as chaves e as orientações.',
    photo: 'entrada-casa.jpg',
    alt: 'Residência ao lado do portão de entrada',
    contact: 'key',
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
    photo: ab('interior'),
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
  { id: 'tv', icon: Tv, title: 'TV', text: 'Use o controle remoto para ligar a TV. Apps disponíveis: Netflix e YouTube. Faça logout ao final da estadia.', photo: ab('tv'), alt: 'TV fixada na parede de madeira' },
  { id: 'ar', icon: Wind, title: 'Ar-condicionado', text: 'Ligue pelo controle remoto. Temperatura recomendada entre 22° e 24°. Desligue ao sair do quarto.', photo: 'ar.jpg', alt: 'Ar-condicionado instalado no alto da parede' },
  { id: 'chuveiro', icon: ShowerHead, title: 'Chuveiro', text: 'Ajuste a temperatura antes do banho e aguarde alguns segundos para a água aquecer corretamente.', photo: ab('chuveiro'), alt: 'Chuveiro do banheiro' },
  { id: 'cooktop', icon: CookingPot, title: 'Fogão / Cooktop', text: 'Utilize com cuidado. Verifique se as bocas ficaram desligadas após o uso.', photo: ab('cozinha'), alt: 'Bancada com cooktop, pia e frigobar' },
  { id: 'microondas', icon: Microwave, title: 'Micro-ondas', text: 'Disponível para melhor conforto da sua estadia. Use com cuidado e deixe o aparelho limpo após o uso.', photo: ab('bancada'), alt: 'Micro-ondas preto na bancada' },
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
  { id: 'hospedes', icon: Users, chip: 'Quantas pessoas?', verdict: 'Até 3 hóspedes', tone: 'info', text: 'Até 3 hóspedes no total, contando crianças, conforme informado na reserva.' },
  { id: 'visitantes', icon: DoorOpen, chip: 'Posso receber visitas?', verdict: 'Só com autorização', tone: 'warn', text: 'A entrada de visitantes extras deve ser autorizada previamente pela anfitriã.' },
  { id: 'toalhas', icon: Bath, chip: 'Tem toalha?', verdict: 'Traga a sua', tone: 'warn', text: 'Não fornecemos toalhas de banho. Por favor, traga a sua.' },
  { id: 'cuidados', icon: Armchair, chip: 'Cuidados com o imóvel', verdict: 'Preserve tudo', tone: 'info', text: 'Preserve móveis, roupas de cama, utensílios, eletrodomésticos e objetos decorativos.' },
]

/** Até 3 pessoas no total, contando crianças (há uma cama auxiliar). */
export const limits = { guests: 3 }

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
  { title: 'Represa Jurumirim', text: 'A represa encanta pelas belas paisagens. Ideal para passeios de barco, pesca e esportes náuticos.', photo: 'represa.jpg', alt: 'Vista aérea da represa com balão amarelo sobre a água' },
  { title: 'Orla da represa', text: 'Areia, gramado e sombra à beira d’água: lugar de passar o dia, fazer piquenique e acompanhar os eventos da cidade.', photo: 'orla.jpg', alt: 'Vista aérea da orla com praia de areia, carros e tendas no gramado' },
  { title: 'Píer ao pôr do sol', text: 'Quiosques no gramado e um píer sobre a água: o fim de tarde na represa é um espetáculo à parte.', photo: 'pier.jpg', alt: 'Píer de madeira sobre a represa ao entardecer, com quiosques no gramado' },
  { title: 'Riviera de Santa Cristina V e XIII', text: 'As Rivieras contam com restaurantes, piscinas e diversas opções de lazer para toda a família, às margens da represa.', photo: 'riviera.jpg', alt: 'Riviera de Santa Cristina com piscinas e praia de represa' },
  { title: 'Gastronomia', text: 'A cidade oferece pizzarias, restaurantes japoneses, lanches artesanais e sorveterias, com opções para todos os gostos.', photo: 'gastronomia.jpg', alt: 'Rua com bares e restaurantes iluminados à noite' },
  { title: 'Clima, romance e família', text: 'Clima agradável o ano todo e o cenário ideal para momentos a dois ou com a família.', photo: 'igreja.jpg', alt: 'Igreja da cidade com arco-íris ao fundo' },
]

/* ----------------------------- Contatos úteis ----------------------------- */

export type UsefulContact = {
  id: string
  title: string
  name: string
  phone: string
  photo: string
  alt: string
  address?: string
  note?: string
}

/** Serviços da cidade (dados públicos, do manual do hóspede). */
export const usefulContacts: UsefulContact[] = [
  { id: 'hospital', title: 'Hospital', name: 'Municipal Leonardo Van Melis', phone: '(14) 3713-9131', address: 'Rua Urias Domingues Leite, s/nº', photo: 'hospital.jpg', alt: 'Fachada do Hospital Municipal Leonardo Van Melis' },
  { id: 'farmacia', title: 'Farmácia', name: 'Top Drogarias', phone: '(14) 99604-1803', address: 'Rua Francisco Alves de Almeida, 535, Centro', photo: 'farmacia.jpg', alt: 'Fachada da Top Drogarias' },
  { id: 'policia', title: 'Polícia Militar', name: '53º Batalhão PM', phone: '190', address: 'Av. Neopolio Teodoro da Silva, 69', photo: 'policia.jpg', alt: 'Sede da Polícia Militar em Paranapanema' },
  { id: 'chaveiro', title: 'Chaveiro 24h', name: 'Renato Chaveiro', phone: '(14) 99897-7924', note: 'Atendimento 24h', photo: 'chaveiro.jpg', alt: 'Fechadura com chave' },
  { id: 'posto', title: 'Posto de combustível', name: 'Auto Posto Triunfo', phone: '(14) 3713-1326', address: 'Rua Manoel Domingues Leite, 156, Centro', photo: 'posto.jpg', alt: 'Auto Posto Triunfo' },
]

/** Números nacionais de emergência. */
export const emergencyNumbers = [
  { number: '190', label: 'Polícia' },
  { number: '192', label: 'SAMU' },
  { number: '193', label: 'Bombeiros' },
]

/** "(14) 3713-9131" -> "tel:+551437139131"; números curtos (190) ficam como estão. */
export const telHref = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length <= 4 ? `tel:${digits}` : `tel:+55${digits}`
}

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

/* --------------------------- Onde comer (food service) --------------------------- */

export type FoodPlace = {
  name: string
  kind: string
  phone: string
  photo: string
  alt: string
  address?: string
  note?: string
  /** Endereço para o Maps quando for diferente do mostrado. */
  mapsQuery?: string
}

/** Contatos gastronômicos (dados públicos dos estabelecimentos, enviados pelo anfitrião). */
export const food: FoodPlace[] = [
  { name: 'Netão Sushi Gourmet', kind: 'Restaurante japonês', phone: '(14) 99895-0694', address: 'Rua Capitão Totó Duarte, 315, Centro', photo: 'food-netao.jpg', alt: 'Combinado de sushi com caldas' },
  { name: 'Lá no Marquinho', kind: 'Bar com petiscos, cerveja gelada e comida japonesa', phone: '(14) 99634-9152', address: 'Rua Avaré, 640, Centro', photo: 'food-marquinho.jpg', alt: 'Fachada do bar Lá no Marquinho à noite' },
  { name: 'Ice & Pizza', kind: 'Pizzaria e sorveteria', phone: '(14) 99639-9008', address: 'Rua Francisco Alves de Almeida, 195, Centro', photo: 'food-icepizza.jpg', alt: 'Pizza e kit de pizzaria' },
  { name: 'Bom Pernil & Burger', kind: 'Lanchonete', phone: '(14) 99788-4439', address: 'Praça da Matriz', photo: 'food-bompernil.jpg', alt: 'Fachada iluminada do Bom Pernil & Burger' },
  { name: 'Edi Dog', kind: 'Lanchonete', phone: '(14) 99664-2406', address: 'Rua Francisco Alves de Almeida, 936, Centro', photo: 'food-edidog.jpg', alt: 'Cachorro-quente prensado recheado' },
  { name: 'Jacobs Esfiharia', kind: 'Esfiharia delivery', phone: '(14) 99894-2333', note: 'Delivery', photo: 'food-jacobs.jpg', alt: 'Esfiha de carne e esfiha doce de chocolate' },
  { name: 'Pastelaria da Cesane', kind: 'Pastelaria', phone: '(14) 99671-2040', photo: 'food-pastelaria.jpg', alt: 'Logo da Pastelaria da Cesane' },
  { name: 'Graal Holandês', kind: 'Posto de combustível e restaurante', phone: '(14) 99759-2735', address: 'Rodovia Raposo Tavares, km 245', note: 'A 11 km do chalé', photo: 'food-graal.jpg', alt: 'Buffet de carnes e linguiças do Graal' },
]

/** "(14) 99895-0694" -> link do WhatsApp com mensagem pronta. */
export const foodWhatsapp = (phone: string) =>
  `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Estou hospedado no Chalé Paranapanema e gostaria de fazer um pedido.')}`
