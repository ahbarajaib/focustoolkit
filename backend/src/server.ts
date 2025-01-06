import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import passport from 'passport'
import session from 'express-session'
import connectToDatabase from './config/db.ts';
import { setupAuth } from './middlewares/authMiddleware.ts';
import authRoutes from './routes/authRoutes.ts';
import timeBlockRoutes from './routes/timeBlockRoutes.ts'
import cors from 'cors'
dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:8081', // Replace with your React Native app's URL
    credentials: true,
};

app.use(cors(corsOptions));
// Middleware
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'cats',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup authentication
setupAuth();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/timeblock', timeBlockRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('<a href="/api/auth/google">Authenticate with Google</a>');
});


const startServer = async () => {
    try {
        await connectToDatabase();
        const port = process.env.PORT || 6001;
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

startServer();