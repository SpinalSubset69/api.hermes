import { RequireParameterError } from "./errors"

export const RequiredParam = (param:string) => {
    throw new RequireParameterError(param);
}