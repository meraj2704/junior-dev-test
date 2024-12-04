import express from "express";
import upload from "../../config/multer.config";
import validate from "../../middlewares/validate";
import { BillSchema } from "./billing.schema";
import { BillController } from "./billing.controller";
const router = express.Router();

router.post(
  "/new-bill",
  validate(BillSchema),
  BillController.newBill
);

router.get('/all-bills',BillController.allBill)

export const BillRouter = router;
