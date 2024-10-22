import Header from "@/components/Header/Header";
import Layout from "@/pages/Layout";
import { LoaderPinwheel } from "lucide-react";

export default function loading() {
  return (
    <Layout>
        <Header className=''/>
        <div className="h-svh w-full flex justify-center items-center">
            <LoaderPinwheel className="animate-spin"/>
        </div>
    </Layout>
  )
}
