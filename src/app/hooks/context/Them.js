"use client"
import { createContext,useState } from "react";


export const Theme = createContext()


export const Themeprovider = ({children})=>{
    const [mode,setmode] = useState("bg-white text-black")
    const [top,settop] =useState('bg-green-800 text-white')
    const toggle = ()=>{
        setmode(priv=> (priv === "bg-white text-black" ? "bg-black text-white" : "bg-white text-black" ))
        settop(priv=>(priv === 'bg-green-800 text-white'?'bg-black-800 text-white shadow-gray-500 shadow-sm' :"bg-green-800 text-white"))
    }
    return(
        <Theme.Provider value={{mode,top,toggle}}>
            <div className={`${mode} p-4`}>
            {children}
            </div>
            
        </Theme.Provider>
    )
}