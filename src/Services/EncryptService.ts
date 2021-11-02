import * as CryptoJS from "crypto-js";
//import { Timestamp } from "bson";


export class EncryptService {
  

  // Declare this key and iv values in declaration
  private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
  
  // Methods for the encrypt and decrypt Using AES
  encryptUsingAES256(str: any){
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      console.log('Encrypted :' + encrypted);
      this.decryptUsingAES256(encrypted);
      return encrypted;
  }
  
  decryptUsingAES256(decString: any) {
      var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      //console.log('Decrypted : ' + decrypted);
      //console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
      return decrypted;
  
  }
}
