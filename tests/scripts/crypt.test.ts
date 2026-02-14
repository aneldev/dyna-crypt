declare let describe: any, expect: any, it: any;
import {
  encrypt,
  decrypt,
} from "../../src";

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

  it('should encrypt text - non random', () => {
    const cipher = encrypt(textSample, undefined, {random: false});
    const text = decrypt(cipher);
    expect(text).toBe(textSample);
  });

  it('should encrypt long text & key', () => {
    const textSample = "TTT_textSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSample";
    const key = "KKK_textSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSample";
    const cipher = encrypt(textSample, key, {random: true});
    const text = decrypt(cipher, key);
    expect(text).toBe(textSample);
  });

  it('should encrypt long text & key - non random', () => {
    const textSample = "TTT_textSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSample";
    const key = "KKK_textSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSampletextSample";
    const cipher = encrypt(textSample, key, {random: true});
    const text = decrypt(cipher, key);
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

  it('should encrypt number -12.34 - non random', () => {
    const cipher = encrypt(-12.34, undefined, {random: false});
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

  it('should encrypt object - non random', () => {
    const cipher = encrypt(objectSample, undefined, {random: false});
    const obj = decrypt(cipher);
    expect(obj).toEqual(objectSample);
    expect(obj.textSample).toBe(objectSample.textSample);
    expect(obj.age).toBe(objectSample.age);
  });

  it('should encrypt random', () => {
    const c1 = encrypt(objectSample, '0');
    const c2 = encrypt(objectSample, '0');
    expect(c1).not.toBe(c2);
  });

  it('should encrypt non random', () => {
    const c1 = encrypt(objectSample, '0', {random: false});
    const c2 = encrypt(objectSample, '0', {random: false});
    expect(c1).toBe(c2);
  });

  it('should decrypt non random', () => {
    const cipher = encrypt(objectSample, '0', {random: false});
    const data = decrypt(cipher);
    expect(data.textSample).toBe(objectSample.textSample);
  });
});
