import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/checkout/:bookingId",
  auth(Role.CUSTOMER, Role.ADMIN, Role.TECHNICIAN),
  paymentController.createCheckoutSession,
);

router.post("/webhook", paymentController.handleWebhook);

export const paymentRouter = router;
