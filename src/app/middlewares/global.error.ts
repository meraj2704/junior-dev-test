import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/response";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error stack : ", err.stack);
  console.log("Error message :", err.message);
  console.log("Error name :", err.name);
  return sendErrorResponse(res, "Internal server error.", [], 500);
  // return sendResponse(res, 500, {
  //     success: false,
  //     message: 'Internal server error'
  // })
};
export default errorHandler;
