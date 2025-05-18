import foodModel from "@/app/models/food.model";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { _id } = await req.json();
    const deletedFood = await foodModel.deleteOne({
      _id,
    });
    return NextResponse.json(
      { error: "Амжилттай устгалаа", deletedFood },
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
