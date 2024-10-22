'use client'
import { cn } from "@/lib/utils"
import Search from "../Search/Search"


interface IHeaderProps {
    className: string 
}

export default function Header({className}:IHeaderProps) {
  return (
    <>

        <div 
          className={
            cn(" flex flex-col gap-4 border border-x-0 border-b-[.1rem] bg-white items-center w-full px-2 py-8 z-20 justify-between  sm:fixed sm:top-0 sm:flex-row sm:h-20 ",
              className)}
        >
          
          <div className="logo">
            <p className="text-xl font-bold w-fit mx-auto sm:mx-0">Logo</p>
          </div>

          <div 
            className={cn('h-10 sm:grow-1 w-5/6 sm:w-fit')}  
          >
            <Search className={`h-full w-full text-sm shadow-sm rounded-full text-slate-500 sm:text-lg`}/>
          </div>

        </div>

    </>
  )
}
