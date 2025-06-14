import * as React from "react";

export interface Field {
    question_type: "TEXT" | "TEXTAREA" | "SELECT" | "MULTISELECT" | "BOOL",
    name: string,
    label: string,
    placeholder: string,
    required: boolean,
    value: string,
    options: string[]
}

export interface optionsType {
    definedFields: Field[],
    setDefinedFields: React.Dispatch<React.SetStateAction<Field[]>>
}