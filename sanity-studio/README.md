# IEEE Computer Society Kerala Chapter — Sanity Studio Dashboard

This is the dedicated **Sanity Studio (CMS Dashboard)** for managing all content, stories, images, events, and office bearers for the IEEE Computer Society Kerala Chapter website.

> **Headless CMS Architecture**:
> Sanity is NOT a backend server. It is a hosted Content Lake with real-time GROQ APIs. The website stores no content internally; the React frontend queries Sanity directly via `@sanity/client`.

---

## 🛠️ What's Inside

- **Desk Structure**:
  - ⚙️ **Site Settings** (Meta description, chapter titles, social URLs, logo)
  - 🌟 **Hero Section** (Badges, headlines, accents, CTAs, marquee tags)
  - 📖 **Legacy Story Chapters** (40+ years history milestones, photos, accent callouts)
  - 🏛️ **Pillars / What We Do** (Learn, Build, Connect, Grow, Belong cards)
  - 📊 **Key Statistics** (Years of legacy, chapters, events, member counters)
  - 📅 **Upcoming Events** (Workshops, hackathons, lectures, dates, tags)
  - 👥 **Leadership & Office Bearers** (Professional Execom, Student Leadership, GSAC with designations, institutions, photos)
  - 🖼️ **Gallery Photos** (Photos with tags, categories, captions)
- **Vision Tool**: Real-time GROQ query playground to test queries before running in frontend.
- **Seeding Script**: Instant seed script (`scripts/seed.js`) with `seedData.json`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Sanity Project ID
Copy `.env.example` to `.env`:
```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```
*(If you don't have a project ID yet, run `npx sanity init` or create a free project at [sanity.io/manage](https://www.sanity.io/manage)).*

### 3. Start Sanity Studio Locally
```bash
npm run dev
```
Open **http://localhost:3333** to access the dashboard.

### 4. Seed Initial Content to Sanity
```bash
SANITY_TOKEN="your_write_token" npm run seed
```
