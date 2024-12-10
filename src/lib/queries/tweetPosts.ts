// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { tweetPosts } from "@/db/schema";

// Types
import { InsertTweetPostInput, UpdateTweetPostInput, TweetPost } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new tweet post.
 * @param {InsertTweetPostInput} tweetPostData - The data of the tweet post to create.
 * @returns {Promise<TweetPost>} The created tweet post.
 */
export async function createTweetPost(tweetPostData: InsertTweetPostInput): Promise<TweetPost> {
  const [newTweetPost] = await db.insert(tweetPosts).values(tweetPostData).returning();
  return newTweetPost;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get a tweet post by ID.
 * @param {string} tweetPostId - The ID of the tweet post to retrieve.
 * @returns {Promise<TweetPost | null>} The tweet post if found, otherwise null.
 */
export async function findTweetPostById(tweetPostId: string): Promise<TweetPost | null> {
  const tweetPost = await db.select().from(tweetPosts).where(eq(tweetPosts.id, tweetPostId));
  return tweetPost[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tweet posts.
 * @returns {Promise<TweetPost[]>} A list of all tweet posts.
 */
export async function findAllTweetPosts(): Promise<TweetPost[]> {
  const allTweetPosts = await db.select().from(tweetPosts);
  return allTweetPosts;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of tweet posts.
 * @returns {Promise<number>} The count of tweet posts.
 */
export async function countTweetPosts(): Promise<number> {
  const count = await db.$count(tweetPosts);
  return count || 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Update a tweet post by ID.
 * @param {string} tweetPostId - The ID of the tweet post to update.
 * @param {UpdateTweetPostInput} updateData - The data to update the tweet post with.
 * @returns {Promise<TweetPost | null>} The updated tweet post if found, otherwise null.
 */
export async function updateTweetPostById(
  tweetPostId: string,
  updateData: UpdateTweetPostInput
): Promise<TweetPost | null> {
  const [updatedTweetPost] = await db
    .update(tweetPosts)
    .set(updateData)
    .where(eq(tweetPosts.id, tweetPostId))
    .returning();
  return updatedTweetPost || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Delete a tweet post by ID.
 * @param {string} tweetPostId - The ID of the tweet post to delete.
 * @returns {Promise<boolean>} True if the tweet post was deleted, otherwise false.
 */
export async function deleteTweetPostById(tweetPostId: string): Promise<boolean> {
  const deletedTweetPost = await db.delete(tweetPosts).where(eq(tweetPosts.id, tweetPostId)).returning();
  return deletedTweetPost.length > 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tweet posts by brand ID.
 * @param {string} brandId - The ID of the brand to filter tweet posts by.
 * @returns {Promise<TweetPost[]>} A list of tweet posts associated with the specified brand.
 */
export async function findAllTweetPostsByBrand(brandId: string): Promise<TweetPost[]> {
  const postsByBrand = await db.select().from(tweetPosts).where(eq(tweetPosts.brandId, brandId));
  return postsByBrand;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tweet posts by article ID.
 * @param {string} articleId - The ID of the article to filter tweet posts by.
 * @returns {Promise<TweetPost[]>} A list of tweet posts associated with the specified article.
 */
export async function findAllTweetPostsByArticle(articleId: string): Promise<TweetPost[]> {
  const postsByArticle = await db.select().from(tweetPosts).where(eq(tweetPosts.mainArticleId, articleId));
  return postsByArticle;
}

// =====================================================================================================
// =====================================================================================================
