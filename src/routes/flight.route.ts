import { Router } from "express";

import { checkJWT } from "@/middlewares";


const router = Router();

// create a flight
router.post('/', checkJWT);



export { router };