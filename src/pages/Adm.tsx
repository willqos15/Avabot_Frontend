import { useEffect, useState } from "react"
import axios from "axios"
import { FaHome } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import digitando from '../assets/square-loading.json'
import Lottie from "lottie-react"
import { TiDelete } from "react-icons/ti"
import Poup from "../components/poup"
import { ImHappy2 } from "react-icons/im";
import { ImSad2 } from "react-icons/im";




interface Tipoitem {
    chatid: string
    id: string
    conversa: mensagem[]
    criado: string
    xp: string
}

interface mensagem {
    hora: number
    role: string
    content: string

}






export default function Adm() {

    const [lista, setLista] = useState<Tipoitem[]>([])
    const [modo, setModo] = useState<string>("")
    const [load, setLoad] = useState<boolean>(true)
    const [showdel, setShowDel] = useState<boolean>(false)
    const [delid, setDelId] = useState<string>("")
    const [loaddel, setLoadDel] = useState<boolean>(false)
    const [erro, setErro] = useState<boolean>(false)
    const [qtdboa, setQtdBoa] = useState<number >(0)
    const [qtdruim, setQtdRuim] = useState<number>(0)

    async function puxadb() {
        setLoad(true)

        try {
            const dados = await axios.get
                (`${import.meta.env.VITE_API}/busca`)

            setLista(dados.data.msg)
            setLoad(false)
            setErro(false)
            
      
        }
        catch (err) {
            setLoad(false)
            setErro(true)

        }
    }

    useEffect(
        () => {
           puxadb()
           setTimeout(()=>{
            if (modo==="")setModo("boa")}
            ,100)
            
            
           

        }
        , [])

    useEffect(() => {

         if (!Array.isArray(lista)) return

      
        setQtdBoa(lista.filter(chat => chat.xp === "boa").length)
        setQtdRuim(lista.filter(chat => chat.xp === "ruim").length)
        setTimeout(()=> console.log('boa',qtdboa,'ruim',qtdruim),500)
    }

        , [modo, loaddel, load])




    const navigate = useNavigate()
    function gotohome() {
        navigate('/')
    }



    async function deletarbd(delid: string) {
        setLoadDel(true)

        
        console.log('id:', delid)
        try {
            await axios.delete(`${import.meta.env.VITE_API}/deletar/${delid}`)
            await puxadb()
            setShowDel(false)
            setLoadDel(false)
            setErro(false)
        }

        catch {
            setLoadDel(false)
            setErro(true)
        }

    }

    return (<>



        <div className='bg-amber-200 w-full m-0 p-0 top-0 flex  items-center justify-center lg:justify-between h-20 px-10 fixed z-10'>


            <div className="flex items-center">
                <h1 className="text-4xl font-bold px-10 py-0 m-0 text-amber-800 
        lg:block hidden
        ">PAINEL ADMINISTRATIVO</h1>
            </div>
            <div className="flex items-center ">
                <FaHome onClick={gotohome}
                    className="sm:text-6xl text-5xl sm:mx-5 mx-1 m-0  text-amber-700 cursor-pointer hover:text-amber-900 transition-all duration-300" />
                <button
                    onClick={() => {
                        setModo("boa")
                        // setQtdBoa(lista.filter(chat => chat.xp === "boa").length)
                        window.scrollTo({ top: 0, behavior: 'smooth' })


                    }

                    }

                    className='bg-green-600 hover:bg-green-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md sm:text-3xl text-xl mx-2 cursor-pointer'>Elogios</button>
                <button
                    onClick={() => {
                        setModo("ruim")
                        // setQtdRuim(lista.filter(chat => chat.xp === "ruim").length)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className='bg-red-600 hover:bg-red-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md sm:text-3xl text-xl mx-2 cursor-pointer'>Críticas</button>
            </div>


        </div>

        {showdel &&
            <Poup load={loaddel} titulo="Deseja apagar?" op1="SIM" op2="NÃO" f1={() => deletarbd(delid)} f2={() => setShowDel(false)} />}



        {load &&
            <div className="fixed top-20 w-dvw mx-auto">
                <Lottie
                    className='h-40 color-amber-600'
                    animationData={digitando} loop={true}></Lottie>
            </div>}

        {/* {(!load && !erro && lista.length < 1) &&
            <div className="fixed top-30 w-full text-center text-2xl">
                <p className="bg-amber-50 shadow-xl text-amber-800 rounded-2xl w-fit mx-auto px-5">
                    Nenhum conversa até o momento...</p>
            </div>
            } */}


        {/*  {!load && !erro && modo === "boa" && qtdboa < 1 &&
            <div className="fixed top-30 w-full text-center text-2xl">
                <p className="bg-amber-50 shadow-xl text-amber-800 rounded-2xl w-fit mx-auto px-5">
                    Nenhum elogio encontrado...</p>
            </div>
        }

        {!load && !erro && modo === "ruim" && qtdruim < 1&&
            <div className="fixed top-30 w-full text-center text-2xl">
                <p className="bg-amber-50 shadow-xl text-amber-800 rounded-2xl w-fit mx-auto px-5">
                    Nenhum crítica encontrada...</p>
            </div>
        } */}

        {erro &&
            <div className="fixed top-30 w-full text-center text-2xl">
                <p className="bg-amber-50 shadow-xl text-amber-800 rounded-2xl w-fit mx-auto px-5">
                    Erro ao carregar...</p>
            </div>}

        <div className="grid 
    xl:grid-cols-3
    lg:grid-cols-3
    md:grid-cols-2
    grid-cols-1
    sm:w-fit
    gap-4 my-32 w-full py-0
    mx-auto
    px-0 place-items-center
    ">

{!load && modo==="boa" &&

<div className="
xl:col-span-3
lg:col-span-3
md:col-span-2
sm:col-span-1
 text-white text-3xl bg-green-600 px-4 py-2 rounded-xl"
> 

<div className="flex justify-center items-center">
   <ImHappy2 className="mx-4"/>
   <p className="font-monoNumber text-sm sm:text-xl"> <strong> {qtdboa===0 ? "0": ((qtdboa*100)/(qtdboa+qtdruim)).toFixed(2)}% de elogios </strong></p></div>
    <p className="sm:text-xl text-base text-center"> {qtdboa} a cada {qtdboa+qtdruim} clientes satisfeitos.</p>
</div>}


{!load && modo==="ruim" &&

<div className="
xl:col-span-3
lg:col-span-3
md:col-span-2
sm:col-span-1
 text-white text-3xl bg-red-600 px-4 py-2 rounded-xl "
> 

<div className="flex justify-center items-center">
   <ImSad2 className="mx-4"/>
   <p className="font-monoNumber text-base sm:text-xl"> <strong> {qtdruim===0 ? "0": ((qtdruim*100)/(qtdboa+qtdruim)).toFixed(2)}% de críticas </strong></p></div>
    <p className="text-center text-sm sm:text-xl"> {qtdruim} a cada {qtdboa+qtdruim} clientes insatisfeitos.</p>
</div>}


            {!load && Array.isArray(lista) &&
                lista.filter(chat => chat.xp === modo).map((chat: Tipoitem) =>

                (
                    <div className={chat.xp === "boa" ? 'bg-green-600 flex flex-col justify-center sm:rounded-2xl  xl:w-96 lg:w-80 md:w-80 w-full sm:px-5 px-2 my-0 mx-0 h-fit rounded-none'

                        :
                        'bg-red-600 flex flex-col justify-center sm:rounded-2xl  xl:w-96 lg:w-80 md:w-80 w-full sm:px-5 px-2 my-0 mx-0 h-fit rounded-none'
                    }>

                        <div className="flex items-center justify-between pt-4">
                            <div className="w-full">
                                <p className="sm:text-lg text-base font-bold text-white px-4"> {chat.chatid} </p>

                                <div className="flex justify-between w-full whitespace-nowrap px-4">
                                    
                                    <p className="sm:text-base text-base font-bold text-white">{new Date(chat.criado).toLocaleDateString("pt-BR")}    </p>

                                    <p className="sm:text-base text-base font-bold text-white">
                                        Hora: {new Date(chat.criado).toLocaleTimeString("pt-BR")}
                                    </p>
                                </div>

                            </div>

                            <TiDelete
                                onClick={() => {
                                    setShowDel(true)
                                    setDelId(chat.id)
                                }}
                                className="text-red-500 
            hover:text-red-700 sm:mx-0 mx-5
            text-4xl items-center bg-white rounded-full"/>
                        </div>

                        <div className='bg-amber-100 w-full overflow-y-auto h-96 px-3 my-5 sm:rounded-2xl rounded-none' >




                            {chat.conversa.map(msg =>

                                <div className={msg.role === "user" ?
                                    'bg-amber-200 text-amber-900 my-2 p-2 w-fit ml-0 rounded-lg'
                                    :
                                    'bg-white text-amber-900  my-5 p-2 w-fit mr-0 text-left rounded-lg'

                                }>
                                    <p
                                        className="text-left sm:text-2xl text-base">
                                        <strong>

                                            {msg.role === "user" ? 'Cliente: ' : 'IA: '} </strong>
                                        {msg.content}</p>
                                </div>
                            )}



                        </div>
                    </div>
                ))

            }



        </div>

    </>)
}