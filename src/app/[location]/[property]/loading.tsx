import Header from "@/components/Header/Header";
import Layout from "@/pages/Layout";
import ShowpageSkeleton from "@/pages/Show/ShowpageSkeleton";

export default function loading() {
  return (
    <Layout>
        <Header className=''/>
        <ShowpageSkeleton/>
    </Layout>
  )
}
