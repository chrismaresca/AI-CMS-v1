// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { linkedInPosts } from "@/db/schema";

// Types
import { InsertLinkedInPostInput, UpdateLinkedInPostInput, LinkedInPost } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new LinkedIn post.
 * @param {InsertLinkedInPostInput} postData - The data of the LinkedIn post to create.
 * @returns {Promise<LinkedInPost>} The created LinkedIn post.
 */
export async function createLinkedInPost(postData: InsertLinkedInPostInput): Promise<LinkedInPost> {
  const [newPost] = await db.insert(linkedInPosts).values(postData).returning();
  return newPost;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to retrieve.
 * @returns {Promise<LinkedInPost | null>} The LinkedIn post if found, otherwise null.
 */
export async function findLinkedInPostById(postId: string): Promise<LinkedInPost | null> {
  const post = await db.select().from(linkedInPosts).where(eq(linkedInPosts.id, postId));
  return post[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all LinkedIn posts.
 * @returns {Promise<LinkedInPost[]>} A list of all LinkedIn posts.
 */
export async function findAllLinkedInPosts(): Promise<LinkedInPost[]> {
  const allPosts = await db.select().from(linkedInPosts);
  return allPosts;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of LinkedIn posts.
 * @returns {Promise<number>} The count of LinkedIn posts.
 */
export async function countLinkedInPosts(): Promise<number> {
  const count = await db.$count(linkedInPosts);
  return count || 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Update a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to update.
 * @param {UpdateLinkedInPostInput} updateData - The data to update the LinkedIn post with.
 * @returns {Promise<LinkedInPost | null>} The updated LinkedIn post if found, otherwise null.
 */
export async function updateLinkedInPostById(
  postId: string,
  updateData: UpdateLinkedInPostInput
): Promise<LinkedInPost | null> {
  const [updatedPost] = await db.update(linkedInPosts).set(updateData).where(eq(linkedInPosts.id, postId)).returning();
  return updatedPost || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Delete a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to delete.
 * @returns {Promise<boolean>} True if the LinkedIn post was deleted, otherwise false.
 */
export async function deleteLinkedInPostById(postId: string): Promise<boolean> {
  const deletedPost = await db.delete(linkedInPosts).where(eq(linkedInPosts.id, postId)).returning();
  return deletedPost.length > 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all LinkedIn posts by brand ID.
 * @param {string} brandId - The ID of the brand to filter LinkedIn posts by.
 * @returns {Promise<LinkedInPost[]>} A list of LinkedIn posts associated with the specified brand.
 */
export async function findAllLinkedInPostsByBrand(brandId: string): Promise<LinkedInPost[]> {
  const postsByBrand = await db.select().from(linkedInPosts).where(eq(linkedInPosts.brandId, brandId));
  return postsByBrand;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all LinkedIn posts by article ID.
 * @param {string} articleId - The ID of the article to filter LinkedIn posts by.
 * @returns {Promise<LinkedInPost[]>} A list of LinkedIn posts associated with the specified article.
 */
export async function findAllLinkedInPostsByArticle(articleId: string): Promise<LinkedInPost[]> {
  const postsByArticle = await db.select().from(linkedInPosts).where(eq(linkedInPosts.mainArticleId, articleId));
  return postsByArticle;
}

// =====================================================================================================
// =====================================================================================================
