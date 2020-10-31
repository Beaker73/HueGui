import { getHueApi } from ".";
import { Bridge } from "../Models/Store";

describe("api integration test", () => {

    const bridge: Bridge = {
        "id": "ECB5FAFFFE2E2F0C",
        "ip": "192.168.0.4",
        "name": "Philips hue",
        "userName": "oM-QCgrT8zSk1Y3-pIaXqzpf7Fn-aSZo4y98M8Eq"
    };

    test("get all", async () => {

        const api = getHueApi(bridge);
        const result = await api.getAll();

        console.error(JSON.stringify(result));

    })
})