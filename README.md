# Helfy Task Manager - Home Assignment

A sleek and modern Task Manager application built with React and Node.js. This project features a custom-built infinite carousel for task management, as required by the technical assessment.

## 🚀 Features
- **Endless Carousel**: A custom-implemented animated carousel with smooth infinite looping, built from scratch without external libraries .
- **Full CRUD**: Create, Read, Update, and Delete tasks with a real Express backend.
- **Task Filtering**: Filter tasks by All, Active, or Completed status.
- **Priority Indication**: Visual badges and color-coded priorities (High, Medium, Low).
- **Confirmation Flow**: Secure deletion process with user confirmation.

## 🛠️ Setup and Installation

### Prerequisites
- Node.js installed.
- npm.

### Installation
1. Clone the repository:
   ```bash
   git clone [Your-GitHub-Repo-Link]
   cd firstname_lastname_helfy_task

2. Install Backend dependencies:
 cd backend
 npm install

3. Install Frontend dependencies:
Bash
cd ../frontend
npm install

## 💻 How to Run:

1. Start the Backend (Port 4000)
From the backend directory:

Bash
npm start

2. Start the Frontend (Port 3000)
From the frontend directory:

Bash
npm start

## 📡 API Documentation:
- The REST API includes the following endpoints :GET /api/tasks - Retrieve all tasks.
- POST /api/tasks - Create a new task.
- PUT /api/tasks/:id - Update an existing task.
- DELETE /api/tasks/:id - Remove a task.
- PATCH /api/tasks/:id/toggle - Toggle completion status.

## 🧠 Design Decisions & Assumptions:
- Infinite Carousel Logic: To ensure a "real" continuous loop, I implemented a "cloned nodes" technique where the first and last items are duplicated at the ends of the array. This allows for seamless transitions before silently resetting the index.
- Data Persistence: As requested, data is stored in-memory using a simple array on the server.
- State Management: Used "Lifting State Up" to App.js to keep the data flow simple and maintainable.
- Edge Cases: Implemented specific logic to handle empty lists and index corrections when the last task in the list is deleted.

## ⏱️ Time Spent:
- Backend API: 60 minutes.
- Frontend & Carousel Logic: 120 minutes.
- Styling & UI Polish: 45 minutes.
- Testing & Documentation: 30 minutes
