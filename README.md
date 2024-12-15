# Task Manager App

This project is a React-based task management application built as part of the Software Engineer Internship selection process for Asipiya Soft Solutions Pvt Ltd. The app allows users to manage tasks by adding, editing, deleting, marking them as completed, and filtering tasks based on their status.

## Features  

- **Task List**: Displays tasks with the following fields:  
  - **Task Name**  
  - **Description**  
  - **Status**: Completed / Not Completed  
- **Add Task**: Add new tasks to the list.  
- **Edit Task**: Update task name and description.  
- **Delete Task**: Remove tasks from the list.  
- **Mark as Completed**: Toggle task status to "Completed" or "Not Completed".  
- **Dynamic Color Coding**:  
   - **Green**: Tasks marked as "Completed".  
   - **Orange**: Tasks marked as "Not Completed".  
- **Filter Tasks**: View tasks based on status:  
   - All Tasks  
   - Completed Tasks  
   - Not Completed Tasks  

---

## Technologies Used  

### Frontend  
- **React.js** (with hooks)  
- **Tailwind CSS** for responsive styling  
- **React Icons** for interactive buttons  

### Backend  
- **Node.js** with **Express.js**  
- **MySQL** for storing task data  

---

## Installation and Setup  

### Prerequisites  

Make sure you have the following installed on your system:  
- **Node.js** (v16 or later)  
- **MySQL**  
- **Git**  

---

### Steps to Run the Project  

1. **Clone the Repository**:  
   ```bash
   git clone [repository-url]
   cd [repository-folder]
   ```

2. **Setup the Frontend**:  
   - Navigate to the frontend folder:  
     ```bash
     cd frontend
     ```  
   - Install dependencies:  
     ```bash
     npm install
     ```  
   - Start the development server:  
     ```bash
     npm start
     ```  
   - The frontend will be accessible at [http://localhost:5173](http://localhost:5173).  

3. **Setup the Backend**:  
   - Navigate to the backend folder:  
     ```bash
     cd backend
     ```  
   - Install dependencies:  
     ```bash
     npm install
     ```  
   - Configure the MySQL database:  
     - Create a new database named `sys`.  
     - Update the database configuration in `index.js` with your MySQL credentials.  

   - Run the backend server:  
     ```bash
     node server.js
     ```  
   - The backend will be accessible at [http://localhost:5000](http://localhost:5000).  

---

## Folder Structure  

```
project-root/
│
├── frontend/         # React.js app for the Task Manager
│   ├── src/
│   │   ├── components/     # Task components (UI)
│   │   ├── App.jsx         # Main React App logic
│   │   └── main.jsx        # Entry point
│   └── tailwind.config.js  # Tailwind CSS configuration
│
├── backend/          # Node.js backend
│   ├── index.js      # Main backend server file
│   └── config.js     # Database configuration (optional)
│
└── README.md         # Project documentation
```

---

## Usage  

1. Open the application in your browser at [http://localhost:5173](http://localhost:5173).  
2. **Add Tasks**: Use the input form to add a new task.  
3. **Edit Tasks**: Click the "📝" icon to modify a task's name or description.  
4. **Delete Tasks**: Click the "🗑️" icon to remove a task.  
5. **Mark as Completed**: Click the "✅" icon to mark tasks as completed.  
6. **Filter Tasks**: Switch between All, Completed, and Not Completed tasks.  

---

## Code Quality  

- The application follows clean and modular coding practices.  
- React hooks are used for state management.  
- Components are reusable and easy to maintain.  
- Tailwind CSS ensures clean, responsive design.  

---  

---

## Author  

This application was developed by **Sanduni Kaushalya Rajapaksha** as part of the internship selection process for **Asipiya Soft Solutions Pvt Ltd**. 

- **GitHub**: https://github.com/SKR99-GIT   
- **Email**: sandunikr1999@gmail.com  

---
