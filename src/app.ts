import cors from 'cors';
import express from 'express';

import { router } from '@/routes';

import { env, myDataSource } from '@/config';

import { errorHandeler } from '@/exceptions';





const PORT = env.getEnvironmentVariable('PORT');

myDataSource.initialize()
    .then(() => {
        console.log(`DB has been initialized`);
    })
    .catch((err) => {
        console.error(`DB initialization error`, err);
    })

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

// if (!env.isProduction()) {
//     app.use(errorLogger);
// }
app.use(errorHandeler);




app.listen(PORT, () => console.log(`Corriendo en puerto ${PORT}`));