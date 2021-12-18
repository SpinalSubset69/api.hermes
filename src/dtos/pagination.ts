import { Article } from "../services/repositories/domain/article";
import { ArticleToReturnDto } from "./article.dto";

export class ArticlesPagination{
    count:number;
    pageSize:number;
    page:number;
    data: ArticleToReturnDto[];

    constructor(count:number, pageSize:number, page:number, data:ArticleToReturnDto[]){
        this.count = count;
        this.pageSize = pageSize;
        this.page = page;
        this.data = data;
    }
}

export class ArticlesPaginationParams{    
    pageSize:number = 5;
    page:number = 1;

    constructor( pageSize:number, page:number){    
        this.pageSize = pageSize;
        this.page = page;
    }
}