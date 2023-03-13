//Шифрование данных - crypto
const crypto = require('crypto');

// Записать данные и зашифровать
// const originalData = 'Батрак Антон Олександрович';
// const encrypted = myCrypto.encrypt(originalData);
// console.log(encrypted.encryptedData);
// console.log(encrypted.iv);
// console.log(encrypted.secretKeys);

// Расшифровать данные и вывести
// const decrypted = myCrypto.decrypt(encrypted.encryptedData, encrypted.iv, Buffer.from(encrypted.secretKeys, 'hex'));
// console.log(decrypted);

// const data = {
//     'original': originalData,
//     'encrypted': encrypted.encryptedData,
//     'iv': encrypted.iv, //IV - это случайная последовательность байтов, которая добавляется к данным перед шифрованием.
//     'secretKeys': encrypted.secretKeys, //secretKey - это секретный ключ, используемый для шифрования данных.
//     'decrypted': decrypted
// };
// const jsonData = JSON.stringify(data);

// Ключ и вектор инициализации для алгоритма AES-256-CBC
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        secretKeys: secretKey.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}

function decrypt(encryptedData, iv, secretKeys) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeys, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};
