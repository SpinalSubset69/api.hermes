export interface ArticleCreateDto {
  title: string;
  summary: string;
  content: string;
  category_id: number;
  created_at?: Date;
}

export interface Images {
  name: string;
}

export interface ArticleDto {
  article_id:number;
  title: string;
  summary: string;
  content: string;
  reporter_id: number;
  created_at?: Date;
  likes?: number;
  category: string;
  reporter: string;
  images:Images[]
}
