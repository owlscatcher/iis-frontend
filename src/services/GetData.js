import ky from "ky";

export default async function GetData(route) {
    return await ky.get(route, { prefixUrl: 'http://localhost:3000' }).json();
}