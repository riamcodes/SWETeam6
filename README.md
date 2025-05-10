# Research Management System

A full-stack web application for managing research projects, built with **Spring Boot (Java)**, **React (JavaScript)**, and **MySQL**, all containerized with **Docker**.

## Team 6:
- Ria Mukherji  
- Zareenah Murad  
- Serap Ogut  
- Claudia Pinkerton

---

## Features Implemented

- Full-stack connection between frontend (React) and backend (Spring Boot)
- MySQL integration with Docker Compose
- User registration and authentication by role: **Researcher**, **Student**, or **Sponsor**
- Each user is stored in the MySQL database
- Users can log in using their email and password
- Users can view trending research topics, including a "Last Updated" timestamp to know how recent the information is
- Users can view a graph showing when the last research entry was posted
- Researchers can publish their expertise, and edit/update postings as needed
- Students and sponsors can search/sort through research listings
- Students and sponsors can contact researchers through the platform

---

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)
- (Optional) [Java 17+](https://adoptopenjdk.net/) and [Node.js](https://nodejs.org/) if running outside Docker

---

## 🛠️ Project Setup (Using Docker)

### 1. Clone the repository

```bash
git clone [repository-url]
cd Sprint1
```

### 2. Start the app using Docker Compose

```bash
docker-compose up --build -d
```

- This builds and starts the **backend**, **frontend**, and **MySQL database**
- The backend will run at: [http://localhost:8080](http://localhost:8080)
- The frontend will run at: [http://localhost:3000](http://localhost:3000)

---

## Verifying the Setup

1. Visit [http://localhost:3000](http://localhost:3000)
2. Register or log in with a role-specific account
3. If backend is working, you should be able to fetch/post data to the database

---

## Database Info

- MySQL runs in Docker and exposes port `3307` to avoid conflicts
- Default credentials:
  - **Database**: `cshub`
  - **User**: `root`
  - **Password**: `password`
- Tables are created using a `schema.sql` file run by Spring Boot on startup

---

## Common Issues

### Problem: Backend can't connect to database
- Ensure Docker is running
- Confirm you're using `jdbc:mysql://db:3306/cshub` inside Spring Boot config

### Problem: Table not found
- Make sure `schema.sql` exists in `backend/src/main/resources/`
- Check that `spring.sql.init.mode=always` is set in `application.properties`

---

## 🔧 Development Notes (Without Docker)

If needed, you can still run frontend/backend independently:

### Backend

```bash
cd backend
./gradlew bootRun
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature
```

2. Commit and push:
```bash
git add .
git commit -m "Add new feature"
git push origin feature/your-feature
```

3. Open a Pull Request on GitHub

---

