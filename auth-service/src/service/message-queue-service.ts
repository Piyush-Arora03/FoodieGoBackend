import * as amqp from 'amqplib';
import { RABBITMQ_URL, EXCHANGE_NAME } from '../config/dotenv.config';

class MessageQueueService {
    private channel: amqp.Channel | null = null;

    private async connect() {
        if (this.channel) return;
        try {
            const connection = await amqp.connect(RABBITMQ_URL);
            this.channel = await connection.createChannel();
            await this.channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
            console.log('Connected to RabbitMQ and exchange asserted');
        } catch (error) {
            console.error('Failed to connect to RabbitMQ:', error);
        }
    }

    async publish(bindingKey: string, messageData: any) {
        if (!this.channel) {
            await this.connect();
        }
        if (this.channel) {
            const message = JSON.stringify(messageData);
            this.channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message), { persistent: true });
            console.log(`[x] Sent message with key '${bindingKey}'`);
        }
    }
}
export default new MessageQueueService();