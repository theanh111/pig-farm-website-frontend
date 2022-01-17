import { useEffect } from "react";
import { Navigation } from "../Navigation/navigation";
import "../../App.css";
import { Gallery } from "../Gallery/gallery";
import { Header } from "../Header/header";
import { Contact } from "../Contact/contact";

const LandingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023";
    }, []);

    return (
        <div>
            <>
                <Navigation />
                <div id="wrapper">
                    <div id="content-fix">
                        <Header />
                        <Gallery />
                    </div>
                    <Contact />
                </div>
            </>
        </div>
    );
};

export default LandingPage;
