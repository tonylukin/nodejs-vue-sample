"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessage = exports.sendMessage = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
// import { config } from 'dotenv';
const mailer_1 = require("./mailer");
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';
let channel, connection;
const connectToQueue = (queue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection = yield amqplib_1.default.connect(RABBITMQ_URL);
        channel = yield connection.createChannel();
        console.log('Connected to RabbitMQ');
    }
    catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
    yield channel.assertQueue(queue, {
        durable: true,
    });
});
const sendMessage = (queue, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToQueue(queue);
    message = JSON.stringify(message);
    channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
    });
    console.log(`Sent message: ${message}`);
    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
});
exports.sendMessage = sendMessage;
const consumeMessage = (queue) => __awaiter(void 0, void 0, void 0, function* () {
    if (queue === '') {
        return;
    }
    yield connectToQueue(queue);
    try {
        console.log(`Waiting for messages in ${queue}`);
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Received message: ${msg.content.toString()}`);
                const message = JSON.parse(msg.content.toString());
                (0, mailer_1.sendMail)('User request limit reached', `User: ${message.userId}, limit: ${message.limit}`)
                    .then(() => channel.ack(msg))
                    .catch(console.error);
            }
        });
    }
    catch (error) {
        console.error("Error occurred while consuming message:", error);
    }
});
exports.consumeMessage = consumeMessage;
