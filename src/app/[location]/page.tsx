import { fetchPropertiesByLocation } from "@/api/fetch";
import Header from "@/components/Header/Header";
import Layout from "@/pages/Layout";
import Listingpage from "@/pages/Listing/Listingpage";
import { notFound } from "next/navigation";




export default async function Listing({params} : {params:{location:string}}) {
  const {location:locationSlug} = params;
  const data = await fetchPropertiesByLocation(locationSlug);
  
  if(!data) return notFound();

  return (
    <Layout>
        <Header className=""/>
        <Listingpage locationSlug={locationSlug} initialData={data}/>
    </Layout>
  )
}
