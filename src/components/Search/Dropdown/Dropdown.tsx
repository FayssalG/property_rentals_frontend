'use client'

import { cn } from '@/lib/utils'
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

interface IdropdownValue  {
    listItemsRefs : HTMLLIElement[],
    selectedIndex : number,
    setSelectedIndex : Function,
    choosen : {value:string , label:string},
    isOpen:boolean,
    handleDrop : Function,
    handleChoose : Function,
}

const dropdownContext = createContext<Idropdown>(null);
export const useDropdown = ()=>{
    return useContext(dropdownContext);
}

export default function Dropdown({children , className , onChange} : {onChange:Function,children:ReactNode,className:string}) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listItemsRefs = useRef<HTMLLIElement[]>([]);
    const [choosen , setChoosen] = useState({value:'' , label:''});
    const [selectedIndex , setSelectedIndex] = useState(-1);

    const [isOpen , setIsOpen] = useState(false);

    const handleKeyDown = (e)=>{

        if(e.key == 'ArrowDown'){
            setSelectedIndex((prevIndex)=>{
                const newValue = (prevIndex+1);
                if (newValue  >= listItemsRefs.current.length) return prevIndex;
                return newValue;
            })            
        }

        if(e.key == 'ArrowUp'){
            setSelectedIndex((prevIndex)=>{
                const newValue = (prevIndex-1)
                if (newValue < 0) return prevIndex
                return newValue
            })            
        }

        if(!isOpen && e.key == 'Enter'){
            setIsOpen(true);
        }
    }

    const handleDrop = (e)=>{
        setIsOpen(!isOpen);
        
    }

    const handleChoose = (e)=>{
        setChoosen({value:e.target.dataset.value , label:e.target.innerText});
        onChange(e.target.dataset.value);
        setIsOpen(false);
    }

    useEffect(()=>{
        //prevent tab from changing focus
        const handleTabKey = (e)=>{
            if(isOpen && e.key=='Tab') {
                e.preventDefault();
            }
        }
        dropdownRef.current?.addEventListener('keydown' , handleTabKey)

        //click outside of the dropdown
        const handleClickAway = (e)=>{
            if(!dropdownRef.current?.contains(e.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('click' , handleClickAway)

        return ()=>{
            dropdownRef.current?.removeEventListener('keydown' , handleTabKey)
            document.removeEventListener('click' , handleClickAway)
        } 
    },[isOpen,selectedIndex])

    useEffect(()=>{
        if(listItemsRefs.current[selectedIndex]){
          listItemsRefs.current[selectedIndex].focus();
        }
    },[selectedIndex])

    
    const value : IdropdownValue = {handleDrop,handleChoose,choosen,isOpen,listItemsRefs,selectedIndex,setSelectedIndex} 

    return (
    <dropdownContext.Provider value={value}>
        <div tabIndex={0} 
            onKeyDown={handleKeyDown} 
            onClick={handleDrop} 
            ref={dropdownRef}
            className={cn('relative  flex items-center select-none cursor-pointer   ',className)}
        >
            {children}
        </div>
    </dropdownContext.Provider>

    )
}
