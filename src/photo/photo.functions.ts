import { deleteFile } from "src/common/functions"

export const deletePhoto = (file, func) => {
    deleteFile("./upload/"+file, func);
}