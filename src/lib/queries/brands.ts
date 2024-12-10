// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { brands } from "@/db/schema";

// Types
import { InsertBrandInput, UpdateBrandInput, Brand } from "@/types/cms";

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new brand.
 * @param {InsertBrandInput} brandData - The data of the brand to create.
 * @returns {Promise<Brand>} The created brand.
 */
export async function createBrand(brandData: InsertBrandInput): Promise<Brand> {
  const [newBrand] = await db.insert(brands).values(brandData).returning();
  return newBrand;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get a brand by ID.
 * @param {string} brandId - The ID of the brand to retrieve.
 * @returns {Promise<Brand | null>} The brand if found, otherwise null.
 */
export async function findBrandById(brandId: string): Promise<Brand | null> {
  const brand = await db.select().from(brands).where(eq(brands.id, brandId));
  return brand[0] || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all brands.
 * @returns {Promise<Brand[]>} A list of all brands.
 */
export async function findAllBrands(): Promise<Brand[]> {
  const allBrands = await db.select().from(brands);
  return allBrands;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Count the number of brands.
 * @returns {Promise<number>} The count of brands.
 */
export async function countBrands(): Promise<number> {
  const count = await db.$count(brands);
  return count || 0;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Update a brand by ID.
 * @param {string} brandId - The ID of the brand to update.
 * @param {UpdateBrandInput} updateData - The data to update the brand with.
 * @returns {Promise<Brand | null>} The updated brand if found, otherwise null.
 */
export async function updateBrandById(brandId: string, updateData: UpdateBrandInput): Promise<Brand | null> {
  const [updatedBrand] = await db.update(brands).set(updateData).where(eq(brands.id, brandId)).returning();
  return updatedBrand || null;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Delete a brand by ID.
 * @param {string} brandId - The ID of the brand to delete.
 * @returns {Promise<boolean>} True if the brand was deleted, otherwise false.
 */
export async function deleteBrandById(brandId: string): Promise<boolean> {
  const deletedBrand = await db.delete(brands).where(eq(brands.id, brandId)).returning();
  return deletedBrand.length > 0;
}
