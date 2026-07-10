import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/Auth/auth.route";
import { categoryRouter } from "./modules/category/category.route";
import { serviceRouter } from "./modules/service/service.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { technicianRouter } from "./modules/technician/technician.route";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRouter } from "./modules/payment/payment.route";
import { reviewRouter } from "./modules/review/review.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

const endpointSecret = config.stripe_webhook_secret;

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, FixItNow");
});

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/technicians", technicianRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);

// not found handler
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
