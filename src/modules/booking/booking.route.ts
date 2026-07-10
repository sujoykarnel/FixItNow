import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);
router.get("/", auth(Role.CUSTOMER), bookingController.getUserBooings);
router.get("/:id", auth(Role.CUSTOMER), bookingController.getBooingById);

export const bookingRouter = router;
