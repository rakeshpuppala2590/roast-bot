import { NextResponse } from "next/server";

// DEFAULT ROUTE BODY: CHANGE THIS
export async function POST(request: Request) {
  const { input } = await request.json();
  console.log(input);
  return NextResponse.json({ message: "Hello, world!" });
}
