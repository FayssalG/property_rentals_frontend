'use client'

import { LoaderPinwheel } from "lucide-react"
import Link from "next/link"
import { CiLocationOn } from "react-icons/ci"

export default function AutoComplete({Ref , data, isLoading , onChoose} ) {

    if(!data?.length) return null
    return (
        <div ref={Ref} className='absolute  drop-shadow overflow-y-hidden w-full z-20 bg-white left-0 top-0 rounded-b-lg rounded-t-3xl '>
            <ul className='border-t-[.02rem] overflow-y-auto max-h-52 pt-12  flex flex-col gap-1'>
                {
                    isLoading && <LoaderPinwheel className="animate-spin"/>
                }
                {   
                    data?.map((location)=>
                        <li className='hover:bg-slate-200  flex items-center gap-2  py-1 px-2'>
                            <CiLocationOn />
                            <Link href={'/'+location.slug} className=''>
                                {location.name} {location?.city && <span>({location.city.name})</span>}
                            </Link>
                        </li>
                    )
                }                
            </ul>
        </div>

    )
}
