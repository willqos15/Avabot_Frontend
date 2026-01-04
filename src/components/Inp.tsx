// passa uma Ref de componente pro pai
import { forwardRef } from "react"

//fala que todas as props do componentes são igual ao do input + label 
interface propriedades 
extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string
}

// o ...rest representa todas as props originais do input e deve ser colocado no final
function Inp({ label, ...rest }: propriedades, ref: React.Ref<HTMLInputElement>)
 {

    return (
    <div className="flex justify-start py-2">


        <label className="text-amber-900 pr-4 whitespace-nowrap">

            {label}:
        </label>

        <input
         ref= {ref}
         {...rest}
        className='bg-yellow-100 py-1 px-2 font-normal w-full' />
        

    </div>)
}

export default forwardRef(Inp)