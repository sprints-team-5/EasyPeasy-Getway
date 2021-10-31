"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransaction = exports.AllTransaction = void 0;
var TransactionService_1 = require("../Services/TransactionService");
var ServiceService_1 = require("../Services/ServiceService");
var transactionService = new TransactionService_1.TransactionService();
var Service = new ServiceService_1.ServiceService();
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
        var results, feesAmt, totAmt, merchant_id, customerCardHolderName, customerCardNumber, customerExpireDate, customerCVV, billAmount, trxFees, totAmount, trxType, date, serviceId, transaction, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Service.findById(req.body.serviceId)];
                case 1:
                    results = _a.sent();
                    if (!(results == null)) return [3 /*break*/, 2];
                    res.json({ message: "invalid service ID or merchant ID !!" });
                    return [3 /*break*/, 6];
                case 2:
                    feesAmt = Number.parseInt(results.feesAmount);
                    totAmt = Number.parseInt(req.body.billAmount) + feesAmt;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    merchant_id = req.body.merchant_id;
                    customerCardHolderName = req.body.customerCardHolderName;
                    customerCardNumber = req.body.customerCardNumber;
                    customerExpireDate = req.body.customerExpireDate;
                    customerCVV = req.body.customerCVV;
                    billAmount = req.body.billAmount;
                    trxFees = feesAmt;
                    totAmount = totAmt;
                    trxType = req.body.trxType;
                    date = req.body.date;
                    serviceId = req.body.serviceId;
                    return [4 /*yield*/, transactionService.create({
                            merchant_id: merchant_id,
                            customerCardHolderName: customerCardHolderName,
                            customerCardNumber: customerCardNumber,
                            customerExpireDate: customerExpireDate,
                            customerCVV: customerCVV,
                            billAmount: billAmount,
                            trxFees: trxFees,
                            totAmount: totAmount,
                            trxType: trxType,
                            date: date,
                            serviceId: serviceId
                        })];
                case 4:
                    transaction = _a.sent();
                    return [2 /*return*/, res.send({ transaction: transaction })];
                case 5:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(404).send({ message: e_1.message })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.CreateTransaction = CreateTransaction;
