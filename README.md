# Parampara — Threads Through Time

An interactive digital timeline covering 9 key periods of Indian art history, submitted as part of the Formative Assessment I (FM-I) for Indian Art.

This web application is built with **React + Vite**, animated using **GSAP (GreenSock Animation Platform)**, and styled with **plain CSS** following a traditional, vibrant folk-art visual language.

## Project Features
- **Scroll-driven Timeline Spine**: A central dotted spine down the page.
- **GSAP ScrollTrigger Diya Lamp**: A traditional, animated clay lamp (diya) with a flickering flame that travels down the spine in sync with the scroll position.
- **Fixed Navigation & Counters**: A top nav bar featuring a dynamic section counter (`01 / 09` through `09 / 09`) and a vertical progress dot rail on the right edge of the screen for quick navigation.
- **Detailed Replica Modals**: Clickable circular "seal" badges for each of the 9 periods that expand to display the period dates, descriptive text, and a list of at least three real historical artifacts with context and tags.
- **Accessible Design**: Optimized responsive grid layouts for mobile/desktop, custom scrolls, and full support for `prefers-reduced-motion`.

---

## 1. Local Run Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Setup and Running
1. Open your terminal and navigate to the project directory:
   ```bash
   cd parampara-timeline
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local address displayed in your terminal (usually `http://localhost:5173`).

### Creating a Production Build
To test a clean production build of the project, run:
```bash
npm run build
```
This generates a production-ready bundle in the `dist/` directory.

---

## 2. Vercel Deployment Instructions

### Method A: Deploy via Vercel + GitHub Integration (Recommended)
1. Push this folder (or the entire repository) to your **GitHub / GitLab / Bitbucket** account.
2. Log in to [Vercel](https://vercel.com).
3. Click the **Add New** button on your dashboard and select **Project**.
4. Import your repository from your Git provider.
5. In the configuration settings, if this is part of a monorepo, set the **Root Directory** to `parampara-timeline`.
6. Make sure the framework preset is set to **Vite**.
7. Keep default commands:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
8. Click **Deploy**. Vercel will build the application and provide a live URL.

### Method B: Deploy via Vercel CLI
If you prefer deploying directly from your terminal using the Vercel Command Line Interface:
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```bash
   vercel login
   ```
3. Navigate to the timeline project directory:
   ```bash
   cd parampara-timeline
   ```
4. Initialize the deployment:
   ```bash
   vercel
   ```
   *Follow the terminal prompts (choose default project settings, and select `parampara-timeline` as the project directory).*
5. Deploy to production:
   ```bash
   vercel --prod
   ```
