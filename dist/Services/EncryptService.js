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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptService = void 0;
var CryptoJS = __importStar(require("crypto-js"));
//import { Timestamp } from "bson";
var EncryptService = /** @class */ (function () {
    function EncryptService() {
        // Declare this key and iv values in declaration
        this.key = CryptoJS.enc.Utf8.parse('4512631236589784');
        this.iv = CryptoJS.enc.Utf8.parse('4512631236589784');
    }
    // Methods for the encrypt and decrypt Using AES
    EncryptService.prototype.encryptUsingAES256 = function (str) {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        console.log('Encrypted :' + encrypted);
        this.decryptUsingAES256(encrypted);
        return encrypted;
    };
    EncryptService.prototype.decryptUsingAES256 = function (decString) {
        var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        //console.log('Decrypted : ' + decrypted);
        //console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
        return decrypted;
    };
    return EncryptService;
}());
exports.EncryptService = EncryptService;
