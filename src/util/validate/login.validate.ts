import { RequiredParam } from "../../common/exceptions/required.param"
import { ReporterLogIn } from "../../services/repositories/domain/reporter"

export const validateLogin = (entry:ReporterLogIn):ReporterLogIn => {
    if(Object.keys(entry).length === 0){
        RequiredParam('Login Info');
    }
    
    if(!entry.email){
        RequiredParam('Email');
    }

    if(!entry.password){
        RequiredParam('Password');
    }    
    return Object.freeze(entry);
}