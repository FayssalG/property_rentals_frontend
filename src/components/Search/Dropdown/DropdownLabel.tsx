'use client'
import React, { ReactNode } from 'react'
import { useDropdown } from './Dropdown';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function DropdownLabel({children,className} : {className:string,children:ReactNode}) {
    const {choosen , isOpen }  = useDropdown();

    return (
        <div  className={cn('flex gap-2 items-center w-full  h-full px-2',className)}>
            <span className='truncate '>{choosen.label=='' ? children : choosen.label}</span>
            {
                !isOpen ?
                <FaChevronDown size={10}/>
                :
                <FaChevronUp size={10}/>
            }
        </div>
            
    )
}
