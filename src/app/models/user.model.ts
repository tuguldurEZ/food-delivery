import { model, Schema } from "mongoose";
import { models } from "mongoose";

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    orderedFoods: { type: [Schema.ObjectId], ref: "foodOrder" },
  },
  { timestamps: true }
);

const UserModel = models.user || model("user", userSchema);
export default UserModel;
