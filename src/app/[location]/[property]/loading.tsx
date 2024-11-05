import Header from "@/components/Header/Header";
import Layout from "@/components/pages/Layout";
import ShowpageSkeleton from "@/components/pages/Show/ShowpageSkeleton";

export default function loading() {
  return (
    <Layout>
        <Header className=''/>
        <ShowpageSkeleton/>
    </Layout>
  )
}
