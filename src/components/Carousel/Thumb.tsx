'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void,
  photo : string
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick , photo} = props


  return (
    <div
      className={cn('min-w-0 grow-0 shrink-0 basis-[21%]')}
    >
      <button
        onClick={onClick}
        type="button"
        className={cn("w-full flex justify-center items-center rounded-lg my-2",selected ?'outline ouline-1 outline-offset-2 outline-green-500':'')}
      >
          <Image 
              alt={photo} 
              width={0}
              height={0}
              sizes='100vw'
              style={{width:'100%',height:'100%'}}
              className={cn("rounded-lg object-cover",selected?'opacity-50':'')} 
              src={photo}/>
      </button>
    </div>
  )
}
