import { mockData } from "~/app/api/mockData";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { accountId: string } },
) {
  try {
    const { accountId } = context.params;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          NextResponse.json(
            mockData.transactions.filter((txn) => txn.account_id == accountId),
            { status: 200 },
          ),
        );
      }, 500);
    });
  } catch (e) {}
}
