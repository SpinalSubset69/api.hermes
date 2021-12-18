import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `./../../uploads/articles`));
    },
    filename:  (req, file, cb) => {        
        cb(null,  file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

export default multer({
    storage: storage
});
