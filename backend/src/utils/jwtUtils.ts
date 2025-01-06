import jwt from 'jsonwebtoken';

const secretKey = 'abc123';

interface JwtPayload {
    userId: string;
    email: string;
}

export const generateToken = (payload: JwtPayload, expiresIn: string | number = '1h'): string => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};