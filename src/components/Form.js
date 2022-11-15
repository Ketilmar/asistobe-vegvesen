import { useState } from "react";

import Counties from "../data/json/county.json";
import Municipalities from "../data/json/municipality.json";

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

const Form = () => {
    const [formInfo, setFormInfo] = useState({
        county: "",
        municipality: "",
        dateFrom: "",
        dateTo: "",
    });

    // Sorting the counties from the Counties JSON.
    const sortedCounties = Counties.features.sort((a, b) => {
        const nameA = a.properties.navn[0].navn.toUpperCase();
        const nameB = b.properties.navn[0].navn.toUpperCase();
        return nameA > nameB ? 1 : -1;
    });
    // Mapping the counties as options for a datalist.
    const countiesList = sortedCounties.map((county, idx) => {
        return <option key={idx} value={county.properties.navn[0].navn} />;
    });

    // Sorting the municipalities from the Municipalities JSON.
    const sortedMuncipalities = Municipalities.features.sort((a, b) => {
        const nameA = a.properties.navn[0].navn.toUpperCase();
        const nameB = b.properties.navn[0].navn.toUpperCase();
        return nameA > nameB ? 1 : -1;
    });

    // Mapping the municipalities as option for a datalist.
    const municipalityList = sortedMuncipalities.map((municipality, idx) => {
        return <option key={idx} value={municipality.properties.navn[0].navn} />;
    });

    // Updates form state with new values on change
    const handleChange = (event) => {
        const { name, value } = event.target;
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
        </StyledForm>
    );
};

export default Form;
