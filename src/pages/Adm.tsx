import { useEffect, useState } from "react"
import axios from "axios"
import { FaHome } from "react-icons/fa"
import {useNavigate} from 'react-router-dom'

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
    const [modo,setModo] = useState<string>("boa")


    async function puxadb() {

        try {
            const dados = await axios.get
            ('https://avabot-backend-z5a5.onrender.com/busca')

            console.log(dados.data)
            setLista(dados.data.msg)
            console.log('execut')
        }
        catch(err) {
            console.log('erro', err)
        }
    }

    useEffect(
        () => { puxadb() }
        , [])

        const navigate = useNavigate()
        function gotohome(){
            navigate('/')
        }

    return (<>

<div className='bg-amber-200 w-full m-0 p-0 fixed top-0 flex  items-center justify-between h-20 px-10'>

    
    <div className="flex">
        <h1 className="text-4xl font-bold px-10 py-0 m-0 text-amber-800">PAINEL ADMINISTRATIVO</h1> 
    </div>
    <div className="flex">
    <FaHome onClick={gotohome}
    className="text-6xl mx-5 m-0 text-amber-800"/>
    <button
    onClick={()=>setModo("boa")}
    className='bg-green-600 hover:bg-green-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md text-3xl mx-2'>Elogios</button>
    <button
    onClick={()=>setModo("ruim")}
    className='bg-red-600 hover:bg-red-700 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md text-3xl mx-2'>Reclamações</button>
    </div>
    

    </div>

    
    <div className="grid grid-cols-3 gap-3 my-32 max-w-6xl h-fit">

    {
    lista.filter(chat => chat.xp === modo).map(chat => 
        
        (
            
        
            <div className = {chat.xp==="boa" ?'bg-green-600 flex flex-col rounded-2xl max-w-lg px-5 my-5 h-fit'
                :
            'bg-red-600 flex flex-col rounded-2xl max-w-lg px-5 my-5 h-fit'
                }> 
            <p className="pt-4 text-3xl font-bold text-white"> ID: {chat.id} - DATA: {new Date(chat.criado).toLocaleDateString("pt-BR")}    </p> 
            <div className='bg-amber-100 w-full overflow-y-auto h-96 px-3 my-5 rounded-2xl' >

            
            
            
            {chat.conversa.map(msg=>
                        
                        <div className= {msg.role==="user"? 
                        'bg-amber-200 text-amber-900 my-2 p-2 w-fit ml-0 rounded-lg'
                        :
                        'bg-white text-amber-900  my-5 p-2 w-fit mr-0 text-left rounded-lg'
                        
                        }>
                        <p
                        className="text-left text-2xl">
                          <strong> 
                            
                            {msg.role === "user"? 'Cliente: ' : 'IA: '} </strong> 
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