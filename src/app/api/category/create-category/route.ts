import foodCotegoryModel from "@/app/models/food-cotegory.model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { category } = await req.json();
    const newCategory = await foodCotegoryModel.create({
      categoryName: category,
    });
    return NextResponse.json(
      { error: "Амжилттай нэмэгдлээ", newCategory },
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
