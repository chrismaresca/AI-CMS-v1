// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { tweets } from "@/db/schema";

// Types
import { InsertTweetInput, UpdateTweetInput, Tweet } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new tweet.
 * @param {InsertTweetInput} tweetData - The data of the tweet to create.
 * @returns {Promise<Tweet>} The created tweet.
 */
export async function createTweet(tweetData: InsertTweetInput): Promise<Tweet> {
  const [newTweet] = await db.insert(tweets).values(tweetData).returning();
  return newTweet;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get a tweet by ID.
 * @param {string} tweetId - The ID of the tweet to retrieve.
 * @returns {Promise<Tweet | null>} The tweet if found, otherwise null.
 */
export async function findTweetById(tweetId: string): Promise<Tweet | null> {
  const tweet = await db.select().from(tweets).where(eq(tweets.id, tweetId));
  return tweet[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tweets.
 * @returns {Promise<Tweet[]>} A list of all tweets.
 */
export async function findAllTweets(): Promise<Tweet[]> {
  const allTweets = await db.select().from(tweets);
  return allTweets;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of tweets.
 * @returns {Promise<number>} The count of tweets.
 */
export async function countTweets(): Promise<number> {
  const count = await db.$count(tweets);
  return count || 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Update a tweet by ID.
 * @param {string} tweetId - The ID of the tweet to update.
 * @param {UpdateTweetInput} updateData - The data to update the tweet with.
 * @returns {Promise<Tweet | null>} The updated tweet if found, otherwise null.
 */
export async function updateTweetById(tweetId: string, updateData: UpdateTweetInput): Promise<Tweet | null> {
  const [updatedTweet] = await db.update(tweets).set(updateData).where(eq(tweets.id, tweetId)).returning();
  return updatedTweet || null;
}

// =====================================================================================================
// =====================================================================================================
/**
 * Delete a tweet by ID.
 * @param {string} tweetId - The ID of the tweet to delete.
 * @returns {Promise<boolean>} True if the tweet was deleted, otherwise false.
 */
export async function deleteTweetById(tweetId: string): Promise<boolean> {
  const deletedTweet = await db.delete(tweets).where(eq(tweets.id, tweetId)).returning();
  return deletedTweet.length > 0;
}
