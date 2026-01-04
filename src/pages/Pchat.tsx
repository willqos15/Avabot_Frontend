import { useForm } from 'react-hook-form'
import axios from 'axios'
import { IoSend } from "react-icons/io5";
import { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import logo from '../assets/Logofic.png'
import { FaGear } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'



type Dados = {
    mensagem: string
}

interface HistoricoItem {
    quem: string
    mensagem: string
}



export default function Pchat() {

    const navigate = useNavigate()

    const  [xpuser, setXpuser] = useState< "boa" | "ruim">()



    function bomxp() {
    SetXp(true)
    setXpuser("boa")
    console.log(xpuser)
}

    function ruimxp() {
    SetXp(true)
    setXpuser("ruim")
    console.log(xpuser)
}

    const [xp,SetXp] = useState<boolean>(false)
    const [historico, setHistorico] = useState<HistoricoItem[]>([

        { quem: "IA", mensagem: "Como foi sua experiência conosco?" },


    ])

    useEffect(() => {
        if (!localStorage.getItem("id")) {
            const idchat = uuidv4()
            localStorage.setItem("id", idchat)
        }
    }, [])








    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!chatRef.current) return
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }
        , [historico])


    async function enviar(dados: Dados) {
        try {
            reset()
            setHistorico(ant => [...ant, { quem: "você", mensagem: dados.mensagem }])

            const chatid = localStorage.getItem("id")
            const resposta = await axios.post
                ('https://avabot-backend-z5a5.onrender.com/chat',
                //('http://localhost:3000/chat',

                    {
                        id: chatid,
                        mensagem: dados.mensagem,
                        xp: xpuser
                    })
                console.log('id: ', chatid, 'mensagem: ',dados.mensagem, 'xp: ', xpuser)
            console.log(resposta.data.resposta)
            setHistorico(ant => [...ant, { quem: "IA", mensagem: resposta.data.resposta }])
            



        }
        catch (err) { console.log('erro ao cadastrar', err) }
    }

    const { register, handleSubmit, reset } = useForm<Dados>({ mode: "onChange" })

    function gotoadmin() {
        navigate('/admin')
    }

    return (

        <div className='bg-amber-200 text-amber-900 flex flex-col justify-self-center rounded-2xl max-w-lg px-5 
         my-auto h-[90vh]'
        >
            <div className='flex items-center justify-center p-2.5'>
            <img
                className='w-9/12 m-0 p-0'
                src={logo} />
                
                <FaGear
                onClick={gotoadmin}
                 className='text-6xl flex align-middle h-full text-amber-700 cursor-pointer hover:text-amber-900 transition-all 500 duration-300'/>
                
                </div>

            <div className= {xp ? 
            'bg-amber-100 w-full overflow-y-auto p-3 mt-5 rounded-2xl h-11/12':
            'bg-amber-100 w-full overflow-y-auto p-3 rounded-2xl h-11/12 flex flex-col align-middle justify-center'
        
        }
                ref={chatRef}>
                
                
                <div 
                className= {!xp?  "flex flex-col justify-center align-middle gap-2 bg-white rounded-md p-5 px-2": "hidden"} >
                   
                    <p className='text-3xl pb-5'>Como foi sua experiência com nossos serviços?</p>
                    <div className='flex'>

                        
                <button 
                onClick={bomxp} className='bg-green-600 hover:bg-green-800 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md text-4xl'>Boa</button>
                <button
                onClick={ruimxp}
                 className='bg-red-600 hover:bg-red-800 transition-all duration-300 w-fit m-auto px-3 py-2 text-white font-bold rounded-md text-4xl'>Ruim</button>
                </div>
                </div>

                

                {xp && historico.map((x) =>
                    x.quem === "IA" ?

                        <div className='bg-white text-amber-900  my-2 p-2 w-fit mr-0 text-left rounded-lg'>
                            <p className='font-bold text-2xl'> Ana - Atendente da Pet Feliz</p>
                            <p className='text-2xl'>
                                {x.mensagem}</p>
                        </div>

                        :
                        <div className='w-full flex justify-end '>
                            <div className='bg-amber-200 my-2 p-2 w-fit ml-0 rounded-lg'>
                                <p className='text-left wrap-anywhere text-2xl'>
                                    {x.mensagem}</p>
                            </div>
                        </div>
                )

                }
                
            </div>




            <form onSubmit={handleSubmit(enviar)}>

                <div className='flex justify-center align-middle'>

                    <input type='text' autocomplete="off" className='bg-white py-1 px-2 my-3 font-normal w-full rounded-2xl outline-none resize-none text-2xl'
                        

                        {...register("mensagem", { required: true })} />

                    <button type='submit'
                        className=' text-amber-800 pl-4 py-1 my-5 text-xl hover:text-amber-400 transition-all duration-500 rounded-xl'>
                        <IoSend />
                    </button>

                </div>


            </form>

        </div>
    )

}