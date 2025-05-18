import userModel from "@/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectMongoDb } from "@/app/util/server/db";

export async function POST(req: Request): Promise<Response> {
  await connectMongoDb();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Имэйл болон нууц үг шаардлагатай." },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Энэ имэйлээр аль хэдийн бүртгүүлсэн байна." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
    });

    console.log(newUser);
    return NextResponse.json(
      { message: "Амжилттай бүртгэгдлээ", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Бүртгэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
