import * as amqp from 'amqplib';
import { RABBITMQ_URL, EXCHANGE_NAME, QUEUE_NAME,BINDING_KEY } from '../config/dotenv.config';
import UserProfileService from './user-profile-service';

const userProfileService:UserProfileService=new UserProfileService();

export async function startUserEventsConsumer() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });

        const q = await channel.assertQueue(QUEUE_NAME, { durable: true });
        const bindingKey = BINDING_KEY;
        await channel.bindQueue(q.queue, EXCHANGE_NAME, bindingKey);

        console.log(`[*] Waiting for messages with key '${bindingKey}'. To exit press CTRL+C`);

        channel.consume(q.queue, async (msg) => {
            if (msg !== null) {
                try {
                    const message = JSON.parse(msg.content.toString());
                    console.log(" [x] Received %s", message.type);

                    if (message.type === 'UserSignedUp') {
                        const { userId, firstName, lastName, phone } = message.data;
                        await userProfileService.createOrUpdateUserProfile(userId,{firstName, lastName, phone});
                        console.log(`Profile created/updated for user ${userId}`);
                    }

                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing message:", error);
                    channel.ack(msg); // Acknowledge anyway to prevent requeue loop
                }
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Failed to start RabbitMQ consumer:', error);
    }
}

export default startUserEventsConsumer;