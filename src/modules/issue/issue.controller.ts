import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import sendResponse from "../../utility/sendResponse";

// create Issue
const postIssue = async (req: Request, res: Response) => {
  try {
    console.log(req.user);
    const payload = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      id: req.user?.id,
    };
    const result = await issueService.postIssueIntoDB(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

// Get all issues
const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};

const getSingleIssues = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id as string);
    console.log(result);
    if (!result) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
        data: {},
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};

// Update a issue
const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params; //Issue id
  // const user = req.user ?? {};
  const userData = {
    role: req.user?.role,
    userId: req.user?.id,
  };

  try {
    const result = await issueService.updateIssueInDB(
      req.body,
      id as string,
      userData,
    );

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

// Delete a issue
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = req.user?.role;
  if (role != "maintainer") {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized Access",
    });
  }

  try {
    const result = await issueService.deleteIssueFromDB(id as string);
    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Issue not found!",
      });
    }
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};

export const issuesController = {
  postIssue,
  getAllIssues,
  getSingleIssues,
  deleteUser,
  updateIssue,
};
