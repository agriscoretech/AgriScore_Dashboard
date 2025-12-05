# AgriScore Dashboard

A comprehensive smart agriculture dashboard for monitoring farms, fields, IoT devices, and sensor data. Built with React, TypeScript, and Vite.

## Features

- 📊 **Real-time Dashboard** - Monitor farm metrics at a glance
- 🌾 **Crop Management** - Track crops, planting dates, and yields
- 💧 **Soil & Water Monitoring** - IoT sensor data visualization
- 🌤️ **Weather Integration** - Real-time weather data and forecasts
- 📋 **Task Management** - Organize farm operations
- 🤖 **AI Crop Doctor** - Disease detection powered by Gemini AI
- 📈 **Reports & Analytics** - Data-driven insights
- ⭐ **AgriScore Rating** - Farm health scoring system

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **Build**: Vite
- **Deployment**: Vercel

## Project Structure

```
src/
├── assets/          # Static assets (images, data files)
│   └── data/        # CSV and JSON data files
├── components/      # Reusable UI components
│   └── ui/          # Base UI components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services and data fetching
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Insohamdas/AgriScore_Dashboard.git
cd AgriScore_Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run type-check # Run TypeScript type checking
```

## Deployment

The app is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

MIT License - see LICENSE file for details.

