import type {normalBtnType} from "../../types/FormType.tsx";

const NormalBtn = ({type = "button", disabled = false, onClick, color = "bg-gray-800", title = ""}: normalBtnType) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`h-[30px] sm:h-[34px] w-[80px] cursor-pointer flex gap-1 sm:gap-2 items-center justify-center text-[11px] sm:text-xs rounded-md ${color} text-white`}>
            {title}
        </button>
    )
}
export default NormalBtn;