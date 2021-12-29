import {EDecryptionResult} from "./../../src";

declare let describe: any, expect: any, it: any;
import {
  encryptWithExpire,
  decryptWithExpire,
  decryptWithExpireDetails,
  IDecryptResult,
} from "./../../src";

const objToEncrypt: any = {
  age: 32,
  name: 'Nancy',
};

describe('encrypt / decrypt with expiration', () => {
  it('should encode with no expiration', () => {
    const cipher = encryptWithExpire(objToEncrypt, 'collee', 1);
    const obj = decryptWithExpire(cipher, 'collee');
    expect(JSON.stringify(objToEncrypt)).toBe(JSON.stringify(obj));
  });

  it('should encode with expiration', () => {
    return new Promise<void>(resolve => {
      const cipher = encryptWithExpire(objToEncrypt, 'collee', 0);
      setTimeout(() => {
        const result: IDecryptResult = decryptWithExpireDetails(cipher, 'collee');
        expect(result.result).toBe(EDecryptionResult.EXPIRED);
        resolve();
      }, 100);
    });
  });

  it('should encode with expiration in 50 minutes', () => {
    return new Promise<void>(resolve => {
      const cipher = encryptWithExpire(objToEncrypt, 'collee', 50);
      setTimeout(() => {
        const result: IDecryptResult = decryptWithExpireDetails(cipher, 'colleeXXXX');
        expect(result.result).toBe(EDecryptionResult.INVALID_KEY);
        resolve();
      }, 100);
    });
  });
});
