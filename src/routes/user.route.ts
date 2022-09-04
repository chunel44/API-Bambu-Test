import { Router } from "express";

import { UserController } from "@/controller";
import { checkJWT } from "@/middlewares";


const router = Router();

// Get all users
router.get('/', checkJWT, UserController.getUsers);

// Get one user
router.get('/:id', checkJWT, UserController.getUser);

// Edit user
router.put('/:id', checkJWT, UserController.updateUser);

// Delete
router.delete('/:id', checkJWT, UserController.deleteUser);

export { router };