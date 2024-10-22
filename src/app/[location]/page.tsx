import { fetchPropertiesByLocation } from "@/api/fetch";
import Header from "@/components/Header/Header";
import Layout from "@/pages/Layout";
import Listingpage from "@/pages/Listing/Listingpage";



export default async function Listing({params}) {
  const {location:locationSlug} = params;
  const data = await fetchPropertiesByLocation(locationSlug);
    
  return (
    <Layout>
        <Header className=""/>
        <Listingpage locationSlug={locationSlug} initialData={data}/>
    </Layout>
  )
}
