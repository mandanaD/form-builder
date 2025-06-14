import FieldOptions from "../Components/FieldOptions.tsx";
import {useState} from "react";
import type {Field} from "../types/FormType.tsx";

const FormBuilder = () => {
    const [definedFields, setDefinedFields] = useState<Field[]>([])
    return (
        <div>
            <div>

            </div>
            <div className="flex h-full relative">
                <FieldOptions definedFields={definedFields} setDefinedFields={setDefinedFields}/>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
export default FormBuilder;