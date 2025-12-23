# 🚀 Modern Developer Portfolio

A sleek, high-performance, and fully customizable developer portfolio built with **React**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **🎨 Modern Design**: Glassmorphism UI, smooth gradients, and responsive layout.
- **⚡ Super Fast**: Built on Vite 7 and React 19 with lazy loading.
- **🐙 GitHub Integration**: Dedicated **Activity Tab** showing:
  - Contribution Heatmap
  - Repository Stats (Stars, Followers)
  - Real-time Activity Feed (Commits, PRs, Releases)
  - Top Repositories
- **🛠️ Project Showcase**: Filterable project grid with "accordion" details.
- **📝 Contact Form**: Connected to Google Apps Script for easy persistence.
- **👁️ View Counter**: Integrated view counting using Counter API.
- **⚙️ Fully Customizable**: All content and links are managed via `.env.local` — no code changes needed!
- **📱 Mobile Ready**: Sticky bottom navigation for mobile users.

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: React Icons (Fi, Fa)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/am-goku/portfolio-app.git
cd portfolio-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory. Copy the following template and fill in your details:

```env
# --- General Info ---
VITE_NAME="Your Name"
VITE_TITLE="Full Stack Developer"
VITE_PROFILE_IMAGE="https://your-image-link.com/photo.jpg"
VITE_RESUME_PATH="/resume/your-resume.pdf"

# --- Contacts ---
VITE_EMAIL="hello@example.com"
VITE_PHONE="+1 234 567 890"
VITE_WEBSITE="https://yourwebsite.com"

# --- Social Links ---
VITE_GITHUB_URL="https://github.com/youricon"
VITE_LINKEDIN_URL="https://linkedin.com/in/yourid"
VITE_INSTAGRAM_URL="https://instagram.com/yourid"
VITE_TWITTER_URL="https://twitter.com/yourid"
VITE_FACEBOOK_URL="https://facebook.com/yourid"

# --- GitHub Integration ---
# Your GitHub username to fetch stats/activity
VITE_GITHUB_USERNAME="your-github-username"

# --- Integrations ---
# Google Apps Script URL for Contact Form
VITE_CONTACT_FORM_URL="https://script.google.com/macros/s/..."

# Counter API URL (optional)
VITE_COUNTER_API_URL="https://api.counterapi.dev/v1/..."
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

## 📁 Project Structure

```
src/
├── components/        # UI Components
│   ├── buttons/       # Interactables
│   ├── tabs/          # Main Content Tabs (Home, Projects, Activity)
│   └── fields/        # Form Fields
├── lib/
│   ├── data.ts        # Data configuration (reads from env)
│   ├── github.ts      # GitHub API logic & caching
│   └── service/       # API Services (Contact, Counter)
├── App.tsx            # Main Layout
└── main.tsx           # Entry Point
```

## 🎨 Customization

### Changing Content

Most text (Name, Title, Socials) is updated automatically by changing `.env.local`.

### Adding Projects

Edit `src/lib/data.ts` to add your projects manually. The existing code sources profile info from env, but the `EDUCATION` and project data structures are defined in `data.ts`.

### GitHub Tab

The **Activity** tab automatically fetches data for the `VITE_GITHUB_USERNAME` defined in your env file. It uses `localStorage` caching (1 hour) to avoid hitting API rate limits.

---

## 📜 License

MIT License. Free to use and modify for your own portfolio!
