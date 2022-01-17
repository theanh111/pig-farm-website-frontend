import React from "react";
import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../Contact/contact";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, Image, Descriptions, Layout, Empty } from "antd";
import Loader from "../Loader/Loader";
import { getNewsByNewsCode } from "../../api/news";
const { Content } = Layout;

export const NewsDetail = () => {
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
            <Navigation />
            {viewLoader ? (
                <Loader />
            ) : (
                <>
                    <div id="wrapper">
                        <div id="content-fix">
                            <Content style={{ padding: "0px 400px 0px" }}>
                                <Breadcrumb style={{ margin: "8px 0" }}>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/">Trang Chủ</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/tin-tuc">Tin Tức</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to={"/tin-tuc/" + newsDetail.ma_tin_tuc}>{newsDetail.ten_tin_tuc}</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row align="middle" justify="center">
                                <Col xs={15} style={{ cursor: "pointer" }}>
                                    {newsDetail.ten_tin_tuc && newsDetail.noi_dung ? (
                                        <Descriptions layout="vertical" bordered>
                                            <Descriptions.Item
                                                label={
                                                    <span style={{ color: "#006544", fontWeight: 600, paddingLeft: 20, fontSize: 20 }}>
                                                        {newsDetail.ten_tin_tuc}
                                                    </span>
                                                }
                                                span={3}
                                            >
                                                <div style={{ paddingLeft: 20 }}>
                                                    <div style={{ width: 1100 }}>
                                                        <div dangerouslySetInnerHTML={{ __html: newsDetail.noi_dung }} />
                                                    </div>
                                                </div>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    ) : (
                                        <Empty description="Không Có Dữ Liệu" />
                                    )}
                                </Col>
                            </Row>
                        </div>
                        <Contact />
                    </div>
                </>
            )}
        </>
    );
};
