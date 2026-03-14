# LaunchCode-Final-Project-Price-Comparison

# Grocery Price Comparison Tool

## Project Overview

The Grocery Price Comparison Tool is a full-stack web application designed to help users compare grocery prices across multiple stores and organize their shopping more efficiently. The application allows users to search for grocery items and view prices from different stores side-by-side, add items to a cart, and create persistent shopping lists stored in a database. The goal of the project is to reduce guesswork when grocery shopping and help users identify the most affordable options available. This project was built as part of a software development course to demonstrate full-stack development skills including frontend UI development, backend API creation, and database integration.

---

## Technologies Used

### Frontend
- React
- React Router
- JavaScript (ES6)
- HTML5
- CSS3
- Fetch API
- React Icons

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA

### Database
- MySQL (or H2 depending on your configuration)

### Development Tools
- Vite
- Maven
- IntelliJ IDEA / VS Code
- Git & GitHub

### External APIs
- TheMealDB API (Random recipe generator)

---

## Project Structure

### Frontend (React)
src/
    components/
        layout/
        pages/
        data/
    App.jsx
    main.jsx

### Backend (Spring Boot)
com.example.Price_Comparison
    config/
    controllers/
    dto/
    models/
    repositories/

This project follows a component-based frontend architecture and a layered backend architecture using DTOs and repositories.

---

## Installation Instructions

To run this project locally, follow the steps below.

### Clone the Repository

### Backend Setup (Spring Boot)
- Navigate to the backend folder
- Ensure you have the following installed:
    - Java 17+
    - Maven
    - MySQL (if not using H2)
- Configure your database in application.properties if necessary
    - spring.datasource.url=jdbc:mysql://localhost:3306/pricecomparison
    - spring.datasource.username=root
    - spring.datasource.password=yourpassword
    - spring.jpa.hibernate.ddl-auto=update
- Run the Spring Boot application
    - The backend API will start on: http://localhost:8080

### Frontend Setup (React)
- Navigate to the frontend folder
- Install dependencies
    - npm install
- Start the development server
    - npm run dev
- The application will run on: http://localhost:5173

### Application Usage
- Once both the backend and frontend servers are running:
    - Visit http://localhost:5173
    - Use the Comparison Tool to search grocery items
    - Select stores to compare prices
    - Add items to your cart
    - View items grouped by store in the Cart
    - Create and manage items in the Shopping List
    - View random recipes on the Recipes page
    - Submit the Contact Form to store messages in the database

## Wireframes
- Wireframes for the project can be viewed here:
    - 

## Entity Relationshop Diagram (ERD)
- The database structure for this project can be viewed here:
    - 

## Unsolved Problems
- While the application is fully functional, there are several improvements that could enhance the user experience:
    - Grocery item data is currently stored in a static JSON file instead of a database.
    - Price data is manually defined rather than retrieved from a real grocery API. 
    - Currently only able to have one shopping list. 

## Future Features
- Several features could be added to improve the application in the future:
    - Price Optimization Engine: Automatically calculate the cheapest store combination for an entire shopping list.
    - User Authentication: Allow users to create accounts and save personal carts and shopping lists.
    - Real Grocery API Integration: Pull live pricing data from grocery retailer APIs.
    - Store Distance Optimization: Combine pricing with store location to recommend the best shopping route. 
    - Recipe Ingredient Integration: Allow users to automatically add ingredients from the recipes to their shopping list. 

# Author
- Mark Bradley
- GitHub: https://github.com/mark-bradley1