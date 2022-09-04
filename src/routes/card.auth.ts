import { Router } from "express";

import { checkJWT } from "@/middlewares";


const router = Router();

// create a credit Card
router.post('/', checkJWT);



export { router };