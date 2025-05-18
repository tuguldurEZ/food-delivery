import foodCotegoryModel from "@/app/models/food-cotegory.model";
import { NextResponse } from "next/server";
export async function POST(req: Request): Promise<Response> {
  try {
    const { _id, categoryName } = await req.json();

    await foodCotegoryModel.updateOne({ _id }, { categoryName });
    return NextResponse.json({ error: "Амжилттай Заслаа" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Засах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
