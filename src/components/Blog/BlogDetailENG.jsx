import React from "react";
import { NavigationENG } from "../Navigation/NavigationENG";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, Image, Descriptions, Layout, Empty, Card } from "antd";
import { getBlogByBlogCode } from "../../api/blog";
import Loader from "../Loader/Loader";
import { FooterENG } from "../Footer/FooterENG";
const { Content } = Layout;

export const BlogDetailENG = () => {
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
                                                    <Link to="/project-information"> Project Information</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to={"/project-information/" + blogDetail.ma_blog}>{blogDetail.ten_blog}</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-row-padding w3-padding-small">
                                    <Card style={{ color: "#006544", fontWeight: 700, fontSize: 20 }}>{blogDetail.ten_blog}</Card>
                                    <Card>
                                        <div dangerouslySetInnerHTML={{ __html: blogDetail.noi_dung }} />
                                        {blogDetail.hinh_anh_1 ? (
                                            <>
                                                <div class="w3-row ">
                                                    <div class="w3-quarter w3-container"></div>
                                                    <div class="w3-half w3-container ">
                                                        <img
                                                            src={blogDetail.hinh_anh_1}
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

                                        {blogDetail.hinh_anh_2 ? (
                                            <>
                                                <div class="w3-row ">
                                                    <div class="w3-quarter w3-container"></div>
                                                    <div class="w3-half w3-container ">
                                                        <img
                                                            src={blogDetail.hinh_anh_2}
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
