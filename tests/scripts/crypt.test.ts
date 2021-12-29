declare let describe: any, expect: any, it: any;
import {
  encrypt,
  decrypt,
} from "./../../src";

const textSample: string = 'something... strange... 把百度设为主页关于百度';

const objectSample: any = {
  textSample,
  age: 32,
};

describe('encrypt / decrypt with expiration', () => {

  it('should encrypt text', () => {
    const cipher = encrypt(textSample);
    const text = decrypt(cipher);
    expect(text).toBe(textSample);
  });

  it('should encrypt number 0', () => {
    const cipher = encrypt(0);
    const text = decrypt(cipher);
    expect(text).toBe(0);
  });

  it('should encrypt number -12.34', () => {
    const cipher = encrypt(-12.34);
    const text = decrypt(cipher);
    expect(text).toBe(-12.34);
  });

  it('should encrypt object', () => {
    const cipher = encrypt(objectSample);
    const obj = decrypt(cipher);
    expect(obj).toEqual(objectSample);
    expect(obj.textSample).toBe(objectSample.textSample);
    expect(obj.age).toBe(objectSample.age);
  });
});
