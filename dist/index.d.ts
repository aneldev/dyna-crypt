export interface IDecryptResult {
    data?: any;
    error?: {
        code: string;
        message: string;
        err?: any;
        expiredData?: any;
    };
}
export declare function encrypt(obj: any, key?: string): string;
export declare function decrypt(cipherText: string, key?: string): any;
export declare function encryptEx(data: any, key: string, expireInMinutes?: number): string;
export declare function decryptEx(cipher: string, key: string): any;
export declare function decryptExInfo(cipher: string, key: string): IDecryptResult;
