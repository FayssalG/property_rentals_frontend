import Header from "@/components/Header/Header";
import Layout from "@/components/pages/Layout";
import Showpage from "@/components/pages/Show/Showpage";
import { notFound, useParams } from "next/navigation";
import { Property } from "../../page";
import {  fetchPropertiesRelated, fetchProperty } from "@/api/fetch";


export default async function page({params} : {
  params: { property : string }
}) {
  const {property:slug} = params
  const data : {property:Property , locationName:string , locationSlug:string , relatedProperties:Property[]} 
  = await fetchProperty(slug);
  
  if(!data) return notFound();

  return (
    <Layout>
        <Header className=""/>
        <Showpage data={data} relatedProperties={data.relatedProperties}/>
    </Layout>
  )
}
