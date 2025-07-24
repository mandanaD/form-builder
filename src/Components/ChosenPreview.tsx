import type {chosenPreviewType, Field} from "../types/FormType.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import CheckboxFieldEditor from "./Fields/CheckboxFieldEditor.tsx";

const ChosenPreview = ({
                           deleteField,
                           definedFields,
                           activeFieldIndex,
                           setActiveFieldIndex,
                           addOption,
                           updateOption,
                           removeOption
                       }: chosenPreviewType) => {

    const renderField = (field: Field) => {
        switch (field.question_type) {
            case "TEXT":
                return (
                    <div className="relative w-full ">
                        <input
                            placeholder={field.placeholder}
                            disabled={true}
                            type={"text"}
                            className={`w-full mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear  border-transparent
                           focus:outline-none`}
                        />
                    </div>
                )
            case "TEXTAREA":
                return (
                    <textarea
                        placeholder={field.placeholder}
                        disabled={true}
                        className={`w-full min-h-28 mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear  border-transparent
                           focus:outline-none`}
                    />
                )
            case "SELECT":
                return (<CheckboxFieldEditor field={field} addOption={addOption} removeOption={removeOption}
                                             updateOption={updateOption}/>)
            case "MULTISELECT":
                return (<CheckboxFieldEditor field={field} addOption={addOption} removeOption={removeOption}
                                             updateOption={updateOption}/>)
            case "BOOL":
                return (
                    <input
                        type="checkbox"
                        disabled
                        className="accent-orange-500 mt-1"
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div
            className={`${definedFields.length === 0 && "flex items-center justify-center"} flex-1 h-full border-x border-gray-200 p-3 space-y-2`}>
            {
                definedFields.length > 0 ? (
                    definedFields.map((field, i) => (
                        <div key={i}
                             onClick={() => activeFieldIndex === i ? "" : setActiveFieldIndex(i)}
                             className={`p-3 relative border rounded-xl cursor-pointer transition-all ease-linear ${activeFieldIndex === i ? "border-gray-500" : "border-gray-300/60"}`}
                        >
                            <label
                                className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                {field.label || "(No Label)"}
                                {field.required && <sup className="text-red-600 px-0.5">*</sup>}
                            </label>
                            {renderField(field)}
                            <div
                                onClick={() => {
                                    deleteField(i)
                                }}
                                className={`${activeFieldIndex === i ? "grid" : "hidden"} absolute size-5 place-content-center bg-gray-700 rounded-full text-white -top-1.5 -right-1.5`}>
                                <FontAwesomeIcon icon={faXmark} className={"text-xs"}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={"sm:text-sm text-xs text-center text-gray-800 "}>
                        No fields added yet. Start by adding your first field from the left.
                    </div>
                )
            }
        </div>
    )
}
export default ChosenPreview;