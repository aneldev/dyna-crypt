(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("crypto-js"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-crypt", ["crypto-js"], factory);
	else if(typeof exports === 'object')
		exports["dyna-crypt"] = factory(require("crypto-js"));
	else
		root["dyna-crypt"] = factory(root["crypto-js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Crypto = __webpack_require__(1);
function encrypt(obj, key) {
    if (key === void 0) { key = '0'; }
    return Crypto.AES.encrypt(JSON.stringify(obj), key).toString();
}
exports.encrypt = encrypt;
function decrypt(cipherText, key) {
    if (key === void 0) { key = '0'; }
    try {
        return JSON.parse(Crypto.AES.decrypt(cipherText, key).toString(Crypto.enc.Utf8));
    }
    catch (err) {
        return undefined;
    }
}
exports.decrypt = decrypt;
function encryptEx(data, key, expireInMinutes) {
    var lockPacket = {
        d: data,
        e: expireInMinutes === undefined ? null : Number(new Date()) + (expireInMinutes * 1000 * 60)
    };
    return encrypt(lockPacket, key);
}
exports.encryptEx = encryptEx;
function decryptEx(cipher, key) {
    var result = decryptExInfo(cipher, key);
    return !result.error && result.data;
}
exports.decryptEx = decryptEx;
function decryptExInfo(cipher, key) {
    var lockPacket;
    lockPacket = decrypt(cipher, key);
    if (!lockPacket) {
        return {
            error: {
                code: '#900',
                message: 'Wrong key',
            }
        };
    }
    if (lockPacket.e !== null) {
        var expireDate = new Date(lockPacket.e);
        if (expireDate < new Date()) {
            return {
                error: {
                    code: '#905',
                    message: 'Is expired',
                    expiredData: lockPacket.d,
                }
            };
        }
    }
    return {
        data: lockPacket.d,
    };
}
exports.decryptExInfo = decryptExInfo;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("crypto-js");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});