import React from "react";
import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../Contact/contact";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, Image, Descriptions, Layout, Empty } from "antd";
import { getBlogByBlogCode } from "../../api/blog";
import Loader from "../Loader/Loader";
const { Content } = Layout;

export const BlogDetail = () => {
    const params = useParams();
    const [viewLoader, setViewLoader] = useState(false);
    const [blogDetail, setBlogDetail] = useState({});

    const getBlogByBlogCodeAPI = async (blogcode) => {
        setViewLoader(true);
        await getBlogByBlogCode(blogcode)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    let data = result[0];
                    setBlogDetail(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    useEffect(() => {
        getBlogByBlogCodeAPI(params.blogcode);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = blogDetail.ten_blog;
    }, [blogDetail]);

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
                                    <Breadcrumb.Item className="txt">
                                        <Link to={"/thong-tin-du-an/" + blogDetail.ten_blog}>{blogDetail.ten_blog}</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row align="middle" justify="center">
                                <Col xs={15} style={{ cursor: "pointer" }}>
                                    {blogDetail.ten_blog && blogDetail.noi_dung ? (
                                        <Descriptions layout="vertical" bordered>
                                            <Descriptions.Item
                                                label={
                                                    <span style={{ color: "#006544", fontWeight: 600, paddingLeft: 20, fontSize: 20 }}>
                                                        {blogDetail.ten_blog}
                                                    </span>
                                                }
                                                span={3}
                                            >
                                                <div style={{ paddingLeft: 20 }}>
                                                    <div style={{ width: 1100 }}>
                                                        <div dangerouslySetInnerHTML={{ __html: blogDetail.noi_dung }} />
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
