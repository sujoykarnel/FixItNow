import { Router } from "express";
import { categoryContoller } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.ADMIN), categoryContoller.createCategory);
router.get(
  "/",
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  categoryContoller.getAllCategories,
);

export const categoryRouter = router;
