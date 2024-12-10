import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// Schema import
import * as Schema from "@/db/schema";

// TODO: This is when we want to dynamically generate the types for the models. Before doing this, need to sepaate domain tables from relationships, etc.

// Define ModelTypes dynamically for the imported schema
// export type ModelTypes = {
//   [K in keyof typeof Schema]: (typeof Schema)[K] extends Table ? InferSelectModel<(typeof Schema)[K]> : never;
// };

// export type ModelInsertTypes = {
//   [K in keyof typeof Schema]: (typeof Schema)[K] extends Table ? InferInsertModel<(typeof Schema)[K]> : never;
// };

// export type ModelUpdateTypes = {
//   [K in keyof typeof Schema]: (typeof Schema)[K] extends Table ? Partial<InferInsertModel<(typeof Schema)[K]>> : never;
// };

// =========================
// Main Types
// =========================
export type Author = InferSelectModel<typeof Schema.authors>;
export type Brand = InferSelectModel<typeof Schema.brands>;
export type Article = InferSelectModel<typeof Schema.articles>;
export type Tag = InferSelectModel<typeof Schema.tags>;
export type LinkedInPost = InferSelectModel<typeof Schema.linkedInPosts>;
export type Tweet = InferSelectModel<typeof Schema.tweets>;
export type TweetPost = InferSelectModel<typeof Schema.tweetPosts>;

// ALL MAIN TYPES
export type MainTypes = Author | Brand | Article | Tag | LinkedInPost | Tweet | TweetPost;

// =====================================================================================================
// =====================================================================================================
// Convenience Types
// =====================================================================================================

// =========================
// Authors Insert & Update Types
// =========================
export type InsertAuthorInput = InferInsertModel<typeof Schema.authors>;
export type UpdateAuthorInput = Partial<InsertAuthorInput>;

// =========================
// Articles Insert & Update Types
// =========================
export type InsertArticleInput = InferInsertModel<typeof Schema.articles>;
export type UpdateArticleInput = Partial<InsertArticleInput>;

// =========================
// Brands Insert & Update Types
// =========================
export type InsertBrandInput = InferInsertModel<typeof Schema.brands>;
export type UpdateBrandInput = Partial<InsertBrandInput>;

// =========================
// Tags Insert & Update Types
// =========================
export type InsertTagInput = InferInsertModel<typeof Schema.tags>;
export type UpdateTagInput = Partial<InsertTagInput>;

// =========================
// LinkedIn Posts Insert & Update Types
// =========================
export type InsertLinkedInPostInput = InferInsertModel<typeof Schema.linkedInPosts>;
export type UpdateLinkedInPostInput = Partial<InsertLinkedInPostInput>;

// =========================
// Tweets Insert & Update Types
// =========================
export type InsertTweetInput = InferInsertModel<typeof Schema.tweets>;
export type UpdateTweetInput = Partial<InsertTweetInput>;

// =========================
// Tweet Posts Insert & Update Types
// =========================
export type InsertTweetPostInput = InferInsertModel<typeof Schema.tweetPosts>;
export type UpdateTweetPostInput = Partial<InsertTweetPostInput>;
