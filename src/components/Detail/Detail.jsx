import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JsonData from "../../data/data.json";
import { ContentDetail } from "./ContentDetail";
import { Contact } from "../Contact/contact";
import { getPigById } from "../../api/pig";
import { Carousel, Image } from "antd";

export const Detail = () => {
    const [pigDetail, setPigDetail] = useState({});
    const getDataPigById = async (id) => {
        await getPigById(id)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    setPigDetail(result[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const params = useParams();
    const [landingPageData, setLandingPageData] = useState({});

    useEffect(() => {
        getDataPigById(params.id);
        setLandingPageData(JsonData);
    }, []);

    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    return (
        <>
            <Navigation />
            <main className="container-detail">
                <div className="left-column-detail">
                    <div style={{ width: "584px", height: "389px", objectFit: "cover", display: "inline-block" }}>
                        <Image
                            style={{ borderRadius: "2%", cursor: "pointer" }}
                            className="active"
                            src={pigDetail.hinh_anh_1}
                            alt={pigDetail.ma_so_ca_the}
                        />
                    </div>
                </div>

                <div className="right-column-detail">
                    <div className="product-description-detail">
                        <div className="site-card-border-less-wrapper">
                            <div className="detail-box">
                                <div style={{ paddingLeft: 10, paddingTop: 5 }}>
                                    <span className="product-description-detail-span">Mã số cá thể: </span>
                                    <br />
                                    <h1>{pigDetail.ma_so_ca_the}</h1>
                                </div>
                            </div>
                            <p>
                                - Dấu Thời Gian: <span style={{ fontWeight: 500 }}>{pigDetail.dau_thoi_gian}</span>
                            </p>
                            <p>
                                - Tuổi: <span style={{ fontWeight: 500 }}>{pigDetail.tuoi}</span>
                            </p>
                            <p>
                                - Giới Tính: <span style={{ fontWeight: 500 }}>{pigDetail.gioi_tinh}</span>
                            </p>
                            <p>
                                - Trọng Lượng (kg): <span style={{ fontWeight: 500 }}>{pigDetail.trong_luong_co_the_kg}</span>
                            </p>
                            <p>
                                - Địa Điểm Đánh Giá: <span style={{ fontWeight: 500 }}>{pigDetail.dia_diem_danh_gia}</span>
                            </p>
                        </div>
                    </div>

                    {/* <div className="product-configuration-detail"></div> */}

                    {/* <div className="product-price-detail">
                        <span>148$</span>
                    </div> */}
                </div>
            </main>
            <ContentDetail data={pigDetail} />
            <Contact data={landingPageData.Contact} />
            {/* <About data={landingPageData.About} /> */}
        </>
    );
};
