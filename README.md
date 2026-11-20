# Portfolio Genie 

An AI-powered portfolio builder designed to help students and fresh graduates create professional personal portfolios easily.

## 🚀 Features

- **Portfolio Builder:** Create a portfolio using a simple step-by-step form.
- **AI Writing Assistant:** Improve About Me sections and project descriptions using any AI tool.
- **Multiple Templates:** Choose from Minimal, Bento Grid, and Notebook designs.
- **Live Preview:** Preview your portfolio on desktop, tablet, and mobile layouts.
- **Local Storage:** Save portfolio data directly in your browser.
- **Download Portfolio:** Export your portfolio as a standalone HTML file.
- **Share Portfolio:** Generate a shareable link.

## 🛠️ Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Node.js
- Google Gemini API
- HTML & CSS

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd portfolio-genie
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```env
AI_API_KEY=your_AI_api_key_here
```

Get your API key from any AI tool.

### 5. Start the development server

Open the first terminal:

```bash
npm run dev
```

### 6. Start the AI proxy server

Open a second terminal:

```bash
npm run api
```

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```
## 📌 Note

NEVER commit your `.env` file or expose your AI API key.
