'use client'

import {  Property } from "@/app/page";
import Carousel from "@/components/Carousel/Carousel";
import Search from "@/components/Search/Search";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";


interface ICardProps {
    property : Property
}

export default function Card({property} : ICardProps) {
  return (
    <div className="relative min-w-0  sm:grow-0 sm:shrink-0 sm:basis-[44%] md:basis-[40%] lg:basis-[22%]">
        <div className=" w-full h-64 bg-gray-200 rounded-lg">
            <Image 
                className="w-full h-full object-cover rounded-lg" 
                sizes="100vw" style={{width:'100%',height:'100%'}} 
                width={0} height={0} src={property.photos[0]} alt={property.title}
            />
        </div>        
        <div className="mt-2">
                <h2 className="text-md font-bold">
                    {property.title}
                </h2>
                <p className="text-xs text-slate-500  font-thin mt-1">
                    {property.description}
                </p>
                <p className="text-xs text-xs text-slate-500 font-thin ">
                    {property.rooms} Chambre . {property.bathrooms} Salle de bain
                </p>
                <p className="font-mono font-bold mt-1">
                    {property.price} DH
                </p>
        </div>
        <Link className="absolute top-0 left-0 w-full h-full z-20" href={`/${property?.location?.slug}/${property?.slug}`}></Link>
         
    </div>
  )
}

export function CardSkeleton(){
        return (
        <div className="min-w-0  sm:grow-0 sm:shrink-0 sm:basis-[22%]">
            <div className=" w-full h-64 bg-gray-200 rounded-lg">
                <Skeleton className="h-full w-full" />
            </div>        
            <div className="mt-2">
                <Skeleton className="h-4 w-full" />

                <Skeleton className="h-4 w-1/2 mt-2" />               

                <Skeleton className="h-4 w-1/3 mt-2" />               
            </div>
        </div>  
        )
}
