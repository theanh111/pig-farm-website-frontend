import { useEffect, useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import "../../App.css";
import { PigGallery } from "../Gallery/PigGallery";
import News from "../News/News";
import Blog from "../Blog/Blog";
import { ImageGallery } from "../Gallery/ImageGallery";
import { Footer } from "../Footer/Footer";

const LandingPage = () => {
    const [vietnamese, setVietnamese] = useState({
        web_title: "DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI",
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
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023";
    }, []);

    return (
        <>
            <Navigation vietnamese={vietnamese} />
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

            {/*
             <div class="w3-content" style={{ maxWidth: "1532px" }}>
         

               

                <div class="w3-row-padding w3-large w3-center" style={{ margin: "32px 0" }}>
                    <div class="w3-third">
                        <i class="fa fa-map-marker w3-text-red"></i> 423 Some adr, Chicago, US
                    </div>
                    <div class="w3-third">
                        <i class="fa fa-phone w3-text-red"></i> Phone: +00 151515
                    </div>
                    <div class="w3-third">
                        <i class="fa fa-envelope w3-text-red"></i> Email: mail@mail.com
                    </div>
                </div>

                <div class="w3-panel w3-red w3-leftbar w3-padding-32">
                    <h6>
                        <i class="fa fa-info w3-deep-orange w3-padding w3-margin-right"></i> On demand, we can offer playstation, babycall,
                        children care, dog equipment, etc.
                    </h6>
                </div>

                <div class="w3-container">
                    <h3>Our Hotels</h3>
                    <h6>You can find our hotels anywhere in the world:</h6>
                </div>

                <div class="w3-row-padding w3-padding-16 w3-text-white w3-large">
                    <div class="w3-half w3-margin-bottom">
                        <div class="w3-display-container">
                            <img src="/images/cosochannuoi.jpg" alt="Cinque Terre" style={{ width: "100%" }} />
                            <span class="w3-display-bottomleft w3-padding">Cinque Terre</span>
                        </div>
                    </div>
                    <div class="w3-half">
                        <div class="w3-row-padding" style={{ margin: "0 -16px" }}>
                            <div class="w3-half w3-margin-bottom">
                                <div class="w3-display-container">
                                    <img src="/images/cosochannuoi.jpg" alt="New York" style={{ width: "100%" }} />
                                    <span class="w3-display-bottomleft w3-padding">New York</span>
                                </div>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <div class="w3-display-container">
                                    <img src="/images/cosochannuoi.jpg" alt="San Francisco" style={{ width: "100%" }} />
                                    <span class="w3-display-bottomleft w3-padding">San Francisco</span>
                                </div>
                            </div>
                        </div>
                        <div class="w3-row-padding" style={{ margin: "0 -16px" }}>
                            <div class="w3-half w3-margin-bottom">
                                <div class="w3-display-container">
                                    <img src="/images/cosochannuoi.jpg" alt="Pisa" style={{ width: "100%" }} />
                                    <span class="w3-display-bottomleft w3-padding">Pisa</span>
                                </div>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <div class="w3-display-container">
                                    <img src="/images/cosochannuoi.jpg" alt="Paris" style={{ width: "100%" }} />
                                    <span class="w3-display-bottomleft w3-padding">Paris</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w3-container w3-padding-32 w3-black w3-opacity w3-card w3-hover-opacity-off" style={{ margin: "32px 0" }}>
                    <h2>Get the best offers first!</h2>
                    <p>Join our newsletter.</p>
                    <label>E-mail</label>
                    <input class="w3-input w3-border" type="text" placeholder="Your Email address" />
                    <button type="button" class="w3-button w3-red w3-margin-top">
                        Subscribe
                    </button>
                </div>

                <div class="w3-container" id="contact">
                    <h2>Contact</h2>
                    <p>If you have any questions, do not hesitate to ask them.</p>
                    <i class="fa fa-map-marker w3-text-red" style={{ width: "30px" }}></i> Chicago, US
                    <br />
                    <i class="fa fa-phone w3-text-red" style={{ width: "30px" }}></i> Phone: +00 151515
                    <br />
                    <i class="fa fa-envelope w3-text-red" style={{ width: "30px" }}>
                        {" "}
                    </i>{" "}
                    Email: mail@mail.com
                    <br />
                    <form action="/action_page.php" target="_blank">
                        <p>
                            <input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name" />
                        </p>
                        <p>
                            <input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email" />
                        </p>
                        <p>
                            <input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message" />
                        </p>
                        <p>
                            <button class="w3-button w3-black w3-padding-large" type="submit">
                                SEND MESSAGE
                            </button>
                        </p>
                    </form>
                </div>
            </div> */}
        </>
    );
};

export default LandingPage;
