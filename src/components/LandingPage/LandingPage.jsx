import { useEffect, useState } from "react";
import { Navigation } from "../Navigation/navigation";
import "../../App.css";
import { PigGallery } from "../Gallery/PigGallery";
import News from "../News/News";
import Blog from "../Blog/Blog";
import { ImageGallery } from "../Gallery/ImageGallery";
import { Footer } from "../Footer/Footer";

const LandingPage = (props) => {
    const { language } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023";
    }, []);

    return (
        <>
            <Navigation />
            <div id="wrapper">
                <div id="content-fix">
                    <ImageGallery />
                    <div class="w3-row-padding w3-padding-22">
                        <News />
                        <Blog />
                    </div>
                    <PigGallery />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
