'use client'
import parse from 'html-react-parser';
import { Property } from "@/app/page";
import Card from "@/components/Card/Card";
import Carousel from "@/components/Carousel/Carousel";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent , PopoverTrigger} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaChevronDown, FaClipboard, FaClipboardCheck, FaPhoneAlt, FaPlus, FaPlusCircle, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FiKey, FiPhone } from "react-icons/fi";
import { MdClose, MdOutlineContentCopy, MdOutlineDone, MdOutlineMailOutline } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn, parseNumberForHumans } from "@/lib/utils";

interface IshowpageProps {
    data : {property : Property , locationName:string , locationSlug:string} ,
    relatedProperties: Property[]
}

export default function Showpage({data,relatedProperties} : IshowpageProps) {
    const descriptionRef = useRef(null);
    const [isTextOverflowing , setIsTextOverflownig] = useState(false)
    const [isTextExpanded , setIsTextExpanded] = useState(false);
    console.log({isTextOverflowing});
    useEffect(()=>{
        if(descriptionRef.current){
            setIsTextOverflownig(
                descriptionRef.current?.clientHeight < descriptionRef.current?.scrollHeight
            )
        }
    },[isTextOverflowing])

    const handleCopieReference = (ref:string)=>{
            navigator.clipboard.writeText(ref)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    } 

    const {property , locationName , locationSlug} = data
    console.log({locationName})
  
    return (
    <>
    <div className="mx-4  sm:mt-24 sm:container sm:mx-auto lg:w-3/4 font-light  text-md">
        <div>
            <Breadcrumb className="list-none flex items-center text-slate-500 gap-2">
                <BreadcrumbItem className="hover:text-black">
                    <Link href="/">Acceuil</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem className="hover:text-black">
                    <Link href={"/"+locationSlug}>{locationName}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <p className="truncate w-56 text-black" >{property?.title}</p>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        
        <div className="grid mt-8  grid-cols-1 h-svh gap-14 lg:gap-10 lg:h-96 lg:grid-cols-2">
            <div className="relative ">
                <Carousel photos={property.photos} className="h-full"/>
                <Drawer>
                        <div className="flex justify-center lg:absolute lg:opacity-0 lg:hover:opacity-100 lg:transition-opacity lg:duration-500 lg:items-center lg:top-0 lg:left-0 lg:z-10 lg:w-full lg:h-full lg:bg-black/40 ">
                            <DrawerTrigger className="flex mt-2 text-green-500 gap-2 items-center font-mono px-2 lg:bg-white/5 lg:hover:bg-white lg:rounded-lg  lg:text-black lg:border-2 lg:outline lg:outline-black/50">
                                    <span>Afficher Tous</span>
                                    <FaPlusCircle size={15}/>
                            </DrawerTrigger>
                        </div>            
                        <DrawerContent className="h-svh ">
                            <DrawerClose className="ms-auto me-10">
                                <MdClose size={25} />
                            </DrawerClose>

                            <div className="mt-2 h-full w-full overflow-auto">
                                <div className="px-4 mx-auto sm:container sm:px-0" >
                                    <div className="py-10 w-full grid gap-y-10 grid-cols-1">
                                        {
                                            property.photos.map((photo)=>{
                                                return (
                                                    <Image alt={photo} className="rounded-lg object-cover" style={{width:'100%',height:'100%'}} width={0} height={0} sizes="100svw" src={photo}/>
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                                
                                <div className="w-full mb-2 flex justify-center">
                                    <DrawerClose >
                                        <Button className="px-10">Fermer</Button>
                                    </DrawerClose>
                                </div>

                            </div>
                        </DrawerContent>
                    </Drawer>
            </div>

            <div className=" h-full ">
                <div>
                    <p className="text-sm text-slate-500 ">
                        {property?.type}
                    </p>

                    <h1 className="text-xl font-bold lg:text-2xl mt-2">
                        {property?.title?.toUpperCase()}
                    </h1>

                    <p className="font-light text-sm text-slate-500">
                        Appartement à Louer à Hay Hassani ( {property.surface} m² )
                        <br/>                    
                        {property?.rooms} pieces . {property?.bathrooms} salles de bain 
                    </p>
                    
                    <div className="mt-2">
                        <Popover>
                            <PopoverTrigger >
                                <Badge onClick={()=>handleCopieReference('ref-8497400')} className="bg-slate-400 flex gap-2 w-fit">
                                    {/* <FiKey/> */}
                                    <span className='font-thin' >ref-8497400</span>
                                    <MdOutlineContentCopy/>
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="bg-black text-sm w-fit p-2 text-slate-200">
                                <div className=" flex items-center gap-2">
                                    <span>Réference copié</span>
                                    <LuClipboardCheck size={20} className="text-green-500"/>
                                </div>
                            </PopoverContent>
                        </Popover>


                    </div>
                   
                </div>

                <div className="mt-10">
                    <h2 className="text-4xl  flex gap-2">
                        <span className="font-bold">{parseNumberForHumans(property.price)}</span>
                        <span className="font-thin">Dh/Mois</span>
                    </h2>
                    <div className="flex gap-2 mt-2">
                        <Button className="flex gap-2  outline-2 outline-green-500 outline-offset-2 hover:outline ">
                            <FiPhone  size={15}/>
                            Telephone
                        </Button>
                        <Button className="flex gap-2  outline-green-500 outline-2 outline-offset-2 hover:outline" >
                            <MdOutlineMailOutline size={15}/>
                            Email
                        </Button>
                    </div>
                </div>
            </div>
        </div>


        <Separator className="my-10 lg:mt-36 lg:mb-14"/>    

        <div className=" w-full min-h-72"> 
            <div>
                <h2 className="font-bold text-2xl">Description</h2>
                <p  
                    ref={descriptionRef}
                    className={
                        cn(`mt-4 tracking-wide text-thin h-56 text-md text-slate-500 overflow-hidden lg:text-lg`,
                            !isTextExpanded ? 'text-ellipsis turncate' : 'h-auto'
                        )
                    }
                >
                    {parse(property.description)}
                </p>

                {
                isTextOverflowing &&
                
                <button onClick={()=>setIsTextExpanded(!isTextExpanded)} className="text-blue-500 flex gap-2">
                     <span>{isTextExpanded==false ? 'Afficher plus' : 'Afficher moins'}</span> 
                    {isTextExpanded==false ? <ChevronDown/> : <ChevronUp/>}
                </button>
                }
            </div>

            <div className="mt-8">
                <h2 className="font-bold text-2xl">Installations</h2>
                <div className="mt-4 grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <MdOutlineDone />
                        <p>Dressing</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineDone />
                        <p>Dressing</p>
                    </div><div className="flex items-center gap-2">
                        <MdOutlineDone />
                        <p>Dressing</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="my-4 my-20 w-full grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:my-10 ">
            <h3 className="text-sm font-bold grow-1 sm:text-nowrap md:text-md">Plus de propriétés disponibles dans le même ville</h3>
            <Separator className="order-first md:order-last"/>    

        </div>

        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                relatedProperties.map((p)=>
                    <Card property={p}/>
                )
            }
        </div>
    </div>

    
    </>
  )
}
