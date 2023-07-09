import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = Router();

// Update:: ->
router.put("/:id", updateUser);

// Delete:: ->
router.delete("/:id", deleteUser);

// Get:: ->
router.get("/:id", getUser);


//Get all:: ->
router.get("/", getUsers);

export default router;