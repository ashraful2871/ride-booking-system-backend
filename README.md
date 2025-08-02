Here's a professional and complete `README.md` based on the information you've provided:

---

# Ride Booking System Backend

A backend system for a ride-booking platform that facilitates smooth interaction between **riders**, **drivers**, and **admins**. The system supports user and driver registration, ride management, status tracking, earnings monitoring, and user blocking functionalities.

---

## 🚀 Project Overview

The Ride Booking System is designed to manage transportation services by allowing **riders** to book and manage rides, **drivers** to accept and complete bookings, and **admins** to monitor and control system activities. The system uses RESTful APIs built on **Node.js**, **Express**, and **MongoDB**, with validation powered by **Zod** and authentication via **Passport.js** and **JWT**.

---

## 📜 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [User Roles & Responsibilities](#user-roles--responsibilities)
- [Validation](#validation)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

- User and driver registration
- Secure login with JWT
- Driver availability and earnings tracking
- Ride booking, cancellation, and history
- Admin actions: approve, suspend, block
- Role-based access control
- Input validation using Zod

---

## 🧱 Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js            |
| Framework      | Express.js         |
| Language       | TypeScript         |
| Database       | MongoDB + Mongoose |
| Authentication | Passport.js, JWT   |
| Validation     | Zod                |
| Environment    | dotenv             |
| Linting        | ESLint             |
| Dev Tools      | ts-node-dev        |

---



## 📡 API Endpoints

### 🔐 Authentication

- `POST /api/v1/user/register` – Register a new user
- `POST /api/v1/auth/login` – User login

### 🚗 Driver Actions

- `POST /api/v1/driver/register` – Register a new driver
- `PATCH /api/v1/driver/accept/:rideId` – Accept ride request
- `PATCH /api/v1/driver/reject/:rideId` – Reject ride request
- `GET /api/v1/driver/status/:rideId` – Check ride status
- `GET /api/v1/driver/availability` – View/set driver availability
- `GET /api/v1/driver/earnings` – View driver earnings
- `GET /api/v1/driver/all-drivers` – List all drivers
- `PATCH /api/v1/driver/approved-driver-status/:driverId` – Admin: Approve driver
- `PATCH /api/v1/driver/suspended-driver-status/:driverId` – Admin: Suspend driver

### 🚕 Ride Management

- `POST /api/v1/ride/book-ride` – Book a ride
- `PATCH /api/v1/ride/cancel/:rideId` – Cancel a ride
- `GET /api/v1/ride/view-ride-history` – View user’s ride history
- `GET /api/v1/ride/all-rider` – Admin: List all riders
- `PATCH /api/v1/ride/block-user/:userId` – Admin: Block a user

---

## 👥 User Roles & Responsibilities

### 🧑 Rider

- Register/login
- Book and cancel rides
- View ride history

### 🚘 Driver

- Register and log in
- Accept/reject ride requests
- Set availability
- Track earnings
- View status of accepted rides

### 👮 Admin

- Approve or suspend drivers
- View all users and drivers
- Block misbehaving riders

---

## ✅ Validation

Validation is enforced using [Zod](https://zod.dev/) for:

- User input (registration, login)
- Ride requests
- Driver data updates

This ensures data integrity and prevents invalid inputs from reaching the backend logic.

---

## 🛠️ Troubleshooting

- **Port already in use**: Make sure port `5000` is free or change it in your `.env`.
- **MongoDB errors**: Ensure your `MONGO_URI` is valid and the database is running.
- **Token issues**: Verify your `JWT_SECRET` matches what's used for token generation.

---

## 📄 License

This project is licensed under the ISC License.

---

Let me know if you want to include example requests using `curl` or `Postman`, or if there's a frontend that should be documented as well.
