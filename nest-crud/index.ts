import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';

import { AppModule } from 'src/module/app.module';

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
    /*
    const corsOptions = {
        origin: '',
        optionsSuccessStatus: 200,
        methods: 'POST',
    };
    app.enableCors(corsOptions);
    */
    await app.init();
};

export const api = functions.region('southamerica-east1').https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
