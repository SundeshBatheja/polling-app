# Polling App Backend

This is the backend for the **Polling App**, a simple app that allows users to create polls, register, login, vote on polls, and manage their data with JWT authentication. Built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.io** for real-time updates.

## Technologies Used
The backend of the Polling App is built using the following technologies:

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user and poll data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, simplifying database interactions.
- **JWT (JSON Web Token)**: For secure user authentication, ensuring that users can interact with the app only if authorized.
- **bcryptjs**: For password hashing and validation, providing secure password management.
- **Socket.io**: For real-time communication between clients and the server, enabling live updates for poll votes and user interactions.
- **dotenv**: For managing environment variables, ensuring sensitive data like database URIs and JWT secrets are stored securely.
- **CORS**: For enabling Cross-Origin Resource Sharing, allowing the backend to be accessed from different origins, such as your frontend.

## Installation

Follow these steps to get the backend up and running locally.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SundeshBatheja/polling-app-backend.git
    ```
2. **Setup**

    To download all the dependencies run the following command:

    ``
        npm install    
    ``
    
    To run the project update the .env file for the MongoDB connection.

    Now to run the project enter the following command:

    ``
    node app.js
    ``

## Usage

Usage
Once the backend is running, you can interact with the API endpoints through the front end or using a tool like Postman or cURL. You can check the API Endpoints section above for more details on how to interact with the backend.