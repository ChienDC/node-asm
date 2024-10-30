const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const authorize = (requiredPermission) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.status(403).send('Không có quyền truy cập');

        try {
            const decoded = jwt.verify(token, secretKey);
            const userPermissions = decoded.roles.flatMap(role => role.permissions.map(perm => perm.name));

            if (userPermissions.includes(requiredPermission)) {
                next();
            } else {
                res.status(403).send('Không có quyền truy cập');
            }
        } catch (error) {
            console.error(error);
            res.status(403).send('Token không hợp lệ');
        }
    };
};

module.exports = authorize;
