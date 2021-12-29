import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { Login } from "./components/Login/login";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./components/Notfound/notfound";
import { SignUp } from "./components/SignUp/signup";
import { Detail } from "./components/Detail/Detail";
import { Farm } from "./components/Farm/Farm";
import AdminDashboard from "./components/Admin/Header/AdminDashboard";
import { checkToken } from "./api/auth";
import React, { useState, useEffect } from "react";
import AdminPigs from "./components/Admin/Header/AdminPigs";
import AdminFarms from "./components/Admin/Header/AdminFarms";
import AdminNavbar from "./components/Admin/Header/AdminNavbar";
import AdminHeader from "./components/Admin/Header/AdminHeader";
import { FarmDetail } from "./components/Detail/Farm/FarmDetail";

const App = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const [authen, setAuthen] = useState(false);

    // const LoginRoute = ({ children }) => {
    //     useAuth();
    //     return authen ? children : <Navigate to="/admin" />;
    // };

    const PrivateRoute = ({ children }) => {
        let token = localStorage.getItem("token");
        if (token) setAuthen(true);
        return authen ? (
            children
        ) : (
            <>
                <Navigate to="/dang-nhap" />
            </>
        );
    };

    const checkUser = async () => {
        // let obj = { token: token };
        // await checkToken(obj)
        //     .then((res) => {
        //         console.log(res.data.data.message);
        //         // setAuthen(true);
        //     })
        //     .catch((err) => {
        //         // setAuthen(false);
        //     });
    };

    useEffect(() => {
        // checkUser();
    }, []);
    // const useAuth = async () => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         setAuthen(true);
    //         // let obj = { token: token };
    //         // await checkToken(obj)
    //         //     .then((res) => {
    //         //         console.log(res);
    //         //         setAuthen(true);
    //         //     })
    //         //     .catch((err) => {
    //         //         setAuthen(false);
    //         //     });
    //     } else {
    //         setAuthen(false);
    //     }
    // };

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route render={() => <Navigate replace to="/" />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<SignUp />} />
            <Route path="/co-so/:id" element={<FarmDetail />} />
            <Route path="/ca-the/:id" element={<Detail />} />
            <Route path="/co-so-chan-nuoi" element={<Farm />} />

            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/danh-sach-ca-the"
                element={
                    <>
                        <PrivateRoute>
                            <AdminPigs />
                        </PrivateRoute>
                    </>
                }
            />
            <Route
                path="/admin/co-so-chan-nuoi"
                element={
                    <PrivateRoute>
                        <AdminFarms />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default App;
