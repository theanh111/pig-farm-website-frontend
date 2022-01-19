import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Button, Row, Col, Image, Tooltip, Modal, message } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlog, getAllBlog } from "../../../api/blog";
import BlogViewDetail from "./BlogViewDetail";
import AddNewBlog from "./AddNewBlog";
import EditBlog from "./EditBlog";
import { checkToken } from "../../../api/auth";

const { Content } = Layout;

const AdminBlog = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditBlog, setViewEditBlog] = useState(false);
    const [viewDetailBlog, setViewDetailBlog] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditBlog, setDataEditBlog] = useState({});
    const [dataDeleteBlog, setDataDeleteBlog] = useState({});
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

    const handleEditBlog = (blog) => {
        checkTokenAPI();
        setDataEditBlog(blog);
        setViewEditBlog(true);
    };

    const handleViewDetail = (blog) => {
        checkTokenAPI();
        setBlogData(blog);
        setViewDetailBlog(true);
    };

    const handleClickDelete = (blog) => {
        checkTokenAPI();
        setDataDeleteBlog(blog);
        setViewConfirm(true);
    };

    const handleCancelDelete = () => {
        checkTokenAPI();
        setDataDeleteBlog({});
        setViewConfirm(false);
    };

    const handleOkDelete = (blog) => {
        checkTokenAPI();
        deleteBlogAPI(blog);
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
            width: "40%",
            editable: true,
            render: (record) => {
                return (
                    <Link to={"/thong-tin-du-an/" + record.ma_blog} target="_blank">
                        <div style={{ fontWeight: 500, color: "#34568B", cursor: "pointer" }}>
                            <span>{record.ma_blog}</span>
                        </div>
                    </Link>
                );
            },
        },
        {
            title: "Tiêu Đề Thông Tin Dự Án",
            dataIndex: "ten_blog",
            width: "40%",
            editable: true,
        },
        {
            title: "Người Nhập",
            align: "center",
            dataIndex: "nguoi_nhap",
            width: "5%",
            editable: true,
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
            width: "5%",
            render: (record) => {
                return (
                    <Tooltip title="Sửa Thông Tin Dự Án">
                        <Button onClick={() => handleEditBlog(record)}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Xem trước",
            align: "center",
            width: "5%",
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
            title: "Xóa",
            align: "center",
            width: "5%",
            render: (record) => {
                return (
                    <Tooltip title="Xóa">
                        <Button type="default" danger onClick={() => handleClickDelete(record)}>
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Button>
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

    const deleteBlogAPI = async (blog) => {
        setViewLoader(true);
        await deleteBlog(blog)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Xóa thông tin dự án thành công");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeleteBlog({});
                            getAllFarmAPI();
                        });
                    } else if (res.status == 400) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    } else if (res.status == 401) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    }
                }
            })
            .catch((err) => {
                alert("Hết phiên đăng nhập");
                history("/dang-nhap");
            });
        setViewLoader(false);
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

    useEffect(() => {
        checkTokenAPI();
        getAllFarmAPI();
    }, []);

    useEffect(() => {
        document.title = "Quản lý Thông Tin Dự An - Admin";
    }, []);

    return (
        <div>
            {viewConfirm ? (
                <Modal
                    centered
                    okType="danger"
                    style={{ zIndex: 9 }}
                    title={<span style={{ color: "red" }}>Bạn có chắc muốn xóa?</span>}
                    visible={viewConfirm}
                    onOk={() => handleOkDelete(dataDeleteBlog)}
                    onCancel={() => handleCancelDelete()}
                    cancelText="Hủy"
                    okText="Xóa"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeleteBlog.ten_blog}</p>
                </Modal>
            ) : null}
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
                            </Row>

                            {viewAddNewFarm ? (
                                <AddNewBlog
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => setViewAddNewFarm(false)}
                                    viewAddNewFarm={viewAddNewFarm}
                                />
                            ) : null}

                            {viewEditBlog ? (
                                <EditBlog
                                    id={dataEditBlog.id}
                                    ma_blog={dataEditBlog.ma_blog}
                                    ten_blog={dataEditBlog.ten_blog}
                                    noi_dung={dataEditBlog.noi_dung}
                                    hinh_anh={dataEditBlog.hinh_anh}
                                    fetchData={() => getAllFarmAPI()}
                                    closeDrawer={() => {
                                        setViewEditBlog(false);
                                        setDataEdit([]);
                                    }}
                                    viewEditBlog={viewEditBlog}
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
