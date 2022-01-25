import { useEffect, useState } from "react";
import { NavigationENG } from "../Navigation/NavigationENG";
import "../../App.css";
import { PigGalleryENG } from "../Gallery/PigGalleryENG";
import NewsENG from "../News/NewsENG";
import BlogENG from "../Blog/BlogENG";
import { ImageGallery } from "../Gallery/ImageGallery";
import { FooterENG } from "../Footer/FooterENG";

const LandingPageENG = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Website of Project on Evaluation of genetic diversity of Mong Cai pig in Mong Cai City 2021-2023";
    }, []);

    return (
        <>
            <NavigationENG />
            <div id="wrapper">
                <div id="content-fix">
                    <ImageGallery />
                    <div class="w3-row-padding w3-padding-22">
                        <NewsENG />
                        <BlogENG />
                    </div>
                    <PigGalleryENG />
                </div>
                <FooterENG />
            </div>
        </>
    );
};

export default LandingPageENG;
