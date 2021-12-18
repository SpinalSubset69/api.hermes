export interface ArticleCreateDto {
  title: string;
  summary: string;
  content: string;
  category_id: number;
  reporter_id: number;
  created_at?: Date;
}

export interface ArticleToReturnDto {
  article: ArticleDto | null;
  images: Images[] | null;
}

export interface Images {
  name: string;
}

export interface ArticleDto {
  title: string;
  summary: string;
  content: string;
  reporter_id: number;
  created_at?: Date;
  likes?: number;
  category: string;
  reporter: string;
}
