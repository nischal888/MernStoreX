
# mern-ecommerce-demo

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with TypeScript, Tailwind CSS, and Redux for robust state management. It provides a complete online shopping experience, including user authentication, product browsing, shopping cart functionality, order processing, and an administrative interface for managing the store.


## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)


## Features

-   **User Authentication:** Secure user registration and login functionality (e.g., using JWT).
-   **Product Catalog:** Browse products, view details, search, and filter.
-   **Shopping Cart:** Add/remove items, update quantities, view cart totals.
-   **Order Processing:** Streamlined checkout process, order placement, and user order history.
-   **Admin Dashboard:**
    -   Manage Products (CRUD operations: Create, Read, Update, Delete).
    -   Upload product images (e.g., to Cloudinary, S3, or local storage).
    -   Manage Users (Optional: View, block/unblock users).
    -   Manage Orders (Optional: View orders, update status).
-   **Responsive Design:** User interface built with Tailwind CSS, adaptable to various screen sizes (desktop, tablet, mobile).
-   **State Management:** Efficient and predictable state management using Redux Toolkit.
-   **Typed Codebase:** Enhanced code quality and maintainability with TypeScript in both frontend and backend.

## Tech Stack

**Frontend:**
-   React (v18+)
-   React Router (v6+)
-   Redux Toolkit
-   TypeScript
-   Tailwind CSS
-   Axios (or Fetch API) for HTTP requests

**Backend:**
-   Node.js
-   Express.js
-   MongoDB (with Mongoose ODM)
-   JWT (JSON Web Tokens) for authentication
-   Multer (or similar) for file uploads
-   Cloudinary  <!-- Choose one or specify -->

**Database:**
-   MongoDB (Cloud Atlas or local instance)

**Development Tools:**
-   Vite / Create React App (for Frontend) <!-- Specify which one you used -->
-   Nodemon (for Backend development server)
-   Concurrently (Optional: to run frontend and backend simultaneously)
-   ESLint / Prettier (for code linting and formatting)

## Prerequisites

Before you begin, ensure you have the following installed:
-   Node.js (v16 or higher recommended)
-   npm (v8 or higher) or yarn
-   MongoDB (ensure it's running locally or have a connection string for a cloud instance like MongoDB Atlas)
-   Git

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/MernStoreX.git
    cd MernStoreX
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend # Or your backend folder name
    npm install
    # or
    # yarn install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend # Or your frontend folder name
    npm install
    # or
    # yarn install
    ```

