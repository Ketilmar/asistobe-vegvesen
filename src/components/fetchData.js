import fetch from "node-fetch";

const httpOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
        query: `{
            trafficData(trafficRegistrationPointId: "44656V72812") {
              trafficRegistrationPoint {
                id
              }
            }
          }`,
    }),
};

const fetchData = async (trafficPoints) => {
    const testPoints = [trafficPoints[0], trafficPoints[1], trafficPoints[2]];
    const fetches = testPoints.map((point) =>
        fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
    );
    const response = await Promise.all(fetches).then((res) =>
        res.forEach((response) => {
            response.json().then((res) => res);
        })
    );
};

export default fetchData;
