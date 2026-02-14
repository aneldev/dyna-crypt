# dyna-crypt

Simple and powerful AES encryption/decryption for objects, strings, and numbers. Built with TypeScript, it runs in any JavaScript environment (Node.js, Browser, etc.).

Features built-in support for expiration, allowing you to create secure, time-limited data packets.

## Installation

```bash
npm install dyna-crypt
```
or
```bash
yarn add dyna-crypt
```

## Features

- **Simple API**: Encrypt and decrypt with a single function call.
- **Type Safe**: Written in TypeScript with full type definitions.
- **Expiration Support**: Built-in methods to handle data that expires.
- **Deterministic Encryption**: Optional non-random encryption for consistent output.

---

## Basic Usage

### Standard Encryption

```typescript
import { encrypt, decrypt } from 'dyna-crypt';

const data = { message: "Hello World", secret: 42 };
const key = "my-secure-key";

// Encrypt
const cipher = encrypt(data, key);

// Decrypt
const decryptedData = decrypt(cipher, key);
console.log(decryptedData.message); // "Hello World"
```

### Non-Random (Deterministic) Encryption

By default, encryption uses a random salt/IV, meaning the same input results in different cipher text each time. Use `{ random: false }` for consistent output.

```typescript
const cipher1 = encrypt(data, key, { random: false });
const cipher2 = encrypt(data, key, { random: false });

// cipher1 === cipher2
```

---

## Encryption with Expiration

Perfect for temporary tokens or time-limited access.

### Encrypt with Expiration

```typescript
import { encryptWithExpire, decryptWithExpire } from 'dyna-crypt';

const data = { userId: "123" };
const key = "my-key";
const expireInMinutes = 60;

const cipher = encryptWithExpire(data, key, expireInMinutes);

// Later...
const decrypted = decryptWithExpire(cipher, key);

if (decrypted) {
  console.log("Data is valid:", decrypted.userId);
} else {
  console.log("Expired or invalid key.");
}
```

### Detailed Expiration Info

Use `decryptWithExpireDetails` to distinguish between an invalid key and expired data.

```typescript
import { decryptWithExpireDetails, EDecryptionResult } from 'dyna-crypt';

const result = decryptWithExpireDetails(cipher, key);

if (result.valid) {
  console.log("Data:", result.data);
} else {
  if (result.result === EDecryptionResult.EXPIRED) {
    console.log("The data has expired.");
  } else if (result.result === EDecryptionResult.INVALID_KEY) {
    console.log("The key is incorrect.");
  }
}
```

---

## API Reference

### Methods

#### `encrypt(data: any, key: string = '0', options?: IEncryptOptions): string`
Encrypts any JSON-serializable data.
- **data**: The data to encrypt.
- **key**: Encryption key (default: '0').
- **options**: Configuration options (optional).

#### `decrypt(cipher: string, key: string = '0'): any`
Decrypts the cipher text. Returns `undefined` if the key is incorrect.

#### `encryptWithExpire(data: any, key: string, expireInMinutes: number, options?: IEncryptOptions): string`
Encrypts data with an expiration timestamp.

#### `decryptWithExpire(cipher: string, key: string): any | null`
Decrypts and checks expiration. Returns the data if valid, or `null` if expired or key is invalid.

#### `decryptWithExpireDetails(cipher: string, key: string): IDecryptResult`
Returns detailed information about the decryption process.

---

## Interfaces

### `IEncryptOptions`
```typescript
interface IEncryptOptions {
  random?: boolean; // Default is true. Set to false for deterministic output.
}
```

### `IDecryptResult`
```typescript
interface IDecryptResult {
  valid: boolean;       // True if successfully decrypted and not expired.
  data: any | null;     // The decrypted data.
  result: EDecryptionResult;
}
```

### `EDecryptionResult` (Enum)
- `SUCCESS`: Decryption successful.
- `INVALID_KEY`: Decryption failed (wrong key).
- `EXPIRED`: Decryption succeeded, but data has expired.

## License

MIT