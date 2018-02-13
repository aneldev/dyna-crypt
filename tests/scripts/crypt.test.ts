declare let describe: any, expect: any, it: any;
import {encrypt, decrypt} from "./../../src";

let textSample: string = 'something... strange... 把百度设为主页关于百度';
let objectSample: any = {textSample, age: 32};
let cipher: string;

describe('encrypt / decrypt with expiration', () => {

	it('should encrypt the null value', () => {
		cipher=encrypt(null);
		expect(cipher).not.toBe(undefined);
	});

	it('should decrypt the null value', () => {
		let output=decrypt(cipher);
		expect(output).toBe(null);
	});

	it('should encrypt text', () => {
		cipher=encrypt(textSample);
		expect(cipher).not.toBe(undefined);
	});

	it('should decrypt text', () => {
		let text=decrypt(cipher);
		expect(text).toBe(textSample);
	});

	it('should encrypt number 0', () => {
		cipher=encrypt(0);
		expect(cipher).not.toBe(undefined);
	});

	it('should decrypt number 0', () => {
		let text=decrypt(cipher);
		expect(text).toBe(0);
	});

	it('should encrypt number -12.34', () => {
		cipher=encrypt(-12.34);
		expect(cipher).not.toBe(undefined);
	});

	it('should decrypt number -12.34', () => {
		let text=decrypt(cipher);
		expect(text).toBe(-12.34);
	});

	it('should encrypt object', () => {
		cipher=encrypt(objectSample);
		expect(cipher).not.toBe(undefined);
	});

	it('should decrypt object', () => {
		let obj=decrypt(cipher);
		expect(obj.textSample).toBe(objectSample.textSample);
		expect(obj.age).toBe(objectSample.age);
	});
});
