import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        console.log(result);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: error.message,
        });
    }
};
export const authController = {
    loginUser,
};
//# sourceMappingURL=auth.controller.js.map