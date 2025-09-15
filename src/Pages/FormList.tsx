import {useState} from 'react';
import {faPlus, faEdit, faEye, faTrash, faFileText} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router";
import type {FormListType} from "../types";

const FormList = () => {
    const [forms, setForms] = useState<FormListType[]>([]);

    const handleDelete = (id: string) => {
        setForms(forms.filter(form => form.id !== id));
    };
    const CreateNewCard = () => (
        <Link
            to={"/create"}
            className="group relative overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:border-teal-300 hover:bg-teal-50/30 transition-all duration-300 cursor-pointer h-56">
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 group-hover:text-teal-600 transition-colors">
                <div
                    className="w-12 h-12 rounded-full bg-white group-hover:bg-teal-50 border border-gray-200/60 shadow flex items-center justify-center mb-3 transition-all duration-300">
                    <FontAwesomeIcon icon={faPlus} className={"text-lg"}/>
                </div>
                <h3 className=" text-base mb-0.5">Create New Form</h3>
                <p className="text-sm opacity-75">Start building your form</p>
            </div>
        </Link>
    );

    const FormCard = ({form}: {
        form: FormListType
    }) => (
        <div
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 hover:border-slate-300/60 transition-all duration-300 h-56 ">
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faFileText} className="text-white text-lg"/>
                    </div>
                    <div
                        className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            className="w-8 h-8 rounded-lg shadow-gray-100 shadow bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEye} className="text-sm"/>
                        </button>
                        <button
                            className="w-8 h-8 rounded-lg shadow-gray-100 shadow bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEdit} className="text-sm"/>
                        </button>
                        <button
                            onClick={() => handleDelete(form.id)}
                            className="w-8 h-8 rounded-lg shadow-gray-100 shadow bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faTrash} className="text-sm"/>
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className=" text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {form.title}
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">
                        Created {form.createdAt}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div
            className="relative flex flex-col flex-1 py-6 rounded-2xl bg-white w-full shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)] border border-gray-100/50">
            <header className="px-4 pb-3 flex items-center border-b border-gray-300/60">
                <h1 className="text-base mb-1.5 text-gray-800 font-medium">
                    Form List
                </h1>
            </header>

            <div className="p-3 flex flex-col flex-1">
                <div className={"flex flex-col flex-1 gap-4"}>
                    <div
                        className="border-b pb-4 border-gray-200/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <CreateNewCard/>
                    </div>
                    <div className={`flex-1 ${forms && forms.length === 0 && "grid place-content-center"}`}>
                        {
                            forms && forms.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {forms.map((form, index) => (
                                        <FormCard key={index} form={form}/>
                                    ))}
                                </div>
                            ) : (
                                <div className={"sm:text-sm text-xs text-center text-gray-800 "}>
                                    No form created yet. Create your first form to get started.
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormList;