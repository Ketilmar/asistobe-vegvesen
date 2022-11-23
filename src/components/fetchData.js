import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { downloadIcon } from "../img/svg";
import { ButtonLink, StyledButton } from "./styled";

const FetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const httpOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        query: ` {
    
           trafficRegistrationPoints {
            location {
              county {
                name
                number
              }
              municipality {
                name
                number
              }
            }
          }
        }`,
        variables: null,
      }),
    };

    const cleanData = (data) => {
      const cleanedData = data.data.trafficRegistrationPoints.map((item) => ({
        countryName: item.location.county.name,
        countryNumber: item.location.county.number,
        municipalityName: item.location.municipality.name,
        municipalityNumber: item.location.municipality.number,
      }));
      return cleanedData;
    };

    const fetchApi = async () => {
      await fetch("https://www.vegvesen.no/trafikkdata/api/", httpOptions)
        .then((res) => res.json())
        .then((res) => {
          const cleanedData = cleanData(res);
          setData(cleanedData);
        })
        .catch((err) => console.log(err));
    };

    fetchApi();
  }, []);

  console.log(data);

  const columns = [
    {
      countryName: "countryName",
      countryNumber: "countryNumber",
    },
    {
      countryName: "countryName",
      countryNumber: "countryNumber",
    },
  ];

  return (
    <>
      {data && (
        <CSVLink
          data={data}
          separator={";"}
          columns={columns}
          filename={"vegvesenet.csv"}
        >
          <StyledButton>
            <ButtonLink>Export as CSV</ButtonLink>
            {downloadIcon}
          </StyledButton>
        </CSVLink>
      )}
      ;
    </>
  );
};

export { FetchData };
