# Sprint1

# Research Management System
A full-stack application for managing research projects, built with Spring Boot and React.

***

## Team 6: Researchers Expertise Publishment
Ria Mukherji, Zareenah Murad, Serap Ogut, Claudia Pinkerton

## Sprint Goals & Features Implemented
Setup basic frontend-backend connection and integrate MySQL database.
Users can register and create an account based on their role (Researcher, Student, Sponsor). Users are stored in the database, allowing for users to log in to the system using their email and chosen password. 

***

## Prerequisites

Before running this project, make sure you have the following installed:
- Java JDK 17 or higher
- Node.js and npm (Node Package Manager)
- MySQL Server
- Git

## Database Setup

1. Install MySQL and start the MySQL service
2. Create a new database:
```sql
   CREATE DATABASE swesprint;
```

## Backend Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd Sprint1
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Setup application.properties
   - A sample file is provided at `backend/src/main/resources/application-sample.properties`
   - Copy the file and fill in your credentials
   ```
   cp src/main/resources/application-sample.properties src/main/resources/application.properties
   ```
   - Edit application.properties to include your MySQL username and password
   ```
   spring.datasource.username=yourUsername
   spring.datasource.password=yourPassword
   ```

4. Run the Spring Boot application:
```bash
./gradlew bootRun
```
- For Windows users: use `gradlew.bat bootRun`
- The backend will start on http://localhost:8080

## Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```
- The frontend will start on http://localhost:3000

## Verifying the Setup

1. Once both servers are running, visit http://localhost:3000 in your browser
2. You should see the Research Management System page
3. If you see "Hello from backend!", the connection is working properly

## Common Issues

1. If MySQL connection fails:
   - Verify MySQL is running
   - Check credentials in application.properties
   - Ensure database 'swesprint' exists

2. If npm install fails:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules folder and try again

## Contributing

1. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub

## Current Features
- Basic frontend-backend connection
- MySQL database integration

## Coming Soon
- Research project management
- Funding opportunities
