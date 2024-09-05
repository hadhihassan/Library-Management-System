# Nalanda Library Management System Task


## Overview

Nalanda Library Management System is designed to streamline the management of a library's backend operations. It encompasses functionalities for user management, book handling, borrowing system, and report generation, offering both RESTful and GraphQL APIs for comprehensive interaction.

## Features

- **User Management**: Registration, login, and role-based access (Admin, Member).

- **Book Management**:  Add, update, delete, and list books with pagination and filters.

- **Borrowing System**: Borrow, return books, and view borrowing history.

- **Reports**: Most borrowed books, active members, and book availability.


## Project Structure

The project is organized root main folders:

- **`src/`**: Backend code including models, models, routes, GraphQL schemas, and controllers.

## Setup Instructions

### Server

1. Navigate to the `rootfolder` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

Set up the environment variables in the `.env` files for  server.

### server (`.env`)

```env
PORT=http://your_server_url

MONGO_URL=YOUR_MONGO_URL

JWT_SECRET_KEY=YOUR_JWT_SECRET



