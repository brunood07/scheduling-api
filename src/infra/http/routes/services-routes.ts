import { Router } from "express";
import { CreateServiceController } from "../controllers/services/create-service-controller";
import { DeleteServiceController } from "../controllers/services/delete-service-controller";
import { GetServiceInfoController } from "../controllers/services/get-service-info-controller";
import { ListServicesController } from "../controllers/services/list-services-controller";
import { UpdateServiceController } from "../controllers/services/update-service-controller";
import { ClientRoles } from "../../../domain/clients/enterprise/enums/ClientRoles";
import { VerifyUserRole } from "../middlewares/verify-user-role";

const serviceRoutes = Router();

const verifyUserRoleMiddleware = new VerifyUserRole().ofRoles([ClientRoles.ADMIN, ClientRoles.CLIENT, ClientRoles.EMPLOYEE]);
const verifyUserAdmin = new VerifyUserRole().ofRoles([ClientRoles.ADMIN]);

const createServiceController = new CreateServiceController();
const deleteServiceController = new DeleteServiceController();
const getServiceInfoController = new GetServiceInfoController();
const listServicesController = new ListServicesController();
const updateServiceController = new UpdateServiceController();

serviceRoutes.post("/", verifyUserAdmin.authorize, createServiceController.handle);
serviceRoutes.delete("/:id", verifyUserAdmin.authorize, deleteServiceController.handle);
serviceRoutes.get("/:id", verifyUserRoleMiddleware.authorize, getServiceInfoController.handle);
serviceRoutes.get("/", verifyUserRoleMiddleware.authorize, listServicesController.handle);
serviceRoutes.put("/", verifyUserAdmin.authorize, updateServiceController.handle);

export { serviceRoutes };