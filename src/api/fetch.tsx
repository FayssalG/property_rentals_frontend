import { Property } from "@/app/page";

const MAX_PAGE_LIMIT = 2;

type Params = {
    pageParam? : number,
    sortParam? : string,
    orderParam? : 'asc' | 'desc' ,
    filterParam? : string
}


export const fetchProperties = async (params : Params)=>{
    let url =  `http://localhost:4000/houses?_expand=location&_limit=${MAX_PAGE_LIMIT}&_page=${params.pageParam}`;
    if(params?.sortParam) url = url.concat("&_sort="+params.sortParam);
    if(params?.orderParam) url = url.concat("&_order="+params.orderParam)
    if(params?.filterParam) url = url.concat("&_type="+params.filterParam)
    
    return fetch(url)
    .then((data)=>{
        return data.json();
    })
}

export const fetchPropertiesByLocation = async (locationSlug : string , params? : Params)=>{
    console.log({locationSlug})
    let url =  `http://localhost:4000/houses-by-location/${locationSlug}?_limit=${MAX_PAGE_LIMIT}&_page=${params?.pageParam || 1}`;
    if(params?.sortParam) url = url.concat("&_sort="+params.sortParam);
    if(params?.orderParam) url = url.concat("&_order="+params.orderParam)
    if(params?.filterParam) url = url.concat("&_type="+params.filterParam)
    
    return fetch(url)
    .then((data)=>{
        return data.json();
    })
}

export const fetchProperty = async (slug : string)=>{
    const data = await fetch('http://localhost:4000/houses?_expand=location&slug='+slug).then((res)=>res.json());
    return data.length ? data[0] : {}
  }
  

export const fetchPropertiesRelated = async (property : Property)=>{
    let url =  `http://localhost:4000/houses?_expand=location&location.id=${property.location.id}&slug_ne=${property.slug}&_limit=8`;
    return fetch(url).then((data)=>{
        return data.json();
    })
}