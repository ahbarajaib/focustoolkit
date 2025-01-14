# Monorepo Project

This is a monorepo project containing a **React Native Expo** frontend and a **Node.js** backend. The project is designed for efficient development and deployment of a cross-platform application with a REST API backend.

---

## **Project Structure**

```
project-root/
├── backend/                # Node.js backend
│   ├── src/                # Backend source code
│   ├── package.json        # Backend dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── .env                # Backend environment variables
├── frontend/               # React Native Expo frontend
│   ├── src/                # Frontend source code
│   ├── package.json        # Frontend dependencies
│   ├── tsconfig.json       # TypeScript configuration
│   └── .env                # Frontend environment variables
├── shared/                 # Shared code (e.g., types, utils)
│   ├── types/              # Common TypeScript types
│   └── utils/              # Shared utility functions
├── .gitignore              # Git ignored files
├── README.md               # Project documentation
└── .github/                # GitHub Actions workflows for CI/CD
    ├── workflows/
        ├── backend.yml     # CI/CD for backend
        └── frontend.yml    # CI/CD for frontend
```

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your system:

- Node.js (v22)
- npm
- Expo CLI
- MongoDB Atlas account (or local MongoDB setup)

### **Cloning the Repository**

```bash
git clone https://github.com/ahbarajaib/focustoolkit.git
cd focustoolkit
```

---

## **Backend Setup**

### **Install Dependencies**

```bash
cd backend
npm install
```

### **Environment Variables**

Create a `.env` file in the `backend/` directory with the following:

```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-jwt-secret>
```

### **Run the Backend**

```bash
npm run dev
```

This will start the server in development mode using Nodemon.

### **Scripts**

- `npm run dev`: Run the backend in development mode.
- `npm run build`: Build the backend for production.
- `npm start`: Start the backend in production mode.

---

## **Frontend Setup**

### **Install Dependencies**

```bash
cd frontend
npm install
```

### **Environment Variables**

Create a `.env` file in the `frontend/` directory with the following:

```env
API_URL=http://<backend-server-url>
```

Replace `<backend-server-url>` with the URL where the backend is running.

### **Run the Frontend**

```bash
npm start
```

This will start the Expo development server. Use the Expo Go app or a simulator/emulator to test the app.

### **Scripts**

- `npm start`: Start the Expo development server.
- `npm run android`: Run the app on an Android emulator or device.
- `npm run ios`: Run the app on an iOS simulator or device (Mac only).
- `npm run web`: Run the app in a web browser.

---

## **Shared Code**

The `shared/` folder contains common code such as TypeScript types and utility functions. Both the backend and frontend can import from this directory.

Example import:

```typescript
import { ExampleType } from "../shared/types";
```

---

## **CI/CD Setup**

### **Backend Deployment**

- Hosted on **Railway**.
- Deployment workflow configured in `.github/workflows/backend.yml`.

### **Frontend Deployment**

- Build and deploy via **Expo**.
- Deployment workflow configured in `.github/workflows/frontend.yml`.

---

## **Best Practices**

- Use TypeScript for type safety.
- Keep environment variables in `.env` files and never commit them.
- Test changes thoroughly before pushing to the `main` branch.
- Monitor logs and errors using tools like **Sentry** or **Railway Logs**.

---

## **Contributing**

As a sole developer, ensure all changes are:

1. Documented properly in this README.
2. Tested locally before pushing.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contact**

For questions or issues, reach out via the repository's issue tracker.
