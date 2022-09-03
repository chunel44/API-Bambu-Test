import { Router } from "express";

import { UserController } from "@/controller";


const router = Router();

// Get all users
router.get('/', UserController.getUsers);

// Get one user
router.get('/:id', UserController.getUser);

// Edit user
router.patch('/:id', UserController.updateUser);

// Delete
router.delete('/:id', UserController.deleteUser);

export { router };