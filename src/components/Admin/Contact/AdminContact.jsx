import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Typography, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, EyeOutlined, SelectOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import AddNewContact from "./AddNewContact";
import { checkToken } from "../../../api/auth";
import { getAllContact } from "../../../api/contact";

const { Content } = Layout;

const AdminContact = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditFarm, setViewEditFarm] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditFarm, setDataEditFarm] = useState({});

    const showAddNewFarm = () => {
        checkTokenAPI();
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

    const handleEditFarm = (farm) => {
        checkTokenAPI();
        setDataEditFarm(farm);
        setViewEditFarm(true);
    };

    const columns = [
        {
            title: "Tiêu Đề Liên Hệ",
            key: "ten_lien_he",
            width: "15%",
            align: "center",
            render: (record) => {
                return <span style={{ fontWeight: 500, color: "#34568B" }}>{record.ten_lien_he}</span>;
            },
        },
        {
            title: "Địa Chỉ",
            key: "dia_chi",
            width: "20%",
            dataIndex: "dia_chi",
        },
        {
            title: "Số Điện Thoại",
            dataIndex: "sdt",
            width: "15%",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "15%",
        },
        {
            title: "Người Nhập",
            align: "center",
            dataIndex: "nguoi_nhap",
            width: "5%",
        },
        {
            title: "Ngày Nhập",
            align: "center",
            dataIndex: "ngay_nhap",
            width: "10%",
            editable: true,
        },
        {
            title: "Sửa",
            align: "center",
            width: "3%",
            render: (record) => {
                return (
                    <Tooltip title="Sửa Thông Tin Liên Hệ">
                        <Typography.Link>
                            <EditOutlined onClick={() => handleEditFarm(record)} style={{ fontSize: 25 }} />
                        </Typography.Link>
                    </Tooltip>
                );
            },
        },
    ];

    const getAllContactAPI = async () => {
        setViewLoader(true);
        await getAllContact()
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
        }
    };

    useEffect(() => {
        checkTokenAPI();
        getAllContactAPI();
    }, []);

    useEffect(() => {
        document.title = "Quản lý Thông Tin Liên Hệ - Admin";
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
                                <Breadcrumb.Item>Thông Tin Liên Hệ ({data ? data.length : 0})</Breadcrumb.Item>
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
                                        Thêm Thông Tin Liên Hệ
                                    </Button>
                                </Col>
                            </Row>

                            {viewAddNewFarm ? (
                                <AddNewContact
                                    fetchData={() => getAllContactAPI()}
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

export default AdminContact;
