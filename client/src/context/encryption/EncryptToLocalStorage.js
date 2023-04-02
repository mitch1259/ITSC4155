import { AES, enc } from 'crypto-js';

const EncryptToLocalStorage = (key, value) => {
    console.log("value: ", value);
    console.log("typeof value: ", typeof value);
    const encryptedValue = AES.encrypt(value + "", "abc");
    localStorage.setItem(key, encryptedValue);
}

export default EncryptToLocalStorage;