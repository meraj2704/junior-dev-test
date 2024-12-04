import { BillI } from "./billing.interface";
import { BillModel } from "./billing.models";

const newBill = async (data: BillI) => {
    const bill = await BillModel.create(data);
    return bill;
};

const allBill = async () => {
    const bills = await BillModel.find().select("_id firstName companyName streetAddress apartment townOrCity phoneNumber email totalPrice products");
    return bills;
};
export const BillService = {
  newBill,
  allBill
};
