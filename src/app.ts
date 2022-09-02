import cors from 'cors';
import express from 'express';

import { env } from "@/config";

const PORT = env.getEnvironmentVariable('PORT');

const app = express();
app.use(cors());

app.use(express.json());

app.listen(PORT, () => console.log(`Corriendo en puerto ${PORT}`));