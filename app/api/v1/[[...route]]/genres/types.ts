interface Artists {
  id: string;
  artist_name: string;
  artist_image: string;
  artist_bio: any;
  created_at: string;
  updated_at: string;
}

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  itemsPerPage: number;
};

type ResponseSuccess = {
  status: number;
  data: Artists[];
  pagination: Pagination;
};

type ResponseError = {
  status: number;
  errors: any[];
};

export type ArtistsResponse = ResponseSuccess & ResponseError;
