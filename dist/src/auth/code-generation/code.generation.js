"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureRandomString = void 0;
const crypto = require("crypto");
function generateSecureRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);
    let code = '';
    for (let i = 0; i < randomBytes.length; i++) {
        const index = randomBytes[i] % characters.length;
        code += characters.charAt(index);
    }
    return code;
}
exports.generateSecureRandomString = generateSecureRandomString;
//# sourceMappingURL=code.generation.js.map