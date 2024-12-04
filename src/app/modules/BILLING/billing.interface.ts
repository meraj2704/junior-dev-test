import mongoose from "mongoose";

export interface BillI {
    firstName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    townOrCity: string;
    phoneNumber: string;
    email: string;
    totalPrice: number;
    products:[
        {
            _id:mongoose.Types.ObjectId,
            price:number,
            quantity:number,
        }
    ]
  }
  