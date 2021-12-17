import { Article } from "../services/repositories/domain/article";

export class ArticlesPagination{
    count:number;
    pageSize:number;
    page:number;
    data: Article[];

    constructor(count:number, pageSize:number, page:number, data:Article[]){
        this.count = count;
        this.pageSize = pageSize;
        this.page = page;
        this.data = data;
    }
}

export class ArticlesPaginationParams{
    reporter_id:number;
    pageSize:number;
    page:number;

    constructor(reporter_id:number, pageSize:number, page:number){
        this.reporter_id = reporter_id;
        this.pageSize = pageSize;
        this.page = page;
    }
}