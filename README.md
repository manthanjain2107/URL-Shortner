# URLite MERN

A MERN version of the URL shortener using:
- React + Vite frontend
- Express + Node.js backend
- MongoDB Community Server running locally
- Mongoose for database access

## Run locally

1. Make sure the MongoDB Windows service is running.
2. Install dependencies:
   - `npm install`
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
3. Start both apps:
   - `npm run dev`
4. Open:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## Local database

The backend uses local MongoDB, not Atlas.
Default connection:
- `mongodb://127.0.0.1:27017/urlite`
