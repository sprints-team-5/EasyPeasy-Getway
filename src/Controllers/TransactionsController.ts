import { Request, Response } from "express";
import { TransactionService } from "../Services/TransactionService";

const transactionService = new TransactionService();

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function AllTransaction(req: Request, res: Response) {
  res.json({ transactions: await transactionService.all() });
}

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export async function CreateTransaction(req: Request, res: Response) {
  try {
    let merchant_id = req.body.merchant_id;
    let customerCardHolderName = req.body.customerCardHolderName;
    let customerCardNumber = req.body.customerCardNumber;
    let customerExpireDate = req.body.customerExpireDate;
    let customerCVV = req.body.customerCVV;
    let billAmount = req.body.billAmount;
    let trxFees = req.body.trxFees;
    let trxType = req.body.trxType;
    let date = req.body.date;

    console.log(customerCVV);
    let transaction = await transactionService.create({
      merchant_id,
      customerCardHolderName,
      customerCardNumber,
      customerExpireDate,
      customerCVV,
      billAmount,
      trxFees,
      trxType,
      date,
    });
    return res.send({ transaction: transaction });
  } catch (e: any) {
    return res.status(404).send({ message: e.message });
  }
}
