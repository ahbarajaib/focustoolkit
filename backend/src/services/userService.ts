// import { User } from '../models/user';

// class UserService {
//     private users: User[] = [];

//     constructor() {
//         // Initialize with some dummy data if needed
//     }

//     getAllUsers(): User[] {
//         return this.users;
//     }

//     getUserById(id: string): User | undefined {
//         return this.users.find(user => user.id === id);
//     }

//     createUser(user: User): User {
//         this.users.push(user);
//         return user;
//     }

//     updateUser(id: string, updatedUser: Partial<User>): User | undefined {
//         const userIndex = this.users.findIndex(user => user.id === id);
//         if (userIndex !== -1) {
//             this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
//             return this.users[userIndex];
//         }
//         return undefined;
//     }

//     deleteUser(id: string): boolean {
//         const userIndex = this.users.findIndex(user => user.id === id);
//         if (userIndex !== -1) {
//             this.users.splice(userIndex, 1);
//             return true;
//         }
//         return false;
//     }
// }

// export default new UserService();