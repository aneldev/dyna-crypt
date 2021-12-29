export interface IDecryptResult {
    valid: boolean;
    data: any | null;
    result: EDecryptionResult;
}
export declare enum EDecryptionResult {
    SUCCESS = "SUCCESS",
    INVALID_KEY = "INVALID_KEY",
    EXPIRED = "EXPIRED"
}
export declare function encrypt(obj: any, key?: string): string;
export declare function decrypt(cipherText: string, key?: string): any;
export declare function encryptWithExpire(data: any, key: string, expireInMinutes: number): string;
export declare function decryptWithExpire(cipher: string, key: string): any | null;
export declare function decryptWithExpireDetails(cipher: string, key: string): IDecryptResult;
