'use client'
import { cn } from "@/lib/utils"
import Search from "../Search/Search"
import Image from "next/image"
import Link from "next/link"


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
          
          <div className="relative">
            <Link href='/' className="absolute w-full h-full"/>
            <Image className="text-white" src='/images/logo.svg' width={100} height={100} alt="Logo"/>
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
