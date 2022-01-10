import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Typography, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { getAllFarm } from "../../../api/farm";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlog } from "../../../api/blog";
import BlogViewDetail from "./BlogViewDetail";
import AddNewBlog from "./AddNewBlog";

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
    const [blogData, setBlogData] = useState({});

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

    const handleViewDetail = (blog) => {
        setBlogData(blog);
        setViewEditFarm(true);
    };

    const columns = [
        {
            title: "Mã Blog",
            key: "ma_blog",
            width: "20%",
            editable: true,
            render: (record) => {
                return (
                    <Link to={"/blog/" + record.ma_blog} target="_blank">
                        <div
                            style={{ cursor: "pointer", fontWeight: 500, color: "#34568B" }}
                            dangerouslySetInnerHTML={{ __html: record.ma_blog }}
                        ></div>
                    </Link>
                );
            },
        },
        {
            title: "Tên Blog",
            dataIndex: "ten_blog",
            width: "30%",
            editable: true,
        },
        {
            title: "Người Nhập",
            align: "center",
            dataIndex: "nguoi_nhap",
            width: "20%",
            editable: true,
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
            width: "20%",
            render: (record) => {
                return (
                    <Tooltip title="Sửa Blog">
                        <Typography.Link>
                            <EditOutlined onClick={() => handleEditFarm(record)} style={{ fontSize: 25 }} />
                        </Typography.Link>
                    </Tooltip>
                );
            },
        },
        {
            title: "Xem trước",
            align: "center",
            width: "20%",
            render: (record) => {
                return (
                    <Tooltip title="Sửa Blog">
                        <Typography.Link>
                            <EyeOutlined onClick={() => handleViewDetail(record)} style={{ fontSize: 25 }} />
                        </Typography.Link>
                    </Tooltip>
                );
            },
        },
    ];

    const getAllFarmAPI = async () => {
        setViewLoader(true);
        await getAllBlog()
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
                                <AddNewBlog
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => setViewAddNewFarm(false)}
                                    viewAddNewFarm={viewAddNewFarm}
                                />
                            ) : null}

                            {viewEditFarm ? (
                                <BlogViewDetail
                                    blogData={blogData}
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
