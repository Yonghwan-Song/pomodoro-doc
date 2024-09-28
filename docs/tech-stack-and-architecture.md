---
sidebar_position: 2
---

# Tech Stack & Architecture

## Technical Stack

<!-- ### **Frontend**

#### SPA libraries

- React v18.2.0
- [React Router Dom](https://www.npmjs.com/package/react-router-dom?activeTab=readme) v6.3.0

#### HTTP and Authentication

- [Axios](https://www.npmjs.com/package/axios) v0.27.2
- [Firebase](https://www.npmjs.com/package/firebase) v9.8.4 - for authentication

#### Styling

- React Inline Styles
- [Styled Components](https://www.npmjs.com/package/styled-components) v5.3.5

#### Utilities

- TypeScript v4.9.4
- [Recharts](https://www.npmjs.com/package/recharts) v2.1.14
- [idb](https://www.npmjs.com/package/idb) v7.1.1 - for promise-based interaction with Indexed DB
- [Date-fns](https://www.npmjs.com/package/date-fns) v2.29.3 -->

### **Frontend**

#### Single Page Application (SPA) Libraries

- [React](https://reactjs.org/) v18.2.0
  - _A JavaScript library for building user interfaces, enabling the creation of reusable UI components._
- [React Router DOM](https://reactrouter.com/) v6.3.0
  - _Handles client-side routing, allowing for navigation between different views in the SPA without full page reloads._

#### HTTP Requests & Authentication

- [Axios](https://axios-http.com/) v0.27.2
  - _A promise-based HTTP client for making API requests to the backend services._
- [Firebase Authentication](https://firebase.google.com/products/auth) v9.8.4
  - _Handles user authentication, providing secure sign-in methods and user management._

<!-- - [Axios](https://axios-http.com/) v0.27.2
  - _A promise-based HTTP client for making API requests to the backend services._
- [Firebase](https://firebase.google.com/) v9.8.4
  - _Used for authentication, providing secure sign-in methods and user management through Firebase Authentication._ -->

#### Styling & Theming

- **React Inline Styles**
  - _Applies inline CSS styles directly within React components for dynamic styling._
- [Styled Components](https://styled-components.com/) v5.3.5
  - _Enables writing CSS-in-JS, allowing for scoped and reusable component styles._

#### Utilities & Tools

- [TypeScript](https://www.typescriptlang.org/) v4.9.4
  - _A superset of JavaScript that adds static typing, enhancing code quality and maintainability._
- [Recharts](https://recharts.org/) v2.1.14
  - _A charting library built on React components, used for creating interactive and customizable data visualizations._
- [idb](https://www.npmjs.com/package/idb) v7.1.1
  - _Provides a promise-based interface for interacting with Indexed DB, facilitating client-side data storage._
- [date-fns](https://date-fns.org/) v2.29.3
  - _A modern JavaScript date utility library for parsing, validating, manipulating, and formatting dates._

<br/>

<!-- ### **Backend**

#### Web Application Framework

- [NestJS](https://github.com/nestjs/nest) v10.0.0
- [Express](https://www.npmjs.com/package/express) v4.18.1 - API server by this is not in use at the moment.

#### Authentication

- [Firebase Admin](https://www.npmjs.com/package/firebase-admin) v12.1.0 - for authentication using middleware

#### Database and Object Document Mapping

- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Mongoose](https://www.npmjs.com/package/mongoose) v8.3.4 -->

### **Backend**

#### Web Application Framework

- [NestJS](https://github.com/nestjs/nest) v10.0.0
  - _Primary framework for building scalable server-side applications._
- [Express](https://www.npmjs.com/package/express) v4.18.1
  - _API server framework (not currently in use)._

#### Authentication

- [Firebase Admin](https://www.npmjs.com/package/firebase-admin) v12.1.0
  - _Handles authentication using middleware._

#### Database & ODM (Object Document Mapping)

- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  - _Cloud database service for MongoDB._
- [Mongoose](https://www.npmjs.com/package/mongoose) v8.3.4
  - _ODM library for MongoDB, facilitating schema definitions and data modeling._
- [@nestjs/mongoose](https://www.npmjs.com/package/@nestjs/mongoose) v10.0.6
  - _Mongoose module for Nest._

<br/>

### **DevOps/Infrastructure**

- SPA Hosting: [Vercel](https://vercel.com)
  - Continuous Deployment: Automated via Vercel GitHub integration
- API Hosting: [Render.com](https://render.com)
  - Continuous Deployment: Managed through Render.com deployment settings

<br/>

### **Version Control**

- [Git](https://git-scm.com/)
  - _A distributed version control system for tracking changes in source code during software development._
- [GitHub](https://github.com/)
  - _A cloud-based platform for hosting Git repositories, enabling collaboration and version control for the project._

<!-- ### **Version Control**

- [Git](https://git-scm.com/)
- [GitHub](https://github.com/) - for repository hosting -->

---

<br/>

## Architecture

![architecture](./img/architecture.png)
