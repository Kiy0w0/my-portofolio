# 🎨 Portfolio Features

## ✨ Latest Features

### 📁 GitHub Repositories
**Location**: About section (middle)

**Features**:
- 📦 Repository cards with details
- ⬅️➡️ Pagination with arrow navigation
- ⭐ Star and fork counts
- 🎨 Language indicators with colors
- 🏷️ Topic tags display
- 📊 6 repos per page
- 🔗 Direct links to GitHub
- ⏰ Last updated timestamps
- 📱 Responsive grid layout
- 🎯 Page indicator dots

**Repository Card Info**:
- Repository name
- Description
- Programming language (with color)
- Star count
- Fork count
- Topics (up to 3 shown)
- Last update time
- External link

**Pagination**:
- Arrow buttons (← Previous, Next →)
- Page counter (1 / 3)
- Dot indicators
- 6 repositories per page
- Sorted by stars (most popular first)

**Data Source**: GitHub REST API
- API: `https://api.github.com/users/{username}/repos`
- Sorting: By last updated
- Limit: 100 repositories
- Filter: Excludes forks

---

### 📊 GitHub Activity Heatmap
**Location**: About section (bottom)

**Features**:
- 📅 52-week contribution visualization
- 🎨 Color-coded activity levels (0-4)
- 💡 Hover tooltip with details
- 📈 Total contributions counter
- 🔄 Real-time data from GitHub API
- 📱 Responsive design
- ✨ Glow effects on active days
- 🌈 Gradient border animation

**Data Source**: GitHub Contributions API
- API: `https://github-contributions-api.jogruber.de/v4/{username}`
- Updates: Real-time on page load
- Username: `Kiy0w0`

**Legend**:
- Level 0 (Gray): No contributions
- Level 1 (Light Green): 1-3 contributions
- Level 2 (Medium Green): 4-6 contributions
- Level 3 (Dark Green): 7-9 contributions
- Level 4 (Darkest Green): 10+ contributions

---

## 🎯 Existing Features

### 🎨 UI/UX
- ✨ Particle network background
- 🌈 Gradient text animations
- 💫 Smooth scroll indicators
- 🎭 Glassmorphism effects
- 🔮 Glow hover effects

### 🎮 Discord Integration
- 🔴 Real-time presence status
- 🎵 Spotify listening activity
- 🎮 Game activity display
- 🎨 Animated profile decoration
- 🔄 WebSocket live updates

### 📱 Responsive Design
- 📱 Mobile-optimized navigation
- 💻 Desktop enhanced features
- 🎯 Adaptive layouts
- ⌨️ Keyboard accessible

---

## 🚀 Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

### APIs & Integrations
- **Discord**: Lanyard API (REST + WebSocket)
- **GitHub**: Contributions API

### Libraries
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Poppins)
- **Image**: Next.js Image Optimization

---

## 🎨 Color Theme

```css
anime-pink:     #FFB7C5  /* Soft pink */
anime-purple:   #D4A5D4  /* Lavender purple */
anime-blue:     #A5D4E7  /* Sky blue */
anime-peach:    #FFDAB9  /* Peach */
anime-lavender: #E6E6FA  /* Light lavender */
anime-mint:     #C1FFC1  /* Mint green */
comfy-dark:     #2D2A3E  /* Dark purple */
comfy-darker:   #1E1B2E  /* Darker purple */
```

---

## 📦 Components Structure

```
components/
├── About.tsx              # About section with features, GitHub stats & repos
├── Contact.tsx            # Contact form & social links
├── DiscordProfile.tsx     # Real-time Discord presence
├── GitHubHeatmap.tsx      # GitHub contribution graph
├── GitHubRepos.tsx        # GitHub repositories with pagination
├── Hero.tsx               # Hero section with typing animation
├── Navigation.tsx         # Sticky navigation bar
├── ParticleBackground.tsx # Animated particle network
├── Projects.tsx           # Project showcase (hidden)
└── Skills.tsx             # Skills display (hidden)
```

---

## 🔥 Upcoming Ideas

- [ ] Spotify Now Playing Widget
- [ ] Background Music Player
- [ ] WakaTime Stats Integration
- [ ] Theme Switcher (Dark/Light/Anime)
- [ ] Custom Cursor Effect
- [ ] Page Transition Animations
- [ ] Project Gallery
- [ ] Command Palette (CMD+K)
- [ ] Guestbook
- [ ] Blog Section
- [ ] Easter Eggs
- [ ] 3D Elements with Three.js

---

**Made with ❤️ and lots of ☕**

