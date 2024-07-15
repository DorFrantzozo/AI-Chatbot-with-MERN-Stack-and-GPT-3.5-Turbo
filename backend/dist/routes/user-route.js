import { Router } from "express";
import { getAllUsers, userLogin, userLogOut, userSignup, verifyUser, } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate, } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogOut);
export default userRoutes;
//# sourceMappingURL=user-route.js.map