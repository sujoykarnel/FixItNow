import { Router } from "express";
import { technicianController } from "./technician.controller";

const router = Router();

router.get('/', technicianController.getAllTechnicians)

export const technicianRouter = router