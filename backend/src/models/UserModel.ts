import { model, Model, Schema } from "mongoose"

interface IUser {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    avatar?: string;
    role: "user" | "admin";
    authMethods: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
//Model<T> is a generic type provided by Mongoose.
type UserModel = Model<IUser>

const userSchema: Schema<IUser, UserModel> = new Schema<IUser, UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    authMethods: { type: [String], default: [] }
}, {
    timestamps: true,
});

const User: UserModel = model<IUser, UserModel>('User', userSchema);
export default User;