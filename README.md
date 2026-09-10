# TastyBites Frontend

Simple React frontend for the TastyBites MERN project.

## Run frontend

npm install
npm run dev

## Backend

Start the existing backend first:

npm install
npm run dev

The frontend uses:

http://localhost:5001/api

## Pages

Public:
- Home
- Menu Details
- Register
- Login
- Admin Login

Admin:
- Dashboard
- Menu Items
- Add Menu Item
- Edit Menu Item
- Users

Admin pages are protected by ProtectedRoute and require role = Admin.
