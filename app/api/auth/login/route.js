import { NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ msg: "User does not exist" }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return NextResponse.json(
    { token, msg: "Login successful" },  // ✅ include your alert message here
    { status: 200 }
  );
}