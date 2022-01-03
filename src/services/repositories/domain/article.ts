export interface Article{
    article_id:number;
    title:string;
    summary:string;
    content:string;
    likes?:number;
    category?:number;
    created_at:Date;
    updated_at?:Date;
    category_id?:number;
    reporter_id?:number;
}