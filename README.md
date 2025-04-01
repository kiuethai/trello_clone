# Trello Clone Web Application

![Trello clone](trello_clip.gif)

### [Demo](https://trello-clone-phi-wheat.vercel.app/) 
---

- [Overview](#Overview)
- [Key Features](#Key-Features)
- [User Authentication](#user-authentication)
- [Technologies Used](#technologies-used)
  - [1. **Frontend**](#Frontend)
  - [2. **Backend**](#Backend)
  - [3. **Real-Time Features**](#real-time-features)
  - [4. **Authentication**](#Authentication)
- [Steps to run this on your local](#Steps-to-run-this-on-your-local)
- [Test Account](#Test-account)
---

## 🚀 Overview
The **Trello Clone Web Application** is a powerful and user-friendly project management tool inspired by Trello. It helps individuals and teams organize tasks efficiently using **boards**, **lists**, and **cards**. Whether you're managing personal to-dos or collaborating with a team, this app offers an intuitive interface with features like drag-and-drop task management, real-time collaboration, and smart notifications—all designed to streamline workflows.

This project is built with modern web technologies, showcasing my skills in full-stack development, real-time features, and secure authentication.

---

## ✨ Key Features
Here are the standout features of the application:

- **Boards**: Create and customize multiple boards to manage different projects or workflows.  
- **Lists**: Organize tasks within boards by adding lists (e.g., "To Do," "In Progress," "Done").  
- **Cards**: Add detailed tasks to lists with descriptions, due dates, attachments, and more.  
- **Drag-and-Drop**: Move cards and lists effortlessly with smooth drag-and-drop functionality.  
- **Team Collaboration**: Invite teammates to boards, assign tasks, and work together in real-time.  
- **Notifications**: Receive instant updates on task changes, deadlines, or team actions.  
- **Labels & Filters**: Tag tasks with labels (e.g., "Urgent," "Bug") and use filters to find them quickly.

---

## 🔒 User Authentication
The app prioritizes security and user experience. Here’s how authentication works:
- **Sign Up / Sign In**: Register or log in securely using email and password.  
- **Account Verification**: New users receive an email with a verification link (powered by Brevo) to activate their account.
- Login/Register with JWT token authentication
---

## 🛠️ Technologies Used
The project leverages modern technologies for performance and scalability. Here’s the list:

### Frontend
- **JavaScript**: Drives the app’s logic and interactivity.  
- **HTML/CSS**: Builds and styles a responsive, clean interface.  
- **React**: Creates dynamic, reusable UI components for a seamless experience.  
- **Redux**: Manages the app’s state, ensuring smooth data flow.  
- **Axios**: Handles API requests for efficient backend communication.
- **Material UI**: Enhances the user interface with a rich set of pre-designed, customizable components (e.g., buttons, modals, cards), delivering a modern, Trello-like design with minimal effort.

### Backend
- **Node.js**: Runs server-side logic quickly and efficiently.  
- **Express.js**: Simplifies API development with a lightweight, flexible framework.  
- **MongoDB**: Stores data in a flexible, scalable NoSQL database.  
- **Mongoose**: Adds structure to MongoDB with schemas and simplifies data management.

### Real-Time Features
- **Socket.io**: Enables instant updates (e.g., task changes, notifications) for all users.

### Authentication
- **Brevo**: Sends secure verification emails and password reset links.

---

### Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `https://github.com/kiuethai/trello_clone`
2. Run `yarn install`
3. Run `yarn dev`


## Test Account

To quickly explore the application without registering, you can use the following test account:
- Email: hoangthiloan1991152@gmail.com
- Password: 123456789a 

Log in with these credentials to check out the features like creating boards, lists, and cards!
