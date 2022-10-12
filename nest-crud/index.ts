/*
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
    await app.init();
};

export const api = functions.region('southamerica-east1').https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
*/
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {PubSub} = require("@google-cloud/pubsub");

const pubsub = new PubSub();
admin.initializeApp();
const database = admin.database();


exports.trigger = functions.https.onRequest((request, response) => {
    const messageBody = JSON.stringify({sendAt: Date.now()});
    const buffer = Buffer.from(messageBody);
    const fullTopicName = "totvs-integration/test";

    return pubsub
        .topic(fullTopicName)
        .publish(buffer)
        .then((messageId) => {
            console.log(`Message ${messageId} published to topic ${fullTopicName}`);
            response.send(JSON.stringify({messageId}));
        })
        .catch((error) => {
            console.error(`unable to publish to topic ${fullTopicName}`);
        });
});

exports.run = functions.pubsub.topic("test")
    .onPublish((message) => {
        const {sentAt} = message.json;
        console.log(`triggered at ${new Date(sentAt).toString()}`);
        // Perform time-consuming task
        return new Promise((resolve) => {
            let progress = 0;
            const handler = setInterval(() => {
                progress += 1;
                database.ref("progress").set(progress);
                if (progress >= 100) {
                    clearInterval(handler);
                    resolve(1);
                }
            }, 500);
        });
    });
