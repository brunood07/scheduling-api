import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { schedulingRoutes } from "./schedulings-routes";
import { serviceRoutes } from "./services-routes";
import { healthCheckRoutes } from "./health-check-routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/schedulings", schedulingRoutes);
router.use("/services", serviceRoutes);
router.use("/health", healthCheckRoutes);

export { router };