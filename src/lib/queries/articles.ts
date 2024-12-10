// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { articles } from "@/db/schema";

// Types
import { InsertArticleInput, UpdateArticleInput, Article } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new article.
 * @param {InsertArticleInput} articleData - The data of the article to create.
 * @returns {Promise<Article>} The created article.
 */
export async function createArticle(articleData: InsertArticleInput): Promise<Article> {
  const [newArticle] = await db.insert(articles).values(articleData).returning();
  return newArticle;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get an article by ID.
 * @param {string} articleId - The ID of the article to retrieve.
 * @returns {Promise<Article | null>} The article if found, otherwise null.
 */
export async function findArticleById(articleId: string): Promise<Article | null> {
  const article = await db.select().from(articles).where(eq(articles.id, articleId));
  return article[0] || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get all articles.
 * @returns {Promise<Article[]>} A list of all articles.
 */
export async function findAllArticles(): Promise<Article[]> {
  const allArticles = await db.select().from(articles);
  return allArticles;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of articles.
 * @returns {Promise<number>} The count of articles.
 */
export async function countArticles(): Promise<number> {
  const count = await db.$count(articles);
  return count || 0;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Update an article by ID.
 * @param {string} articleId - The ID of the article to update.
 * @param {UpdateArticleInput} updateData - The data to update the article with.
 * @returns {Promise<Article | null>} The updated article if found, otherwise null.
 */
export async function updateArticleById(articleId: string, updateData: UpdateArticleInput): Promise<Article | null> {
  const [updatedArticle] = await db.update(articles).set(updateData).where(eq(articles.id, articleId)).returning();
  return updatedArticle || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete an article by ID.
 * @param {string} articleId - The ID of the article to delete.
 * @returns {Promise<boolean>} True if the article was deleted, otherwise false.
 */
export async function deleteArticleById(articleId: string): Promise<boolean> {
  const deletedArticle = await db.delete(articles).where(eq(articles.id, articleId)).returning();
  return deletedArticle.length > 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all articles by brand ID.
 * @param {string} brandId - The ID of the brand to filter articles by.
 * @returns {Promise<Article[]>} A list of articles associated with the specified brand.
 */
export async function findAllArticlesByBrand(brandId: string): Promise<Article[]> {
  const articlesByBrand = await db.select().from(articles).where(eq(articles.brandId, brandId));
  return articlesByBrand;
}

// =====================================================================================================
// =====================================================================================================

export async function findArticleBySlug(slug: string): Promise<Article | null> {
  const article = await db.select().from(articles).where(eq(articles.slug, slug));
  return article[0] || null;
}

// =====================================================================================================
