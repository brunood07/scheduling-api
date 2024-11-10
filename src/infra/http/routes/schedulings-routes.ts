import { Router } from "express";
import { CreateSchedulingController } from "../controllers/schedulings/create-scheduling-controller";
import { DeleteSchedulingController } from "../controllers/schedulings/delete-scheduling-controller";
import { GetSchedulingInfoController } from "../controllers/schedulings/get-scheduling-info-controller";
import { ListSchedulingsController } from "../controllers/schedulings/list-schedulings-controller";
import { UpdateSchedulingController } from "../controllers/schedulings/update-scheduling-controller";
import { ClientRoles } from "../../../domain/clients/enterprise/enums/ClientRoles";
import { VerifyUserRole } from "../middlewares/verify-user-role";

const schedulingRoutes = Router();

const verifyUserRoleMiddleware = new VerifyUserRole().ofRoles([ClientRoles.ADMIN, ClientRoles.CLIENT, ClientRoles.EMPLOYEE]);

const createScheduling = new CreateSchedulingController();
const deleteScheduling = new DeleteSchedulingController();
const getSchedulingInfo = new GetSchedulingInfoController();
const listSchedulings = new ListSchedulingsController();
const updateScheduling = new UpdateSchedulingController();

schedulingRoutes.post("/", verifyUserRoleMiddleware.authorize, createScheduling.handle);
schedulingRoutes.delete("/:id", verifyUserRoleMiddleware.authorize, deleteScheduling.handle);
schedulingRoutes.get("/:id", verifyUserRoleMiddleware.authorize, getSchedulingInfo.handle);
schedulingRoutes.get("/list", verifyUserRoleMiddleware.authorize, listSchedulings.handle);
schedulingRoutes.put("/:id", verifyUserRoleMiddleware.authorize, updateScheduling.handle);

export { schedulingRoutes };