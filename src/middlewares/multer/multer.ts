import multer from 'multer';
import path from 'path';
import { Applicationexception } from '../../common/exceptions/application.exception';

const multerMiddleWare = (folder:string) => {
    let objectiveFolder:string;

    switch(folder){
        case "reporters":
            objectiveFolder = folder;
            break;
        case "articles":
            objectiveFolder = folder;
            break;    
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, `./../../uploads/${objectiveFolder}`));
        },
        filename:  (req, file, cb) => {        
            cb(null,  file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
        }
    });
    return multer({
        storage: storage
    });
}

export default multerMiddleWare;
