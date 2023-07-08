import { Router } from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
const router = Router();

// Create
router.post("/", createHotel);

// Update
router.put("/:id", updateHotel);

// Delete
router

export default router;
