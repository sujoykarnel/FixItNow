import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get('/', technicianController.getAllTechnicians)
router.get('/:id', technicianController.getSingleTechnician)
router.patch('/profile', auth(Role.TECHNICIAN), technicianController.updateTechnicianProfile)

export const technicianRouter = router