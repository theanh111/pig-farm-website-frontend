import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Typography, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddNewFarm from "../Header/AddNewFarm";
import Loader from "../../Loader/Loader";
import { getAllFarm } from "../../../api/farm";
import { Link, useNavigate } from "react-router-dom";
import EditFarm from "../Header/Farm/CRUD/EditFarm";

const { Content } = Layout;

const AdminBlog = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditFarm, setViewEditFarm] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditFarm, setDataEditFarm] = useState({});

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

    const handleEditFarm = (farm) => {
        setDataEditFarm(farm);
        setViewEditFarm(true);
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
                // <Link to={"/co-so/" + record.id} target="_blank">
                <div
                    style={{ cursor: "pointer", fontWeight: 500, fontSize: 15, color: "#34568B" }}
                    dangerouslySetInnerHTML={{ __html: record.ten_trang_trai }}
                ></div>
                // </Link>
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
                    <Tooltip title="Sửa Cơ Sở">
                        <Typography.Link>
                            <EditOutlined onClick={() => handleEditFarm(record)} style={{ fontSize: 25 }} />
                        </Typography.Link>
                    </Tooltip>
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
        document.title = "Quản lý Blog - Admin";
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
                                <Breadcrumb.Item>Blog ({data ? data.length : 0})</Breadcrumb.Item>
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
                                        Thêm Bài Viết
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

                            {viewEditFarm ? (
                                <EditFarm
                                    id={dataEditFarm.id}
                                    ten_trang_trai={dataEditFarm.ten_trang_trai}
                                    hinh_anh={dataEditFarm.hinh_anh}
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => {
                                        setViewEditFarm(false);
                                        setDataEdit([]);
                                    }}
                                    viewEditFarm={viewEditFarm}
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

export default AdminBlog;
