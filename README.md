![logo-big](https://github.com/user-attachments/assets/f51fb6b1-9af7-4125-8fa7-3573998ee496)

# Cinema Calc Challenge

Cinema Calc is a web application designed to help film producers manage and calculate expenses for their productions. This project was developed as part of a coding challenge, demonstrating full-stack development skills using modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Project Overview

The project is a full-stack application that allows users to:

- View a list of expenses for film production
- Add new expenses
- Edit existing expenses
- Delete expenses
- Automatically calculate totals and apply percentage markups

The application is built with a focus on performance, user experience, and data integrity.

![Architecture Overview](https://github.com/user-attachments/assets/e4215133-860e-4cf5-8a1d-cab60d3d98a8)

## Technologies Used

### Frontend
  - Next.js 14 (App Router)
  - TypeScript
  - TailwindCSS
  - shadcn/ui
  - Redux Toolkit
  - React Hook Form + Zod

### Backend
  - .NET 8
  - Entity Framework Core
  - PostgreSQL
  - Swagger

### Containerization
  - Docker
  - Docker Compose
  - Docker Hub

## How to Run Locally

1. Clone the repository:
  ```bash
  git clone https://github.com/diabahmed/cinemacalc-challenge.git
  cd cinemacalc-challenge
  ```

2. Start the application using Docker Compose:
  ```bash
  docker-compose up -d
  ```

> [!NOTE]
> If you don't have Docker installed, you can install it from [here](https://docs.docker.com/get-docker/).

3. Access the application:
  - Frontend: <http://localhost:3000>
  - Backend API: <http://localhost:5159/swagger>

4. Shutting down the services:
```bash
docker-compose down -v
```

## Project Structure

The project follows a clear separation of concerns and is divided into two main parts:

### Backend (`cinemacalc-server`)

```
cinemacalc-server/
├── Controllers/         # API endpoints
├── Data/                # Database context and repositories
├── Models/              # Domain models
├── Services/            # Business logic
└── Migrations/          # Database migrations
```

![backend-architecture](https://github.com/user-attachments/assets/5c8e8b1b-c42f-44fd-98ce-7835a7d311d7)

### Frontend (`cinemacalc-client`)

```
cinemacalc-client/
├── app/                 # Next.js app router pages and layouts
├── components/          # Reusable React components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API calls
├── public/              # Static assets
├── state/               # Redux store and slices
└── types/               # TypeScript type definitions
```

## State Management

I chose Redux Toolkit for state management in this application for several reasons:
  1. **Centralized Store**: Redux provides a single source of truth for the application state, making it easier to manage and debug.
  2. **Predictable State Updates**: With Redux, state updates are made through pure functions (reducers), ensuring predictability and easier testing.
  3. **Developer Tools**: Redux DevTools offer powerful debugging capabilities, allowing me to inspect state changes over time.
  4. **Middleware Support**: Redux Toolkit's built-in support for middleware like `thunk` allows for easy handling of asynchronous actions.
  5. **Performance Optimization**: Redux Toolkit uses Immer under the hood, which allows for simpler state update logic while maintaining immutability.

![State Management Flow](https://github.com/user-attachments/assets/c579523c-4e36-4ade-a41f-88e86061fa19)

## Precise Number Calculations

To ensure accurate financial calculations, I implemented the following strategies:
  1. **Decimal Type**: The backend uses C#'s `decimal` type for storing and calculating monetary values, which provides high precision for financial calculations.
  2. **Frontend Handling**: On the frontend, numbers are stored and manipulated as JavaScript numbers, which are 64-bit floating-point values.
  3. **Rounding**: When displaying values, the frontend uses `toFixed(2)` to round to two decimal places for presentation purposes.
  4. **Calculations**: The total price is calculated on both the frontend and backend:
     - Frontend: `updatedItem.totalPrice = updatedItem.price * (1 + updatedItem.percentageMarkup / 100);`
     - Backend: `TotalPrice => Price + (Price * PercentageMarkup / 100);`
  5. **Validation**: The backend includes constraints to ensure the validity of input data:
     - `PercentageMarkup` is constrained between 0 and 100.
     - `Price` is stored as a `decimal(13,2)`, allowing for large numbers with two decimal places.

While this approach works for the scale of this application, it's important to note that for more complex financial applications, additional measures might be necessary to handle edge cases and ensure consistent precision across frontend and backend.

## Development Process and Tasks

The development process was broken down into the following tasks:

- [x] **Project Setup**
  - Set up .NET backend with PostgreSQL
  - Initialize Next.js frontend with TypeScript

- [x] **Backend Development**
  - Implement Expense model and migrations
  - Create repository layer for data access
  - Develop service layer for business logic
  - Implement API controllers

- [x] **Frontend Development**
  - Design and implement UI components
  - Set up Redux store and slices
  - Implement forms with React Hook Form and Zod validation
  - Create API integration using Next.js Server Actions

- [x] **Testing and Refinement**
  - Implement error handling and validation
  - Optimize performance
  - Ensure responsive design

- [x] **Containerization**
  - Configure Docker and Docker Compose
  - Upload the images on Docker Hub

- [x] **Documentation**
  - Create architecture diagrams
  - Write README

## Additional Notes
  - **Server Actions**: Next.js Server Actions were used to simplify the data fetching process and improve performance by reducing client-side JavaScript.
  - **Memoization**: I memoized the total expenses sum to reduce client computations.
  - **Debouncing**: I implemented debouncing for expense updates to reduce unnecessary API calls and improve performance.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

_Refer to the LICENSE.md file for more information_

© Copyright 2024
