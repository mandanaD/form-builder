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
    setDefinedFields: React.Dispatch<React.SetStateAction<Field[]>>,
    setActiveFieldIndex: React.Dispatch<React.SetStateAction<number>>,
}

export interface chosenPreviewType {
    setActiveFieldIndex: React.Dispatch<React.SetStateAction<number>>,
    activeFieldIndex: number,
    definedFields: Field[],
    updateOption: (index: number, value: string) => void,
    removeOption: (index: number) => void,
    addOption: () => void,
    deleteField:(index: number) => void,
}
export interface checkboxFieldType{
    field:Field,
    removeOption:(index: number) => void,
    addOption: () => void,
    updateOption: (index: number, value: string) => void,
}

export interface normalBtnType{
    type: "submit"|"button",
    disabled:boolean,
    color:string,
    onClick:() => void,
    title:string,
}