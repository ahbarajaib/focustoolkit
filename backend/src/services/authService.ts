// import axios from 'axios';

// interface AuthResponse {
//     token: string;
//     user: {
//         id: string;
//         email: string;
//         name: string;
//     };
// }

// class AuthService {
//     private apiUrl = 'https://your-api-url.com';

//     async login(email: string, password: string): Promise<AuthResponse> {
//         const response = await axios.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
//         return response.data;
//     }

//     async register(email: string, password: string, name: string): Promise<AuthResponse> {
//         const response = await axios.post<AuthResponse>(`${this.apiUrl}/register`, { email, password, name });
//         return response.data;
//     }

//     async logout(): Promise<void> {
//         // Implement logout logic, e.g., removing token from storage
//     }

//     async getCurrentUser(): Promise<AuthResponse['user'] | null> {
//         // Implement logic to get current user, e.g., from token in storage
//         return null;
//     }
// }

// export default new AuthService();