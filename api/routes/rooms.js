import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = Router();

// Create:: ->
router.post("/:hotelid", verifyAdmin, createRoom);

// Update:: ->
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

// Delete:: ->
router.delete("/:id", verifyAdmin, deleteRoom);

// GET:: ->
router.get("/:id", getRoom);

// GET ALL:: ->
router.get("/:id", getRooms);


export default router;