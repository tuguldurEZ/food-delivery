import UserModel from "@/app/models/user.model";
import { compareSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json();

    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "Бүртгэлгүй хэрэглэгч байна" },
        { status: 401 }
      );
    }

    const isCorrect = compareSync(password, user?.password);

    if (!isCorrect) {
      return NextResponse.json(
        { error: "Password Буруу байна" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Амжилттай Нэвтэрлээ", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Бүртгэх үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
