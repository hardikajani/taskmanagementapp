# taskmanagementapp
taskmanagementapp using MERN

# Overview
The Cloud-Based Task Manager is a web application designed to streamline team task management. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for efficient task assignment, tracking, and collaboration. The application caters to regular users, offering comprehensive features to enhance productivity.



### Why/Problem?
In a dynamic work environment, effective task management is crucial for team success. Traditional methods of task tracking through spreadsheets or manual systems can be cumbersome and prone to errors. The Cloud-Based Task Manager aims to address these challenges by providing a centralized platform for task management, enabling seamless collaboration and improved workflow efficiency.



### **Background**:
With the rise of remote work and dispersed teams, there is a growing need for tools that facilitate effective communication and task coordination. The Cloud-Based Task Manager addresses this need by leveraging modern web technologies to create an intuitive and responsive task management solution. The MERN stack ensures scalability, while the integration of Redux Toolkit, Headless UI, and Tailwind CSS enhances user experience and performance.


### 
## **User Features:**
1. **Task Interaction:**
    - Add task (title, description, and a status ).
    - Update task title, description, and a status (e.g., "To Do," "In Progress," "Done").
    - Delete task.
    - View detailed task information.


## **General Features:**
1. **Authentication and Authorization:**
    - User create account.
    - User login with secure authentication.
    - User-based access control.

2. **Dashboard:**
    - Provide a list of tasked added by user.
    - Filter tasks into todo, in progress, or done.
    - Update task title, description, and a status (e.g., "To Do," "In Progress," "Done").
    - Delete task.


## **Technologies Used:**
- **Frontend:**
    - React (Vite)
    - Redux Toolkit for State Management
    - Headless UI
    - Tailwind CSS
    - Material-tailwind
    - Axios for api calling


- **Backend:**
    - Node.js with Express.js
    - Firebase fot user authentication.
    
- **Database:**
    - MongoDB for efficient and scalable data storage.


The Cloud-Based Task Manager is an innovative solution that brings efficiency and organization to task management within teams. By harnessing the power of the MERN stack and modern frontend technologies, the platform provides a seamless experience for both administrators and users, fostering collaboration and productivity.

&nbsp;

## SETUP INSTRUCTIONS


# Server Setup

## Environment variables
First, create the environment variables file `.env` in the backend folder. The `.env` file contains the following environment variables:

- MONGODB_URI = `your MongoDB URL`
- PORT=5001

- MONGODB_URI=
- CORS_ORIGIN=*
- FIREBASE_API_KEY=
- FIREBASE_AUTH_DOMAIN=
- FIREBASE_PROJECT_ID =
- FIREBASE_STORAGE_BUCKET =
- FIREBASE_MESSAGING_SENDER_ID =
- FIREBASE_APP_ID =
- FIREBASE_TYPE = 
- FIREBASE_PRIVATE_KEY_ID = 
- FIREBASE_PRIVATE_KEY = 
- FIREBASE_CLIENT_EMAIL = 
- FIREBASE_CLIENT_ID = 
- FIREBASE_AUTH_URI = 
- FIREBASE_TOKEN_URI =


&nbsp;

## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:
    - Visit MongoDB Atlas Website
        - Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Create an Account
    - Log in to your MongoDB Atlas account.
    - Create a New Cluster
    - Choose a Cloud Provider and Region
    - Configure Cluster Settings
    - Create Cluster
    - Wait for Cluster to Deploy
    - Create Database User
    - Set Up IP Whitelist
    - Connect to Cluster
    - Configure Your Application
    - Test the Connection

2. Create a new database and configure the `.env` file with the MongoDB connection URL. 

## Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the backend directory `cd backend`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm start` or `npm run dev` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

# Client Side Setup

## Steps to run client

1. Navigate into the frontend directory `cd frontend`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm run dev` to run the app on `http://localhost:5173`.
4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.



&nbsp;

## For Support, Contact:

- Email: webajanihardik@gmail.com
- WhatsApp Chat: +91 94282 54548
