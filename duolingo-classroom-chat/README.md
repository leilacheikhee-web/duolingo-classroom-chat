# Welcome to 04 Type Safe Development
***

## Task
Build a type-safe classroom chat platform inspired by Duolingo, implementing advanced TypeScript patterns, Zod runtime validation, and educational content filtering to protect students in online learning environments.

## Description
I built a complete Duolingo-style classroom chat system with:
- **TypeScript strict mode** with generics, utility types, and conditional types
- **Zod schemas** for runtime validation of chat messages
- **Content filtering** to detect inappropriate words in classroom messages
- **React Hook Form** with Zod resolver for type-safe form handling
- **Type guards** for runtime type checking
- **Moderation dashboard** for teachers to monitor flagged messages

## Installation
```bash
cd duolingo-classroom-chat
npm install --legacy-peer-deps
npm run dev
```

## Usage
```
npm run dev
```
- Home page: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- API: http://localhost:3000/api/messages

Test content filtering by typing: `spam`, `hack`, `cheat`, `inappropriate`, `badword`

### The Core Team
Leila Cheikhe

<span><i>Made at <a href='https://qwasar.io'>Qwasar SV -- Software Engineering School</a></i></span>
<span><img alt='Qwasar SV -- Software Engineering School\'s Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' /></span>
