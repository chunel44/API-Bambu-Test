import cors from 'cors';
import express, { Request, Response } from 'express';

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

app.use('*', (req: Request, res: Response) => {
    res.status(404);

    return res.json({ error: 'Not found' });
});


// if (!env.isProduction()) {
//     app.use(errorLogger);
// }
app.use(errorHandeler);




app.listen(PORT, () => console.log(`Corriendo en puerto ${PORT}`));