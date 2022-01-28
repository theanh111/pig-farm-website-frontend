import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import LandingPageENG from "./components/LandingPage/LandingPageENG";
import { Login } from "./components/Login/login";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/Notfound/notfound";
import { SignUp } from "./components/SignUp/signup";

import { PigDetail } from "./components/Pig/PigDetail";
import { PigDetailENG } from "./components/Pig/PigDetailENG";
import { FarmPage } from "./components/Farm/FarmPage";
import { FarmPageENG } from "./components/Farm/FarmPageENG";
import React, { useState } from "react";
import { FarmDetail } from "./components/Farm/FarmDetail";
import { FarmDetailENG } from "./components/Farm/FarmDetailENG";
import { ContactPage } from "./components/Contact/ContactPage";
import { ContactPageENG } from "./components/Contact/ContactPageENG";
import Profile from "./components/Admin/Header/User/Profile";
import { BlogPage } from "./components/Blog/BlogPage";
import { BlogPageENG } from "./components/Blog/BlogPageENG";
import { NewsPage } from "./components/News/NewsPage";
import { NewsPageENG } from "./components/News/NewsPageENG";
import { BlogDetail } from "./components/Blog/BlogDetail";
import { BlogDetailENG } from "./components/Blog/BlogDetailENG";
import { PigPage } from "./components/Pig/PigPage";
import { PigPageENG } from "./components/Pig/PigPageENG";
import { NewsDetail } from "./components/News/NewsDetail";
import { NewsDetailENG } from "./components/News/NewsDetailENG";
import AdminDashboard from "./components/Admin/Header/AdminDashboard";
import AdminPigs from "./components/Admin/Pig/AdminPigs";
import AdminFarms from "./components/Admin/Farm/AdminFarms";
import AdminBlog from "./components/Admin/Blog/AdminBlog";
import AdminNews from "./components/Admin/News/AdminNews";
import AdminContact from "./components/Admin/Contact/AdminContact";
import AdminGallery from "./components/Admin/Gallery/AdminGallery";
import { SearchPage } from "./components/Search/SearchPage";
import { SearchPageENG } from "./components/Search/SearchPageENG";
import AdminPigsSpecial from "./components/Admin/Pig/AdminPigsSpecial";

const App = (props) => {
    const [vietnamese, setVietnamese] = useState({
        web_title: "DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI",
        web_language: "vietnamese",
        homepage: "Trang Chủ",
        pig: "Cá Thể",
        farm: "Cơ Sở Chăn Nuôi",
        news: "Tin Tức",
        blog: "Thông Tin Dự Án",
        contact: "Liên Hệ",
        search_title: "Tìm kiếm",
        search_placeholder: "Tìm kiếm...",
        vie_title: "Vietnamese",
        eng_title: "English",
        login_title: "Đăng Nhập",
        activities: "Hoạt Động",
        footer: "Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023",
        pig_gallery_title: "Lợn Móng Cái",
    });

    const [english, setEnglish] = useState({
        web_title: "PROJECT ON EVALUATION OF GENETIC DIVERSITY OF MONG CAI PIG IN MONG CAI CITY",
        web_language: "english",
        homepage: "Homepage",
        pig: "Pig Indivuduals",
        farm: "Livestock Farms",
        news: "News",
        blog: "Project Information",
        contact: "Contact",
        search_title: "Search",
        search_placeholder: "Search...",
        vie_title: "Vietnamese",
        eng_title: "English",
        login_title: "Sign In",
        activities: "Activities",
        footer: "Website of Project on Evaluation of genetic diversity of Mong Cai pig in Mong Cai City 2021-2023",
        pig_gallery_title: "Mong Cai Pig",
    });

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
            <Route path="/homepage" element={<LandingPageENG />} />

            <Route path="/dang-nhap" element={<Login />} />

            <Route path="/dang-ky" element={<SignUp />} />

            <Route path="/co-so-chan-nuoi/:farmcode" element={<FarmDetail />} />
            <Route path="/livestock-farms/:farmcode" element={<FarmDetailENG />} />

            <Route path="/ca-the" element={<PigPage />} />
            <Route path="/pig-indivuduals" element={<PigPageENG />} />

            <Route path="/ca-the/:id" element={<PigDetail />} />
            <Route path="/pig-indivuduals/:id" element={<PigDetailENG />} />

            <Route path="/co-so-chan-nuoi" element={<FarmPage />} />
            <Route path="/livestock-farms" element={<FarmPageENG />} />

            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/contact" element={<ContactPageENG />} />

            <Route path="/thong-tin-du-an/:blogcode" element={<BlogDetail />} />
            <Route path="/project-information/:blogcode" element={<BlogDetailENG />} />

            <Route path="/thong-tin-du-an" element={<BlogPage />} />
            <Route path="/project-information" element={<BlogPageENG />} />

            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/news" element={<NewsPageENG />} />

            <Route path="/tin-tuc/:newscode" element={<NewsDetail />} />
            <Route path="/news/:newscode" element={<NewsDetailENG />} />

            <Route path="/tim-kiem/:search" element={<SearchPage />} />
            <Route path="/search/:search" element={<SearchPageENG />} />

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
                path="/admin/danh-sach-tieu-bieu"
                element={
                    <>
                        <PrivateRoute>
                            <AdminPigsSpecial />
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
