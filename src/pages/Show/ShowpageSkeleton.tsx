
import { CardSkeleton } from "@/components/Card/Card";
import Carousel from "@/components/Carousel/Carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FaPhoneAlt, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FiKey, FiPhone } from "react-icons/fi";
import { MdOutlineDone, MdOutlineMailOutline } from "react-icons/md";

export default function ShowpageSkeleton() {
  return (
    <div className="mx-4  sm:mt-24 sm:container sm:mx-auto lg:w-3/4 ">
        
        <div className="grid mt-2  grid-cols-1 h-svh gap-4 lg:gap-10 lg:h-96 lg:grid-cols-2">
            <div className="min-h-96 md:h-auto">
                <Skeleton className="w-full h-full"/>
            </div>

            <div className="h-full ">
                <div>
                    <Skeleton className="w-20 h-4"/>

                    <div className="mt-4">
                        <Skeleton className=" w-full h-7 "/>
                        <Skeleton className=" w-2/3 h-7 mt-1"/>
                    </div>

                    <div className="mt-2">
                        <Skeleton className="w-full h-4"/>
                        <Skeleton className="w-1/2 h-4 mt-2"/>
                    </div>

                    <Skeleton className="w-20 h-4 rounded-full mt-4"/>                   
                </div>

                <div className="mt-10">
                    <Skeleton className="w-44 h-8"/>
                    
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="w-36 h-14"/>
                        <Skeleton className="w-36 h-14"/>
                    </div>


                </div>
            </div>
        </div>


        <Separator className="my-10 lg:mt-32 lg:mb-14"/>    

        <div className=" w-full min-h-72"> 
            <div>
                <Skeleton className="w-44 h-8"/>
                <div className="mt-4 ">
                    <Skeleton className="w-full h-2 "/>
                    <Skeleton className="w-2/3 h-2 mt-2"/>
                    <Skeleton className="w-1/2 h-2 mt-2"/>
                </div>
            </div>

            <div className="mt-8">
                <Skeleton className="w-44 h-8"/>
                <div className="mt-4 grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
                    <div>
                        <Skeleton className="h-4 w-32"/>
                    </div>
    
                </div>
            </div>
        </div>

        <Separator className="my-10"/>    

        <div className="grid grid-cols-1  gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                (new Array(8)).fill(1).map(()=>
                        <CardSkeleton/>
                )
            }
        </div>
    </div>
  )
}
