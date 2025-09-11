
# Project Summary

This project is a design system built with Next.js and TypeScript. It provides a collection of reusable UI components for building modern web applications.

## Technologies Used

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:**
    - Radix UI for accessible and unstyled primitives
    - Lucide for icons
    - Framer Motion for animations
- **Linting:** ESLint

## Project Structure

The project is organized into the following main directories:

- **`src/app`**: Contains the main application pages and routes, including examples of how to use the design system components.
- **`src/components`**: The core of the design system, containing all the reusable UI components.
    - **`layouts`**: Components for overall page structure, such as `MainLayout`.
    - **`navigation`**: Components for navigation, including `Header`, `Footer`, `BreadCrumb`, and `SearchBar`.
    - **`reviews`**: Components for displaying student reviews.
    - **`ui`**: A rich collection of UI primitives and composed components, such as `Button`, `Card`, `Input`, `Dialog`, and more.
- **`src/lib`**: Utility functions and sample data.
- **`public`**: Static assets like images and SVGs.

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lints the codebase using ESLint.
