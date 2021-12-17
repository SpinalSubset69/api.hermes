export class RequireParameterError extends Error{
    constructor(param:string){
        super(`${param} cannot be null or undefined`);
    }
}

export class InvalidPropertyError extends Error{
    constructor(msg:string){
        super(msg);
    }
}