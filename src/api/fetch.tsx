import { Property } from "@/app/page";


const MAX_PAGE_LIMIT = 16;

type Params = {
    pageParam? : number,
    sortParam? : string,
    orderParam? : 'asc' | 'desc' ,
    filterParam? : string
}


export const fetchProperties = async (params : Params | undefined)=>{
    let url =  `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses?_expand=location&_limit=${MAX_PAGE_LIMIT}&_page=${params?.pageParam}`;
    if(params?.sortParam) url = url.concat("&_sort="+params.sortParam);
    if(params?.orderParam) url = url.concat("&_order="+params.orderParam)
    if(params?.filterParam) url = url.concat("&_type="+params.filterParam)
    
    return fetch(url)
    .then((data)=>{
        return data.json();
    })
}

export const fetchPropertiesByLocation = async (locationSlug : string , params? : Params)=>{
    let url =  `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses-by-location/${locationSlug}?_limit=${MAX_PAGE_LIMIT}&_page=${params?.pageParam || 1}`;
    if(params?.sortParam) url = url.concat("&_sort="+params.sortParam);
    if(params?.orderParam) url = url.concat("&_order="+params.orderParam)
    if(params?.filterParam) url = url.concat("&_type="+params.filterParam)
    
    return fetch(url)
    .then((res)=>{
        if(!res.ok) {
            throw new Error('Error in request');
        }
        return res.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const fetchProperty = async (slug : string)=>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/property?withRelated=true&slug=${slug}`).then((res)=>{
        if(!res.ok) throw new Error('Error with request')
        return res.json()
    })
    .catch((err)=>{
        console.log(err);
    });

    return data;
}
  

export const fetchPropertiesRelated = async (property : Property)=>{
    let url =  `${process.env.NEXT_PUBLIC_BACKEND_URL}/houses?_expand=location&location.id=${property.location.id}&slug_ne=${property.slug}&_limit=8`;
    return fetch(url).then((data)=>{
        return data.json();
    })
}