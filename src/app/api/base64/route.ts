import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL parameter is required." }, { status: 400 });
    }

    const buffer = await fetch(url).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    });

    const {base64}=await getPlaiceholder(buffer)
    return NextResponse.json(base64)
    
  } catch (error: any) {
    return NextResponse.json({ error: error });
  }
}
