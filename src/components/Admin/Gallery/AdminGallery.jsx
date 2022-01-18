import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Modal, message, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewGallery from "./AddNewGallery";
import Loader from "../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import EditGallery from "./EditGallery";
import { checkToken } from "../../../api/auth";
import { deleteGallery, getAllGallery } from "../../../api/gallery";

const { Content } = Layout;

const AdminGallery = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditGallery, setViewEditGallery] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditGallery, setDataEditGallery] = useState({});
    const [dataDeleteGallery, setDataDeleteGallery] = useState({});

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

    const handleEditGallery = (gallery) => {
        checkTokenAPI();
        setDataEditGallery(gallery);
        setViewEditGallery(true);
    };

    const handleClickDelete = (gallery) => {
        checkTokenAPI();
        setDataDeleteGallery(gallery);
        setViewConfirm(true);
    };

    const handleCancelDelete = () => {
        checkTokenAPI();
        setDataDeleteGallery({});
        setViewConfirm(false);
    };

    const handleOkDelete = (gallery) => {
        checkTokenAPI();
        deleteGalleryAPI(gallery);
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
            title: "Tên Ảnh",
            key: "ten_anh",
            width: "40%",
            render: (record) => (
                <>
                    <div style={{ fontWeight: 500, fontSize: 15, color: "#34568B" }}>
                        <p>{record.ten_anh}</p>
                    </div>
                </>
            ),
        },
        {
            title: "Thể Loại",
            key: "the_loai",
            width: "20%",
            render: (record) => <p>{record.the_loai}</p>,
        },
        {
            title: "Người Nhập",
            align: "center",
            dataIndex: "nguoi_nhap",
            width: "10%",
        },
        {
            title: "Ngày Nhập",
            align: "center",
            dataIndex: "ngay_nhap",
            width: "30%",
        },
        {
            title: "Sửa",
            align: "center",
            width: "10%",
            render: (record) => {
                return (
                    <Tooltip title="Sửa Ảnh Trình Chiếu">
                        <Button onClick={() => handleEditGallery(record)}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Xóa",
            align: "center",
            width: "20%",
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

    const getAllGalleryAPI = async () => {
        setViewLoader(true);
        await getAllGallery()
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

    const deleteGalleryAPI = async (news) => {
        setViewLoader(true);
        await deleteGallery(news)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Xóa ảnh trình chiếu thành công");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeleteGallery({});
                            getAllGalleryAPI();
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
        document.title = "Ảnh Trình Chiếu - Admin";
        checkTokenAPI();
        getAllGalleryAPI();
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
                    onOk={() => handleOkDelete(dataDeleteGallery)}
                    onCancel={() => handleCancelDelete()}
                    cancelText="Hủy"
                    okText="Xóa"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeleteGallery.ten_anh}</p>
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
                                <Breadcrumb.Item>Ảnh Trình Chiếu ({data ? data.length : 0})</Breadcrumb.Item>
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
                                        Thêm Ảnh Trình Chiếu
                                    </Button>
                                </Col>
                                {/* <Col span={2}>
                                    <Button type="primary" onClick={showAddNewFarm} icon={<PlusOutlined />}>
                                        Import File Excel
                                    </Button>
                                </Col> */}
                            </Row>

                            {viewAddNewFarm ? (
                                <AddNewGallery
                                    fetchData={() => getAllGalleryAPI()}
                                    closeDrawer={() => setViewAddNewFarm(false)}
                                    viewAddNewFarm={viewAddNewFarm}
                                />
                            ) : null}

                            {viewEditGallery ? (
                                <EditGallery
                                    id={dataEditGallery.id}
                                    ten_anh={dataEditGallery.ten_anh}
                                    the_loai={dataEditGallery.the_loai}
                                    hinh_anh={dataEditGallery.hinh_anh}
                                    fetchData={() => getAllGalleryAPI()}
                                    closeDrawer={() => {
                                        setViewEditGallery(false);
                                        setDataEdit([]);
                                    }}
                                    viewEditGallery={viewEditGallery}
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

export default AdminGallery;
