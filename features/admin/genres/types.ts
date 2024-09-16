export type Genres = {
  status: number;
  data: Data[];
  pagination: Pagination;
};

export type Genre = {
  status: number;
  data: Data;
};

export interface Data {
  genre_id: string;
  genre_name: string;
  genre_description: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  itemsPerPage: number;
}
