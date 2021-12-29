import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { Layout, Breadcrumb, Card, Col, Row } from "antd";
import AdminHeader from "./AdminHeader";
import { Link } from "react-router-dom";

const { Content } = Layout;

const AdminDashboard = (props) => {
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
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="Tổng Số Lợn" bordered={false}>
                                        16
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="Cơ Sở Chăn Nuôi" bordered={false}>
                                        19
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="Thành Viên" bordered={false}>
                                        19
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        {/* ,
                       
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div> */}
                    </Content>
                    {/* <Footer style={{ textAlign: "center" }}>MONGCAIPIG</Footer> */}
                </Layout>
            </Layout>
        </>
    );
};

export default AdminDashboard;
