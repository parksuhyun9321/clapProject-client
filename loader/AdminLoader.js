import TOKEN from "../js/token"

async function AdminLoader () {
    
    const verify = await TOKEN.verify();

    return verify
}

export default AdminLoader