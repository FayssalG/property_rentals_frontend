'use client'

import parse from 'html-react-parser';
import { cn } from "@/lib/utils"
import { LoaderPinwheel } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useRef, useState } from "react"
import { CiLocationOn } from "react-icons/ci"

export default function AutoComplete({Ref , data, isLoading , listItemsRefs , selectedIndex , searchValue} ) {




    if(!data?.length) return null
    
    return (
        <div ref={Ref} className='absolute  drop-shadow overflow-y-hidden w-full z-20 bg-white left-0 top-0 rounded-b-lg rounded-t-3xl '>
            <ul className='border-t-[.02rem] overflow-y-auto max-h-52 pt-12  flex flex-col gap-1'>
                {
                    isLoading && <LoaderPinwheel className="animate-spin"/>
                }
                {   
                    data?.map((location , index : number)=>{
                        const regex = new RegExp(searchValue,'i');
                        let locationName = location.name.charAt(0).toUpperCase() + location.name.slice(1);
                        locationName = locationName.replace( regex, '<strong>'+locationName.match(regex)+'</strong>');

                        return(
                        <li ref={(el)=>listItemsRefs.current[index] = el} 
                            className={cn('hover:bg-slate-200  flex items-center gap-2  py-1 px-2',selectedIndex==index ? 'bg-slate-200' : '')}
                            
                        >
                            <CiLocationOn />
                            <Link href={'/'+location.slug} className=''>
                                {
                                    parse(locationName)
                                } {location?.city && <span>({location.city.name})</span>}
                            </Link>
                        </li>
                        )
                    })
                }                
            </ul>
        </div>

    )
}
