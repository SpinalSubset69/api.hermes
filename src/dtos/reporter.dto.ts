import { ArticleDto } from "./article.dto";

export interface ReporterCreateDto{
    name:string;
    user_name:string;
    email:string;
    password:string;  
    image?:string;       
}

export interface ReporterToReturnDto{
    reporter_id: number;
    name:string;
    user_name:string;
    email:string;    
    image?:string;
    biography?:string;
    phone?:string;    
}

export interface ReporterWithArticles{
    reporter:ReporterToReturnDto,
    articles:ArticleDto[]
}