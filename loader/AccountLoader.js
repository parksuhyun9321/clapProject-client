import TOKEN from "../js/token"

async function AccountLoader(){
    const verify = await TOKEN.verify();  

    return verify["resultCode"] === 200
}

export default AccountLoader