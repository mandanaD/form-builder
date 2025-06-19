import FieldOptions from "../Components/FieldOptions.tsx";
import {useState} from "react";
import type {Field} from "../types/FormType.tsx";
import ChosenPreview from "../Components/ChosenPreview.tsx";
import NormalBtn from "../Components/Btn/NormalBtn.tsx";
import {faGear, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import DropDown from "../Components/Ui/DropDown";
import * as z from "zod"

const schema =  z.array(z.object({
        question_type: z.string().min(1, "نوع فیلد اجباریست"),
        name: z.string().min(1, "نام فیلد اجباریست"),
        label: z.string().min(1, "عنوان فیلد اجباریست"),
        placeholder: z.string().optional(),
        required: z.boolean().optional(),
        value: z.string().optional(),
        options: z.array(z.string()).optional()
    })).min(1, "حداقل یک مورد انتخاب کنید")

const FormBuilder = () => {
    const [definedFields, setDefinedFields] = useState<Field[]>([])
    const [activeFieldIndex, setActiveFieldIndex] = useState<number>(-1);
    const {register} = useForm()

    const [isSetting, setIsSetting] = useState(false)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)

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
        setActiveFieldIndex(activeFieldIndex - 1)
    }

    const updateField = (key: string, val: string | boolean) => {
        const updatedFields = [...definedFields];
        updatedFields[activeFieldIndex][key] = val
        setDefinedFields(updatedFields)
    }

    return (
        <main
            className="min-h-screen flex p-2 border sm:border-transparent border-gray-300 rounded-t-4xl sm:rounded-2xl">
            <DropDown isVisible={isSetting || isOptionsOpen} setIsVisible={() => {
                setIsSetting(false)
                setIsOptionsOpen(false)
            }}/>
            <div
                className={`relative flex flex-col flex-1 py-4 rounded-2xl bg-white w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] border border-gray-100`}>
                <header className={" px-4 pb-3 flex items-center border-b border-gray-300/60"}>
                    <h1 className={"text-base mb-1.5 text-gray-800 font-medium"}>
                        ساخت فرم
                    </h1>
                </header>
                <div className="flex-1 flex relative">
                    <FieldOptions isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen}
                                  definedFields={definedFields} setActiveFieldIndex={setActiveFieldIndex}
                                  setDefinedFields={setDefinedFields}/>

                    <ChosenPreview deleteField={deleteField} updateOption={updateOption} removeOption={removeOption}
                                   addOption={addOption} setActiveFieldIndex={setActiveFieldIndex}
                                   activeFieldIndex={activeFieldIndex}
                                   definedFields={definedFields}/>
                    {
                        activeFieldIndex >= 0 && (
                            <>
                                <div
                                    className={`w-[250px] sm:w-[300px] lg:border-none border-x border-gray-200 lg:z-[40] z-[70] bg-white overflow-auto left-0 lg:h-fit lg:max-h-none max-h-screen h-screen fixed lg:sticky top-0 border-l  transition-all duration-100  p-4 space-y-4 ${isSetting ? "translate-x-0" : "-translate-x-[130%]"} lg:translate-x-0 `}>
                                    <div
                                        className={"lg:hidden flex items-center justify-between pb-5 border-b-[0.5px] border-gray-300/60"}>
                                        <div className={"text-gray-800 text-sm"}>
                                            تنظیمات فیلد
                                        </div>
                                        <div onClick={() => setIsSetting(false)}>
                                            <FontAwesomeIcon icon={faXmark} className={"text-gray-500 text-sm"}/>
                                        </div>
                                    </div>
                                    {
                                        definedFields[activeFieldIndex]?.question_type === "BOOL" ? (
                                            <div className={"relative"}>
                                                <label
                                                    className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    متن سوال
                                                    <sup className="text-red-600 px-0.5">*</sup>
                                                </label>
                                                <textarea
                                                    placeholder=" متن سوال"
                                                    {...register("label", {
                                                        onChange: event => updateField("label", event.target.value),
                                                        value: definedFields[activeFieldIndex].label,
                                                        minLength: 0,
                                                    })}
                                                    className={`w-full min-h-24 mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent
                           focus:outline-none`}
                                                />
                                            </div>
                                        ) : (
                                            <div className={"relative"}>
                                                <label
                                                    className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    عنوان
                                                    <sup className="text-red-600 px-0.5">*</sup>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="عنوان"
                                                    value={definedFields[activeFieldIndex].label}
                                                    onChange={(e) => updateField("label", e.target.value)}
                                                    className={`w-full  text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent
                           focus:outline-none`}
                                                />
                                            </div>
                                        )
                                    }

                                    <div className={"relative"}>
                                        <label
                                            className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                            نام فیلد(انگلیسی)
                                            <sup className="text-red-600 px-0.5">*</sup>
                                        </label>
                                        <input
                                            type="text"
                                            value={definedFields[activeFieldIndex].name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            className={`w-full  text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent
                           focus:outline-none`}
                                        />
                                    </div>
                                    {
                                        (definedFields[activeFieldIndex]?.question_type !== "BOOL" && definedFields[activeFieldIndex]?.question_type !== "RANGE") && (
                                            <div>
                                                <label
                                                    className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    متن کمکی
                                                </label>
                                                <input
                                                    type="text"
                                                    value={definedFields[activeFieldIndex].placeholder}
                                                    onChange={(e) => updateField("placeholder", e.target.value)}
                                                    className={`w-full  text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent
                           focus:outline-none`}
                                                />
                                            </div>
                                        )}
                                    {
                                        (definedFields[activeFieldIndex]?.question_type === "SELECT" || definedFields[activeFieldIndex]?.question_type === "MULTISELECT") && (
                                            <div>
                                                <div className={"flex justify-between items-end"}>
                                                    <label
                                                        className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                        گزینه ها
                                                    </label>
                                                    <div
                                                        onClick={addOption}
                                                        className={`grid size-5 place-content-center bg-gray-700 rounded text-white cursor-pointer`}>
                                                        <FontAwesomeIcon icon={faPlus} className={"text-xs"}/>
                                                    </div>
                                                </div>
                                                {definedFields[activeFieldIndex].options.map((opt, i) => (
                                                    <input
                                                        key={i}
                                                        value={opt}
                                                        onChange={(e) => updateOption(i, e.target.value)}
                                                        placeholder={`گزینه ${i + 1}`}
                                                        className={`w-full  text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent
                           focus:outline-none`}
                                                    />
                                                ))}
                                            </div>
                                        )
                                    }
                                    <div
                                        className="flex items-center mt-4 gap-2 text-[13px] text-gray-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={definedFields[activeFieldIndex].required}
                                            onChange={(e) => updateField("required", e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <button
                                            type={"button"}
                                            dir={"ltr"}
                                            className={`min-w-12 h-6 flex items-center rounded-full px-1 cursor-pointer ${
                                                definedFields[activeFieldIndex].required ? "bg-orange-500" : "bg-gray-300"
                                            }`}
                                            onClick={() => updateField("required", !definedFields[activeFieldIndex].required)}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                                                    definedFields[activeFieldIndex].required ? "translate-x-6" : ""
                                                }`}
                                            />
                                        </button>
                                        {
                                            definedFields[activeFieldIndex].required ? "اجباری" : "غیراجباری"
                                        }
                                    </div>
                                </div>
                                <div
                                    onClick={() => setIsSetting(true)}
                                    className={"bg-[#1D5E84] lg:hidden grid place-content-center min-w-12 min-h-12 size-12 bottom-20 left-4 sm:left-7 rounded-full fixed "}>
                                    <FontAwesomeIcon icon={faGear} className={"text-xl text-white"}/>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className={"w-full rounded-b-2xl bg-white border-t border-gray-300 sticky bottom-0 py-2 z-[50]"}>
                    <div className={"mr-auto w-fit px-4"}>
                        <NormalBtn
                            type={"submit"}
                            onClick={() => {
                            }}
                            color={"bg-orange-500"}
                            title={"ذخیره"}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
export default FormBuilder;