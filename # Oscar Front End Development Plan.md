# Oscar Front End Development Plan

This document outlines the plan to migrate the Oscar front end from JSP to a modern React.js Single Page Application (SPA).

## Phase 1: API Layer Preparation & Project Setup

The most critical prerequisite is to ensure the backend exposes a clean, stateless RESTful API for the new front end to consume. The current JSP implementation is tightly coupled with the Java backend.

### Backend API Audit & Creation:

*   **Identify Data Endpoints**: Analyze the existing Java backend to identify all points where data is passed to the JSP pages.
*   **Develop RESTful APIs**: For each piece of functionality, create a corresponding REST API endpoint. For example, if the backend has a `getUser()` method that populates a JSP, create a `/api/v1/user` endpoint that returns user data as JSON.
*   **Authentication**: Adapt the current authentication mechanism (likely session-based) to work with a stateless front end. This typically involves implementing token-based authentication (e.g., JWT). A new endpoint like `/api/login` will be needed to issue tokens.
*   **API Documentation**: Document all new API endpoints using a tool like Swagger/OpenAPI. This will be the contract between the front and back end.

### React Project Setup:

*   **Integrate new_frontend**: The `new_frontend` directory will serve as the root for our new React application.
*   **Build & Proxy Configuration**: Configure the React development server (Vite) to proxy API requests to the running Java backend. This solves Cross-Origin (CORS) issues during development. For example, a request to `/api/user` in the React app would be forwarded to `http://localhost:8080/oscar/api/user`. This is done in `vite.config.js`.
*   **Environment Variables**: Set up `.env` files to manage environment-specific configurations like the API base URL.

## Phase 2: Component Development & Feature Parity

This phase involves building the new UI in React, component by component, and connecting it to the new API layer.

### Component Library:

*   **Identify UI Elements**: Review the existing application and identify all common UI elements (buttons, forms, tables, modals, navigation bars).
*   **Build Reusable Components**: Create a library of reusable React components for these elements. This ensures a consistent look and feel. A `components` directory will be created inside `new_frontend/src`.
*   **Styling**: Use a modern CSS framework or methodology (like Tailwind CSS, which is already set up in `new_frontend`) to style the components.

### Feature Migration (Iterative Approach):

*   Migrate one feature or page at a time. A good starting point is often the login page, as documented in `Oscar_login_customization.md`.
*   For each feature:
    1.  Build the React components for the UI.
    2.  Implement the client-side logic (state management, user interactions).
    3.  Connect the components to the corresponding backend API endpoints created in Phase 1.
    4.  Write unit and integration tests for the new components.

## Phase 3: Integration, Testing & Deployment

This final phase focuses on replacing the old UI and deploying the new one.

### Staging & Replacement:

*   **Build the React App**: Create a production build of the React application. This will generate static HTML, CSS, and JavaScript files.
*   **Serve Static Files**: Configure the web server (Nginx, as suggested by the `nginx` directory) to serve the built React application. The `index.html` from the React build will become the main entry point, replacing the old `index.jsp`.
*   **API Routing**: Ensure the web server is configured to route all API calls (e.g., requests to `/api/*`) to the backend Java application server.

### End-to-End Testing:

*   Perform thorough end-to-end testing in a staging environment that mirrors production.
*   Verify that all functionality from the original application works as expected.
*   Conduct performance and security testing on the new front end and API layer.

### Deployment:

*   Once testing is complete and all stakeholders have approved, deploy the new configuration to production.
*   Monitor the application closely after launch for any unforeseen issues.
