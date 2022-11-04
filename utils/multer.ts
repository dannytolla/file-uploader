import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, "./files");
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // console.log(path.extname(file.originalname));
  if (file.mimetype.startsWith("application")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  fileFilter,
});
