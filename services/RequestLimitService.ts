import { User } from '../models/User'
import AppDataSource from '../config/dataSource'
import { sendMessage } from '../lib/rabbitmq'

const userRepository = AppDataSource.getRepository(User);

export class RequestLimitService {

    async checkLimit(userId: number): Promise<boolean> {
        const user = await userRepository.findOneBy({id: userId});
        if (user === null) {
            console.log(`[RequestLimitService::checkLimit] User #${userId} not found`);
            return false;
        }
        user.requestLimit = (user.requestLimit ?? 0) + 1;
        userRepository.save(user);

        if (user.requestLimit < Number(process.env.USER_REQUEST_LIMIT || 100)) {
            return true;
        }

        console.log(`[RequestLimitService::checkLimit] User #${userId} has reached request limit`);
        sendMessage(process.env.RABBITMQ_QUEUE_NAME ?? '', {userId: user.id, limit: user.requestLimit});
        return false;
    }
}
