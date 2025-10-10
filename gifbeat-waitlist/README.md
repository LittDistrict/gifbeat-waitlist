# Gifbeat Waitlist

A stunning waitlist landing page for Gifbeat - transform your GIFs with music and captions.

## Features

- 🎬 **Animated Background**: 6 floating GIFs with subtle movement
- 🎭 **Scroll Animations**: 3-step narrative that unfolds as you scroll
- ⚡ **Neon Effects**: Pulsing "Gif" and "Beat" text with glowing effects
- 📧 **Email Collection**: Supabase-powered waitlist with validation
- 📱 **Responsive Design**: Beautiful on all devices
- 🎨 **Brand Colors**: Elegant yellow, black, white, and grey palette

## Tech Stack

- **React 18** with TypeScript
- **Framer Motion** for animations
- **Supabase** for email storage
- **Vite** for fast development
- **Vercel** for hosting

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd gifbeat-waitlist
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the SQL from `supabase-setup.sql`
3. Go to Settings > API and copy your project URL and anon key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Add Your GIFs

Replace the placeholder files in the `public/` folder with your actual GIFs:
- `gif1.gif` - Batman GIF
- `gif2.gif` - Boxing Anime GIF  
- `gif3.gif` - Spider-Man GIF
- `gif4.gif` - Your fourth GIF
- `gif5.gif` - Your fifth GIF
- `gif6.gif` - Your sixth GIF

### 5. Development

```bash
npm run dev
```

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add the environment variables in Vercel dashboard
4. Deploy!

## Customization

### Colors
The brand colors are defined in `src/App.css`:
- Primary Yellow: `#FFD700`
- Secondary Orange: `#FFA500`
- Background: `#000000`
- Text: `#FFFFFF`
- Muted: `#888888`

### Animations
All animations are powered by Framer Motion and can be customized in `src/App.tsx`.

### Copy
Update the text content in the JSX to match your brand voice.

## Contact Info

- Instagram: [@thegifbeat](https://instagram.com/thegifbeat)
- TikTok: [@gifbeat.com](https://tiktok.com/@gifbeat.com)
- Email: gifbeatstudios@gmail.com

## License

MIT License - feel free to use this template for your own projects!
