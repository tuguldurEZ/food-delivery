import foodModel from "@/app/models/food.model";
import { NextResponse } from "next/server";
export async function GET(): Promise<Response> {
  try {
    const getFoods = await foodModel.find().populate("category");
    return NextResponse.json(
      { error: "Амжилттай fetch хийлээ", getFoods },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Нэмэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
