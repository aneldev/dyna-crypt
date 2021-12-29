"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptWithExpireDetails = exports.decryptWithExpire = exports.encryptWithExpire = exports.decrypt = exports.encrypt = exports.EDecryptionResult = void 0;
var Crypto = require("crypto-js");
var EDecryptionResult;
(function (EDecryptionResult) {
    EDecryptionResult["SUCCESS"] = "SUCCESS";
    EDecryptionResult["INVALID_KEY"] = "INVALID_KEY";
    EDecryptionResult["EXPIRED"] = "EXPIRED";
})(EDecryptionResult = exports.EDecryptionResult || (exports.EDecryptionResult = {}));
function encrypt(obj, key) {
    if (key === void 0) { key = '0'; }
    return Crypto.AES.encrypt(JSON.stringify(obj), key).toString();
}
exports.encrypt = encrypt;
function decrypt(cipherText, key) {
    if (key === void 0) { key = '0'; }
    try {
        return JSON.parse(Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8));
    }
    catch (err) {
        return undefined;
    }
}
exports.decrypt = decrypt;
function encryptWithExpire(data, key, expireInMinutes) {
    var lockPacket = {
        data: data,
        expiresAt: Number(new Date()) + (expireInMinutes * 1000 * 60),
    };
    return encrypt(lockPacket, key);
}
exports.encryptWithExpire = encryptWithExpire;
function decryptWithExpire(cipher, key) {
    var result = decryptWithExpireDetails(cipher, key);
    return result.data;
}
exports.decryptWithExpire = decryptWithExpire;
function decryptWithExpireDetails(cipher, key) {
    var lockPacket = decrypt(cipher, key);
    if (!lockPacket) {
        return {
            valid: false,
            data: null,
            result: EDecryptionResult.INVALID_KEY,
        };
    }
    if (lockPacket.expiresAt !== null) {
        var expireDate = new Date(lockPacket.expiresAt);
        if (expireDate < new Date()) {
            return {
                valid: false,
                data: null,
                result: EDecryptionResult.EXPIRED,
            };
        }
    }
    return {
        valid: true,
        data: lockPacket.data,
        result: EDecryptionResult.SUCCESS,
    };
}
exports.decryptWithExpireDetails = decryptWithExpireDetails;
//# sourceMappingURL=index.js.map