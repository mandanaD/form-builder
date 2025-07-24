import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import type {checkboxFieldType} from "../../types/FormType.tsx";

const CheckboxFieldEditor = ({field, removeOption, updateOption, addOption}: checkboxFieldType) => {
    const [isOpen, setIsOpen] = useState(true)
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editedValue, setEditedValue] = useState("")

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedValue(field.options[index]);
    };

    const handleSave = (index: number) => {
        updateOption(index, editedValue);
        setEditIndex(null);
        setEditedValue("");
    };

    const handleDelete = (index: number) => {
        removeOption(index);
    };


    return (
        <div className={"relative"}>
            <div
                className={`w-full relative mt-2 flex justify-between items-center transition-all duration-200 ease-linear gap-1 border bg-gray-100 focus:outline-none py-3 px-3 rounded-lg border-transparent`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-xs sm:text-sm text-gray-400">
                    {field.placeholder || "Select options"}
                </div>
                <FontAwesomeIcon icon={faChevronDown} className={`mr-auto transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                } text-sm`}/>
            </div>
            {isOpen && (
                <div className="z-10 mt-1 w-full bg-gray-50 border-gray-200 border rounded-lg overflow-auto">
                    {field.options?.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between gap-2 px-4 py-2 text-sm"
                        >
                            <input
                                type="text"
                                className={`w-full h-full rounded px-2 py-1 focus:outline-none border focus:border-gray-200 border-transparent ${editIndex === index ? "bg-gray-100" : "bg-transparent"}`}
                                value={editIndex === index ? editedValue : option}
                                disabled={editIndex !== index}
                                onChange={(e) => setEditedValue(e.target.value)}
                            />
                            {editIndex === index ? (
                                <button
                                    title="Confirm"
                                    onClick={() => handleSave(index)}
                                    className="size-[30px] grid place-content-center rounded-lg text-green-600 cursor-pointer transition-all ease-linear hover:text-green-700 border-2 border-gray-200 bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faCheck}/>
                                </button>
                            ) : (
                                <div className="flex gap-1">
                                    <button
                                        title="Edit"
                                        onClick={() => handleEditClick(index)}
                                        className="size-[30px] grid place-content-center rounded-lg text-gray-500 cursor-pointer transition-all ease-linear hover:text-blue-600 border-2 border-gray-200 bg-gray-100"
                                    >
                                        <FontAwesomeIcon icon={faPen}/>
                                    </button>
                                    <button
                                        title="Delete"
                                        onClick={() => handleDelete(index)}
                                        className="size-[30px] grid place-content-center rounded-lg text-red-500 cursor-pointer transition-all ease-linear hover:text-red-600 border-2 border-gray-200 bg-gray-100"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div
                        onClick={addOption}
                        className="flex items-center justify-between text-xs underline text-gray-500 gap-2 px-4 py-2 cursor-pointer"
                    >
                        Add Option
                    </div>
                </div>
            )}
        </div>
    )
}
export default CheckboxFieldEditor;