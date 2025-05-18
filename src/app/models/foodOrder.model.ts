import mongoose, { Schema } from "mongoose";

enum Status {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type foodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
};

const foodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      rel: "user",
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.PENDING,
    },
  },
  { timestamps: true }
);

export default mongoose.model<foodOrderSchemaType>(
  "foodOrder",
  foodOrderSchema
);
