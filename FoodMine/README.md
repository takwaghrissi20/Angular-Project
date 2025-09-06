# 🍔 FoodMine

# Description
# FoodMine is a MEAN stack application (MongoDB, Express.js, Angular, Node.js) 
# that provides a platform for browsing, managing, and ordering food items.
# Fully containerized with Docker for easy development and deployment.

# 🚀 Tech Stack
# Frontend: Angular
# Backend: Node.js + Express.js
# Database: MongoDB
# Containerization: Docker & Docker Compose

# 📂 Project Structure
FoodMine/
├── frontend/         # Angular app + Dockerfile
├── backend/          # Express/Node.js app + Dockerfile
│   ├── routers/      # API routers (e.g., food.router.ts)
│   └── server.ts     # Express server entrypoint
├── docker-compose.yml
└── README.md

# 🔧 Setup & Installation

# 1. Clone the repository
git clone https://github.com/takwaghrissi20/Angular-Project.git
cd FoodMine

# 2. Run the application with Docker Compose
docker-compose up --build

# This will start frontend, backend, and MongoDB services in Docker containers.

# ✅ Notes
# - Access the frontend at http://localhost:4200 (default Angular port)
# - Backend API runs on http://localhost:5000
# - Ensure Docker and Docker Compose are installed
