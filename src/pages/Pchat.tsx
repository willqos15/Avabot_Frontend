import { useForm } from 'react-hook-form'
import axios from 'axios'
import { IoSend } from "react-icons/io5";
import { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import logo from '../assets/Logofic.png'
import { FaGear } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
import Lottie from 'lottie-react';
import digitando from '../assets/square-loading.json'
import { ImSad2 } from "react-icons/im";
import { ImHappy2 } from "react-icons/im";




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
    const [load, setLoad] = useState<boolean>(false)
    const [showload,setShowLoad] = useState<boolean>(false)



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
            if(load) return
        try {
            reset()
            setLoad(true)
            console.log(load)
            setShowLoad(true)
            
            setHistorico(ant => [...ant, { quem: "você", mensagem: dados.mensagem }])

            const chatid = localStorage.getItem("id")
            const resposta = await axios.post
                (`${import.meta.env.VITE_API}/chat`,
                //('http://localhost:3000/chat',

                    {
                        id: chatid,
                        mensagem: dados.mensagem,
                        xp: xpuser
                    })
                console.log('id: ', chatid, 'mensagem: ',dados.mensagem, 'xp: ', xpuser)
            setHistorico(ant => [...ant, { quem: "IA", mensagem: resposta.data.resposta }])
            setLoad(false)
            setShowLoad(false)
        

        }
        catch { setLoad(false) 
            setShowLoad(false)
        }
    }

    const { register, handleSubmit, reset } = useForm<Dados>({ mode: "onChange" })

    function gotoadmin() {
        navigate('/admin')
    }

    return (
        <div className='h-svh flex items-center justify-center'>
        
        <div className='bg-amber-200 text-amber-900 flex flex-col justify-self-center rounded-2xl md:max-w-lg px-5 my-auto 
        h-[92svh] min-h-[90svh] max-h-[95svh]
        sm:max-w-full'>
            <div className='flex items-center justify-center p-2.5'>
            <img
                className='w-9/12 mt-3 p-0'
                src={logo} />
                
                <FaGear
                onClick={gotoadmin}
                 className='text-6xl flex align-middle h-full text-amber-700 cursor-pointer hover:text-amber-900 transition-all 500 duration-300'/>
                
                </div>



            <div className= {xp ? 
            'bg-amber-100 w-full overflow-y-auto p-3 mt-5 rounded-2xl h-11/12':
            'bg-amber-100 w-full overflow-y-auto p-3 rounded-2xl h-11/12 flex flex-col align-middle justify-center'}
                ref={chatRef}>
                
                
                <div 
                className= {!xp?  "flex flex-col justify-center align-middle gap-2 bg-white rounded-md p-5 px-2": "hidden"} >
                   
                    <p className='text-3xl pb-5 text-center'>Como foi sua experiência com nossos serviços?</p>
                    <div className='flex gap-10 justify-center'>

                        
                <button 
                onClick={bomxp} className='bg-green-600 hover:bg-green-800 transition-all duration-300 w-fit px-5 py-2 text-white font-bold rounded-md text-6xl'>

                    <ImHappy2/>
                </button>
                <button
                onClick={ruimxp}
                 className='bg-red-600 hover:bg-red-800 transition-all duration-300 w-fit px-5 py-2 text-white font-bold rounded-md text-6xl'>

                    <ImSad2/>
                 </button>
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

                
                
                {showload &&
                
                <Lottie
                className='h-40 color-amber-600'
                animationData={digitando} loop={true}></Lottie>

                }
                
            </div>




            <form autoComplete='off' onSubmit={handleSubmit(enviar)}>

                <div className='flex justify-center align-middle'>

                    <input autoComplete='off' type='text'  className='bg-white py-1 px-2 my-3 font-normal w-full rounded-2xl outline-none resize-none text-2xl'
                        

                        {...register("mensagem", { required: true })} />

                    <button type='submit'
                        className= {load? "text-amber-200 pl-4 py-1 my-5 text-xl hover:text-amber-200 transition-all duration-500 rounded-xl": "text-amber-800 pl-4 py-1 my-5 text-xl hover:text-amber-600 transition-all duration-500 rounded-xl cursor-pointer"}>
                        <IoSend />
                    </button>

                </div>


            </form>

        </div>
        </div>
    )

}