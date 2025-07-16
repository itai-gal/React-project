import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Homepage";
import { About } from "../pages/About";
import { Favorites } from "../pages/Favorites";
import { User } from "../pages/User";
import { BusinessPage } from "../pages/BusinessPage";
import { Cards } from "../pages/MyCards";
import { EditCards } from "../pages/EditCards";
import { AdminCRM } from "../pages/AdminCRM";

export const myrouter = createBrowserRouter([
    { path: "/", Component: Home },
    { path: "/About", Component: About },
    { path: "/Favorites", Component: Favorites },
    { path: "/User", Component: User },
    { path: "/business", Component: BusinessPage },
    { path: "/Cards", Component: Cards },
    { path: "/CardsEdit", Component: EditCards },
    { path: "/Admin", Component: AdminCRM },
]);