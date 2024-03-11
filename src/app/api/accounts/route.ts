import { mockData } from "~/app/api/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(NextResponse.json(mockData.accounts, { status: 200 }));
      }, 500);
    });
  } catch (e) {}
}
