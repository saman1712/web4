import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({
    ok: true,
    receivedAt: new Date().toISOString(),
    items: body?.items ?? [],
    message: "Order received. A waiter will confirm at your table.",
  });
}
