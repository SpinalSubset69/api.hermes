import { InvalidPropertyError } from "../../common/exceptions/errors";
import { FileUpload } from "../../dtos/image.upload.dto";
import fs from "fs";
import path from "path";
import { Applicationexception } from "../../common/exceptions/application.exception";

export const validateImage = async (
  imageInfo: FileUpload
): Promise<FileUpload> => {
  const mimeType = imageInfo.mimetype.split("/")[1];
  if (
    !mimeType.includes("png") &&
    !mimeType.includes("jpg") &&
    !mimeType.includes("jpeg")
  ) {
    //Delete image from the folder
    await fs.unlink(path.resolve(imageInfo.path), (err: any) => {
      throw new Applicationexception(err.message);
    });

    throw new InvalidPropertyError("Upload Only Images");
  }
  const sizeInMegabytes = imageInfo.size / 1000000;
  if (sizeInMegabytes > 60) {
    throw new InvalidPropertyError("Image size must be less than 60 mb");
  }

  return Object.freeze(imageInfo);
};

export const validateImagesArray = async (
  imagesInfo: FileUpload[]
): Promise<FileUpload[]> => {
  let onlyImages = true;
  let oversize = false;
  
  for (let image of imagesInfo) {
    const mimeType = image.mimetype.split("/")[1];
    if (
      !mimeType.includes("png") &&
      !mimeType.includes("jpg") &&
      !mimeType.includes("jpeg")
    ) {
      onlyImages = false;
    }
    const sizeInMegabytes = image.size / 1000000;
    if (sizeInMegabytes > 60) {
        oversize = true;
    }
  }

  //In case there is a different file errase everything
  if (!onlyImages || oversize) {
    console.log('NOOOO')
    for (let image of imagesInfo) {
      //Delete image from the folder
      await fs.unlink(path.resolve(image.path), (err: any) => {
        throw new Applicationexception(err.message);
      });     
    }
    if(oversize) throw new InvalidPropertyError('Image size must be less than 60 mb');
    if(!onlyImages) throw new InvalidPropertyError('Upload Only Images');
  }
  return imagesInfo;
};
