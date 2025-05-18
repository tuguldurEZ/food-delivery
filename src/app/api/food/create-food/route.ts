import foodModel from "@/app/models/food.model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { foodName, foodPrice, Ingredients, image, id } = await req.json();

    const newFood = await foodModel.create({
      foodName,
      price: foodPrice,
      ingredients: Ingredients,
      image,
      category: id,
    });
    return NextResponse.json(
      { error: "Амжилттай нэмэгдлээ", newFood },
      { status: 200 }
    );
  } catch (error) {
    console.log("joirjsgpiarsj[gio", error);
    return NextResponse.json(
      { error: "Нэмэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
