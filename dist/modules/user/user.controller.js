import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";
const createUser = async (req, res) => {
    try {
        const result = await userService.createUserIntoDB(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};
export const userController = {
    createUser,
};
//# sourceMappingURL=user.controller.js.map