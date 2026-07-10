import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get('/', technicianController.getAllTechnicians)
router.get('/bookings', auth(Role.TECHNICIAN), technicianController.getTechnicianBookings)
router.get('/:id', technicianController.getSingleTechnician)
router.patch('/profile', auth(Role.TECHNICIAN), technicianController.updateTechnicianProfile)
router.patch('/bookings/:id', auth(Role.TECHNICIAN), technicianController.updateTechnicianBookingById)

export const technicianRouter = router