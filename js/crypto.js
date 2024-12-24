import { AES, enc } from "crypto-js"

/**
 * 객체로 된 데이터를 암호화 함
 * @param {string} 암호화 할 문자열 데이터 
 * @returns 
 */
function dataEncrypt(str){
    const data = AES.encrypt(JSON.stringify(str), process.env.REACT_APP_SECRET_KEY);

    const result = data.toString();

    return result
}


/**
 * 암호화된 문자열을 복호화 함
 * @param {string} encryptStr 암호화된 문자열
 */
function dataDecrypt(encryptStr){

    const decrypt = AES.decrypt(encryptStr, process.env.REACT_APP_SECRET_KEY);
        
    const result = JSON.parse(decrypt.toString(enc.Utf8));

    return result;
    
}

export { dataEncrypt, dataDecrypt }