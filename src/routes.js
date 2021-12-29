import AdminDashboard from "./components/Admin/Header/AdminDashboard";
import AdminFarms from "./components/Admin/Header/AdminFarms";
import AdminPigs from "./components/Admin/Header/AdminPigs";
import { Detail } from "./components/Detail/Detail";
import { Farm } from "./components/Farm/Farm";
import LandingPage from "./components/LandingPage/LandingPage";
import { Login } from "./components/Login/login";
import NotFound from "./components/Notfound/notfound";
import { SignUp } from "./components/SignUp/signup";

const routes = [
    {
        path: "*",
        exact: true,
        component: () => (
            <>
                <NotFound />
            </>
        ),
    },
    {
        path: "/",
        exact: true,
        component: () => (
            <>
                <LandingPage />
            </>
        ),
    },
    {
        path: "/dang-nhap",
        exact: true,
        component: Login,
    },
    {
        path: "/dang-ky",
        exact: true,
        component: SignUp,
    },

    {
        path: "/chi-tiet/:id",
        exact: true,
        component: Detail,
    },
    {
        path: "/co-so-chan-nuoi",
        exact: true,
        component: Farm,
    },
    {
        path: "/admin",
        exact: true,
        component: () => (
            <>
                <AdminDashboard />
            </>
        ),
    },
    {
        path: "/admin/lon-mong-cai",
        exact: true,
        component: () => (
            <>
                <AdminPigs />
            </>
        ),
    },
    {
        path: "/admin/co-so-chan-nuoi",
        exact: true,
        component: () => (
            <>
                <AdminFarms />
            </>
        ),
    },
];

export default routes;
