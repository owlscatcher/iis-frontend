import ky from "ky";

export default async function GetData(route) {
  const resp = await (
    await ky.get(route, { prefixUrl: process.env.REACT_APP_API_HOST })
  ).json();

  return resp;
}
