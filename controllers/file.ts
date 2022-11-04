import { Request, Response } from "express";
import Upload from "../models/Upload";
import asyncHandler from "../middleware/async";

// @desc    Get all uploads
// @route   GET /api/
// @access  Public
const getFiles = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const uploads = await Upload.findAll();

    res.status(200).json({
      success: true,
      data: uploads,
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Upload file
// @route   POST /api/
// @access  Public
const createFile = asyncHandler(async (req: Request, res: Response) => {
  let file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("Please upload a valid file");
  }

  const upload = await Upload.create({
    originalName: file?.originalname as string,
    type: file?.mimetype as string,
    fileName: file?.filename as string,
    size: file?.size as number,
  });

  res.status(201).json({
    success: true,
    data: upload,
  });
});

// @desc    Delete file
// @route   DELETE /api/:id
// @access  Public
const deleteFile = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const upload = await Upload.findByPk(_req.params.id);

    if (!upload) {
      res.status(404);
      throw new Error("File not found");
    }

    await upload.destroy();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
  }
});

export { getFiles, createFile, deleteFile };
