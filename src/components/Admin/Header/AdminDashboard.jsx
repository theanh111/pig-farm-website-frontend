import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { Layout, Breadcrumb, Card, Col, Row } from "antd";
import AdminHeader from "./AdminHeader";
import { Link } from "react-router-dom";
import { countPig } from "../../../api/pig";
import { countFarm } from "../../../api/farm";

const { Content } = Layout;

const AdminDashboard = (props) => {
    const [totalPig, setTotalPig] = useState(null);
    const [totalFarm, setTotalFarm] = useState(null);

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

    const fetchData = () => {
        countFarmAPI();
        countPigAPI();
    };
    useEffect(() => {
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
                        <div className="site-card-wrapper">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card title="Tổng Số Cá Thể" bordered={false}>
                                        {totalPig}
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="Tổng Số Cơ Sở Chăn Nuôi" bordered={false}>
                                        {totalFarm}
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card title="Thành Viên" bordered={false}>
                                        10
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
