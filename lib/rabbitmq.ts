import amqp from "amqplib";
// import { config } from 'dotenv';
import { sendMail } from './mailer';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';
let channel: amqp.Channel, connection: amqp.Connection;

const connectToQueue = async (queue: string) => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }

    await channel.assertQueue(queue, {
        durable: true,
    });
}

export const sendMessage = async (queue: string, message: any) => {

    await connectToQueue(queue);

    message = JSON.stringify(message);
    channel.sendToQueue(queue, Buffer.from(message), {
        persistent: true,
    });

    console.log(`Sent message: ${message}`);

    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
};

export const consumeMessage = async (queue: string) => {

    if (queue === '') {
        return;
    }

    await connectToQueue(queue);

    try {
        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Received message: ${msg.content.toString()}`);
                const message = JSON.parse(msg.content.toString());
                sendMail('User request limit reached', `User: ${message.userId}, limit: ${message.limit}`)
                    .then(() => channel.ack(msg))
                    .catch(console.error)
                ;
            }
        });
    } catch (error) {
        console.error("Error occurred while consuming message:", error);
    }
};
