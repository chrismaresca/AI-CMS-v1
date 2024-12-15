import { NextResponse } from "next/server";

import { findArticleBySlug } from "@/lib/queries/articles";

// Params for Slug Type
import { Params } from "next/dist/server/request/params";
import { findArticleInfoBySlug } from "@/lib/queries/complex";

// =====================================================================================================
// =====================================================================================================


// TODO: Fix Slug Parsing
export async function GET(request: Request, segmentData: { params: Params }) {
  const { slug } = await segmentData.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug not found" }, { status: 404 });
  }

  console.log("slug", slug[0]);
  const article = await findArticleInfoBySlug(slug[0]);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
