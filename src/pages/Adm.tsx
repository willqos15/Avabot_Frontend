import { useEffect, useState } from "react"
import axios from "axios"
import { FaHome } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import digitando from '../assets/square-loading.json'
import Lottie from "lottie-react"
import { TiDelete } from "react-icons/ti"
import Poup from "../components/poup"


interface Tipoitem {
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
    const [modo, setModo] = useState<string>("boa")
    const [load, setLoad] = useState<boolean>(true)
    const [showdel,setShowDel] = useState<boolean>(false)
    const [delid, setDelId] = useState<string>("")
    const [loaddel, setLoadDel] = useState<boolean>(false)

    async function puxadb() {
        setLoad(true)

        try {
            const dados = await axios.get
                ('https://avabot-backend-z5a5.onrender.com/busca')

            setLista(dados.data.msg)
            setLoad(false)
        }
        catch (err) {
            setLoad(false)
        }
    }

    useEffect(
        () => { puxadb() }
        , [])

    const navigate = useNavigate()
    function gotohome() {
        navigate('/')
    }

 

    async function deletarbd(delid:string) {
        setLoadDel(true)
        console.log('id:', delid)
        try {
            await axios.delete(`https://avabot-backend-z5a5.onrender.com/deletar/${delid}`)
            puxadb()
            console.log('deletado')
            setShowDel(false)
            setLoadDel(false)
        }

        catch {
            setLoadDel(false) }

    }

    return (<>

    {showdel && 
        <Poup load={loaddel}titulo="Deseja apagar?" op1="SIM" op2="NÃO" f1={()=>deletarbd(delid)} f2={()=>setShowDel(false)} /> }

        <div className='bg-amber-200 w-full m-0 p-0 fixed top-0 flex  items-center justify-center lg:justify-between h-20 px-10'>


            <div className="flex items-center">
                <h1 className="text-4xl font-bold px-10 py-0 m-0 text-amber-800 
        lg:block hidden
        ">PAINEL ADMINISTRATIVO</h1>
            </div>
            <div className="flex items-center ">
                <FaHome onClick={gotohome}
                    className="sm:text-6xl text-5xl sm:mx-5 mx-1 m-0  text-amber-700 cursor-pointer hover:text-amber-900 transition-all duration-300" />
                <button
                    onClick={() => setModo("boa")}
                    className='bg-green-600 hover:bg-green-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md sm:text-3xl text-xl mx-2 cursor-pointer'>Elogios</button>
                <button
                    onClick={() => setModo("ruim")}
                    className='bg-red-600 hover:bg-red-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md sm:text-3xl text-xl mx-2 cursor-pointer'>Críticas</button>
            </div>


        </div>

        

        {load &&
            <Lottie
                className='h-40 color-amber-600 mt-32'
                animationData={digitando} loop={true}></Lottie>}

        <div className="grid 
    xl:grid-cols-3
    lg:grid-cols-2
    md:grid-cols-1
    gap-3 my-32 max-w-6xl h-fit">

            {!load &&
                lista.filter(chat => chat.xp === modo).map((chat: Tipoitem) =>

                (


                    <div className={chat.xp === "boa" ? 'bg-green-600 flex flex-col justify-center rounded-2xl max-w-lg px-5 my-5 h-fit'
                        :
                        'bg-red-600 flex flex-col rounded-2xl max-w-lg px-5 my-5 h-fit'
                    }>

                        <div className="flex items-center justify-between">
                            <p className="pt-4 text-2xl font-bold text-white"> ID: {chat.id} - DATA: {new Date(chat.criado).toLocaleDateString("pt-BR")}    </p>

                            <TiDelete
                                onClick={() => { 
                                    setShowDel(true)
                                    setDelId(chat.id) }}
                                className="text-red-500 
            hover:text-red-700
            text-4xl mt-4 m-0 items-center bg-white rounded-full"/>
                        </div>

                        <div className='bg-amber-100 w-full overflow-y-auto h-96 px-3 my-5 rounded-2xl' >




                            {chat.conversa.map(msg =>

                                <div className={msg.role === "user" ?
                                    'bg-amber-200 text-amber-900 my-2 p-2 w-fit ml-0 rounded-lg'
                                    :
                                    'bg-white text-amber-900  my-5 p-2 w-fit mr-0 text-left rounded-lg'

                                }>
                                    <p
                                        className="text-left text-2xl">
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