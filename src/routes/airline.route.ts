import { Router } from "express";

import { checkJWT } from "@/middlewares";


const router = Router();

router.post('/', checkJWT);



export { router };