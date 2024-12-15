import { NextResponse } from "next/server";
import { validate } from "uuid";
import { findTagsByBrandId } from "@/lib/queries/complex";
import { Params } from "next/dist/server/request/params";

export async function GET(request: Request, segmentData: { params: Params }) {
  const { id } = await segmentData.params;

  if (!id) {
    return NextResponse.json({ error: "Brand ID not found" }, { status: 404 });
  }

  const brandId = Array.isArray(id) ? id[0] : id;

  if (!validate(brandId)) {
    return NextResponse.json({ error: "Invalid Brand ID" }, { status: 404 }); 
  }

  const tags = await findTagsByBrandId(brandId);

  return NextResponse.json(tags);
}
