import * as Crypto from "crypto-js";
export var EDecryptionResult;
(function (EDecryptionResult) {
    EDecryptionResult["SUCCESS"] = "SUCCESS";
    EDecryptionResult["INVALID_KEY"] = "INVALID_KEY";
    EDecryptionResult["EXPIRED"] = "EXPIRED";
})(EDecryptionResult || (EDecryptionResult = {}));
export function encrypt(obj, key, _a) {
    if (key === void 0) { key = '0'; }
    var _b = _a === void 0 ? {} : _a, _c = _b.random, random = _c === void 0 ? true : _c;
    var data = JSON.stringify(obj);
    // Random (Default) - Uses a random salt and IV automatically
    if (random)
        return Crypto.AES.encrypt(data, key).toString();
    // Convert string key to a 16-byte WordArray (AES-128)
    var keyParsed = Crypto.enc.Utf8.parse(key.padEnd(16, '0').slice(0, 16));
    // Define a fixed IV (e.g., all zeros) to ensure the same output every time
    var iv = Crypto.enc.Utf8.parse('0000000000000000');
    return Crypto.AES.encrypt(data, keyParsed, {
        iv: iv,
        mode: Crypto.mode.CBC,
        padding: Crypto.pad.Pkcs7,
    }).toString();
}
export function decrypt(cipherText, key) {
    if (key === void 0) { key = '0'; }
    // Try random decryption first (default)
    try {
        var decrypted = Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8);
        if (decrypted)
            return JSON.parse(decrypted);
    }
    catch (err) {
        // Fall through to try non-random decryption
    }
    // Try non-random decryption
    try {
        var keyParsed = Crypto.enc.Utf8.parse(key.padEnd(16, '0').slice(0, 16));
        var iv = Crypto.enc.Utf8.parse('0000000000000000');
        var decrypted = Crypto.AES.decrypt(cipherText, keyParsed, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.Pkcs7,
        }).toString(Crypto.enc.Utf8);
        return JSON.parse(decrypted);
    }
    catch (err) {
        return undefined;
    }
}
export function encryptWithExpire(data, key, expireInMinutes, encryptOptions) {
    var lockPacket = {
        data: data,
        expiresAt: Number(new Date()) + (expireInMinutes * 1000 * 60),
    };
    return encrypt(lockPacket, key, encryptOptions);
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