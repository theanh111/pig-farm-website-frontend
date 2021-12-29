import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { Layout, Breadcrumb, Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Row, Col, Image } from "antd";
import AdminHeader from "./AdminHeader";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddNewFarm from "./AddNewFarm";
import Loader from "../../Loader/Loader";
import { getAllFarm } from "../../../api/farm";
import { Link, useNavigate } from "react-router-dom";

const { Content } = Layout;

const AdminFarms = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewAddNewPigImport, setViewAddNewPigImport] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const showAddNewFarm = () => {
        let token = checkTokenLocalStorage();
        if (token) {
            setViewLoader(true);
            sleep(300).then(() => {
                setViewAddNewFarm(true);
                setViewLoader(false);
            });
        } else {
            backToLogin();
        }
    };

    const backToLogin = () => {
        localStorage.removeItem("token");
        alert("Hết phiên đăng nhập");
        history("/dang-nhap");
    };

    const checkTokenLocalStorage = () => {
        let token = localStorage.getItem("token");
        if (token) {
            return true;
        } else {
            return false;
        }
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const columns = [
        {
            title: "Hình Ảnh",
            key: "hinh_anh",
            width: "5%",
            editable: true,
            render: (record) => {
                return (
                    <Image style={{ width: "90px", height: "90px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh} />
                );
            },
        },
        {
            title: "Tên Trang Trại",
            key: "ten_trang_trai",
            width: "40%",
            editable: true,
            render: (record) => (
                <div
                    style={{ cursor: "pointer", fontWeight: 500, fontSize: 18, color: "blue" }}
                    dangerouslySetInnerHTML={{ __html: record.ten_trang_trai }}
                ></div>
            ),
        },
        {
            title: "Ngày Nhập",
            align: "center",
            dataIndex: "ngay_nhap",
            width: "30%",
            editable: true,
        },
        {
            title: "Sửa",
            align: "center",
            width: "10%",
            render: (record) => {
                return (
                    <Typography.Link>
                        <EditOutlined style={{ fontSize: 25 }} />
                    </Typography.Link>
                );
            },
        },
    ];

    const getAllFarmAPI = async () => {
        setViewLoader(true);
        await getAllFarm()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setData(result);
                        setViewLoader(false);
                    }
                }
                setViewLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllFarmAPI();
    }, []);

    useEffect(() => {
        document.title = "Danh Sách Cơ Sở Chăn Nuôi - Admin";
    }, []);

    return (
        <div>
            {viewLoader ? <Loader /> : null}
            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    <AdminNavbar />
                    <Layout className="site-layout">
                        <AdminHeader />
                        <Content style={{ margin: "0 16px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>
                                    <Link to="/admin"> MONGCAIPIG</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Cơ Sở Chăn Nuôi ({data ? data.length : 0})</Breadcrumb.Item>
                            </Breadcrumb>

                            <Row gutter={[8, 8]}>
                                <Col span={2}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            showAddNewFarm();
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm Cơ Sở
                                    </Button>
                                </Col>
                                {/* <Col span={2}>
                                    <Button type="primary" onClick={showAddNewFarm} icon={<PlusOutlined />}>
                                        Import File Excel
                                    </Button>
                                </Col> */}
                            </Row>

                            {viewAddNewFarm ? (
                                <AddNewFarm
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => setViewAddNewFarm(false)}
                                    viewAddNewFarm={viewAddNewFarm}
                                />
                            ) : null}

                            <Form form={form} component={false}>
                                <Table
                                    className="table-view-data"
                                    size="small"
                                    bordered
                                    dataSource={data}
                                    columns={columns}
                                    pagination={{
                                        pageSizeOptions: [5, 10, 20],
                                    }}
                                />
                            </Form>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};

export default AdminFarms;
