

interface propriedades{
    titulo: string
    op1: string
    op2: string
    f1: ()=> void
    f2: () => void
    load:boolean
    


}

const Poup: React.FC<propriedades> =({load,titulo,op1,op2,f1,f2})=>{
    return(<>
    <div className="fixed inset-0 flex items-center justify-center z-10"
    style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>

    <div className="
    mt-32 bg-amber-200 h-40 py-2 rounded-xl flex flex-col items-center justify-center px-7">
            <h2 className="font-bold text-4xl text-amber-800 mb-3">
                {load? "Carregando...": titulo}
            </h2>

            {!load  &&
            <div className="flex gap-5 justify-center">
            <button
            onClick={()=> {
                if (load) return
                if (!load) f1()}}
            className="text-3xl bg-amber-700 font-bold py-1 px-3 rounded-xl text-amber-100
            hover:bg-amber-800
            hover:text-white
            transition-all
            duration-300
            ">
                {op1}
            </button>

            <button
            onClick={f2}
            className="text-3xl bg-amber-700 font-bold py-1 px-3 rounded-xl text-amber-100
            hover:bg-amber-800
            hover:text-white
            transition-all
            duration-300
            ">
                {op2}
            </button>
            </div>
            }
        </div>
        </div>
    
    </>)
}

export default Poup
