import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { categoryContoller } from "../category/category.controller";

const router = Router();

router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);
router.get("/users/:id", auth(Role.ADMIN), adminController.getSingleUser);
router.patch("/users/:id", auth(Role.ADMIN), adminController.updateUserStatus);
router.get("/bookings", auth(Role.ADMIN), adminController.getAllBookings);
router.post("/categories", auth(Role.ADMIN), adminController.createCategory);
router.get("/categories", auth(Role.ADMIN), categoryContoller.getAllCategories);

export const adminRouter = router;
