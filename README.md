# Garments Order & Production Tracker System

## Purpose
A comprehensive web-based platform designed to help small and medium-sized garment factories manage their production workflow. It simplifies the tracking of orders from buyers, manages production stages, monitors inventory, and ensures timely delivery.

## Live URL
[Insert Live Link Here]

## Test Credentials
To facilitate testing, the following accounts are pre-seeded (run `node seedProducts.js` in backend to create them if missing):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `password123` |
| **Manager** | `manager@example.com` | `password123` |
| **Buyer** | `buyer@example.com` | `password123` |

> **Note**: New registrations default to `pending` status and require Admin approval. Please use the Admin account to approve new users if you wish to test the registration flow fully.

## Key Features
-   **Role-Based Access Control**: Secure dashboards for Admin, Manager, and Buyer.
-   **Real-Time Tracking**: Visual timeline for order production stages.
-   **Order Management**: Place, approve, reject, and cancel orders.
-   **Product Management**: Add, update, delete, and feature products.
-   **User Management**: Admin can approve or suspend users.
-   **Secure Payments**: Integrated mock payment gateway for online orders.
-   **Premium UI**: Modern, responsive design with glassmorphism and animations.
-   **Search & Filter**: Advanced filtering for users and orders.
-   **Pagination**: Efficient data handling for large lists.

## Technologies & Packages
### Frontend
-   **React**: UI Library
-   **Vite**: Build Tool
-   **Tailwind CSS**: Styling
-   **Framer Motion**: Animations
-   **React Router DOM**: Navigation
-   **React Hot Toast**: Notifications
-   **React Icons**: Iconography
-   **Firebase**: Authentication

### Backend
-   **Node.js & Express**: Server Framework
-   **MongoDB & Mongoose**: Database
-   **JWT**: Authentication
-   **Cors**: Cross-Origin Resource Sharing
-   **Dotenv**: Environment Variables

## Setup Instructions
1.  Clone the repository.
2.  Install dependencies: `npm install` in both `frontend` and `backend`.
3.  Set up environment variables in `.env` (see `.env.example`).
4.  Run backend: `npm run dev` in `backend`.
5.  Run frontend: `npm run dev` in `frontend`.
