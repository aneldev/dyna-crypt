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

### encryptEx(data: any, key: string, expireInMinutes?: number): string

Encrypts something with expiration in `expireInMinutes`. 
Technically the expired data can me decrypted but the bellow methods won't expose them.

`expireInMinutes` is optional, if not defined the data won't expire. 

### decryptEx(cipher: string, key: string): any

Decrypts an object. 

- If the `key` is wrong the output is `undefined`.
- If it is expired the output is `undefined`.

To get more info if the decryption failed (and got `undefined`) because of the wrong `key` or if it is expired, use the `decryptExInfo`.

### decryptExInfo(cipher: string, key: string): IDecryptResult

It works exactly as the `decryptEx` but returns an object with in `IDecryptResult` interface (see below) where gives more details on decryption.

# Interfaces

## interface IDecryptResult 
```
{
  data?: any,
  error?: {
    code: string,      // #900 for wrong key or #905 if it is expired
    message: string,
    err?: any,
    expiredData?: any, // the expired data are ere
  }
}
```
