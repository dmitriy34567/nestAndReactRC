
import Main from "./pages/homePg"
import oneNewPg from "./pages/oneNewPg"
import authorPg from "./pages/authorPg"
import categoriePg from "./pages/categoriePg"
import { MainRoute, OneNewRoute, CategorysRoute, AuthsRoute} from "./utils/consts"


export const publicRoutes = [
    {
        path: MainRoute,
        Component: Main
    },
    {
        path: OneNewRoute,
        Component: oneNewPg
    },
    {
        path: CategorysRoute,
        Component: categoriePg
    },
    {
        path: AuthsRoute,
        Component: authorPg
    }
]