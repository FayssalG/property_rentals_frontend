'use client'

import { fetchProperties, fetchPropertiesByLocation } from "@/api/fetch";
import { Property } from "@/app/page";
import Card, { CardSkeleton } from "@/components/Card/Card";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SelectLabel } from "@radix-ui/react-select";
import { keepPreviousData, queryOptions, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useReducer, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import MyPagination from "./MyPagination/MyPagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

type Filters ={
    sortBy : string | null,
    filterBy : string | null
}

function filtersReducer(state : Filters , {type , payload}:{type:string , payload:string|null}){
    switch(type){
        case 'SORT' :
            return {...state , sortBy:payload}
        case 'FILTER' :
            return {...state, filterBy:payload}
        default  :
            return {...state}
    }

}

interface IListingpageProps {
    locationSlug : string,
    initialData : {properties : Property[] , results:{total:number} , totalPages:number , locationName:string}
}

export default function Listingpage({initialData,locationSlug} : IListingpageProps) {
    // const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams?.get('page')) || 1;
    
    const {isLoading , error , data } = useQuery({
        queryKey:['houses',currentPage],
        queryFn : ()=>fetchPropertiesByLocation(locationSlug,{pageParam:currentPage , sortParam:sortBy?.split('_')[0] , orderParam:sortBy?.split('_')[1],filterParam:filterBy}),
        initialData : initialData
    })

    const [totalPages , setTotalPages] = useState(data?.totalPages);
    const [filters , dispatch] = useReducer(filtersReducer, {filterBy:null , sortBy:null})
    const {sortBy , filterBy} = filters

    const [menuActiveIndex , setMenuActiveIndex] = useState<number>(0);
    
    
    const handleSortBy = (value : string)=>{
        dispatch({type:'SORT' , payload:value})
    }

    const handleFilter = (index:number , filterValue?:string)=>{
        setMenuActiveIndex(index);
        dispatch({type:'FILTER' , payload:(filterValue ?? null)})
    }
      

    if(error) return 'error occured '+error.message;
    
    const filteredData = useMemo(()=>{
        if(!data) return []

        let transformedData = [...data?.properties];
        if(filterBy) {
            transformedData = transformedData.filter((p)=>p.type==filterBy)  
        }
        if(sortBy=='price_asc'){
            transformedData.sort(({price:a} , {price:b})=>a-b);  
        }else{
            transformedData.sort(({price:a} , {price:b})=>b-a);  
        }
        return transformedData
        
    },[data,sortBy,filterBy])

    const {locationName} = data


    return (
    <div>        

        <div  className="pt-10 mx-4 sm:container sm:pt-24 sm:mx-auto">
            <div className="">
                <Breadcrumb className="list-none text text-slate-500 flex items-center gap-2">
                    <BreadcrumbItem className="hover:text-black">
                        <Link href="/">Acceuil</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <p className="text-black" >{locationName}</p>
                    </BreadcrumbItem>

                </Breadcrumb>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <CiLocationOn size={29}/>
                <div className="">
                    <h1 className="text-2xl font-bold">{locationName.toUpperCase()}</h1>
                    <p className="font-thin text-slate-400">{data?.results.total} resultats</p>
                </div>
            </div>

            <div className="flex flex-col mt-5 gap-4 items-start sm:flex-row sm:justify-between  ">
                <NavigationMenu className="list-none flex-wrap justify-start">
                    <NavigationMenuItem 
                        className={cn('cursor-pointer',menuActiveIndex==0?" ":'')}
                    >
                        <button className="" onClick={()=>handleFilter(0)}>
                            <NavigationMenuLink  className={cn(navigationMenuTriggerStyle() , 'px-2 me-1', menuActiveIndex==0?'bg-white text-green-500':'')}>
                                Tous ({data.results.total})
                            </NavigationMenuLink>
                        </button>
                    </NavigationMenuItem>       

                    {
                    ['appartement','garage','maison'].map((el , index)=>{
                        const count = data.results[el];
                        if(count == 0) return
                        return(
                            <NavigationMenuItem 
                                className={cn('cursor-pointer',menuActiveIndex==(index+1)?" ":'')}
                            >
                                <button onClick={()=>handleFilter(index+1 , el)}>
                                    <NavigationMenuLink  className={cn(navigationMenuTriggerStyle() , 'px-2 me-1', menuActiveIndex==(index+1)?'bg-white text-green-500':'')}>
                                        {el} ({count})
                                    </NavigationMenuLink>
                                </button>
                            </NavigationMenuItem>       
                            )
                        })
                    }
                </NavigationMenu>        
                
                <div className="order-first">
                    <Select onValueChange={handleSortBy}>
                        <SelectTrigger className='w-[180px] bg-slate-50 text-black'>
                            <SelectValue placeholder='Trié par'/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='price_asc'>Prix Croissant</SelectItem>
                            <SelectItem value="price_desc">Prix Decroissant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <Separator className="my-4"/>
            
            <div className="flex flex-wrap mt-5 gap-x-10 gap-y-10  justify-center lg:justify-start  ">
                {   isLoading ?
                        (new Array(8)).fill(1).map(()=>(
                            <CardSkeleton/>                            
                        ))
                    :
                    filteredData.map((property : Property , index : number)=>
                        <Card key={index} property={property} />      
                    )
                }
            </div>

            <div  className="mt-10 w-fit mx-auto">
                {/* {
                    hasNextPage &&
                    <Button onClick={handlePagination} className="w-28 text-white hover:bg-slate-200 hover:text-black  bg-black ">Voir plus</Button>
                } */}

                {
                    totalPages > 1 &&
                    <MyPagination currentPage={currentPage} lastPage={totalPages}/>
                }
                
            </div>
        </div>

    </div>  
  )
}
