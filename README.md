# About

Encrypts and decrypts objects (or strings and numbers also) with AES with in very simple way.

The *Ex methods are checking also if the encrypted data are expired.

Writter in Typescript, runs in universal environments.

# Methods

## Crypt

### encrypt(obj: any, key: string = '0'): string

Encrypts something. It creates the `cipher` to be used for `decrypt`.

Throws a `JSON-stringify` exception if in case of object the object cannot be stringified.

### decrypt(cipherText: string, key: string = '0'): any

Decrypts something. 

Returns `undefined` if the key is wrong.

## Crypt with expiration

### encryptWithExpire(data: any, key: string, expireInMinutes?: number): string

Encrypts something with expiration in `expireInMinutes`. 
Technically the expired data can me decrypted but the bellow methods won't expose them.

`expireInMinutes` is optional, if not defined the data won't expire. 

### decryptWithExpire(cipher: string, key: string): any

Decrypts an object. 

- If the `key` is wrong the output is `undefined`.
- If it is expired the output is `undefined`.

To get more info if the decryption failed (and got `undefined`) because of the wrong `key` or if it is expired, use the `decryptWithExpireDetails`.

### decryptWithExpireDetails(cipher: string, key: string): IDecryptResult

It works exactly as the `decryptWithExpire` but returns an object with in `IDecryptResult` interface (see below) where gives more details on decryption.

# Interfaces

## interface IDecryptResult 
```
interface IDecryptResult {
  valid: boolean;
  data: any | null;
  result: EDecryptionResult;
}

enum EDecryptionResult {
  SUCCESS = "SUCCESS",
  INVALID_KEY = "INVALID_KEY",
  EXPIRED = "EXPIRED",
}
```
