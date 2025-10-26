# 🌸 Anime Comfy Portfolio

Portfolio website dengan tema anime comfy style yang unik dan modern untuk developer. Dibuat dengan Next.js, TypeScript, dan Tailwind CSS.

## ✨ Features

- 🎨 **Anime Comfy Design** - Estetika anime dengan warna pastel yang nyaman di mata
- 🎭 **Interactive Animations** - Animasi smooth dan interaktif menggunakan CSS dan Canvas
- 📱 **Fully Responsive** - Tampilan sempurna di semua device
- ⚡ **Fast Performance** - Optimized dengan Next.js 14
- 🎯 **Modern Tech Stack** - TypeScript, Tailwind CSS, dan best practices
- 🌈 **Particle Background** - Background animasi particle yang menarik
- 🎪 **Smooth Scrolling** - Navigasi yang smooth antar section
- 💫 **Unique Components** - Komponen yang tidak biasa dan custom-made

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x atau lebih tinggi
- npm atau yarn

### Installation

1. Clone repository ini
\`\`\`bash
git clone <repository-url>
cd NEXTNGAWI
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# atau
yarn install
\`\`\`

3. Jalankan development server
\`\`\`bash
npm run dev
# atau
yarn dev
\`\`\`

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📦 Build untuk Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🌐 Deploy ke Vercel

### Deploy otomatis:

1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com)
3. Klik Deploy - Vercel akan otomatis detect Next.js

### Deploy via CLI:

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 🎨 Customization

### Mengubah Konten

Edit file-file berikut untuk customize konten portfolio:

- **components/Hero.tsx** - Edit nama, job title, dan social links
- **components/About.tsx** - Edit deskripsi tentang diri kamu
- **components/Projects.tsx** - Tambah/edit project kamu
- **components/Skills.tsx** - Update skills dan level
- **components/Contact.tsx** - Update info kontak

### Mengubah Warna

Edit `tailwind.config.ts` untuk mengubah color palette:

\`\`\`typescript
colors: {
  'anime-pink': '#FFB7C5',
  'anime-purple': '#D4A5D4',
  'anime-blue': '#A5D4E7',
  // ... customize sesuai selera
}
\`\`\`

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animation:** CSS Animations & Canvas API
- **Deployment:** Vercel

## 📁 Project Structure

\`\`\`
NEXTNGAWI/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Projects.tsx      # Projects showcase
│   ├── Skills.tsx        # Skills section
│   ├── Contact.tsx       # Contact form
│   ├── Navigation.tsx    # Navigation bar
│   └── ParticleBackground.tsx  # Particle animation
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
\`\`\`

## 💡 Tips

- Ganti placeholder links dengan links asli kamu
- Tambahkan gambar/screenshot project untuk hasil lebih menarik
- Customize animasi di `globals.css` sesuai preferensi
- Update metadata di `app/layout.tsx` untuk SEO

## 📝 License

Feel free to use this template untuk portfolio kamu sendiri!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ and ☕ 

