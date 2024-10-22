'use client'

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react";
import { Thumb } from "./Thumb";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ICarouselProps {
    className?:string,
    photos : string[]
}

export default function Carousel({className , photos} : ICarouselProps) {
    const [emblaMainRef , emblaMainApi] = useEmblaCarousel({loop:false});
    const [emblaThumbsRef , emblaThumbsApi] = useEmblaCarousel({containScroll:'keepSnaps' , dragFree:true});
    const [emblaPaginationRef , emblaPaginationApi] = useEmblaCarousel({containScroll:'keepSnaps' , dragFree:true});

    const [selectedIndex,setSelectedIndex] = useState(0);

    const onThumbClick = useCallback((index:number)=>{
        if(!emblaMainApi || !emblaThumbsApi || !emblaPaginationApi) return;
        emblaMainApi.scrollTo(index);
    },[emblaMainApi , emblaThumbsApi , emblaPaginationApi])


    const onSelect = useCallback(()=>{
        if(!emblaMainApi || !emblaThumbsApi || !emblaPaginationApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
        emblaPaginationApi.scrollTo(emblaMainApi.selectedScrollSnap());

    },[emblaMainApi,emblaThumbsApi ,emblaPaginationApi, setSelectedIndex])
    
    
    useEffect(()=>{
        if(!emblaMainApi) return;
        emblaMainApi.on('select' , onSelect).on('reInit' , onSelect);
    },[emblaMainApi , onSelect])

    return (    
        <>
            <div className={cn("embla min-h-64 ",className)}>
                <div ref={emblaMainRef} className="relative overflow-hidden bg-gray-200 w-full h-full rounded-lg" >
                    <div className="flex h-full  [&>div]:flex [&>div]:justify-center [&>div]:items-center">
                            {
                                photos.map((photo,index:number)=>{
                                    return (
                                        <div key={index} className="embla__slide min-w-0 grow-0 shrink-0 basis-full">
                                            <Image 
                                                alt={photo} 
                                                width={0} 
                                                height={0}
                                                sizes="100vw"
                                                style={{width:'100%',height:'100%'}} 
                                                className="h-full w-full object-cover" 
                                                src={photo}
                                            />
                                        </div>
                                    )
                                })
                            }                        
                    </div>

                    <div ref={emblaPaginationRef} className="absolute overflow-hidden bottom-2 left-1/2 -translate-x-1/2">
                        <div  className="w-20 h-2 flex gap-1 lg:hidden ">
                            {
                                [1,2,3,4,5,6,7,8,9].map((el,index:number)=>{
                                    return (
                                        <div key={index} className="min-w-0 shrink-0 grow-0 basis-[15%] ">
                                            <button 
                                                className={cn(" h-full rounded-full",selectedIndex==index?'bg-gray-500':'bg-gray-100')}
                                                onClick={()=>onThumbClick(index)}
                                            >z</button>
                                        </div>
                                    )
                                })
                            }                        

                        </div>                        
                    </div>
                </div>

                <div className="mt-2 w-full xs:hidden lg:block">
                    <div ref={emblaThumbsRef} className="overflow-hidden mx-auto w-full ">
                        <div className="flex gap-6 ">
                            {
                                photos.map((photo,index:number)=>{
                                    return (
                                        <Thumb  key={index} photo={photo} index={index} selected={selectedIndex == index} onClick={()=>onThumbClick(index)}/>
                                    )
                                })
                            }                        
                        </div>
                    </div>
                </div>                

            </div>

            

            
        </>
    )
}
