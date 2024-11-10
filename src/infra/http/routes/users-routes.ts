import { Router } from "express";
import { CreateClientController } from "../controllers/users/create-client-controller";
import { AuthenticateUserController } from "../controllers/users/authenticate-user-controller";
import { DeleteUserController } from "../controllers/users/delete-user-controller";
import { GetUserInfoController } from "../controllers/users/get-user-info-controller";
import { ListUsersController } from "../controllers/users/list-users-controller";
import { UpdateUserInfoController } from "../controllers/users/update-user-info-controller";
import { VerifyUserRole } from "../middlewares/verify-user-role";
import { ClientRoles } from "../../../domain/clients/enterprise/enums/ClientRoles";

const usersRoutes = Router();

const verifyUserRoleMiddleware = new VerifyUserRole().ofRoles([ClientRoles.ADMIN, ClientRoles.CLIENT, ClientRoles.EMPLOYEE]);
const verifyUserAdmin = new VerifyUserRole().ofRoles([ClientRoles.ADMIN]);

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateClientController();
const deleteUserController = new DeleteUserController();
const getUserInfoController = new GetUserInfoController();
const listUsersController = new ListUsersController();
const updateUserInfoController = new UpdateUserInfoController();

usersRoutes.post("/session", authenticateUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.delete("/:id", verifyUserAdmin.authorize, deleteUserController.handle);
usersRoutes.get("/", verifyUserRoleMiddleware.authorize, getUserInfoController.handle);
usersRoutes.get("/list", verifyUserRoleMiddleware.authorize, listUsersController.handle);
usersRoutes.put("/", verifyUserRoleMiddleware.authorize, updateUserInfoController.handle);

export { usersRoutes };