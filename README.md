# DoodlePals

## Overview

**DoodlePals** is an interactive web application that encourages art therapy and social connection through creative expression. Users can create and share doodles, fostering personal wellness and building community. Whether you're an artist or someone looking to relax, DoodlePals offers a space for everyone to connect through creativity.

## Features

### User Authentication
- **Secure login** with email verification for safety.

### Drawing & Doodles
- **Interactive canvas** to create your artwork.
- **Doodle feed** to explore art shared by others in your friends list.

### Social Features
- **Comments and likes** to engage with other users' doodles.
- **Friend connections** to stay connected with friends and favorite artists.

### Responsive Design
- Fully responsive web design to **create and connect on any device**.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces, enabling a seamless and interactive user experience.
- **Vite**: A next-generation frontend tooling for faster development and improved performance.
- **Chakra UI**: A component library that provides accessible, customizable UI components for a smooth design.
- **Firebase**: A Backend-as-a-Service platform providing the following services:
  - **Firestore**: A NoSQL database for storing user data, doodles, and interactions.
  - **Authentication**: Secure user login and account management using email verification.
- **Node.js**: Back end web application framework for building RESTful APIs

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/username/doodle-pal.git
cd doodle-pal
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
pnpm run dev
```

4. Access the application
Open your browser and navigate to http://localhost:3000

## Algorithms Used

### 1. Bresenham's Line Algorithm – Line Drawing
- **What we learned:**
  - An efficient way to draw a line between two points using only integer calculations—ideal for pixel grids.
- **How we used it:**
  - Implemented to connect mouse-dragged points smoothly on the canvas.
  - Prevents gaps or jaggedness in user strokes by calculating next pixel positions precisely.

### 2. DFS (Depth-First Search) – Bucket Fill Feature
- **What we learned:**
  - A flooding algorithm that finds areas of the same color in the image using a stack.
- **How we used it:**
  - Used to identify all connected pixels of the same color when the user clicks an area.
  - Fills neighboring pixels to simulate a "paint bucket" tool (similar to MS Paint).

## Art Therapy Benefits

Research shows that creative expression through drawing can:
- **Reduce stress and anxiety**
- **Process complex emotions**
- **Improve focus and mindfulness**
- **Build self-awareness and confidence**


