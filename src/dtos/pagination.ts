import { ArticleDto } from "./article.dto";

export class ArticlesPagination {
  count: number;
  pageSize: number;
  page: number;
  data: ArticleDto[];

  constructor(
    count: number,
    pageSize: number,
    page: number,
    data: ArticleDto[]
  ) {
    this.count = count;
    this.pageSize = pageSize;
    this.page = page;
    this.data = data;
  }
}

export class ArticlesPaginationParams {
  pageSize: number;
  page: number;
  query:string;
  category:string;
  reporter_id:number;

  constructor(pageSize: number, page: number, query?:string, category?:string, reporter_id?:number) {
    this.pageSize = pageSize ? pageSize : 3;
    this.page = page ? page : 1;
    this.query = query ? query : '';
    this.category = category ? category : '';
    this.reporter_id = reporter_id ? reporter_id : 0;
  }
}
