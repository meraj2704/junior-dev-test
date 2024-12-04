import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/response";

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Proceed if validation succeeds
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        sendErrorResponse(res, "Validation failed", formattedErrors, 400);
        return;
      }

      next(error);
    }
  };

export default validate;
