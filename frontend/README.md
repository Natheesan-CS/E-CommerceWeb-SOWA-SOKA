# SOKA (SOWA E-Commerce)

Welcome to the SOKA E-Commerce project. This repository contains both a React frontend and a Spring Boot backend, providing a complete platform for online shopping.

## Features

- **Modern UI/UX**: Built with React and tailored with a clean, glassmorphic design and smooth animations for a premium user experience.
- **Product Management**: Browse a catalog of products with detailed views, and an intuitive shopping cart system.
- **Checkout Process**: Seamless checkout flow with order summary and status management.
- **Admin Dashboard**: A comprehensive admin panel to view, track, and manage all customer orders.
- **Robust Backend**: Powered by Spring Boot and JPA/Hibernate for secure data transactions and RESTful API endpoints.
- **Relational Database**: Uses MySQL for persistent, reliable data storage.

---

## How to Run on Another PC (Prerequisites)

To get this project running on a new machine, ensure you have installed the following software:

1. **Java Development Kit (JDK)**: Version 17 or higher.
2. **Maven**: For building the backend dependencies.
3. **Node.js**: Version 14 or higher (and `npm`, which comes with it).
4. **MySQL Server**: Ensure MySQL is installed, running on port `3306`, and accessible.
5. **Git**: (Optional) to clone the repository.

---

## 1. Database Setup

Before running the backend, you need to prepare the MySQL database:
1. Open your MySQL client (e.g., MySQL Workbench, XAMPP, or command line).
2. Create the required database by executing the following SQL command:
   ```sql
   CREATE DATABASE ecommerce_db_v2;
   ```
3. By default, the application connects using the username `root` with no password. If your local MySQL setup has a different username or a password, you will need to update the configuration file located at:
   `backend/src/main/resources/application.properties`

---

## 2. Running the Backend (Spring Boot)

1. **Navigate to the backend directory**:
   Open a terminal and move into the `backend` folder:
   ```bash
   cd backend
   ```
2. **Start the Server**:
   Build and run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   *Alternative*: If you use an IDE like IntelliJ IDEA or Eclipse, you can import the `backend` folder as a Maven project and run `BackendApplication.java`.
   
   The backend API will start on **http://localhost:8080**.

---

## 3. Running the Frontend (React)

1. **Navigate to the frontend directory**:
   Open a *new* terminal window (leave the backend terminal running) and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. **Install Dependencies**:
   Wait a moment for `npm` to download and install all required packages:
   ```bash
   npm install
   ```
3. **Start the Application**:
   Run the React development server:
   ```bash
   npm start
   ```
   The frontend application should automatically open in your default browser at **http://localhost:3000**. If it doesn't, navigate to that URL manually.

---

## Notes
- To test the full functionality of the site (like fetching products, completing the checkout flow, or viewing orders in the admin dashboard), **both** the frontend and backend servers must be running simultaneously together with the MySQL database.
- The frontend was bootstrapped with Create React App and utilizes standard `npm` scripts (`start`, `build`, `test`).
