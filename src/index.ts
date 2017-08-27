import * as Crypto from "crypto-js"

interface ILockPacket {
  d: any;
  e: number;
}

export interface IDecryptResult {
  data?: any,
  error?: {
    code: string,
    message: string,
    err?: any,
    expiredData?: any,
  }
}

export function encrypt(obj: any, key: string = '0'): string {
  return Crypto.AES.encrypt(JSON.stringify(obj), key).toString();
}

export function decrypt(cipherText: string, key: string = '0'): any {
  try {
    return JSON.parse(Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8));
  } catch (err) {
    return undefined;
  }
}

export function encryptEx(data: any, key: string, expireInMinutes?: number): string {
  let lockPacket: ILockPacket = {
    d: data,
    e: expireInMinutes === undefined ? null : Number(new Date()) + (expireInMinutes * 1000 * 60)
  };
  return encrypt(lockPacket, key);
}

export function decryptEx(cipher: string, key: string): any {
  let result: IDecryptResult = decryptExInfo(cipher, key);
  return !result.error && result.data;
}

export function decryptExInfo(cipher: string, key: string): IDecryptResult {
  let lockPacket: ILockPacket;

  lockPacket = decrypt(cipher, key) as ILockPacket;
  if (!lockPacket){
    return {
      error: {
        code: '#900',
        message: 'Wrong key',
      }
    }
  }

  if (lockPacket.e !== null) {
    let expireDate: Date = new Date(lockPacket.e);
    if (expireDate < new Date()) {
      return {
        error: {
          code: '#905',
          message: 'Is expired',
          expiredData: lockPacket.d,
        }
      }
    }
  }

  return {
    data: lockPacket.d,
  }

}
