export class NotFound extends Error{
    constructor(param:string){
        super(`${param} Not Found`);
    }
}