# 🚀 Fullstack Project - Software as a Service (SaaS)

I’m developing a complete SaaS application using the latest technologies from the JavaScript ecosystem. From concept to implementation, this multi-tenant software allows multiple companies to use the same application securely and efficiently.

🌟 This project was built during the **Rocketseat** course 🚀, focusing on organization and project management. By combining **Next.js**, **Fastify**, **PostgreSQL**, **Prisma**, and **TypeScript**, I created a robust and modern solution that revolutionizes how teams collaborate. A key differentiator is the implementation of **Role-Based Access Control (RBAC)**, ensuring that every user has the appropriate permissions for their activities.

---

## 🛠️ Key Features

- Efficient organization of projects for clear and effective management.
- Full control over team members and their specific roles.
- Enhanced user experience for seamless and agile operations.
- Robust implementation of **RBAC**, improving access control security.

---

## 🧐 What is SaaS?

**Software as a Service (SaaS)** is a software distribution model where applications are hosted in the cloud and accessed via the internet. Users don’t need to install or maintain the software on their devices, as everything is managed by the provider.

---

## 🏢 Multi-Tenant Architecture

The **multi-tenant** architecture allows multiple clients to share the same software instance while keeping data and configurations isolated. This ensures:

- **Efficiency** in resource usage.
- **Security** between client data.

---

## 🚨 Permission Strategies

I adopted **Role-Based Access Control (RBAC)** strategies, enabling:

- Definition of specific permissions for each role.
- Efficient management of access within the application.
- Strengthened security with granular control over activities.

---

## 💻 Technologies Used

### Backend

- **Node.js** with **Fastify**: Fast and efficient API.
- **Prisma**: ORM for database modeling and manipulation.
- **PostgreSQL**: Robust relational database.

### Frontend

- **Next.js**: React framework for SSR (Server-Side Rendering) and SSG (Static Site Generation).
- **TypeScript**: Static typing for enhanced reliability and scalability.

### Monorepo

- **Turbo Repo**: Tool for managing monorepos and optimizing multi-package projects.

---

## 🔥 Learnings

By developing this project, you’ll gain insights into:

- SaaS fundamentals and multi-tenant architecture.
- Permission strategies using RBAC.
- Fullstack development with Node.js and Next.js.
- Project organization with Turbo Repo.

---

## 🚀 How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https:/github.com/ludiemert/next-saas-rbac.git
    ```

2.	Install dependencies:
-	In the backend directory:
   ```bash
   cd api
   ```

   ```bash
   npm install
   ```

-	In the frontend directory:
   ```bash
   cd web
   ```
   ```bash
   npm install
   ```

3.	Set up environment variables:
- Create a .env file in both the backend and frontend directories with the required variables (refer to .env.example).

4.	Run the backend server:
   ```bash
   npm run dev
   ```

5.	Start the frontend application:
   ```bash
   npm run dev
   ```
________________________________________
🤝 Contribution
Contributions are welcome! 💡
- Open issues to report bugs or suggest improvements.
- Submit pull requests with new features or fixes. <br />
📩 I’m always open to feedback and collaboration! Let’s build something amazing together.

________________________

Enjoying this project? Don’t forget to leave a ⭐ on the repository! 😊
