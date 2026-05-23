import express from "express";
import sendResponse from "./utility/sendResponse";
import { userRoute } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { issueRouter } from "./modules/issue/issue.route";
import auth from "./middleware/auth";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "DevPulse is running",
    });
});
app.use("/api/auth", userRoute);
app.use("/api/auth", authRouter);
app.use("/api", issueRouter);
export default app;
//# sourceMappingURL=app.js.map