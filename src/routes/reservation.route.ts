import { Router } from "express";

import { checkJWT } from "@/middlewares";


const router = Router();

// create a reservation
router.post('/', checkJWT);



export { router };