'use client'

import React from "react";
import Card, { CardSkeleton } from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NavigationMenu, navigationMenuTriggerStyle, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";


interface IHomepageProps {
  properties : Property[]
}

export default function Homepage({properties} : IHomepageProps ) {

  
    const {isPending , error , data} = useQuery({
      queryKey:['houses'] , 
      queryFn: ()=>fetch('http://localhost:4000/houses?_limit=8').then(res=>res.json()),
      initialData:properties
    });

    
    const [isScrolled , setIsScrolled] = useState<boolean>(false);
    
    useEffect(()=>{
      const handleScroll = ()=>{
        if(window.scrollY > 400) setIsScrolled(true);
        if(window.scrollY === 0) setIsScrolled(false)
        
      }
      window.addEventListener('scroll' , handleScroll);

      return ()=>removeEventListener('scroll' , handleScroll);
    },[])
  
    
    if(error) return 'error occured '+error.message;
    
    return (
      <div className="">
      
        <div 
          className={
            cn("fixed  top-0 flex flex-col gap-4 border-slate-200 border-b-[.1rem]   items-center  p-2 w-full h-28 z-20 justify-center bg-white sm:sticky sm:justify-between sm:flex-row sm:transition-color sm:transition-size sm:duration-200 sm:h-2/5 sm:max-h-full",
              isScrolled ? 
                " sm:h-20 sm:max-h-28" : 
                `
                  sm:static sm:bg-cover
                  sm:after:content-[''] sm:after:w-full sm:after:h-full sm:after:bg-black/40
                  sm:relative
                  sm:after:absolute sm:after:left-0 sm:after:top-0 
                  sm:after:-z-10
                  sm:bg-center sm:bg-[url('https://pbs.twimg.com/media/F80VMrjXoAAeykz.jpg')] 
                  sm:items-start sm:h-[50svh] sm:max-h-full
                `
            
          )}
        >
          
          <div className="logo ">
            <p className="text-xl font-bold w-fit mx-auto sm:mx-0">Logo</p>
          </div>

          <div 
            className={cn('h-10  sm:grow-1 w-3/4 sm:w-96' , 
              isScrolled ? "" : " sm:mx-auto sm:w-2/3 sm:h-12 sm:mt-20 sm:text-xl lg:w-fit"
            )}  
          >
            {
              !isScrolled && 
              <h1 className="hidden text-center font-sans  text-white mb-10 sm:block ">
                <span className="font-bold sm:text-2xl lg:text-3xl">Découvrez votre prochain chez-vous</span>
                <br /> 
                <span className="font-thin text-xl">
                  des locations uniques pour des séjours inoubliables, adaptés à tous vos besoins.
                </span>
              </h1>
            }
            <Search className={`relative h-full w-full shadow-sm rounded-full  text-xs text-slate-500 mx-auto sm:text-lg lg:max-w-96`}/>
          </div>          
        </div>


        {/* isScrolled ? 'sm:mt-72'  : '' */}
        <div className={cn('px-4  gap-4 mx-auto mt-32 sm:h-svh  sm:container sm:px-0 sm:mt-10' , 
            isScrolled ? 'sm:mt-14'  : '')}>

          <div className="mx-auto w-full gap-2 lg:flex lg:items-center">
            <Separator className="hidden  min-w-0 shrink-0 grow-0 basis-[33%] lg:block"/>
            <h2 className="text-xl text-center min-w-0 shrink-0 grow-0 basis-[33%] lg:text-nowrap">Tout l'immobilier au Maroc en vente ou location!</h2>
            <Separator className="hidden w-0 min-w-0 shrink-0 grow-0 basis-[33%] lg:block"/>
          </div>
          <div className={cn('[&>div]:rounded-lg h-full mt-6  gap-4 grid grid-cols-1  sm:px-0 md:grid-cols-2 lg:grid-cols-3 ')}>            
              <div className="relative bg-cover bg-[url('https://focus.courrierinternational.com/2022/02/04/0/0/1920/1280/320/0/60/0/50ae3aa_1644014741517-casablanca-maroc-expat.jpg')] flex items-end md:row-span-2">
                <Link href='' className='absolute top-0 left-0 w-full h-full transition-all duration-500 hover:bg-black/50 rounded-lg '/>
                <p className="rounded-b-lg w-full text-white uppercase font-bold p-4 bg-black/40 ">
                  Casablanca
                </p>
              </div>

              <div className="relative bg-cover bg-[url('https://www.darrbatia.com/wp-content/uploads/ekpJwbR-1024x790-1024x675.jpg')] flex items-end">
                <Link href='' className='absolute top-0 left-0 w-full h-full transition-all duration-500 hover:bg-black/50 rounded-lg '/>
                <p className="rounded-b-lg w-full text-white uppercase font-bold p-4 bg-black/40 ">
                  Rabat
                </p>
              </div>

              <div className="relative bg-cover bg-[url('https://u.profitroom.pl/2020-mogadorhotels-com/thumb/0x1000/uploads/cities/shutterstock_768609637.jpg')] flex items-end md:row-span-2 lg:row-span-3 ">
                <Link href='' className='absolute top-0 left-0 w-full h-full transition-all duration-500 hover:bg-black/50 rounded-lg '/>
                <p className="rounded-b-lg w-full text-white uppercase font-bold p-4 bg-black/40 ">
                  Agadir
                </p>
              </div>

              <div className="relative bg-cover bg-[url('https://www.ilove-marrakech.com/blog/wp-content/uploads/2024/03/Which-Historical-Sites-Should-You-Explore-in-Marrakech-3.png')] flex items-end ">
                <Link href='' className='absolute top-0 left-0 w-full h-full transition-all duration-500 hover:bg-black/50 rounded-lg '/>
                <p className="rounded-b-lg w-full text-white uppercase font-bold p-4 bg-black/40 ">
                  Marrakech
                </p>
              </div>

              <div className="relative bg-cover bg-center bg-[url('https://www.visitmorocco.com/sites/default/files/styles/thumbnail_events_slider/public/thumbnails/image/tanger%20tetouan.jpg')] flex items-end md:col-span-2">
                <Link href='' className='absolute top-0 left-0 w-full h-full transition-all duration-500 hover:bg-black/50 rounded-lg '/>
                <p className="rounded-b-lg w-full text-white uppercase font-bold p-4 bg-black/40 ">
                  Tanger
                </p>
              </div>
          </div>
        </div>
        

        {/* className={cn("pt-32 sm:pt-10 " , 
              isScrolled ? 'sm:pt-72' : ''
            )} */}

        <div 
            className={cn("mt-14 sm:mt-20 " )}
        
        >
          <div className="mx-4 sm:container sm:m-auto">
              <div className="flex items-center gap-4">
                <h2 className="font-mono  font-bold text-md sm:text-lg md:text-nowrap">Propriétés recommandées au Maroc</h2>
                <div className="hidden h-[.1rem] w-full bg-slate-200 grow-1 md:block"></div>
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-10  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5    ">
                    {   
                      isPending ?
                          (new Array(8)).fill(1).map(()=>(
                              <CardSkeleton/>                            
                          ))
                      :
                      data.map((property : Property , index : number)=>
                          <Card key={index} property={property} />      
                      )
                    }
        
              </div>

              <div  className="mt-10 w-fit mx-auto">
                  <Button  className="w-28 text-black hover:bg-gray-400 bg-gray-200 ">Voir plus</Button>
              </div>
          </div>


        </div>
      </div>
  );
}
