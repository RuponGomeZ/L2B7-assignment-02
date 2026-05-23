import sendResponse from "../utility/sendResponse";
import jwt, {} from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized Access",
                });
            }
            const decoded = jwt.verify(token, config.JWT_Secret);
            const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [decoded.email]);
            const user = userData.rows[0];
            if (userData.rows.length === 0) {
                return sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: "User not found!",
                });
            }
            if (roles.length && !roles.includes(user.role)) {
                return sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Role not found!",
                });
            }
            if (user.role != "contributor" && user.role != "maintainer") {
                return sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized Access",
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map