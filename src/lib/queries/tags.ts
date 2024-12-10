// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { tags } from "@/db/schema";

// Types
import { InsertTagInput, UpdateTagInput, Tag } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new tag.
 * @param {InsertTagInput} tagData - The data of the tag to create.
 * @returns {Promise<Tag>} The created tag.
 */
export async function createTag(tagData: InsertTagInput): Promise<Tag> {
  const [newTag] = await db.insert(tags).values(tagData).returning();
  return newTag;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get a tag by ID.
 * @param {string} tagId - The ID of the tag to retrieve.
 * @returns {Promise<Tag | null>} The tag if found, otherwise null.
 */
export async function findTagById(tagId: string): Promise<Tag | null> {
  const tag = await db.select().from(tags).where(eq(tags.id, tagId));
  return tag[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all tags.
 * @returns {Promise<Tag[]>} A list of all tags.
 */
export async function findAllTags(): Promise<Tag[]> {
  const allTags = await db.select().from(tags);
  return allTags;
}

// =====================================================================================================
// =====================================================================================================    

/**
 * Count the number of tags.
 * @returns {Promise<number>} The count of tags.
 */
export async function countTags(): Promise<number> {
  const count = await db.$count(tags);
  return count || 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Update a tag by ID.
 * @param {string} tagId - The ID of the tag to update.
 * @param {UpdateTagInput} updateData - The data to update the tag with.
 * @returns {Promise<Tag | null>} The updated tag if found, otherwise null.
 */
export async function updateTagById(tagId: string, updateData: UpdateTagInput): Promise<Tag | null> {
  const [updatedTag] = await db.update(tags).set(updateData).where(eq(tags.id, tagId)).returning();
  return updatedTag || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Delete a tag by ID.
 * @param {string} tagId - The ID of the tag to delete.
 * @returns {Promise<boolean>} True if the tag was deleted, otherwise false.
 */
export async function deleteTagById(tagId: string): Promise<boolean> {
  const deletedTag = await db.delete(tags).where(eq(tags.id, tagId)).returning();
  return deletedTag.length > 0;
}


// =====================================================================================================
// =====================================================================================================

