import React from "react";
import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { Contact } from "../Contact/contact";
import { Link } from "react-router-dom";
import { List, Row, Col, Breadcrumb, Image, Layout } from "antd";
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
                            <Content style={{ padding: "0px 400px 0px" }}>
                                <Breadcrumb style={{ margin: "8px 0" }}>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/">Trang Chủ</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/tin-tuc">Tin Tức</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row align="middle" justify="center">
                                <Col xs={15}>
                                    <List
                                        itemLayout="vertical"
                                        size="small"
                                        pagination={{
                                            onChange: (page) => {
                                                console.log(page);
                                            },
                                            pageSize: 10,
                                        }}
                                        dataSource={listData}
                                        renderItem={(item) => (
                                            <List.Item
                                                key={item.title}
                                                extra={
                                                    <>
                                                        {item.hinh_anh ? (
                                                            <Image
                                                                style={{
                                                                    width: 120,
                                                                    height: 90,
                                                                    objectFit: "cover",
                                                                    display: "inline-block",
                                                                }}
                                                                alt={item.title}
                                                                src={item.hinh_anh}
                                                            />
                                                        ) : (
                                                            <Image
                                                                style={{
                                                                    width: 120,
                                                                    height: 90,
                                                                    objectFit: "cover",
                                                                    display: "inline-block",
                                                                }}
                                                                alt="Hinh Anh"
                                                                src="/images/user/imageerror.png"
                                                            />
                                                        )}
                                                    </>
                                                }
                                            >
                                                <List.Item.Meta
                                                    style={{ height: 20 }}
                                                    title={
                                                        <>
                                                            <Link style={{ cursor: "pointer" }} to={"/tin-tuc/" + item.ma_tin_tuc}>
                                                                <div
                                                                    style={{
                                                                        wordWrap: "break-word",
                                                                        width: "950px",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                    }}
                                                                >
                                                                    <span
                                                                        className="blog-list"
                                                                        style={{ fontWeight: 600, fontSize: 18, fontFamily: "Open Sans" }}
                                                                    >
                                                                        {item.ten_tin_tuc}
                                                                    </span>
                                                                </div>
                                                            </Link>

                                                            <p style={{ color: "grey", fontSize: 12, fontFamily: "Open Sans" }}>
                                                                <CalendarOutlined /> {item.ngay_nhap}
                                                            </p>
                                                            <div
                                                                style={{
                                                                    fontFamily: "Open Sans",
                                                                    fontSize: 13,
                                                                    wordWrap: "break-word",
                                                                    width: "950px",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                }}
                                                            >
                                                                {extractContent(item.noi_dung)}
                                                            </div>
                                                        </>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
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
