"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransaction = exports.AllTransaction = void 0;
var TransactionService_1 = require("../Services/TransactionService");
var ServiceTypesService_1 = require("../Services/ServiceTypesService");
var MerchantService_1 = require("../Services/MerchantService");
var EncryptService_1 = require("../Services/EncryptService");
var CryptoJS = __importStar(require("crypto-js"));
var axios_1 = __importDefault(require("axios"));
var transactionService = new TransactionService_1.TransactionService();
var Service = new ServiceTypesService_1.ServiceTypesService();
var Merchant = new MerchantService_1.MerchantService();
var Security = new EncryptService_1.EncryptService();
var MongoDB = require('mongoDB');
/**
 *
 * @param req
 * @param res
 * @constructor
 */
function AllTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = res).json;
                    _c = {};
                    return [4 /*yield*/, transactionService.all()];
                case 1:
                    _b.apply(_a, [(_c.transactions = _d.sent(), _c)]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.AllTransaction = AllTransaction;
/**
 *
 * @param req
 * @param res
 * @constructor
 */
function CreateTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var validService, validMerchant, authorized, email, pass, serviceTypesRes, merchantIdRes, feesAmt, totAmt, merchantName, transStatus, transactionData, headers, url, merchant_id, customerCardHolderName, customerCardNumber, customerExpireDate, customerCVV, serviceId, billAmount, trxFees, totAmount, date, trx_status, transaction, e_1, e_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validService = true;
                    validMerchant = true;
                    authorized = false;
                    return [4 /*yield*/, Service.findByTypeId(req.body.serviceId)];
                case 1:
                    serviceTypesRes = _a.sent();
                    if (serviceTypesRes == null) {
                        //res.json({message: "invalid service ID or merchant ID !!"});
                        validService = false;
                    }
                    return [4 /*yield*/, Merchant.findByMerchantId(req.body.merchant_id)];
                case 2:
                    merchantIdRes = _a.sent();
                    if (merchantIdRes == null) {
                        validMerchant = false;
                    }
                    else {
                        email = merchantIdRes.email;
                        pass = Security.decryptUsingAES256(merchantIdRes.password).toString(CryptoJS.enc.Utf8);
                        console.log("Password: ", pass);
                    }
                    if (email == req.headers.username && pass == req.headers.password) {
                        authorized = true;
                    }
                    if (!authorized) return [3 /*break*/, 9];
                    if (!(validService && validMerchant)) return [3 /*break*/, 7];
                    feesAmt = Number.parseInt(serviceTypesRes.feesAmount);
                    totAmt = Number.parseInt(req.body.billAmount) + feesAmt;
                    merchantName = merchantIdRes.name;
                    transStatus = false;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    transactionData = {
                        'cardid': req.body.customerCardNumber,
                        'ccv': req.body.customerCVV,
                        'amount': totAmt,
                        'merchant': merchantName,
                        'timestamp': '',
                        'Payment_gateway_ID': 100
                    };
                    headers = {
                        'Username': 'gateway100',
                        'Password': 'Sprints'
                    };
                    url = 'https://sprintsbank.herokuapp.com/';
                    axios_1.default.post(url, transactionData, {
                        headers: headers
                    })
                        .then(function (response) {
                        res.send(response.data);
                        transStatus = response.data.accepted;
                        console.log('transaction status: ', transStatus);
                    })
                        .catch(function (error) {
                        res.send({
                            status: '500',
                            message: error
                        });
                    });
                    merchant_id = req.body.merchant_id;
                    customerCardHolderName = req.body.customerCardHolderName;
                    customerCardNumber = req.body.customerCardNumber;
                    customerExpireDate = req.body.customerExpireDate;
                    customerCVV = req.body.customerCVV;
                    serviceId = req.body.serviceId;
                    billAmount = req.body.billAmount;
                    trxFees = feesAmt;
                    totAmount = totAmt;
                    date = new MongoDB.Timestamp(0, Math.floor(new Date().getTime() / 1000));
                    trx_status = transStatus.toString();
                    return [4 /*yield*/, transactionService.create({
                            merchant_id: merchant_id,
                            customerCardHolderName: customerCardHolderName,
                            customerCardNumber: customerCardNumber,
                            customerExpireDate: customerExpireDate,
                            customerCVV: customerCVV,
                            serviceId: serviceId,
                            billAmount: billAmount,
                            trxFees: trxFees,
                            totAmount: totAmount,
                            date: date,
                            trx_status: trx_status
                        })];
                case 4:
                    transaction = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.send(e_1);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_2 = "either invalid  service or merchant";
                    res.send({ message: e_2 });
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_3 = "Not authorized !!";
                    res.send({ message: e_3 });
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.CreateTransaction = CreateTransaction;
