// /app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import User from "@/model/User";
import connectDB from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ msg: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ msg: "Signup successful" }, { status: 200 });
}