import { Router } from "express";
import { categoryContoller } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/", categoryContoller.getAllCategories);

export const categoryRouter = router;
