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

export interface IEncryptOptions {
  random?: boolean;
}

export function encrypt(
  obj: any,
  key: string = '0',
  {random = true}: IEncryptOptions = {},
): string {
  const data = JSON.stringify(obj);

  // Random (Default) - Uses a random salt and IV automatically
  if (random) return Crypto.AES.encrypt(data, key).toString();

  // Convert string key to a 16-byte WordArray (AES-128)
  const keyParsed = Crypto.enc.Utf8.parse(key.padEnd(16, '0').slice(0, 16));
  // Define a fixed IV (e.g., all zeros) to ensure the same output every time
  const iv = Crypto.enc.Utf8.parse('0000000000000000');

  return Crypto.AES.encrypt(data, keyParsed, {
    iv: iv,
    mode: Crypto.mode.CBC,
    padding: Crypto.pad.Pkcs7,
  }).toString();
}

export function decrypt(cipherText: string, key: string = '0'): any | undefined {
  // Try random decryption first (default)
  try {
    const decrypted = Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8);
    if (decrypted) return JSON.parse(decrypted);
  }
  catch (err) {
    // Fall through to try non-random decryption
  }

  // Try non-random decryption
  try {
    const keyParsed = Crypto.enc.Utf8.parse(key.padEnd(16, '0').slice(0, 16));
    const iv = Crypto.enc.Utf8.parse('0000000000000000');

    const decrypted = Crypto.AES.decrypt(cipherText, keyParsed, {
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

export function encryptWithExpire(data: any, key: string | undefined, expireInMinutes: number, encryptOptions?: IEncryptOptions): string {
  const lockPacket: ILockPacket = {
    data: data,
    expiresAt: Number(new Date()) + (expireInMinutes * 1000 * 60),
  };
  return encrypt(lockPacket, key, encryptOptions);
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
