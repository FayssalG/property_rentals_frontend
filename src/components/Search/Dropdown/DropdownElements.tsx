'use client'

import React, { ReactNode, useEffect } from 'react'
import { useDropdown } from './Dropdown'
import { cn } from '@/lib/utils';

export default function DropdownElements({children , className}:{children:ReactNode,className:string}){
  const {isOpen } = useDropdown();

  return (
    <>
      {      
        isOpen &&
        <div className={cn('absolute animate-drop-down  min-w-fit w-full top-[110%]	p-2 rounded-lg',className)}>
          <ul className='[&>li]:cursor-pointer [&>li]:transition-colors ease-in-out  [&>li:hover]:bg-gray-100 [&>li]:rounded-md [&>li]:px-2 '> 
            {children}
          </ul>
        </div>
      }
    </>
  )
}

export function DropdownElement({children , value , index}:{children:ReactNode,value:string , index:number}) {
  const {handleChoose , listItemsRefs,selectedIndex,setSelectedIndex } = useDropdown();

  const handleClick = (e)=>{
    setSelectedIndex(index);
    handleChoose(e);
  }

  useEffect(()=>{
    listItemsRefs.current[index].addEventListener('keydown' , (e)=>{
        if(e.key == 'Enter'){
          handleChoose(e);
        }
    })
  },[])

  return (
      <li className={cn(`text-sm ${selectedIndex==index ? 'bg-gray-100 outline-none' : ''}`,'mb-1')  } ref={(el)=>(listItemsRefs.current[index] = el)} tabIndex={0} data-value={value} onClick={handleClick}>{children}</li>
  )
}
