import { useState } from "react";

import counties from "../data/json/counties.json";
import municipalities from "../data/json/municipalities.json";

import { downloadIcon } from "../img/svg";
import {
    StyledInput,
    StyledForm,
    StyledLabel,
    FlexRow,
    FlexColumn,
    StyledDatalist,
    StyledInputDate,
    StyledButton,
    ButtonLink,
} from "./styled";

import { FetchData } from "./fetchData";

const Form = ({apiData}) => {
    const [formInfo, setFormInfo] = useState({
        county: { name: "", number: undefined },
        municipality: "",
        dateFrom: "",
        dateTo: "",
    });

    // Sorting the counties from the Counties JSON.
    const sortedCounties = counties.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA > nameB ? 1 : -1;
    });
    // Mapping the counties as options for a datalist.
    const countiesList = sortedCounties.map((county, idx) => {
        return <option key={idx} value={county.name} />;
    });

    // Sorting the municipalities from the Municipalities JSON.
    const sortedMuncipalities = municipalities.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA > nameB ? 1 : -1;
    });

    // Mapping the municipalities as option for a datalist.
    const municipalityList = sortedMuncipalities.map((municipality, idx) => {
        return <option key={idx} value={municipality.name} />;
    });

    // Updates form state with new values on change
    const handleChange = (event) => {
        // The name and value of the target
        const { name, value } = event.target;
        // If the selected counties is in the counties find the info.
        const county = counties.find((county) => {
            return county.name === value;
        });
        // sets the form info to contain name and number
        if (county) {
            setFormInfo((oldForm) => ({
                ...oldForm,
                county: { name: county.name, number: county.number },
            }));
            return;
        }
        // Handles everything but the county
        setFormInfo((oldForm) => ({
            ...oldForm,
            [name]: value,
        }));
    };

    // Handles the submit, currently just console logs the state object.
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formInfo);
    };

    return (
        <StyledForm>
            <h2>County/Municipality</h2>
            <FlexRow>
                <FlexColumn>
                    <StyledLabel>County:</StyledLabel>
                    <StyledInput
                        list="county-list"
                        name="county"
                        onChange={handleChange}
                    ></StyledInput>
                </FlexColumn>
                <FlexColumn>
                    <StyledLabel>Municipality:</StyledLabel>
                    <StyledInput
                        list="municipality-list"
                        name="municipality"
                        onChange={handleChange}
                    ></StyledInput>
                </FlexColumn>
            </FlexRow>

            <h2>Date</h2>
            <FlexRow>
                <FlexColumn>
                    <StyledLabel>From:</StyledLabel>
                    <StyledInput
                        type="datetime-local"
                        name="dateFrom"
                        onChange={handleChange}
                    ></StyledInput>
                </FlexColumn>
                <FlexColumn>
                    <StyledLabel>To:</StyledLabel>
                    <StyledInput
                        type="datetime-local"
                        name="dateTo"
                        onChange={handleChange}
                    ></StyledInput>
                </FlexColumn>
            </FlexRow>

            {/* Data Lists */}
            <StyledDatalist id="county-list">{countiesList}</StyledDatalist>
            <StyledDatalist id="municipality-list">{municipalityList}</StyledDatalist>

            <StyledButton onClick={handleSubmit}>
                <ButtonLink>Export as CSV</ButtonLink>
                {downloadIcon}
                </StyledButton>

            {/* Sender returverdien fra form til fetch */}
            <FetchData formData = {formInfo}/>
        </StyledForm>
    );
};

export default Form
