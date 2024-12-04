import { Request, Response } from "express";
import { BillService } from "./billing.service";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

const newBill = async (req: Request, res: Response) => {
  const {
    firstName,
    companyName,
    streetAddress,
    apartment,
    townOrCity,
    phoneNumber,
    email,
    totalPrice,
    products
  } = req.body;
  try {
    const data = {
      firstName,
      companyName,
      streetAddress,
      apartment,
      townOrCity,
      phoneNumber,
      email,
      totalPrice,
      products
    };
    const newBill = await BillService.newBill(data);
    if (newBill) {
      sendSuccessResponse(res, newBill, "Bill created successfully", 201);
      return;
    }
    sendErrorResponse(res, "An error occurred while creating bill", [], 500);
    return;
  } catch (err: any) {
    console.error("Error creating new bill : ", err);
    sendErrorResponse(res, "An error occurred while creating bill", [], 500);
    return;
  }
};

const allBill = async (req: Request, res: Response) => {
    try {
      const bills = await BillService.allBill();
      sendSuccessResponse(res, bills, "All bills retrieved successfully", 200);
      return;
    } catch (err: any) {
      console.error("Error retrieving all bills : ", err);
      sendErrorResponse(res, "An error occurred while retrieving all bills", [], 500);
      return;
    }
  };


export const BillController = { newBill , allBill};
