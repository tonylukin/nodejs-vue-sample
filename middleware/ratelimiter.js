const { client: redisClient } = require('../lib/redis');

const limit = process.env.MAX_REQ_WINDOW || 5;

const rateLimiter = async (req, res, next) => {

    try {
        const key = `____rate_limiter_${req.ip}`;
        const requestCount = await redisClient.get(key);

        if (requestCount) {
            if (requestCount >= limit) {
                return res.status(429).json({message: 'Too many requests. Please try again later.'});
            }

            await redisClient.setEx(key, 1, String(Number(requestCount) + 1));
        } else {
            await redisClient.setEx(key, 1, '1');
        }

    } catch (err) {
        console.error('Rate limiter error:', err);
    }

    next();
};

module.exports = rateLimiter;
