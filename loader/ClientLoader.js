import KEY from "../js/key";

async function ClientLoader({ params }) {

    const { key } = params;
    const keyVerify = await KEY.check(key);

    return keyVerify
}

export default ClientLoader