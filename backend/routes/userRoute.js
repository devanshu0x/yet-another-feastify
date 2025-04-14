import express from "express";
import { addressList, loginUser, registerUser, saveAddress } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/addresslist",authMiddleware, addressList);
userRouter.post("/saveaddress",authMiddleware,saveAddress);

export default userRouter;
