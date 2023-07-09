import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = Router();

// Update:: ->
router.put("/:id", verifyUser, updateUser);

// Delete:: ->
router.delete("/:id", verifyUser, deleteUser);

// Get:: ->
router.get("/:id", verifyUser, getUser);

// Get all:: ->
router.get("/", verifyAdmin, getUsers);

export default router;
