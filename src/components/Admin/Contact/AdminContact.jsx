import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Table, Form, Modal, message, Button, Row, Col, Image, Tooltip } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import AddNewContact from "./AddNewContact";
import EditContact from "./EditContact";
import { checkToken } from "../../../api/auth";
import { deleteContact, getAllContact } from "../../../api/contact";

const { Content } = Layout;

const AdminContact = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewAddNewFarm, setViewAddNewFarm] = useState(false);
    const [viewEditContact, setViewEditContact] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataEditContact, setDataEditContact] = useState({});
    const [dataDeleteContact, setDataDeleteContact] = useState({});

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

    const handleEditFarm = (contact) => {
        checkTokenAPI();
        setDataEditContact(contact);
        setViewEditContact(true);
    };

    const handleClickDelete = (contact) => {
        checkTokenAPI();
        setDataDeleteContact(contact);
        setViewConfirm(true);
    };

    const handleCancelDelete = () => {
        checkTokenAPI();
        setDataDeleteContact({});
        setViewConfirm(false);
    };

    const handleOkDelete = (contact) => {
        checkTokenAPI();
        deleteContactAPI(contact);
    };

    const columns = [
        {
            title: "Tiêu Đề Liên Hệ",
            key: "ten_lien_he",
            width: "15%",
            align: "center",
            render: (record) => {
                return (
                    <>
                        <Link to={"/lien-he"} target="_blank">
                            <span style={{ fontWeight: 500, color: "#34568B", cursor: "pointer" }}>{record.ten_lien_he}</span>
                        </Link>
                    </>
                );
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
                        <Button onClick={() => handleEditFarm(record)}>
                            <EditOutlined style={{ fontSize: 25 }} />
                        </Button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Xóa",
            align: "center",
            width: "3%",
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

    const deleteContactAPI = async (contact) => {
        setViewLoader(true);
        await deleteContact(contact)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Xóa thông tin liên hệ thành công");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeleteContact({});
                            getAllContactAPI();
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
        } else {
            backToLogin();
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
            {viewConfirm ? (
                <Modal
                    centered
                    okType="danger"
                    style={{ zIndex: 9 }}
                    title={<span style={{ color: "red" }}>Bạn có chắc muốn xóa?</span>}
                    visible={viewConfirm}
                    onOk={() => handleOkDelete(dataDeleteContact)}
                    onCancel={() => handleCancelDelete()}
                    cancelText="Hủy"
                    okText="Xóa"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeleteContact.ten_lien_he}</p>
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

                            {viewEditContact ? (
                                <EditContact
                                    id={dataEditContact.id}
                                    ten_lien_he={dataEditContact.ten_lien_he}
                                    dia_chi={dataEditContact.dia_chi}
                                    sdt={dataEditContact.sdt}
                                    email={dataEditContact.email}
                                    fetchData={() => getAllContactAPI()}
                                    closeDrawer={() => {
                                        setViewEditContact(false);
                                        setDataEdit([]);
                                    }}
                                    viewEditContact={viewEditContact}
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

export default AdminContact;
