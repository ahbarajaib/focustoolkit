interface User {
    username: string;
    email: string;
    password: string;
}

class UserValidator {
    static validateUsername(username: string): boolean {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password: string): boolean {
        // Password must be at least 8 characters long and contain at least one number and one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    }

    static validateUser(user: User): boolean {
        return (
            this.validateUsername(user.username) &&
            this.validateEmail(user.email) &&
            this.validatePassword(user.password)
        );
    }
}

export { UserValidator, User };