import { model, models, Schema } from "mongoose";
import { CategoryType } from "../util/types";

export type FoodSchemaType = {
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  category: string | CategoryType;
};

const FoodSchema = new Schema<FoodSchemaType>(
  {
    foodName: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  { timestamps: true }
);

const foodModel = models.Food || model<FoodSchemaType>("Food", FoodSchema);
export default foodModel;
