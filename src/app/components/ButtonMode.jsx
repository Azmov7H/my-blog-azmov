"use client"
import React, { useContext } from 'react'
import { Theme } from '../hooks/context/Them'


export default function ButtonMode() {
    const {mode,toggle} = useContext(Theme)

    return (
        <div className="p-4 text-center right-1  fixed md:right-4 bottom-4">
            <button 
                onClick={toggle} 
                className="text-white bg-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition"
            >
                {mode === "bg-black text-white" ? "🌜" :"🌞" }
            </button>
        </div>
    )
}
