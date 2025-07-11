import FieldOptions from "../Components/FieldOptions.tsx";
import { useState, useEffect } from "react";
import type { Field } from "../types/FormType.tsx";
import ChosenPreview from "../Components/ChosenPreview.tsx";
import NormalBtn from "../Components/Btn/NormalBtn.tsx";
import { faGear, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, Controller } from "react-hook-form";
import DropDown from "../Components/Ui/DropDown";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const fieldSchema = (questionType: Field['question_type']) =>
    z.object({
        label: z.string().min(1, "عنوان الزامی است"),
        name: z
            .string()
            .min(1, "نام فیلد الزامی است")
            .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "نام فیلد باید به انگلیسی و بدون فاصله باشد"),
        placeholder: questionType === "BOOL"
            ? z.string().optional()
            : z.string().min(1, "متن کمکی الزامی است"),
        required: z.boolean(),
        options: questionType === "SELECT" || questionType === "MULTISELECT"
            ? z.array(z.string().min(1, "گزینه‌ها نمی‌توانند خالی باشند")).min(1, "حداقل یک گزینه الزامی است")
            : z.array(z.string()).optional(),
        value: z.string().optional(),
        question_type: z.literal(questionType),
    });

type FormData = z.infer<ReturnType<typeof fieldSchema>>;

const FormBuilder: React.FC = () => {
    const [definedFields, setDefinedFields] = useState<Field[]>([]);
    const [activeFieldIndex, setActiveFieldIndex] = useState<number>(-1);
    const [isSetting, setIsSetting] = useState<boolean>(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    const activeField = definedFields[activeFieldIndex];
    const schema = activeField ? fieldSchema(activeField.question_type) : fieldSchema("TEXT");

    const { control, setValue, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            label: "",
            placeholder: "",
            required: false,
            options: [],
            question_type: "TEXT",
            value: "",
        },
    });

    useEffect(() => {
        if (activeField) {
            reset({
                ...activeField,
                question_type: activeField.question_type,
            });
        }
    }, [activeFieldIndex, activeField, reset]);

    const addOption = (): void => {
        if (activeFieldIndex < 0) return;

        const updateOptions = [...definedFields];
        updateOptions[activeFieldIndex].options.push(`گزینه ${updateOptions[activeFieldIndex].options.length + 1}`);
        setDefinedFields(updateOptions);
    };

    const removeOption = (index: number): void => {
        if (activeFieldIndex < 0) return;

        const updateOptions = [...definedFields];
        const activeOptions = updateOptions[activeFieldIndex].options;
        activeOptions.splice(index, 1);
        setDefinedFields(updateOptions);
    };

    const updateOption = (index: number, value: string): void => {
        if (activeFieldIndex < 0) return;

        const updatedFields = [...definedFields];
        updatedFields[activeFieldIndex].options[index] = value;
        setDefinedFields(updatedFields);
    };

    const deleteField = (index: number): void => {
        const updatedFields = definedFields.filter((_, i) => i !== index);
        setDefinedFields(updatedFields);
        setActiveFieldIndex(Math.max(0, activeFieldIndex - 1));
    };

    const updateField = <K extends keyof Field>(key: K, val: Field[K]): void => {
        if (activeFieldIndex < 0) return;

        const updatedFields = [...definedFields];
        updatedFields[activeFieldIndex][key] = val;
        setDefinedFields(updatedFields);

        setValue(key as keyof FormData, val as any);
    };

    const onSubmit = (data: FormData): void => {
        if (activeFieldIndex < 0) return;

        const updatedFields = [...definedFields];
        updatedFields[activeFieldIndex] = {
            ...updatedFields[activeFieldIndex],
            ...data,
            question_type: updatedFields[activeFieldIndex].question_type
        };
        setDefinedFields(updatedFields);

        console.log("Form submitted successfully:", data);
    };

    const handleFormSubmit = (): void => {
        if (activeFieldIndex >= 0) {
            handleSubmit(onSubmit)();
        } else {
            console.log("No field selected or form is complete");
        }
    };

    const handleDropdownClose = (): void => {
        setIsSetting(false);
        setIsOptionsOpen(false);
    };

    const handleGearClick = (): void => {
        setIsSetting(true);
    };

    const handleCloseSettings = (): void => {
        setIsSetting(false);
    };

    return (
        <main className="min-h-screen flex p-2 border sm:border-transparent border-gray-300 rounded-t-4xl sm:rounded-2xl">
            <DropDown
                isVisible={isSetting || isOptionsOpen}
                setIsVisible={handleDropdownClose}
            />
            <div className="relative flex flex-col flex-1 py-4 rounded-2xl bg-white w-full shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] border border-gray-100">
                <header className="px-4 pb-3 flex items-center border-b border-gray-300/60">
                    <h1 className="text-base mb-1.5 text-gray-800 font-medium">
                        ساخت فرم
                    </h1>
                </header>
                <div className="flex-1 flex relative">
                    <FieldOptions
                        isOptionsOpen={isOptionsOpen}
                        setIsOptionsOpen={setIsOptionsOpen}
                        definedFields={definedFields}
                        setActiveFieldIndex={setActiveFieldIndex}
                        setDefinedFields={setDefinedFields}
                    />

                    <ChosenPreview
                        deleteField={deleteField}
                        updateOption={updateOption}
                        removeOption={removeOption}
                        addOption={addOption}
                        setActiveFieldIndex={setActiveFieldIndex}
                        activeFieldIndex={activeFieldIndex}
                        definedFields={definedFields}
                    />
                    {activeFieldIndex >= 0 && (
                        <>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className={`w-[250px] sm:w-[300px] lg:border-none border-x border-gray-200 lg:z-[40] z-[70] bg-white overflow-auto left-0 lg:h-fit lg:max-h-none max-h-screen h-screen fixed lg:sticky top-0 border-l transition-all duration-100 p-4 space-y-6 ${isSetting ? "translate-x-0" : "-translate-x-[130%]"} lg:translate-x-0`}
                            >
                                <div className="lg:hidden flex items-center justify-between pb-5 border-b-[0.5px] border-gray-300/60">
                                    <div className="text-gray-800 text-sm">
                                        تنظیمات فیلد
                                    </div>
                                    <div onClick={handleCloseSettings}>
                                        <FontAwesomeIcon icon={faXmark} className="text-gray-500 text-sm" />
                                    </div>
                                </div>

                                {/* Label field - different for BOOL type */}
                                {definedFields[activeFieldIndex]?.question_type === "BOOL" ? (
                                    <Controller
                                        name="label"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    متن سوال
                                                    <sup className="text-red-600 px-0.5">*</sup>
                                                </label>
                                                <textarea
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        updateField("label", e.target.value);
                                                    }}
                                                    placeholder="متن سوال"
                                                    className={`w-full min-h-24 mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] ${errors.label ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                                />
                                                {errors.label && <p className="text-red-500 text-xs mt-1 absolute">{errors.label.message}</p>}
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <Controller
                                        name="label"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    عنوان
                                                    <sup className="text-red-600 px-0.5">*</sup>
                                                </label>
                                                <input
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        updateField("label", e.target.value);
                                                    }}
                                                    placeholder="عنوان"
                                                    className={`w-full text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] ${errors.label ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                                />
                                                {errors.label && <p className="text-red-500 text-xs mt-1 absolute">{errors.label.message}</p>}
                                            </div>
                                        )}
                                    />
                                )}

                                {/* Name field */}
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                نام فیلد(انگلیسی)
                                                <sup className="text-red-600 px-0.5">*</sup>
                                            </label>
                                            <input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    updateField("name", e.target.value);
                                                }}
                                                type="text"
                                                className={`w-full text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] ${errors.name ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1 absolute">{errors.name.message}</p>}
                                        </div>
                                    )}
                                />

                                {/* Placeholder field - not for BOOL */}
                                {definedFields[activeFieldIndex]?.question_type !== "BOOL" && (
                                    <Controller
                                        name="placeholder"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                    متن کمکی
                                                    <sup className="text-red-600 px-0.5">*</sup>
                                                </label>
                                                <input
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        updateField("placeholder", e.target.value);
                                                    }}
                                                    type="text"
                                                    className={`w-full text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] ${errors.placeholder ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                                />
                                                {errors.placeholder && <p className="text-red-500 text-xs mt-1 absolute">{errors.placeholder.message}</p>}
                                            </div>
                                        )}
                                    />
                                )}

                                {/* Options field - for SELECT and MULTISELECT */}
                                {(definedFields[activeFieldIndex]?.question_type === "SELECT" ||
                                    definedFields[activeFieldIndex]?.question_type === "MULTISELECT") && (
                                    <div>
                                        <div className="flex justify-between items-end">
                                            <label className="text-sm font-medium mb-1 text-[13px] w-fit flex justify-between items-center">
                                                گزینه ها
                                                <sup className="text-red-600 px-0.5">*</sup>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={addOption}
                                                className="grid size-5 place-content-center bg-gray-700 rounded text-white cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                            </button>
                                        </div>
                                        {definedFields[activeFieldIndex].options.map((opt, i) => (
                                            <input
                                                key={i}
                                                value={opt}
                                                onChange={(e) => updateOption(i, e.target.value)}
                                                placeholder={`گزینه ${i + 1}`}
                                                className="w-full text-xs sm:text-sm mt-2 px-3 py-3 rounded-lg bg-gray-100 border transition-all duration-200 ease-linear focus:border-[#FF8A4C] focus:shadow-[0_0_4px_0_#9A7F7680] border-transparent focus:outline-none"
                                            />
                                        ))}
                                        {errors.options && <p className="text-red-500 text-xs mt-1 absolute">{errors.options.message}</p>}
                                    </div>
                                )}

                                {/* Required toggle */}
                                <div className="flex items-center mt-4 gap-2 text-[13px] text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={definedFields[activeFieldIndex].required}
                                        onChange={(e) => updateField("required", e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <button
                                        type="button"
                                        dir="ltr"
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
                                    {definedFields[activeFieldIndex].required ? "اجباری" : "غیراجباری"}
                                </div>
                            </form>
                            <button
                                type="button"
                                onClick={handleGearClick}
                                className="bg-[#1D5E84] lg:hidden grid place-content-center min-w-12 min-h-12 size-12 bottom-20 left-4 sm:left-7 rounded-full fixed"
                            >
                                <FontAwesomeIcon icon={faGear} className="text-xl text-white" />
                            </button>
                        </>
                    )}
                </div>
                <div className="w-full rounded-b-2xl bg-white border-t border-gray-300 sticky bottom-0 py-2 z-[50]">
                    <div className="mr-auto w-fit px-4">
                        <NormalBtn
                            type="button"
                            onClick={handleFormSubmit}
                            color="bg-orange-500"
                            title="ذخیره"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FormBuilder;