import { CapacitorHttp } from "@capacitor/core";
import { env } from "../env/client.mjs";

function post(url: string, data: unknown) {
  return CapacitorHttp.request({
    url: `${env.NEXT_PUBLIC_API_URL}${url}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
    method: "POST",
  });
}

export { post };
