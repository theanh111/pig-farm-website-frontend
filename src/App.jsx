import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { Login } from "./components/Login/login";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/Notfound/notfound";
import { SignUp } from "./components/SignUp/signup";
import { PigDetail } from "./components/Pig/PigDetail";
import { FarmPage } from "./components/Farm/FarmPage";
import React, { useState } from "react";
import { FarmDetail } from "./components/Farm/FarmDetail";
import { ContactPage } from "./components/Contact/ContactPage";
import Profile from "./components/Admin/Header/User/Profile";
import { BlogPage } from "./components/Blog/BlogPage";
import { NewsPage } from "./components/News/NewsPage";
import { BlogDetail } from "./components/Blog/BlogDetail";
import { PigPage } from "./components/Pig/PigPage";
import { NewsDetail } from "./components/News/NewsDetail";
import AdminDashboard from "./components/Admin/Header/AdminDashboard";
import AdminPigs from "./components/Admin/Pig/AdminPigs";
import AdminFarms from "./components/Admin/Farm/AdminFarms";
import AdminBlog from "./components/Admin/Blog/AdminBlog";
import AdminNews from "./components/Admin/News/AdminNews";
import AdminContact from "./components/Admin/Contact/AdminContact";
import AdminGallery from "./components/Admin/Gallery/AdminGallery";

const App = (props) => {
    const [authen, setAuthen] = useState(false);

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

    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route render={() => <Navigate replace to="/" />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<SignUp />} />
            <Route path="/co-so-chan-nuoi/:farmcode" element={<FarmDetail />} />
            <Route path="/ca-the" element={<PigPage />} />
            <Route path="/ca-the/:id" element={<PigDetail />} />
            <Route path="/co-so-chan-nuoi" element={<FarmPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/thong-tin-du-an/:blogcode" element={<BlogDetail />} />
            <Route path="/thong-tin-du-an" element={<BlogPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/tin-tuc/:newscode" element={<NewsDetail />} />

            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/profile"
                element={
                    <PrivateRoute>
                        <Profile />
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
            <Route
                path="/admin/quan-ly-thong-tin-du-an"
                element={
                    <PrivateRoute>
                        <AdminBlog />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/quan-ly-tin-tuc"
                element={
                    <PrivateRoute>
                        <AdminNews />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/quan-ly-lien-he"
                element={
                    <PrivateRoute>
                        <AdminContact />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/anh-trinh-chieu"
                element={
                    <PrivateRoute>
                        <AdminGallery />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};

export default App;
