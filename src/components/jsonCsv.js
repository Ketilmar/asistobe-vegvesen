import { CSVLink } from "react-csv";
import { downloadIcon } from "../img/svg";
import { ButtonLink, StyledButton } from "./styled";
import { useState, useEffect } from "react";


const JsonToCsv = (fetchData) => {
  const [parsedData, setParsedData] = useState(null);

    console.log(fetchData);
    const cleanData = (data) => {
        console.log(data);

        const cleanedData = data.apiData.data.trafficRegistrationPoints.map((item) => ({
          Name: item.name,
          Number: item.location.roadReference.shortForm,
          id: item.id,
        }));

        console.log(cleanedData);
        // return cleanedData;
        setParsedData(cleanedData);
    };


    const columns = [
        {
          Name: "Name",
          Number: "Number",
          id: "id"
        },
      ];

      useEffect(() => {
        cleanData(fetchData)
      }, [fetchData])

    console.log(fetchData.apiData);
    console.log(parsedData );
    return (
        <>
      {parsedData && (
        <CSVLink
          data={parsedData}
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
      
    </>

    // <>
      
    //     <CSVLink
    //       data={cleanedData}
    //       separator={";"}
    //       columns={columns}
    //       filename={"vegvesenet.csv"}
    //     >
    //       <StyledButton>
    //         <ButtonLink>Export as CSV</ButtonLink>
    //         {downloadIcon}
    //       </StyledButton>
    //     </CSVLink>
    // </>
    )
}


export {JsonToCsv}