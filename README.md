Recipe App - Setup & Run Instructions

Prerequisites

Ensure you have the following installed on your machine:

Node.js (v18 or later) - Download

npm (comes with Node.js) or yarn

Vite (for frontend) - Installed via npm install

TypeScript (for backend) - Installed via npm install

Running the Project

1Clone the Repository

git clone https://github.com/your-repo-name.git
cd your-repo-name

Frontend Setup (React + Vite + TailwindCSS)

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will be available at:

http://localhost:5173/

Additional Frontend Commands

Build for Production:

npm run build

Preview Production Build:

npm run preview

Run Linter:

npm run lint

Backend Setup (Node.js + Express)

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Start the backend development server:

npm run dev

The backend will be running at:

http://localhost:3000/

Additional Backend Commands

Manually run TypeScript:

npx tsc

Run with nodemon (auto-restarts on changes):

npm run dev

Environment Variables

Create a .env file in the backend directory and define the following:

PORT=3000
ALLOWED_ORIGIN=http://localhost:5173

(Optional) Add environment variables to configure external APIs if needed.

Project Structure

recipe-app/
│── frontend/        # React + Vite (UI)
│── backend/         # Node.js + Express (API)
│── README.md       # Project setup instructions

✅ Ready to Go!

Once both frontend and backend servers are running, open http://localhost:5173/ in your browser and start exploring the app! 🎉

Happy Coding! 🚀
