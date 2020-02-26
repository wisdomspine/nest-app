import * as fs from "fs";
export const deleteFile = (path, cb = () => null) => {
    fs.unlink(path, cb);
}