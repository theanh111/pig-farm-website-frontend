import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Typography, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, EyeOutlined, SelectOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { getAllFarm } from "../../../api/farm";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlog } from "../../../api/blog";
import BlogViewDetail from "./BlogViewDetail";
import AddNewBlog from "./AddNewBlog";
import { checkToken } from "../../../api/auth";

const { Content } = Layout;

const AdminBlog = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditFarm, setViewEditFarm] = useState(false);
    const [viewDetailBlog, setViewDetailBlog] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditFarm, setDataEditFarm] = useState({});
    const [blogData, setBlogData] = useState({});

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

    const handleViewDetail = (blog) => {
        checkTokenAPI();
        setBlogData(blog);
        setViewDetailBlog(true);
    };

    const columns = [
        {
            title: "Hình Ảnh",
            key: "hinh_anh",
            width: "5%",
            align: "center",
            render: (record) => {
                return (
                    <Image style={{ width: "50px", height: "50px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh} />
                );
            },
        },
        {
            title: "Mã Thông Tin Dự Án",
            key: "ma_blog",
            width: "20%",
            editable: true,
            render: (record) => {
                return (
                    <div style={{ fontWeight: 500, color: "#34568B" }}>
                        <span>{record.ma_blog}</span>
                    </div>
                );
            },
        },
        {
            title: "Tiêu Đề Thông Tin Dự Án",
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
                    <Tooltip title="Sửa Thông Tin Dự Án">
                        <Button onClick={() => handleEditFarm(record)}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Button>
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
                    <Tooltip title="Xem trước">
                        <Button onClick={() => handleViewDetail(record)}>
                            <EyeOutlined style={{ fontSize: 20 }} />
                        </Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Live",
            align: "center",
            width: "20%",
            render: (record) => {
                return (
                    <Tooltip title="Live">
                        <Link to={"/thong-tin-du-an/" + record.ma_blog} target="_blank">
                            <Button>
                                <SelectOutlined style={{ fontSize: 20 }} />
                            </Button>
                        </Link>
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
        getAllFarmAPI();
    }, []);

    useEffect(() => {
        document.title = "Quản lý Thông Tin Dự An - Admin";
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
                                <Breadcrumb.Item>Thông Tin Dự Án ({data ? data.length : 0})</Breadcrumb.Item>
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
                                        Thêm Thông Tin Dự Án
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

                            {viewDetailBlog ? (
                                <BlogViewDetail
                                    blogData={blogData}
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => {
                                        setViewDetailBlog(false);
                                        setBlogData([]);
                                    }}
                                    viewDetailBlog={viewDetailBlog}
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
