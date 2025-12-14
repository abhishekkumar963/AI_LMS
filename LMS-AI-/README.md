# AI-Powered Learning Management System (LMS)

A modern, interactive frontend for an AI-based Learning Management System built with React.js and Tailwind CSS.

## Features

- 🏠 **Home Page** - Beautiful hero section with feature highlights
- 📚 **Courses Page** - Browse available courses with course cards
- 📖 **Course Detail Page** - View course modules and use AI tools
- 🤖 **AI Tools Page** - Generate study materials, quizzes, and flashcards
- 📊 **Dashboard** - View enrolled courses and progress
- 💬 **Chatbot** - AI-powered learning assistant (floating on all pages)

## Tech Stack

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React (icons)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── Navbar.jsx
  │   └── Chatbot.jsx
  ├── pages/
  │   ├── Home.jsx
  │   ├── Courses.jsx
  │   ├── CourseDetail.jsx
  │   ├── AITools.jsx
  │   └── Dashboard.jsx
  ├── data/
  │   └── mockData.js
  ├── App.jsx
  ├── main.jsx
  └── index.css
```

## Pages

### Home
- Hero section with gradient background
- Feature cards highlighting AI capabilities
- Call-to-action buttons

### Courses
- Grid layout of course cards
- Course images, descriptions, and teacher info
- Navigation to course details

### Course Detail
- Course information and modules
- AI tool buttons (Study Material, Quiz, Flashcards)
- Modals for each AI tool

### AI Tools
- Study Material Generator
- Quiz Generator with scoring
- Flashcard Generator with flip animation

### Dashboard
- Welcome message
- Enrolled courses with progress bars
- Quick action buttons
- Statistics cards

### Chatbot
- Floating chat button
- Chat interface with message history
- Simulated AI responses

## Mock Data

All data is simulated using mock functions in `src/data/mockData.js`. AI responses are generated with delays to simulate real API calls.

## Notes

- No authentication required
- No payment integration
- All AI responses are simulated
- Responsive design for mobile and desktop
- Smooth animations with Framer Motion

## License

This project is for educational purposes.

