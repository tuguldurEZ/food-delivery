import { Schema, model, models } from "mongoose";

type FoodCategorySchemaType = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FoodCategoryModel =
  models.FoodCategory || model("FoodCategory", FoodCategorySchema);

export default FoodCategoryModel;
