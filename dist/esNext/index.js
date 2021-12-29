import * as Crypto from "crypto-js";
export var EDecryptionResult;
(function (EDecryptionResult) {
    EDecryptionResult["SUCCESS"] = "SUCCESS";
    EDecryptionResult["INVALID_KEY"] = "INVALID_KEY";
    EDecryptionResult["EXPIRED"] = "EXPIRED";
})(EDecryptionResult || (EDecryptionResult = {}));
export function encrypt(obj, key) {
    if (key === void 0) { key = '0'; }
    return Crypto.AES.encrypt(JSON.stringify(obj), key).toString();
}
export function decrypt(cipherText, key) {
    if (key === void 0) { key = '0'; }
    try {
        return JSON.parse(Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8));
    }
    catch (err) {
        return undefined;
    }
}
export function encryptWithExpire(data, key, expireInMinutes) {
    var lockPacket = {
        data: data,
        expiresAt: Number(new Date()) + (expireInMinutes * 1000 * 60),
    };
    return encrypt(lockPacket, key);
}
export function decryptWithExpire(cipher, key) {
    var result = decryptWithExpireDetails(cipher, key);
    return result.data;
}
export function decryptWithExpireDetails(cipher, key) {
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
//# sourceMappingURL=index.js.map