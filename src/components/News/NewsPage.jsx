import React from "react";
import { Navigation } from "../Navigation/Navigation";
import { useState, useEffect } from "react";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import { List, Row, Col, Breadcrumb, Image, Layout, Empty } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { getAllNews } from "../../api/news";
import Loader from "../Loader/Loader";

const { Content } = Layout;

export const NewsPage = () => {
    const [viewLoader, setViewLoader] = useState(false);
    const [listData, setListData] = useState([]);

    const getAllNewsAPI = async () => {
        setViewLoader(true);
        await getAllNews()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setListData(result);
                        setViewLoader(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    const extractContent = (s) => {
        var span = document.createElement("span");
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

    useEffect(() => {
        getAllNewsAPI();
        window.scrollTo(0, 0);
        document.title = "Tin Tức";
    }, []);

    return (
        <>
            <Navigation />
            {viewLoader ? (
                <Loader />
            ) : (
                <>
                    <div id="wrapper">
                        <div id="content-fix">
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-row-padding">
                                    <div class="w3-col m12">
                                        <Content style={{ padding: 10 }}>
                                            <Breadcrumb>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/">Trang Chủ</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/tin-tuc">Tin Tức ({listData ? listData.length : 0})</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-row-padding w3-padding-small">
                                    {listData ? (
                                        listData.map((item, index) => (
                                            <>
                                                <Link style={{ cursor: "pointer" }} to={"/tin-tuc/" + item.ma_tin_tuc}>
                                                    <div class="w3-row-padding w3-padding-small" id="about">
                                                        <div class="w3-col l10">
                                                            <h4 className="title-text" style={{ cursor: "pointer" }}>
                                                                {item.ten_tin_tuc}
                                                            </h4>

                                                            <span
                                                                style={{
                                                                    color: "grey",
                                                                    fontSize: 12,
                                                                    fontFamily: "Open Sans",
                                                                }}
                                                            >
                                                                <CalendarOutlined /> {item.ngay_nhap}
                                                            </span>
                                                            <div
                                                                className="text-content"
                                                                style={{
                                                                    color: "black",
                                                                    fontFamily: "Open Sans",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                {extractContent(item.noi_dung)}
                                                            </div>
                                                        </div>
                                                        <div class="w3-col l2">
                                                            <img
                                                                src={item.hinh_anh}
                                                                class="w3-image"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "150px",
                                                                    objectFit: "cover",
                                                                    display: "inline-block",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr style={{ width: "100%" }}></hr>
                                                </Link>
                                            </>
                                        ))
                                    ) : (
                                        <Empty description="Không Có Dữ Liệu" />
                                    )}
                                    {listData.length == 0 ? <Empty description="Không Có Dữ Liệu" /> : null}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};
