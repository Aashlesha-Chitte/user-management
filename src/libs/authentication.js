import { verifyToken } from '../libs/utils.js';

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.json({ message: 'Missing or Invalid token', status: 401 });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.json({ message: 'Token verification failed', status: 401 });
    }
};

