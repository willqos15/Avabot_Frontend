import { useForm } from 'react-hook-form'
import axios from 'axios'
import Inp from '../components/Inp'

type Dados = {
    nome?: string
    contato?: string
    tipo: string
    descricao: string
}


export default function Pprincipal() {

    async function enviar(dados: Dados) {
        console.log(dados)
        try {
            await axios.post('http://localhost:3000/cadastrar', dados)
            console.log('cadastro feito com sucesso')
        }
        catch { console.log('erro ao cadastrar') }
    }

    const { register, handleSubmit, formState:{errors} } = useForm<Dados>({ mode: "onChange" })

    return (<>

        <div className='bg-amber-200 text-amber-900 font-bold p-3 flex flex-col rounded-2xl'>

            <h1>Queremos te ouvir:</h1>
            <form onSubmit={handleSubmit(enviar)}>
                <br />
                <Inp type='text' label='Seu nome (Opcional)' placeholder='Digite seu nome aqui'
                    {...register("nome")} />

                <Inp type='text' label='Contato (Opcional)' placeholder='55 (93) 0000-0000'
                    {...register("contato")} />
                
                <hr className='my-5'/>
                <label className='size-2rem'>O que você precisa falar é sobre: </label>
                <div className='flex flex-row align-middle justify-center gap-20'>
                    <Inp type='radio' 
                    label='Sugestão de melhoria' value='sugestao'
                        {...register("tipo", {required:true})} />

                    <Inp type='radio'
                    label='Algo que podemos ajustar' value='reclamacao'
                        {...register("tipo", {required:true})} />
                </div>
                {errors.tipo && <p className='text-red-600'> Campo Obrigatório</p>}
                 <hr className='my-5'/>

                <label>Conte como foi a sua experiência: </label>
                <textarea className='bg-yellow-100 py-1 px-2 mt-3 font-normal w-full' {...register("descricao", {required: true})}/>
                {errors.descricao && <p className='text-red-600'>Campo Obrigatório</p>}

                <input type='submit' value='Enviar Mensagem' className='bg-amber-800 text-amber-100 px-4 py-1 mt-5 text-xl hover:bg-amber-400 hover:text-amber-800 transition-all duration-500 rounded-xl'/>

            </form>

        </div>
    </>)

}