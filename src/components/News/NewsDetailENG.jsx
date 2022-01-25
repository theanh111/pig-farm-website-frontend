import React from "react";
import { NavigationENG } from "../Navigation/NavigationENG";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FooterENG } from "../Footer/FooterENG";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, Descriptions, Layout, Empty, Card, Image } from "antd";
import Loader from "../Loader/Loader";
import { getNewsByNewsCode } from "../../api/news";
const { Content } = Layout;

export const NewsDetailENG = () => {
    const params = useParams();
    const [viewLoader, setViewLoader] = useState(false);
    const [newsDetail, setNewsDetail] = useState({});

    const getNewsByNewsCodeAPI = async (newscode) => {
        setViewLoader(true);
        await getNewsByNewsCode(newscode)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    let data = result[0];
                    setNewsDetail(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    useEffect(() => {
        getNewsByNewsCodeAPI(params.newscode);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = newsDetail.ten_tin_tuc;
    }, [newsDetail]);

    return (
        <>
            <NavigationENG />
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
                                                    <Link to="/homepage">Homepage</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/news">News</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to={"/news/" + newsDetail.ma_tin_tuc}>{newsDetail.ten_tin_tuc}</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1532px", paddingBottom: 50 }}>
                                <div class="w3-row-padding w3-padding-small">
                                    <Card style={{ color: "#006544", fontWeight: 700, fontSize: 20 }}>{newsDetail.ten_tin_tuc}</Card>
                                    <Card>
                                        <div dangerouslySetInnerHTML={{ __html: newsDetail.noi_dung }} />
                                        {newsDetail.hinh_anh_1 ? (
                                            <>
                                                <div class="w3-row ">
                                                    <div class="w3-quarter w3-container"></div>
                                                    <div class="w3-half w3-container ">
                                                        <img
                                                            src={newsDetail.hinh_anh_1}
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "400px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    </div>
                                                    <div class="w3-quarter w3-container"></div>
                                                </div>
                                                <br></br>
                                            </>
                                        ) : null}
                                        {newsDetail.hinh_anh_2 ? (
                                            <>
                                                <div class="w3-row ">
                                                    <div class="w3-quarter w3-container"></div>
                                                    <div class="w3-half w3-container ">
                                                        <img
                                                            src={newsDetail.hinh_anh_2}
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "400px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    </div>

                                                    <div class="w3-quarter w3-container"></div>
                                                </div>
                                                <br></br>
                                            </>
                                        ) : null}
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <FooterENG />
                    </div>
                </>
            )}
        </>
    );
};
