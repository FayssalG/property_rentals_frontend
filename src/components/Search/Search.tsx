'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import AutoComplete from './AutoComplete/AutoComplete'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


export default function Search({className} : {className?:string}) {
  const router = useRouter();
  const {data , isLoading , refetch} = useQuery({
    queryKey : ['autocomplete'],
    queryFn : ()=>{
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations-autocomplete?name_like=${debouncedSearchValue.toLowerCase().trim()}`).then((res)=>res.json());
    },
    enabled:false     
  })



  const [searchValue , setSearchValue] = useState<string>('');
  const [debouncedSearchValue , setDebouncedSearchValue] = useState<string>('');
  
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const [showAutoComplete , setShowAutoComplete] = useState<boolean>(false);
  
  //handling autocomplete result selection using arrowup and arrowdown
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemsRefs = useRef([]);
  const [selectedIndex , setSelectedIndex] = useState(-1);

  const handleKeyDown = (e) => {
      if(e.key == 'ArrowDown'){
          setSelectedIndex((prevIndex)=>{
              const newValue = prevIndex+1;
              if(listItemsRefs.current.length <= newValue) return prevIndex
              return newValue;
          })
      }

      if(e.key == 'ArrowUp'){
          setSelectedIndex((prevIndex)=>{
              const newValue = prevIndex-1;
              if(newValue < 0) {
                return prevIndex
              }
              return newValue;
          })
      }

      if(e.key == 'Enter'){
          if(selectedIndex >= 0 && selectedIndex < listItemsRefs.current.length){
            const href = (listItemsRefs.current[selectedIndex].children[1].href);
            router.push(href);
          }
      }
  }


  const handleChooseFromAutoComplete = (location : string)=>{
    setSearchValue(location);
    setShowAutoComplete(false);
  }

  const handleTyping = (e)=>{
    setShowAutoComplete(true)
    setSearchValue(e.target.value);
  }


  useEffect(()=>{
    if(!searchValue) setShowAutoComplete(false);
    
    const timeoutId = setTimeout(()=>{
        setDebouncedSearchValue(searchValue);
    },1000)

    return ()=>clearTimeout(timeoutId);
  },[searchValue])

  useEffect(()=>{
    if(debouncedSearchValue){
      refetch()
    }
  },[debouncedSearchValue])

  useEffect(()=>{
    const handleClickAway = (e)=>{
      if(!autoCompleteRef.current?.contains(e.target)) setShowAutoComplete(false);
    }

    if(autoCompleteRef.current) {
      document.addEventListener('click',handleClickAway)
    }

    if(showAutoComplete){
      document.body.style.overflowY = 'hidden'
    }else{
      document.body.style.overflowY = 'revert'
    }
    return ()=>document.removeEventListener('click' , handleClickAway)
  },[showAutoComplete])

  return (
    <div onKeyDown={handleKeyDown} className={cn('relative',className)}>        
        <div className={cn('relative text-sm flex items-center min-w-12 ps-4 py-1 pe-1 z-40  bg-white rounded-full h-full')}>
            <input ref={inputRef} value={searchValue} onInput={handleTyping} type="text" className='min-w-0 grow bg-transparent focus:outline-none' placeholder='Ou chercher vous ?' />
           
            {/* <Dropdown onChange={handleSelectChange} className='h-full border-s-[.1rem] border-slate-200 font-thin text-xs shadow-sm bg-white rounded-l-full sm:text-sm lg:text-lg '>
                <DropdownLabel className='text-gray-500'>type de propriété</DropdownLabel>
                <DropdownElements className='drop-shadow bg-white'>
                    <DropdownElement index={0} value={'appratement'}>Appartement</DropdownElement>
                    <DropdownElement index={1} value={'maison'}>Maison</DropdownElement>
                    <DropdownElement index={2} value={'garage'}>Garage</DropdownElement>
                </DropdownElements>
            </Dropdown> */}

            {/* <button className='h-full bg-red-500 text-white w-12 flex items-center justify-center  rounded-full '>
                <FiSearch/>
            </button> */}
            
            <div className='h-full w-12 flex items-center justify-center '>
                <FiSearch/>
            </div>

        </div>
        {showAutoComplete && <AutoComplete searchValue={searchValue} selectedIndex={selectedIndex} listItemsRefs={listItemsRefs} isLoading={isLoading} ref={autoCompleteRef} data={data}/>}

    </div>
  )
}
