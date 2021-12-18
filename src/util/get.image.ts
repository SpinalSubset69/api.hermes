import { Applicationexception } from "../common/exceptions/application.exception";
import path from 'path';
import fs from 'fs';

export const getImage = (folder:string, image_name:string) => {
    let folderObjective;
    switch(folder){
        case "reporters":
            folderObjective = "reporters";
            break;
        case "articles":
            folderObjective = "articles";
            break;
        default:
            throw new Applicationexception('No Folder Objective to retrieve images');
    }

    const imagePath = path.join(__dirname, `./../uploads/${folderObjective}/${image_name}`);    
    const imageExists = fs.existsSync(imagePath);
    if(!imageExists){
        throw new Applicationexception('Image does not exists on the server');
    }        
    return path.resolve(imagePath);
}