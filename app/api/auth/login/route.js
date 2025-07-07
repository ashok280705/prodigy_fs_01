import { connectDB } from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return new Response(JSON.stringify({ msg: "No user found" }), { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return new Response(JSON.stringify({ msg: "Invalid password" }), { status: 401 });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

 return new Response(JSON.stringify({ msg: "User already exists" }), {
  status: 400,
  headers: { 'Content-Type': 'application/json' }
});
}