import Header from "@/components/Header/Header";
import Layout from "@/pages/Layout";
import Showpage from "@/pages/Show/Showpage";
import { useParams } from "next/navigation";
import { Property } from "../../page";
import {  fetchPropertiesRelated, fetchProperty } from "@/api/fetch";

export default async function page({params}) {
  const {property:slug} = params
  const property : Property = await fetchProperty(slug);
  const relatedProperties :Property[] = await fetchPropertiesRelated(property); 

  return (
    <Layout>
        <Header className=""/>
        <Showpage property={property} relatedProperties={relatedProperties}/>
    </Layout>
  )
}
