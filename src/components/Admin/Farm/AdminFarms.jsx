import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Modal, message, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewFarm from "./AddNewFarm";
import Loader from "../../Loader/Loader";
import { deleteFarm, getAllFarm } from "../../../api/farm";
import { Link, useNavigate } from "react-router-dom";
import EditFarm from "./EditFarm";
import { checkToken } from "../../../api/auth";

const { Content } = Layout;

const AdminFarms = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditFarm, setViewEditFarm] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditFarm, setDataEditFarm] = useState({});
    const [dataDeleteFarm, setDataDeleteFarm] = useState({});

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

    const handleClickDelete = (farm) => {
        checkTokenAPI();
        setDataDeleteFarm(farm);
        setViewConfirm(true);
    };

    const handleCancelDelete = () => {
        checkTokenAPI();
        setDataDeleteFarm({});
        setViewConfirm(false);
    };

    const handleOkDelete = (farm) => {
        checkTokenAPI();
        deleteFarmAPI(farm);
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
            title: "Mã Trang Trại",
            key: "ma_trang_trai",
            width: "40%",
            render: (record) => (
                <>
                    <a target="_blank" href={"/co-so-chan-nuoi/" + record.ma_trang_trai}>
                        <div style={{ cursor: "pointer", fontWeight: 500, fontSize: 15, color: "#34568B" }}>
                            <p>{record.ma_trang_trai}</p>
                        </div>
                    </a>
                </>
            ),
        },
        {
            title: "Tên Trang Trại",
            key: "ten_trang_trai",
            width: "40%",
            render: (record) => <p>{record.ten_trang_trai}</p>,
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
                    <Tooltip title="Sửa Cơ Sở">
                        <Button onClick={() => handleEditFarm(record)}>
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

    const deleteFarmAPI = async (farm) => {
        setViewLoader(true);
        await deleteFarm(farm)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Xóa cơ sở chăn nuôi thành công");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeleteFarm({});
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
            })
            .catch((err) => {
                console.log(err);
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
        document.title = "Danh Sách Cơ Sở Chăn Nuôi - Admin";
        checkTokenAPI();
        getAllFarmAPI();
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
                    onOk={() => handleOkDelete(dataDeleteFarm)}
                    onCancel={() => handleCancelDelete()}
                    cancelText="Hủy"
                    okText="Xóa"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeleteFarm.ten_trang_trai}</p>
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

                            {viewEditFarm ? (
                                <EditFarm
                                    id={dataEditFarm.id}
                                    ma_trang_trai={dataEditFarm.ma_trang_trai}
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

export default AdminFarms;
