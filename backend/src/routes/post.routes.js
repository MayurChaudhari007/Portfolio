


const express = require("express");
const {
  createPost,
  updatePost,
  getPublicPosts,
  getPostById, // Make sure this matches the controller!
  deletePost,
} = require("../controllers/post.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const { upload } = require("../config/cloudinary"); 

const router = express.Router();

// --- Public Routes ---
router.get("/", getPublicPosts);

// --- Admin Routes ---
// This line was likely causing the error if getPostById was undefined
router.get("/:id", protect, authorize("admin"), getPostById);

router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  createPost
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  updatePost
);

router.delete("/:id", protect, authorize("admin"), deletePost);

module.exports = router;