import { MainTypes } from "./cms";

// =====================================================================================================
// =====================================================================================================  
// Response Types
// =====================================================================================================
// =====================================================================================================

export type GetAllResponse<T extends MainTypes> = {
  // Document Array
  docs: T[];
  // Metadata
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type GetSingleResponse<T extends MainTypes> = T;

export type CreateResponse<T extends MainTypes> = {
  message: string;
  doc?: {
    id: T["id"];
    createdAt: T["dateCreated"];
    updatedAt: T["dateUpdated"];
  };
};

export type UpdateResponse<T extends MainTypes> = {
  message: string;
  doc?: {
    id: T["id"];
    createdAt: T["dateCreated"];
    updatedAt: T["dateUpdated"];
  };
  errors?: string[];
};

export type DeleteResponse = {
  message: string;
};
