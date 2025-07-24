import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTextWidth,
    faSquareCaretDown,
    faCheckDouble,
    faParagraph, faXmark, faPlus
} from "@fortawesome/free-solid-svg-icons";
import {faCheckSquare, type IconDefinition} from "@fortawesome/free-regular-svg-icons";
import type {Field, optionsType} from "../types/FormType.tsx";

const FieldOptions = ({definedFields, setDefinedFields,setActiveFieldIndex,setIsOptionsOpen,isOptionsOpen}: optionsType) => {
    const availableFields: {
        question_type: Field["question_type"],
        text: string,
        icon: IconDefinition
    }[] = [
        { question_type: "TEXT", text: "Short Text", icon: faTextWidth },
        { question_type: "TEXTAREA", text: "Long Text", icon: faParagraph },
        { question_type: "SELECT", text: "Single Select", icon: faSquareCaretDown },
        { question_type: "MULTISELECT", text: "Multi Select", icon: faCheckDouble },
        { question_type: "BOOL", text: "Checkbox", icon: faCheckSquare },
    ]

    const addField = (question_type: Field["question_type"]) => {
        const newField = {
            question_type,
            name: "",
            label: "",
            placeholder: "",
            required: false,
            value: "",
            options: question_type === "SELECT" || question_type === "MULTISELECT" ? ["Option 1"] : []
        }
        setDefinedFields([...definedFields, newField])
        setActiveFieldIndex(definedFields.length)
    }

    return (
        <>
            <div
                className={`w-[250px] md:border-transparent border  border-gray-300/60 md:z-10 z-[70] bg-white overflow-auto left-0 md:h-fit md:max-h-none max-h-screen h-screen md:sticky pt-4 top-0 transition-all duration-100 fixed px-3 gap-1 flex flex-col ${isOptionsOpen ? "translate-x-0" : "-translate-x-[130%]"} md:translate-x-0 `}>
                <div
                    className={"md:hidden flex items-center justify-between pb-5 border-b-[0.5px] border-gray-300/60"}>
                    <div className={"text-gray-800 text-sm"}>
                       Fields
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
                className={"bg-gray-700 z-30 md:hidden grid place-content-center min-w-12 min-h-12 size-12 bottom-20 mr-2 rounded-full fixed "}>
                <FontAwesomeIcon icon={faPlus} className={"text-xl text-white"}/>
            </div>
        </>
    )
}
export default FieldOptions;