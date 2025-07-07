import { connectDB } from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ msg: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
4
  return new Response(JSON.stringify({ msg: "User already exists" }), {
  status: 400,
  headers: { 'Content-Type': 'application/json' }
});
}