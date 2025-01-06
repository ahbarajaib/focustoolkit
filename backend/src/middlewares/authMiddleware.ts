import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/UserModel.ts'
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils.ts';

const setupAuth = () => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables');
    }
    const callbackURL = "http://localhost:6001/api/auth/google/callback";

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
        passReqToCallback: true
    },
        async (request: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                // First try to find user by email
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // If user exists but doesn't have Google auth, add it
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        if (!user.authMethods.includes('google')) {
                            user.authMethods.push('google');
                        }
                        await user.save();
                    }
                } else {
                    // Create new user if doesn't exist
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                        authMethods: ['google'],
                        role: 'user'
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    ));

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // First check if user is authenticated via Passport session (Google Auth)
        if (req.isAuthenticated()) {
            next();
            return;
        }

        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Not authorized, please login' });
            return;
        }

        try {
            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);

            if (!decoded) {
                res.status(401).json({ message: 'Invalid token' });
                return;
            }

            //find user and attach to request
            const user = await User.findById(decoded.userId);
            if (!user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }

            req.user = user;
            next();
        } catch (tokenError: any) {
            // Handle JWT verification errors gracefully
            res.status(401).json({
                message: 'Invalid authentication token',
                error: process.env.NODE_ENV === 'development' ? tokenError.message : undefined
            });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

export { setupAuth, protect }