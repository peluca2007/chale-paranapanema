# Chalé Paranapanema

Site interativo de um chalé de hospedagem em Paranapanema (SP). Além de apresentar o chalé, ele transforma o manual do hóspede (que era um PDF/imagens) em uma experiência navegável: check-in passo a passo, regras com perguntas e respostas, checklist de saída e um guia da cidade.

![Chalé de dia](docs/preview-dia.png)
![Chalé à noite](docs/preview-noite.png)

## O que tem de interessante

- **Chalé ilustrado em SVG com ciclo do dia.** Um slider (ou o botão play) muda a hora: o céu, o sol, a lua, as estrelas, as luzinhas e a luz do chalé são calculados por interpolação de keyframes (`src/lib/color.ts`). Ao abrir, ele começa na hora real do visitante e tem parallax com o ponteiro do mouse.
- **Manual do hóspede interativo**, em abas acessíveis (navegação por setas do teclado):
  - *Check-in*: passo a passo com barra de progresso.
  - *Usando o chalé*: cards com ferramentas (copiar nome do Wi-Fi, testar o termostato).
  - *Regras*: "Posso levar pet? Posso fumar?" e um verificador que diz se o seu grupo cabe nas regras.
  - *Antes de sair*: checklist com anel de progresso, salvo no `localStorage`.
- **Radar de distâncias** em escala logarítmica (100 m e 30 km no mesmo desenho), com link para o Google Maps de cada lugar.
- **Galeria com lightbox** (teclado, foco gerenciado, setas e `Esc`).
- **Acessibilidade e performance:** HTML semântico, `aria-*`, foco visível, link "pular para o conteúdo", respeita `prefers-reduced-motion`, fontes self-hosted (sem Google Fonts), imagens com `loading="lazy"`.
- **SEO:** metatags, Open Graph e dados estruturados (`schema.org/LodgingBusiness`).

## Stack

| Camada | Tecnologia |
| --- | --- |
| Build | Vite |
| UI | React 19 + TypeScript (strict) |
| Estilo | Tailwind CSS v4 (tokens em `src/index.css`) |
| Animação | Motion (`motion/react`) |
| Ícones | lucide-react |
| Fontes | Fontsource (Playfair Display, Dancing Script, Figtree) |
| Deploy | GitHub Actions + GitHub Pages |

## Rodando localmente

Requer [Node.js](https://nodejs.org) 20 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # confere os tipos e gera a pasta dist/
npm run preview    # serve o build para testar
```

## Personalizando

Quase tudo que muda de um chalé para outro está em **`src/data/site.ts`**:

| Campo | Para que serve |
| --- | --- |
| `airbnbUrl` | Link do anúncio. Liga os botões "Reservar". |
| `whatsapp` | Número com DDI+DDD (`5514999999999`). Liga o botão de WhatsApp. |
| `wifi.password` | Deixe vazio para mostrar "informada na chegada". |
| `author.github` | Link do seu GitHub no rodapé. |
| `amenities`, `rules`, `checkInSteps`, `places`... | Textos e dados de cada seção. |

> Este repositório é público. Não coloque senhas, códigos de fechadura ou telefones pessoais em `site.ts` se não quiser que qualquer pessoa os veja.

### Fotos

As fotos ficam em `public/photos/` e são listadas em `src/data/site.ts`. As que vêm no projeto foram recortadas de um manual em baixa resolução, então **troque por fotos originais** mantendo o mesmo nome de arquivo (ou ajuste o nome na lista). Fotos de 1600 px de largura em `.jpg` ou `.webp` já ficam ótimas.

## Publicando no GitHub Pages

1. Crie o repositório e envie o código (veja os comandos abaixo).
2. No GitHub: **Settings, Pages, Build and deployment, Source: GitHub Actions**.
3. A cada `git push` na branch `main`, o workflow de `.github/workflows/deploy.yml` compila e publica.
4. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

```bash
git init -b main
git add .
git commit -m "Primeira versão do site do chalé"
gh repo create chale-paranapanema --public --source=. --push
```

O `vite.config.ts` usa `base: './'`, então o mesmo build funciona no GitHub Pages, em domínio próprio, na Vercel, Netlify ou Cloudflare Pages.

### Domínio próprio

Registre o domínio (por exemplo no Registro.br), crie o arquivo `public/CNAME` com o domínio dentro (`www.seuchale.com.br`) e configure o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Estrutura

```
src/
  components/
    hero/        Scene.tsx (ilustração SVG) e Hero.tsx (slider, parallax)
    guide/       Manual: CheckIn, Usage, Rules, Checkout e as abas (Guide)
    About, Gallery, Explore, Contact, Header, Footer, ui
  data/site.ts   Configuração e conteúdo
  lib/           color.ts (interpolação do dia), hooks.ts (localStorage, scroll-spy, copiar)
public/photos/   Fotos do chalé e da cidade
```

## Licença

Código sob licença MIT. Fotos e textos do chalé: todos os direitos reservados aos proprietários.
