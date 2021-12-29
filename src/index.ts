import * as Crypto from "crypto-js";

interface ILockPacket {
  data: any;
  expiresAt: number;
}

export interface IDecryptResult {
  valid: boolean;
  data: any | null;
  result: EDecryptionResult;
}

export enum EDecryptionResult {
  SUCCESS = "SUCCESS",
  INVALID_KEY = "INVALID_KEY",
  EXPIRED = "EXPIRED",
}

export function encrypt(obj: any, key: string = '0'): string {
  return Crypto.AES.encrypt(JSON.stringify(obj), key).toString();
}

export function decrypt(cipherText: string, key: string = '0'): any {
  try {
    return JSON.parse(Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8));
  }
  catch (err) {
    return undefined;
  }
}

export function encryptWithExpire(data: any, key: string, expireInMinutes: number): string {
  const lockPacket: ILockPacket = {
    data: data,
    expiresAt: Number(new Date()) + (expireInMinutes * 1000 * 60),
  };
  return encrypt(lockPacket, key);
}

export function decryptWithExpire(cipher: string, key: string): any | null {
  const result: IDecryptResult = decryptWithExpireDetails(cipher, key);
  return result.data;
}

export function decryptWithExpireDetails(cipher: string, key: string): IDecryptResult {
  const lockPacket = decrypt(cipher, key) as ILockPacket;
  if (!lockPacket) {
    return {
      valid: false,
      data: null,
      result: EDecryptionResult.INVALID_KEY,
    };
  }

  if (lockPacket.expiresAt !== null) {
    const expireDate: Date = new Date(lockPacket.expiresAt);
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
