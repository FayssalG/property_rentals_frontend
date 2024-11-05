
import Homepage from "@/components/pages/Home/Homepage";
import Layout from "@/components/pages/Layout";

export type Property = {
  surface : number,
  type:string,
  photos:string[],
  title : string,
  description : string,
  slug:string,
  location : {id:number,name:string , city:string ,slug:string },
  rooms: number,
  bathrooms : number,
  price : number
} 



const fetchHouses = async ()=>{
  return fetch(process.env.BACKEND_URL+'/recent-properties?_limit=8').then(res=>res.json())
} 


export default async function Home() {
  const properties : Property[] = await fetchHouses();

  
  return (
    <Layout>
      <Homepage properties={properties}/>
    </Layout>
  );
}

