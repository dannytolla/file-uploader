import express from "express";

const router = express.Router(); // Create a new router
import { getFiles, createFile, deleteFile } from "../controllers/file"; // Import the controller functions
import { fileUpload } from "../utils/multer";

router.route("/").get(getFiles).post(fileUpload.single("file"), createFile);
router.route("/:id").delete(deleteFile);

module.exports = router; // Export the router
