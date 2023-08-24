import * as crypto from 'crypto';
export function generateSecureRandomString(length: number): string {
    const characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);
    let code = '';
    for (let i = 0; i < randomBytes.length; i++) {
        const index = randomBytes[i] % characters.length;
        code += characters.charAt(index);
    }
    return code;
}