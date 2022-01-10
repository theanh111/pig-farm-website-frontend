import { useState, useEffect } from "react";
import { Navigation } from "../Navigation/navigation";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
import "../../App.css";
import { Gallery } from "../Gallery/gallery";
import { Gallery2 } from "../Gallery/gallery2";
import { Header } from "../Header/header";
import { Contact } from "../Contact/contact";
import { Team } from "../Team/Team";
import { Testimonials } from "../testimonials";
import { About } from "../About/about";

export const scroll = new SmoothScroll('a[href*="/"]', {
    speed: 1000,
    speedAsDuration: true,
});

const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        setLandingPageData(JsonData);
        document.title = "Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023";
    }, []);

    return (
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />

            {/* <Features data={landingPageData.Features} /> */}
            {/* <Services data={landingPageData.Services} /> */}
            <Gallery data={landingPageData.Gallery} />
            <Gallery2 data={landingPageData.Gallery} />
            <Testimonials data={landingPageData.Testimonials} />
            <Team data={landingPageData.Team} />
            <About data={landingPageData.About} />
            <Contact data={landingPageData.Contact} />
        </div>
    );
};

export default LandingPage;
