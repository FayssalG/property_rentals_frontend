import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Dropdown from './Dropdown/Dropdown'
import DropdownLabel from './Dropdown/DropdownLabel'
import DropdownElements, { DropdownElement } from './Dropdown/DropdownElements'
import { cn } from '@/lib/utils'
import AutoComplete from './AutoComplete/AutoComplete'
import { useQuery } from '@tanstack/react-query'

export default function Search({className} : {className?:string}) {
  const {data , isLoading , refetch} = useQuery({
    queryKey : ['autocomplete'],
    queryFn : ()=>{
      return fetch(`http://localhost:4000/locations-autocomplete?name_like=${debouncedSearchValue.toLowerCase().trim()}`).then((res)=>res.json());
    },
    enabled:false     
  })



  const [searchValue , setSearchValue] = useState<string>('');
  const [selectValue , setSelectValue]  = useState<string>('');
  const [debouncedSearchValue , setDebouncedSearchValue] = useState<string>('');
  
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const [showAutoComplete , setShowAutoComplete] = useState<boolean>(false);
  
  const handleChooseFromAutoComplete = (location : string)=>{
    setSearchValue(location);
    setShowAutoComplete(false);
  }

  const handleTyping = (e)=>{
    setShowAutoComplete(true)
    setSearchValue(e.target.value);
  }

  const handleSelectChange = (value:string)=>{
    setSelectValue(value);
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
    <div className={cn('relative',className)}>        
        <div className={cn('relative text-sm flex items-center min-w-12 ps-4 py-1 pe-1 z-40  bg-white rounded-full h-full')}>
            <input value={searchValue} onInput={handleTyping} type="text" className='min-w-0 grow bg-transparent focus:outline-none' placeholder='Ou chercher vous ?' />
           
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
        {showAutoComplete && <AutoComplete isLoading={isLoading} onChoose={handleChooseFromAutoComplete} Ref={autoCompleteRef} data={data}/>}

    </div>
  )
}
