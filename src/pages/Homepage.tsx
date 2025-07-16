import { DynamicPageHeader } from "../components/DynamicPageHeader"
import { MainLayout } from "../layouts/MainLayout"

export const Home = () => {
    return <MainLayout><DynamicPageHeader header="Home" /></MainLayout>
}