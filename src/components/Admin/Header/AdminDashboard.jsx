import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { Layout, Breadcrumb, Card, Col, Row } from "antd";
import AdminHeader from "./AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import { countPig } from "../../../api/pig";
import { countFarm } from "../../../api/farm";
import { checkToken } from "../../../api/auth";
import { countNews } from "../../../api/news";
import { countBlog } from "../../../api/blog";

const { Content } = Layout;

const AdminDashboard = (props) => {
    const history = useNavigate();
    const [totalPig, setTotalPig] = useState(null);
    const [totalFarm, setTotalFarm] = useState(null);
    const [totalNews, setTotalNews] = useState(null);
    const [totalBlog, setTotalBlog] = useState(null);

    const countPigAPI = async () => {
        await countPig()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setTotalPig(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const countFarmAPI = async () => {
        await countFarm()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setTotalFarm(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const countNewsAPI = async () => {
        await countNews()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setTotalNews(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const countBlogAPI = async () => {
        await countBlog()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setTotalBlog(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const checkTokenAPI = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            await checkToken(token)
                .then((res) => {
                    if (res.status) {
                        if (res.status !== 200) {
                            backToLogin();
                        }
                    }
                })
                .catch((err) => {
                    backToLogin();
                    console.log(err);
                });
        } else {
            backToLogin();
        }
    };

    const backToLogin = () => {
        localStorage.removeItem("token");
        history("/dang-nhap");
    };

    const fetchData = () => {
        countFarmAPI();
        countPigAPI();
        countNewsAPI();
        countBlogAPI();
    };

    useEffect(() => {
        checkTokenAPI();
        fetchData();
    }, []);

    useEffect(() => {
        document.title = "Trang Chủ - Admin";
    }, []);

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <AdminNavbar />
                <Layout className="site-layout">
                    <AdminHeader />
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>
                                <Link to="/admin"> MONGCAIPIG</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Trang Chủ</Breadcrumb.Item>
                        </Breadcrumb>
                        <div class="w3-content" style={{ maxWidth: "2000px" }}>
                            <div class="w3-row-padding w3-padding-22">
                                <div class="w3-col m3 w3-padding-small">
                                    <Card title="Tổng Số Cá Thể" bordered={false}>
                                        {totalPig ? <h2>{totalPig}</h2> : <h2>Loading...</h2>}
                                    </Card>
                                </div>

                                <div class="w3-col m3  w3-padding-small">
                                    <Card title="Tổng Số Cơ Sở Chăn Nuôi" bordered={false}>
                                        {totalFarm ? <h2>{totalFarm}</h2> : <h2>Loading...</h2>}
                                    </Card>
                                </div>
                                <div class="w3-col m3  w3-padding-small">
                                    <Card title="Tổng Số Tin Tức" bordered={false}>
                                        {totalNews ? <h2>{totalNews}</h2> : <h2>Loading...</h2>}
                                    </Card>
                                </div>
                                <div class="w3-col m3  w3-padding-small">
                                    <Card title="Tổng Số Thông Tin Dự Án" bordered={false}>
                                        {totalBlog ? <h2>{totalBlog}</h2> : <h2>Loading...</h2>}
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminDashboard;
