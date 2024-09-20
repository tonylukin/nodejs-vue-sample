const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const AuthService = require('../services/AuthService').default;
const AppDataSource = require('../config/dataSource').default;
const userRepository = AppDataSource.getRepository(User);

const auth = {};
auth.generate = (options, callback) => {
    const expiresIn = process.env.JWT_TTL || '12h';
    const token = jwt.sign(
        {
            uid: options.uid,
            username: options.username
        },
        process.env.JWT_KEY,
        {
            expiresIn: expiresIn,
        }
    );
    return callback(null, {'token_expires_in': expiresIn, token: token });
};

auth.validate = (options, callback) => {
    jwt.verify(options.token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, decoded);
    });
};

const authenticate = (req, res, next) => {
    if (req.path === '/api/token') {
        if (!req.body.username) {
            return res.status(400).json({ 'error': 'no username provided' });
        }
        if (!req.body.password) {
            return res.status(400).json({ 'error': 'no password provided' });
        }
        const username = req.body.username;
        const pass = req.body.password;
        const authService = new AuthService();
        authService.authenticate(username, pass, function (err, user) {
            if (err) {
                console.log(`user api login failed: ${err}`);
                return res.status(400).json({ 'error': err });
            } else {

                if (!user) {
                    return res.status(400).json({ 'error': 'user not found' });
                }

                res.locals.user_id = user.id;

                let options = {
                    username: user.username,
                    uid: user.id,
                };
                auth.generate(options, (err, token) => {
                    if (err) {
                        console.log(`Error in creating the jwt: ${err}`);
                        return res.status(500).json({'error': 'internal server occurred.'});
                    }
                    return res.status(200).json(token);
                });
            }
        });
    } else {
        const headers = req.headers;
        if (headers['x-token'] === undefined) {
            return res.status(403).json({
                error: 'A token is missing. Required for accessing API.'
            });
        }
        auth.validate({ token: headers['x-token'] }, async (err, data) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: err.message
                });
            }

            const user = await userRepository.findOneBy({id: data.uid});
            if (user === null) {
                return res.status(401).json({
                    error: 'Something went wrong, please try again'
                });
            }

            res.locals.user_id = user.id;
            next();
        });
    }
};

module.exports = authenticate;
