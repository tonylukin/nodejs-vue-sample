"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: ['.env.local', '.env']
});
const rabbitmq_1 = require("../../lib/rabbitmq");
(0, rabbitmq_1.consumeMessage)((_a = process.env.RABBITMQ_QUEUE_NAME) !== null && _a !== void 0 ? _a : '');
