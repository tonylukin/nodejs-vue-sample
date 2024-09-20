import { config } from "dotenv";
config({
    path: ['.env.local', '.env']
});

import { consumeMessage } from '../../lib/rabbitmq'
consumeMessage(process.env.RABBITMQ_QUEUE_NAME ?? '')
