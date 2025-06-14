import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTextWidth,
    faSquareCaretDown,
    faFileLines,
    faCheckDouble,
    faParagraph, faXmark, faPlus
} from "@fortawesome/free-solid-svg-icons";
import type {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";
import type {Field, optionsType} from "../types/FormType.tsx";

const FieldOptions = ({definedFields, setDefinedFields,setActiveFieldIndex}: optionsType) => {
    const availableFields: {
        question_type: Field["question_type"],
        text: string,
        icon: IconDefinition
    }[] = [
        {question_type: "TEXT", text: "متن کوتاه", icon: faTextWidth},
        {question_type: "TEXTAREA", text: "متن بلند", icon: faParagraph},
        {question_type: "SELECT", text: "تک انتخابی", icon: faSquareCaretDown},
        {question_type: "MULTISELECT", text: "چند انتخابی", icon: faCheckDouble},
        {question_type: "BOOL", text: "چک باکس", icon: faFileLines},
    ]
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

    const addField = (question_type: Field["question_type"]) => {
        const newField = {
            question_type,
            name: "",
            label: "",
            placeholder: "",
            required: false,
            value: "",
            options: question_type === "SELECT" || question_type === "MULTISELECT" ? ["گزینه ۱"] : []
        }
        setDefinedFields([...definedFields, newField])
        setActiveFieldIndex(definedFields.length)
    }

    return (
        <>
            <div
                className={`w-[250px] sm:border-transparent border  border-gray-300/60 sm:z-10 z-[70] bg-white overflow-auto right-0 sm:h-fit sm:max-h-none max-h-screen h-screen sm:sticky pt-4 top-0 transition-all duration-100 fixed px-3 gap-1 flex flex-col ${isOptionsOpen ? "translate-x-0" : "translate-x-[130%]"} sm:translate-x-0 `}>
                <div
                    className={"sm:hidden flex items-center justify-between pb-5 border-b-[0.5px] border-gray-300/60"}>
                    <div className={"text-gray-800 text-sm"}>
                        فیلد ها
                    </div>
                    <div onClick={() => setIsOptionsOpen(false)}>
                        <FontAwesomeIcon icon={faXmark} className={"text-gray-500 text-sm"}/>
                    </div>
                </div>
                {availableFields.map((f, i) => (
                    <div
                        key={i}
                        onClick={() => addField(f.question_type)}
                        className="w-full rounded cursor-pointer flex gap-2 items-center bg-gray-100 p-2 hover:bg-gray-200"
                    >
                        <p className="size-9 bg-gray-200 text-gray-500 rounded grid place-content-center">
                            <FontAwesomeIcon icon={f.icon} className="text-lg"/>
                        </p>
                        <p className="text-gray-700 text-sm">{f.text}</p>
                    </div>
                ))}
            </div>
            <div
                onClick={() => setIsOptionsOpen(true)}
                className={"bg-[#1A56DB24] px-4 py-1 sm:hidden min-w-12 min-h-12 size-12 bottom-20 rounded-full fixed "}>
                <div className={"w-full h-full bg-[#1A56DB5C] rounded-full p-1"}>
                    <div className={"w-full h-full bg-[#1A56DB] rounded-full grid place-content-center"}>
                        <FontAwesomeIcon icon={faPlus} className={"text-xl text-white"}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FieldOptions;