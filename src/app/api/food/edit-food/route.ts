import foodModel from "@/app/models/food.model";
import { NextResponse } from "next/server";
export async function POST(req: Request): Promise<Response> {
  try {
    const { Ingredients, foodName, foodPrice, category, foodId } =
      await req.json();

    const updatedFood = await foodModel.updateOne(
      { _id: foodId },
      { ingredients: Ingredients, foodName, price: foodPrice, category }
    );
    console.log(updatedFood);
    return NextResponse.json(
      { error: "Амжилттай Заслаа", updatedFood },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Засах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
