import React from "react";
import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../Contact/contact";
import { CalendarOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { List, Avatar, Space, Row, Col, Breadcrumb, Image, Layout } from "antd";
import { getAllBlog } from "../../api/blog";
import Loader from "../Loader/Loader";

const { Content } = Layout;

export const BlogPage = () => {
    const history = useNavigate();
    const params = useParams();
    const [viewLoader, setViewLoader] = useState(false);
    const [pigByFarmName, setPigByFarmName] = useState([]);
    const [farmDetail, setFarmDetail] = useState({});
    const [landingPageData, setLandingPageData] = useState({});
    const [listData, setListData] = useState([]);

    const getAllBlogAPI = async () => {
        setViewLoader(true);
        await getAllBlog()
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

    useEffect(() => {
        getAllBlogAPI();
        window.scrollTo(0, 0);
        document.title = "Thông Tin Dự Án";
    }, []);

    const extractContent = (s) => {
        var span = document.createElement("span");
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

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
                                        <Link to="/thong-tin-du-an">Thông Tin Dự Án</Link>
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
                                                            <Link style={{ cursor: "pointer" }} to={"/thong-tin-du-an/" + item.ma_blog}>
                                                                <span
                                                                    className="blog-list"
                                                                    style={{ fontWeight: 600, fontSize: 18, fontFamily: "Open Sans" }}
                                                                >
                                                                    {item.ten_blog}
                                                                </span>
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
