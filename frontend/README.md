# IEEE Computer Society Kerala Chapter — React Frontend Redesign

A fresh, modern React redesign of the **IEEE Computer Society Kerala Chapter** website, completely decoupled from local hardcoded content and powered by **Sanity Content Lake**.

---

## 🌟 Architecture & Headless Concept

- **React + Vite**: High performance, modern developer experience.
- **Sanity Content Lake**: All texts, images, team rosters, events, pillars, and legacy chapters are queried live via `@sanity/client` using GROQ.
- **Zero Local Database / No Backend**: The frontend stores no data. It communicates directly with Sanity's API.
- **Medium-Level Animations**:
  - Smooth preloader counter with curtain reveal.
  - Infinite event photo marquee ribbon with glass acrylic frost.
  - Interactive legacy story explorer with image crossfading.
  - Filterable gallery grid with smooth transitions.
  - Animated statistics counters.
  - Collapsible leadership accordions with photo avatars.
  - Confetti burst on membership engagement.
- **Design & Typography**:
  - `Anybody` (geometric variable grotesk display).
  - `Italiana` (high-contrast display serif italic accent).
  - `Urbanist` (clean modern body).
  - Warm paper/ink palette with full light and dark mode support.

---

## 🚀 Running the Frontend

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Sanity (Optional)
Edit `.env` or click the **"Sanity Mode"** status pill in the top navigation bar to connect your live Sanity `projectId`.

```bash
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
```

### 3. Start the Dev Server
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.
