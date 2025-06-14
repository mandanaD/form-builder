import FieldOptions from "../Components/FieldOptions.tsx";
import {useState} from "react";
import type {Field} from "../types/FormType.tsx";
import ChosenPreview from "../Components/ChosenPreview.tsx";
import NormalBtn from "../Components/Btn/NormalBtn.tsx";

const FormBuilder = () => {
    const [definedFields, setDefinedFields] = useState<Field[]>([])
    const [activeFieldIndex, setActiveFieldIndex] = useState<number>(-1);
    const [loading, setLoading] = useState(false)

    const addOption = () => {
        const updateOptions = [...definedFields]
        updateOptions[activeFieldIndex].options.push(`گزینه ${updateOptions[activeFieldIndex].options.length + 1}`)
        setDefinedFields(updateOptions)
    }

    const removeOption = (index: number) => {
        const updateOptions = [...definedFields]
        const activeOptions = updateOptions[activeFieldIndex].options;
        activeOptions.splice(index, 1);
        setDefinedFields(updateOptions)
    }

    const updateOption = (index: number, value: string) => {
        const updatedFields = [...definedFields];
        updatedFields[activeFieldIndex].options[index] = value;
        setDefinedFields(updatedFields);
    }

    const deleteField = (index: number) => {
        const updatedFields = definedFields.filter((_, i) => i !== index);
        setDefinedFields(updatedFields);
    }

    return (
        <main
            className="min-h-screen flex p-2 border sm:border-transparent border-gray-300 rounded-t-4xl sm:rounded-2xl overflow-y-auto">
            <div
                className={`relative flex flex-col flex-1 py-4 rounded-2xl bg-white w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] border border-gray-100`}>
                <header className={"px-4 pb-3 flex items-center border-b border-gray-300/60"}>
                    <h1 className={"text-sm sm:text-base mb-1.5 text-gray-800 font-medium"}>
                        ساخت فرم
                    </h1>
                </header>
                <div className="flex-1 flex h-full relative">
                    <FieldOptions definedFields={definedFields} setActiveFieldIndex={setActiveFieldIndex}
                                  setDefinedFields={setDefinedFields}/>
                    <ChosenPreview deleteField={deleteField} updateOption={updateOption} removeOption={removeOption} addOption={addOption} setActiveFieldIndex={setActiveFieldIndex} activeFieldIndex={activeFieldIndex}
                                   definedFields={definedFields}/>
                    {
                        activeFieldIndex && (
                            <div>

                            </div>
                        )
                    }
                </div>
                <div className={"w-full rounded-b-2xl bg-white border-t border-gray-300 sticky -bottom-2 py-2 z-[50]"}>
                    <div className={"mr-auto w-fit px-4"}>
                        <NormalBtn
                            type={"submit"}
                            onClick={()=>{}}
                            color={"bg-orange-500"}
                            title={"ذخیره"}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
export default FormBuilder;