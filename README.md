# Gestion des Emplois du Temps – FrontEnd with Angular

This is the **FrontEnd application** of the academic project **Gestion des Emplois du Temps** (Timetable Management System), developed with **Angular**.  
It is designed for universities to manage and visualize class schedules for professors and students, with additional features such as notifications and session rescheduling (séances de rattrapage).

---

## 📌 Project Overview

The goal of this project is to provide an intuitive and interactive interface to:
- Display and navigate **timetables** for both students and professors.
- Allow professors to schedule **make-up sessions (séances de rattrapage)**.
- Notify students and concerned professors when updates or changes occur.
- Enable **admins** to validate professor requests and manage the system.
- Offer a clean, accessible interface for academic schedule management.

This project is part of a larger system, with this repository focusing on the **Angular FrontEnd**.

---

## 🚀 Features

- 📅 **View Timetables**: Students and professors can easily view their schedules.  
- 🔔 **Notifications**: Users receive alerts when a timetable changes or a make-up session is scheduled.  
- 👩‍🏫 **Professor Tools**: Professors can submit requests for make-up sessions.  
- 🧑‍💼 **Admin Role**:  
  - Validate or reject professor requests.  
  - Perform **CRUD operations**: add, update, or delete professor records.  
  - Ensure the timetable system remains accurate and consistent.  
- 🎓 **Student Access**: Students can consult their personalized timetable and be notified of updates.  
- 📱 **Responsive Design**: Optimized for desktop and mobile use.  

---

## 🛠️ Tech Stack

- **Framework**: Angular (v17+)  
- **Language**: TypeScript, HTML, SCSS  
- **Tools**: Angular CLI, RxJS  
- **Version Control**: Git & GitHub  

---

## 📂 Project Structure

``bash
src/
 ├── app/               # Main Angular app modules and components
 ├── assets/            # Static files (icons, images, etc.)
 ├── environments/      # Environment configuration
 └── index.html         # App entry point


▶️ Steps to Run the Project

Clone the repository

git clone https://github.com/chorfichaymaa101/Gestions-des-emplois-du-temps-ENSA-FrontEnd.git
cd Gestions-des-emplois-du-temps-ENSA-FrontEnd


Install dependencies and Angular CLI if needed

npm install
npm install -g @angular/cli   # if Angular CLI is not installed


Start the development server

ng serve


Open the app in your browser
Go to: http://localhost:4200

The app will automatically reload if any source files are changed.

Build for production (optional)

ng build
