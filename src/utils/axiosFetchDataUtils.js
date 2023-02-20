// import { trafficVolumeByLength } from '../components/queries.js'
// import axios from 'axios';

// let querySwitch = trafficVolumeByLength("44656V72812", "2023-02-05", "2023-02-06");

// const httpOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     mode: "cors",
//     body: JSON.stringify({
//         query: querySwitch,
//     }),
// };

// //.then((data) => data.data.trafficData.trafficRegistrationPoint.name)
// const fetchApi = async () =>
//     axios
//     .get("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
//     .then((res) => res.data.trafficData.trafficRegistrationPoint.name)
//     .catch((err) => console.log(err))

// //console.log(data.trafficData.trafficRegistrationPoint.name)
// //return data.trafficData.trafficRegistrationPoint.name


//   export {fetchApi}