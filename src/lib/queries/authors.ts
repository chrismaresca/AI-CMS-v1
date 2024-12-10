// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { authors } from "@/db/schema";

// Types
import { InsertAuthorInput, UpdateAuthorInput, Author } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new author.
 * @param {InsertAuthorInput} authorData - The data of the author to create.
 * @returns {Promise<Author>} The created author.
 */
export async function createAuthor(authorData: InsertAuthorInput): Promise<Author> {
  const [newAuthor] = await db.insert(authors).values(authorData).returning();
  return newAuthor;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get an author by ID.
 * @param {string} authorId - The ID of the author to retrieve.
 * @returns {Promise<Author | null>} The author if found, otherwise null.
 */
export async function findAuthorById(authorId: string): Promise<Author | null> {
  const author = await db.select().from(authors).where(eq(authors.id, authorId));

  return author[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all authors.
 * @returns {Promise<Author[]>} A list of all authors.
 */
export async function findAllAuthors(): Promise<Author[]> {
  const allAuthors = await db.select().from(authors);
  return allAuthors;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of authors.
 * @returns {Promise<number>} The count of authors.
 */
export async function countAuthors(): Promise<number> {
  const count = await db.$count(authors);
  return count || 0;
}

/**
 * Update an author by ID.
 * @param {string} authorId - The ID of the author to update.
 * @param {UpdateAuthorInput} updateData - The data to update the author with.
 * @returns {Promise<Author | null>} The updated author if found, otherwise null.
 */
export async function updateAuthorById(authorId: string, updateData: UpdateAuthorInput): Promise<Author | null> {
  const [updatedAuthor] = await db.update(authors).set(updateData).where(eq(authors.id, authorId)).returning();
  return updatedAuthor || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Delete an author by ID.
 * @param {string} authorId - The ID of the author to delete.
 * @returns {Promise<boolean>} True if the author was deleted, otherwise false.
 */
export async function deleteAuthorById(authorId: string): Promise<boolean> {
  const deletedAuthor = await db.delete(authors).where(eq(authors.id, authorId)).returning();
  return deletedAuthor.length > 0;
}
// =====================================================================================================
// =====================================================================================================
