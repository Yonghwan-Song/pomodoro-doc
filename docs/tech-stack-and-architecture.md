---
sidebar_position: 2
---

# Tech Stack & Architecture

## Technical Stack

### **Frontend**

#### SPA libraries

- **React** v18.2.0
- **[React Router Dom](https://www.npmjs.com/package/react-router-dom?activeTab=readme)** v6.3.0

#### HTTP and Authentication

- **[Axios](https://www.npmjs.com/package/axios)** v0.27.2
- **[Firebase](https://www.npmjs.com/package/firebase)** v9.8.4 - for authentication

#### Styling

- React Inline Styles
- **[Styled Components](https://www.npmjs.com/package/styled-components)** v5.3.5

#### Utilities

- **TypeScript** v4.9.4
- **[Recharts](https://www.npmjs.com/package/recharts)** v2.1.14
- **[idb](https://www.npmjs.com/package/idb)** v7.1.1 - for promise-based interaction with Indexed DB
- **[Date-fns](https://www.npmjs.com/package/date-fns)** v2.29.3

<br/>

### **Backend**

#### Web Application Framework

- **[NestJS](https://github.com/nestjs/nest)** v10.0.0
- **[Express](https://www.npmjs.com/package/express)** v4.18.1 - API server by this is not in use at the moment.

#### Authentication

- **[Firebase Admin](https://www.npmjs.com/package/firebase-admin)** v12.1.0 - for authentication using middleware

#### Database and Object Document Mapping

- **[MongoDB Atlas](https://www.mongodb.com/atlas/database)**
- **[Mongoose](https://www.npmjs.com/package/mongoose)** v8.3.4

<br/>

### **DevOps/Infrastructure**

- SPA Hosting: [Vercel](https://vercel.com)
  - Continuous Deployment: Automated via Vercel GitHub integration
- API Hosting: [Render.com](https://render.com)
  - Continuous Deployment: Managed through Render.com deployment settings

<br/>

### **Version Control**

- **Git**
- **GitHub** - for repository hosting

---

<br/>

## Architecture

![architecture](./img/architecture.png)
