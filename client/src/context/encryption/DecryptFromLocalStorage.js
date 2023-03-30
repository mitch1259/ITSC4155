import { AES, enc } from 'crypto-js';

const DecryptFromLocalStorage = (key) => {
    console.log("key", key);
    var valueToDecrypt = localStorage.getItem(key);
    if(valueToDecrypt === null) {
        return null;
    }
    var decryptedBytes = AES.decrypt(valueToDecrypt, "abc");
    // console.log("decrypted bytes", decryptedBytes);
    const decryptedValue = decryptedBytes.toString(enc.Utf8);
    // console.log("deecrypted value", decryptedValue);
    return decryptedValue;
}

export default DecryptFromLocalStorage;