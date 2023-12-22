// import { Router } from "express";
// import multer from "multer";
// const router = Router();

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images"); // Specify the directory where uploaded files will be stored
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name); // Use a unique filename
//   },
// });

// const upload = multer({ storage: storage });

// // Route to handle file uploads
// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     // The file is available in req.file
//     // const uploadedFile = req.file;

//     // Do something with the file if needed
//     // console.log("File uploaded:", uploadedFile);

//     res
//       .status(200)
//       .json({ message: "File uploaded successfully!", res: "success" });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(400).json({ message: "Something went wrong!", res: "error" });
//   }
// });

// export default router;
