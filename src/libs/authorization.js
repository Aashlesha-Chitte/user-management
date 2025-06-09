export const authorizeRole = (requiredRole) => (req, res, next) => {
    if (!req.user) return res.json({ message: 'Unauthorized', status: 401 });
    if (req.user.role !== requiredRole) {
        return res.json({ message: 'Forbidden Error', status: 403 });
    }
    next();
};
