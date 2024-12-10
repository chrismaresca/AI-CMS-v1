// =========================
// Imports
// =========================
import {
  findAllArticles,
  findArticleById,
  createArticle,
  updateArticleById,
  deleteArticleById,
} from "@/lib/queries/articles";

import {
  findAllAuthors,
  findAuthorById,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
} from "@/lib/queries/authors";

import { findAllBrands, findBrandById, createBrand, updateBrandById, deleteBrandById } from "@/lib/queries/brands";

import {
  findAllLinkedInPosts,
  findLinkedInPostById,
  createLinkedInPost,
  updateLinkedInPostById,
  deleteLinkedInPostById,
} from "@/lib/queries/linkedInPosts";

import { findAllTags, findTagById, createTag, updateTagById, deleteTagById } from "@/lib/queries/tags";

import { findAllTweets, findTweetById, createTweet, updateTweetById, deleteTweetById } from "@/lib/queries/tweets";

import {
  findAllTweetPosts,
  findTweetPostById,
  createTweetPost,
  updateTweetPostById,
  deleteTweetPostById,
} from "@/lib/queries/tweetPosts";

import {
  Article,
  InsertArticleInput,
  UpdateArticleInput,
  Author,
  InsertAuthorInput,
  UpdateAuthorInput,
  Brand,
  InsertBrandInput,
  UpdateBrandInput,
  LinkedInPost,
  InsertLinkedInPostInput,
  UpdateLinkedInPostInput,
  Tag,
  InsertTagInput,
  UpdateTagInput,
  Tweet,
  InsertTweetInput,
  UpdateTweetInput,
  TweetPost,
  InsertTweetPostInput,
  UpdateTweetPostInput,
} from "@/types/cms";

// =========================
// Operation Type
// =========================
export type Operation = "findAll" | "findById" | "create" | "update" | "delete";
export type Resource = "articles" | "authors" | "brands" | "tags" | "linkedInPosts" | "tweets" | "tweetPosts";

// =========================
// Handler Type Definitions
// =========================
export type GetAllHandler<T> = () => Promise<T[]>;
export type GetByIdHandler<T> = (id: string) => Promise<T | null>;
export type PostHandler<TInput, TOutput> = (data: TInput) => Promise<TOutput>;
export type PatchHandler<TInput, TOutput> = (id: string, data: TInput) => Promise<TOutput | null>;
export type DeleteHandler = (id: string) => Promise<boolean>;

type ResourceConfig<T, TInsert, TUpdate> = {
  [K in Operation]: K extends "findAll"
    ? GetAllHandler<T>
    : K extends "findById"
    ? GetByIdHandler<T>
    : K extends "create"
    ? PostHandler<TInsert, T>
    : K extends "update"
    ? PatchHandler<TUpdate, T>
    : K extends "delete"
    ? DeleteHandler
    : never;
};

export type ResourceHandlers = {
  "articles": ResourceConfig<Article, InsertArticleInput, UpdateArticleInput>;
  "authors": ResourceConfig<Author, InsertAuthorInput, UpdateAuthorInput>;
  "brands": ResourceConfig<Brand, InsertBrandInput, UpdateBrandInput>;
  "tags": ResourceConfig<Tag, InsertTagInput, UpdateTagInput>;
  "linkedin_posts": ResourceConfig<LinkedInPost, InsertLinkedInPostInput, UpdateLinkedInPostInput>;
  "tweets": ResourceConfig<Tweet, InsertTweetInput, UpdateTweetInput>;
  "tweet_posts": ResourceConfig<TweetPost, InsertTweetPostInput, UpdateTweetPostInput>;
};

// =========================
// Centralized Resource Registry
// =========================
export const resourceHandlers: ResourceHandlers = {
  "articles": {
    findAll: findAllArticles,
    findById: findArticleById,
    create: createArticle,
    update: updateArticleById,
    delete: deleteArticleById,
  },
  "authors": {
    findAll: findAllAuthors,
    findById: findAuthorById,
    create: createAuthor,
    update: updateAuthorById,
    delete: deleteAuthorById,
  },
  "brands": {
    findAll: findAllBrands,
    findById: findBrandById,
    create: createBrand,
    update: updateBrandById,
    delete: deleteBrandById,
  },
  "tags": {
    findAll: findAllTags,
    findById: findTagById,
    create: createTag,
    update: updateTagById,
    delete: deleteTagById,
  },
  "linkedin_posts": {
    findAll: findAllLinkedInPosts,
    findById: findLinkedInPostById,
    create: createLinkedInPost,
    update: updateLinkedInPostById,
    delete: deleteLinkedInPostById,
  },
  "tweets": {
    findAll: findAllTweets,
    findById: findTweetById,
    create: createTweet,
    update: updateTweetById,
    delete: deleteTweetById,
  },
  "tweet_posts": {
    findAll: findAllTweetPosts,
    findById: findTweetPostById,
    create: createTweetPost,
    update: updateTweetPostById,
    delete: deleteTweetPostById,
  },
};

// CRUCIAL: This is the type that will be used to get the resource from the resources object.
export type ResourceKeys = keyof typeof resourceHandlers;
export type ResourceHandler = ResourceHandlers[ResourceKeys];
