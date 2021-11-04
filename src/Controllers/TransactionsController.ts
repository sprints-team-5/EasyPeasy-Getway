import e, { Request, response, Response } from "express";
import { TransactionService } from "../Services/TransactionService";
import { ServiceTypesService } from "../Services/ServiceTypesService";
import { MerchantService } from "../Services/MerchantService";
import { EncryptService } from "../Services/EncryptService";
import * as CryptoJS from "crypto-js";

import axios from "axios";

const transactionService = new TransactionService();
const Service  = new ServiceTypesService();
const Merchant = new MerchantService();
const Security = new EncryptService();

var MongoDB = require('mongoDB');


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
  let validService = true;
  let validMerchant = true;
  let authorized = false;
  var email;
  var pass;
  const serviceTypesRes:any = await Service.findByTypeId(req.body.serviceId);
  if(serviceTypesRes == null){   
      //res.json({message: "invalid service ID or merchant ID !!"});
     validService = false;
   } 
  const merchantIdRes:any = await Merchant.findByMerchantId(req.body.merchant_id);
  if(merchantIdRes == null){   
    validMerchant = false;
  }else{
    email = merchantIdRes.email;
    pass  = Security.decryptUsingAES256(merchantIdRes.password).toString(CryptoJS.enc.Utf8);
    console.log("Password: ",pass);
  }
  if(email ==  req.headers.username && pass == req.headers.password){
    authorized = true;
  } 
  if(authorized)
  {
  if(validService && validMerchant){
    var feesAmt = Number.parseInt(serviceTypesRes.feesAmount);
    var totAmt  = Number.parseInt(req.body.billAmount) + feesAmt;
    var merchantName = merchantIdRes.name;
    var transStatus  = false;
    //console.log(merchantIdRes);
    try {
      const transactionData = {
        'cardid': req.body.customerCardNumber,
        'ccv':req.body.customerCVV, 
        'amount':totAmt,
        'merchant':merchantName,
        'timestamp':'', 
        'Payment_gateway_ID':100
      };
      //console.log('data sent to bank aPI:' ,transactionData);
      const headers = {
        'Username': 'gateway100',
        'Password': 'Sprints'
      } 
      const url = 'https://sprintsbank.herokuapp.com/';
      axios.post(url, transactionData , {
         headers:headers
        })  
            .then(response =>  {
                res.send(response.data);
                transStatus = response.data.accepted;
                console.log('transaction status: ', transStatus);
            })
            .catch(function(error) {
                res.send({
                    status: '500',
                    message: error
                })
            });

      let merchant_id = req.body.merchant_id;
      let customerCardHolderName = req.body.customerCardHolderName;
      let customerCardNumber = req.body.customerCardNumber;
      let customerExpireDate = req.body.customerExpireDate;
      let customerCVV = req.body.customerCVV;
      let serviceId = req.body.serviceId;
      let billAmount = req.body.billAmount;
      let trxFees = feesAmt; 
      let totAmount = totAmt;
      let date = new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000));
      let trx_status = transStatus.toString();
        
      let transaction =  await transactionService.create({
        merchant_id,
        customerCardHolderName,
        customerCardNumber,
        customerExpireDate,
        customerCVV,
        serviceId,
        billAmount,
        trxFees,
        totAmount,
        date, 
        trx_status
       });
    } catch (e: any) {
      console.log(e);
      res.send(e)
    }   
  }
  else{
    let e = "either invalid  service or merchant";
    res.send({message:e});
  }
}else{
  let e = "Not authorized !!";
  res.send({message:e});
}
}
