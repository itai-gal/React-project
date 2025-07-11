import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Homepage";
import { BusinessPage } from "../pages/BusinessPage";
import { About } from "../pages/About";
import { Cards } from "../pages/Cards";
import { EditCards } from "../pages/EditCards";
import { User } from "../pages/User";
import { AdminCRM } from "../pages/AdminCRM";

export const myrouter = createBrowserRouter([
    { path: "/", Component: Home },
    { path: "/User", Component: User },
    { path: "/business", Component: BusinessPage },
    { path: "/About", Component: About },
    { path: "/Cards", Component: Cards },
    { path: "/CardsEdit", Component: EditCards },
    { path: "/Admin", Component: AdminCRM },
]);