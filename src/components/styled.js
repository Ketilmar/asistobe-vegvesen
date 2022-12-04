import styled from "styled-components";

import { downloadIcon } from "../img/svg";

export const StyledInput = styled.input`
    font-size: 18px;
    width: 100%;
    padding: 0.25rem;
    border-radius: 5px;
    margin-top: 0.5rem;
`;

export const StyledForm = styled.form`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

export const StyledLabel = styled.label`
    font-weight: 700;
    align-self: flex-start;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem;
`;
export const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledDatalist = styled.datalist`
    height: 5.1em;
    overflow: hidden;
`;

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1558da;
    font-size: 22px;
    color: #000000;
    width: fit-content;
    margin: 4rem auto 0;
    padding: 1rem;
    border-radius: 15px;
    border: none;
    font-weight: 700;
    cursor: pointer;
`;

export const ButtonLink = styled.a`
    margin-right: 1rem;
`;
