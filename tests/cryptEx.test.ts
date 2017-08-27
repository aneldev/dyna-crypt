declare let describe: any, expect: any, it: any;
import {encryptEx, decryptEx, decryptExInfo, IDecryptResult} from "./../src";

let objToEncrypt: any = {age: 32, name: 'Nancy'};

let cipher: string;
let obj:any;

describe('encrypt / decrypt with expiration', () => {
	it('should encode with no expiration', () => {
		cipher = encryptEx(objToEncrypt, 'collee');
		expect(!!cipher).toBe(true);
	});

	it('should decode with no expiration', () => {
		obj = decryptEx(cipher,'collee');
		expect(JSON.stringify(objToEncrypt)).toBe(JSON.stringify(obj));
	});

	it('should encode with expiration', () => {
		cipher = encryptEx(objToEncrypt, 'collee', 0);
		expect(!!cipher).toBe(true);
	});

	it('should decode with expiration but return error', (done: Function) => {
		setTimeout(()=>{
			let result:IDecryptResult = decryptExInfo(cipher,'collee');
			expect(result.error.code).toBe("#905");
			done();
		}, 100);
	});

	it('should encode with expiration', () => {
		cipher = encryptEx(objToEncrypt, 'collee', 50);
		expect(!!cipher).toBe(true);
	});

	it('should decode with expiration with wrong key should return error', (done: Function) => {
		setTimeout(()=>{
			let result:IDecryptResult = decryptExInfo(cipher,'colleeXXXX');
			expect(result.error.code).toBe("#900");
			done();
		}, 100);
	});

});
