export interface Reporter{
    reporter_id: number;
    name:string;
    user_name:string;
    email:string;
    password:string;
    image?:string;
    biography?:string;
    phone?:string;            
}

export interface ReporterLogIn{
    email:string;
    password:string;
}