import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Button, Row, Col, Image, Tooltip, Modal, message } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import BlogViewDetail from "./NewsViewDetail";
import AddNewNews from "./AddNewNews";
import { checkToken } from "../../../api/auth";
import { getAllNews } from "../../../api/news";
import { deleteNews } from "../../../api/news";
import EditNews from "./EditNews";

const { Content } = Layout;

const AdminNews = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditNews, setViewEditNews] = useState(false);
    const [viewDetailBlog, setViewDetailBlog] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditNews, setDataEditNews] = useState({});
    const [dataDeleteNews, setDataDeleteNews] = useState({});
    const [blogData, setBlogData] = useState({});

    const showAddNewFarm = () => {
        let token = checkTokenLocalStorage();
        if (token) {
            checkTokenAPI();
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

    const handleEditNews = (news) => {
        checkTokenAPI();
        setDataEditNews(news);
        setViewEditNews(true);
    };

    const handleViewDetail = (news) => {
        checkTokenAPI();
        setBlogData(news);
        setViewDetailBlog(true);
    };

    const handleClickDelete = (news) => {
        checkTokenAPI();
        setDataDeleteNews(news);
        setViewConfirm(true);
    };

    const handleCancelDelete = () => {
        checkTokenAPI();
        setDataDeleteNews({});
        setViewConfirm(false);
    };

    const handleOkDelete = (news) => {
        checkTokenAPI();
        deleteNewsAPI(news);
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
            title: "Mã Tin Tức",
            key: "ma_tin_tuc",
            width: "40%",
            editable: true,
            render: (record) => {
                return (
                    <Link to={"/tin-tuc/" + record.ma_tin_tuc} target="_blank">
                        <div style={{ fontWeight: 500, color: "#34568B", cursor: "pointer" }}>
                            <span>{record.ma_tin_tuc}</span>
                        </div>
                    </Link>
                );
            },
        },
        {
            title: "Tiêu Đề Tin Tức",
            dataIndex: "ten_tin_tuc",
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
                    <Tooltip title="Sửa Tin Tức">
                        <Button onClick={() => handleEditNews(record)}>
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

    const deleteNewsAPI = async (news) => {
        setViewLoader(true);
        await deleteNews(news)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Xóa tin tức thành công");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeleteNews({});
                            getAllNewsAPI();
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

    const getAllNewsAPI = async () => {
        setViewLoader(true);
        await getAllNews()
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
        } else {
            backToLogin();
        }
    };

    useEffect(() => {
        checkTokenAPI();
        getAllNewsAPI();
    }, []);

    useEffect(() => {
        document.title = "Quản lý Tin Tức - Admin";
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
                    onOk={() => handleOkDelete(dataDeleteNews)}
                    onCancel={() => handleCancelDelete()}
                    cancelText="Hủy"
                    okText="Xóa"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeleteNews.ten_tin_tuc}</p>
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
                                <Breadcrumb.Item>Tin Tức ({data ? data.length : 0})</Breadcrumb.Item>
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
                                        Thêm Tin Tức
                                    </Button>
                                </Col>
                            </Row>

                            {viewAddNewFarm ? (
                                <AddNewNews
                                    fetchData={() => getAllNewsAPI()}
                                    closeDrawer={() => setViewAddNewFarm(false)}
                                    viewAddNewFarm={viewAddNewFarm}
                                />
                            ) : null}

                            {viewEditNews ? (
                                <EditNews
                                    id={dataEditNews.id}
                                    ma_tin_tuc={dataEditNews.ma_tin_tuc}
                                    ten_tin_tuc={dataEditNews.ten_tin_tuc}
                                    noi_dung={dataEditNews.noi_dung}
                                    hinh_anh={dataEditNews.hinh_anh}
                                    hinh_anh_1={dataEditNews.hinh_anh_1}
                                    hinh_anh_2={dataEditNews.hinh_anh_2}
                                    fetchData={() => getAllNewsAPI()}
                                    closeDrawer={() => {
                                        setViewEditNews(false);
                                        setDataEdit([]);
                                    }}
                                    viewEditNews={viewEditNews}
                                />
                            ) : null}

                            {viewDetailBlog ? (
                                <BlogViewDetail
                                    blogData={blogData}
                                    fetchData={() => getAllNewsAPI()}
                                    closeDrawer={() => {
                                        setViewDetailBlog(false);
                                        setBlogData([]);
                                    }}
                                    viewDetailBlog={viewDetailBlog}
                                />
                            ) : null}

                            <Form form={form} component={false}>
                                <Table
                                    scroll={{ x: 800 }}
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

export default AdminNews;
