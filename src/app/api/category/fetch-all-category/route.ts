import foodCotegoryModel from "@/app/models/food-cotegory.model";
import { NextResponse } from "next/server";
export async function GET(): Promise<Response> {
  try {
    const getCagegory = await foodCotegoryModel.find();
    return NextResponse.json(
      { error: "Амжилттай fetch хийлээ", getCagegory },
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
