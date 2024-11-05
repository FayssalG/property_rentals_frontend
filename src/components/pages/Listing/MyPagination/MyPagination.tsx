'use client'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface IMyPagination {
    currentPage : number,
    lastPage : number,
}

export default function MyPagination({currentPage , lastPage} : IMyPagination) {

    console.log({lastPage});
    const  renderPagination = useCallback(()=>{
        const els = []
        const maxNumberToShow = 4;
        const totalPages = lastPage;

        if(maxNumberToShow >= totalPages){
            for(let i=1; i<=totalPages ; i++){
                els.push(
                    <PaginationItem className={cn("rounded-full",i==currentPage && 'bg-black text-white')}>
                        <PaginationLink href={"?page="+i}>{i}</PaginationLink>
                    </PaginationItem>
                )
            }
        }
        else{
            if(currentPage < maxNumberToShow ){
                for(let i=1 ; i<=maxNumberToShow ;i++){
                    els.push(
                        <PaginationItem className={cn("rounded-full hidden sm:block",i==currentPage && 'bg-black text-white')}>
                            <PaginationLink href={"?page="+i}>{i}</PaginationLink>
                        </PaginationItem>
                    )
                }
                els.push(
                    <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis/>
                    </PaginationItem>           
                )
            }           
            else if(Math.abs(currentPage - lastPage) < maxNumberToShow ){
                els.push(
                    <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis/>
                    </PaginationItem>           
                )
                for(let i=lastPage-maxNumberToShow ; i<=lastPage ;i++){
                    els.push(
                        <PaginationItem className={cn("rounded-full hidden sm:block",i==currentPage && 'bg-black text-white')}>
                            <PaginationLink href={"?page="+i}>{i}</PaginationLink>
                        </PaginationItem>
                    )
                }
            }
            else{
                els.push(
                    <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis/>
                    </PaginationItem>           
                )

                for(let i=currentPage-1 ; i<=currentPage+1 ;i++){
                    els.push(
                        <PaginationItem className={cn("rounded-full hidden sm:block",i==currentPage && 'bg-black text-white')}>
                            <PaginationLink href={"?page="+i}>{i}</PaginationLink>
                        </PaginationItem>
                    )
                }

                els.push(
                    <PaginationItem className="hidden sm:block">
                        <PaginationEllipsis/>
                    </PaginationItem>           
                )


            }
        }
        return els
    },[currentPage])
        
    
  return (
    <>    
        <Pagination>
            <PaginationContent>
                {
                    currentPage-1 > 0 &&
                    <PaginationItem>
                        <PaginationPrevious href={"?page="+(currentPage-1)}/>
                    </PaginationItem>
                }
                
                
                {

                    renderPagination()
                }
                                
                {
                    currentPage+1 <= lastPage && 
                    <PaginationItem>
                        <PaginationNext href={"?page="+(currentPage+1)}/>
                    </PaginationItem>
                }
            
            </PaginationContent>
        </Pagination>

    </>
  )
}
