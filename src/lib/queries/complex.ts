// Drizzle
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

// Schema
import * as schema from "@/db/schema";

// Types
import { Article, Tag } from "@/types/cms";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { neon } from "@neondatabase/serverless";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tags by brand ID.
 * @param {string} brandId - The ID of the brand to find tags for.
 * @returns {Promise<Tag[]>} An array of tags. Returns an empty array if no tags are found.
 */
export async function findTagsByBrandId(brandId: string): Promise<Tag[]> {
  const brandTagObj = await neonDb.query.brandTags.findMany({
    where: eq(schema.brandTags.brandId, brandId),
    with: {
      tag: true,
    },
  });
  return brandTagObj.map((obj) => obj.tag);
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tags by article ID.
 * @param {string} articleId - The ID of the article to find tags for.
 * @returns {Promise<Tag[]>} An array of tags. Returns an empty array if no tags are found.
 */
export async function findTagsByArticleId(articleId: string): Promise<Tag[]> {
  const articleTagObj = await neonDb.query.articleTags.findMany({
    where: eq(schema.articleTags.articleId, articleId),
    with: {
      tag: true,
    },
  });
  return articleTagObj.map((obj) => obj.tag);
}

// =====================================================================================================
// =====================================================================================================

export async function findAllArticlesByBrandId(brandId: string): Promise<Article[]> {
  const articles = await neonDb.query.articles.findMany({
    where: eq(schema.articles.brandId, brandId),
  });
  return articles;
}

// =====================================================================================================
// =====================================================================================================

export async function findAllArticlesBySlug(slug: string): Promise<Article[]> {
  const articles = await neonDb.query.articles.findMany({
    where: eq(schema.articles.slug, slug),
  });
  return articles;
}

// =====================================================================================================
// =====================================================================================================
