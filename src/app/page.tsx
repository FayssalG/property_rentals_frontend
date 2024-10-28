
import Homepage from "@/pages/Home/Homepage";
import Layout from "@/pages/Layout";

export type Property = {
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
  return fetch('http://localhost:4000/houses').then(res=>res.json())
} 


export default async function Home() {
  const properties : Property[] = await fetchHouses();

  return (
    <Layout>
      <Homepage properties={properties}/>
    </Layout>
  );
}
