import { Router } from "express";

import { AuthController } from "@/controller";


const router = Router();

// Login User
router.post('/login', AuthController.loginUser);

// Register User
router.post('/register', AuthController.registerUser);

// Verify User
router.get('/verify/:confirmationCode', AuthController.verifyUser);

// Check JWT
router.get('/checkJWT', AuthController.checkJWT);


export { router };