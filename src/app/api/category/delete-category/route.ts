import foodCotegoryModel from "@/app/models/food-cotegory.model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { _id } = await req.json();
    const newCategory = await foodCotegoryModel.deleteOne({
      _id,
    });
    return NextResponse.json(
      { error: "Амжилттай устгалаа", newCategory },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Устгах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
