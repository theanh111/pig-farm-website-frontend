import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Typography,
    Button,
    Row,
    Col,
    Card,
    Image,
    Tooltip,
} from "antd";
import AdminHeader from "./AdminHeader";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddNewPig from "./AddNewPig";
import AddNewPigImport from "./AddNewPigImport";
import { Link } from "react-router-dom";
import { getAllPig } from "../../../api/pig";
import Loader from "../../Loader/Loader";
import PigDetail from "./Pig/PigDetail";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const AdminPigs = (props) => {
    const history = useNavigate();
    const [pigById, setPigById] = useState([]);
    const [viewLoader, setViewLoader] = useState(false);
    const [viewPigDetail, setViewPigDetail] = useState(false);
    const [viewAddNewPig, setViewAddNewPig] = useState(false);
    const [viewAddNewPigImport, setViewAddNewPigImport] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const showAddNewPig = () => {
        let token = checkTokenLocalStorage();
        if (token) {
            setViewAddNewPig(true);
        } else {
            backToLogin();
        }
    };

    const showAddNewPigImport = () => {
        let token = checkTokenLocalStorage();
        if (token) {
            setViewAddNewPigImport(true);
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

    const viewDetailPig = (id) => {
        let token = checkTokenLocalStorage();
        if (token) {
            setViewPigDetail(true);
            pigById.push(id);
        } else {
            setPigById([]);
            backToLogin();
        }
    };

    const columns = [
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mã Số Cá Thể</span>,
            key: "ma_so_ca_the",
            width: "100px",
            render: (record) => (
                <Tooltip title="Xem chi tiết cá thể">
                    <div onClick={() => viewDetailPig(record)} style={{ cursor: "pointer", fontWeight: 700, color: "#f95d01" }}>
                        {record.ma_so_ca_the}
                    </div>
                </Tooltip>
            ),
            fixed: "left",
            height: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Dấu Thời Gian</span>,
            dataIndex: "dau_thoi_gian",
            width: "100px",
            height: "100px",
            fixed: "left",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Tuổi</span>,
            dataIndex: "tuoi",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Người Đánh Giá</span>,
            dataIndex: "nguoi_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Địa Điểm Đánh Giá</span>,
            dataIndex: "dia_diem_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Ngày Đánh Giá</span>,
            dataIndex: "ngay_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Giới Tính</span>,
            dataIndex: "gioi_tinh",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Nhân Trung Trắng</span>,
            dataIndex: "nhan_trung_trang",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Tai Mèo</span>,
            dataIndex: "tai_meo",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mõm</span>,
            dataIndex: "mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Vành Trắng Quanh Mõm</span>,
            dataIndex: "vanh_trang_quanh_mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mắt</span>,
            dataIndex: "mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Trọng Lượng Cơ Thể (kg)</span>,
            dataIndex: "trong_luong_co_the_kg",
            height: "100px",
            width: "100px",
        },

        {
            title: (record) => <span style={{ fontSize: 12 }}>Loại Con Giống</span>,
            dataIndex: "loai_con_giong",
            height: "100px",
            width: "100px",
        },

        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Ảnh 1</span>,
            key: "hinh_anh_1",
            height: "100px",
            width: "100px",
            render: (record) => {
                return (
                    <Image style={{ width: "90px", height: "90px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh_1} />
                );
            },
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Ảnh 2</span>,
            key: "hinh_anh_2",
            height: "100px",
            width: "100px",
            render: (record) => {
                return (
                    <Image style={{ width: "90px", height: "90px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh_2} />
                );
            },
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Phả Hệ</span>,
            dataIndex: "pha_he",
            height: "100px",
            width: "100px",
        },
        {
            title: "Sửa",
            render: () => {
                return (
                    <Typography.Link>
                        <EditOutlined style={{ fontSize: 25 }} />
                    </Typography.Link>
                );
            },
        },
    ];

    const getAllPigAPI = async () => {
        setViewLoader(true);
        await getAllPig()
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
        getAllPigAPI();
    }, []);

    useEffect(() => {
        document.title = "Danh Sách Cá Thể - Admin";
    }, []);

    return (
        <>
            <div>
                {viewLoader ? <Loader /> : null}
                <Layout style={{ minHeight: "100vh" }}>
                    <AdminNavbar />
                    <Layout className="site-layout">
                        <AdminHeader />
                        <Content style={{ margin: "0 16px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>
                                    <Link to="/admin"> MONGCAIPIG</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Danh Sách Cá Thể ({data ? data.length : 0})</Breadcrumb.Item>
                            </Breadcrumb>

                            <Row gutter={[8, 8]}>
                                {/* <Col span={2}>
                                    <Button type="primary" onClick={showAddNewPig} icon={<PlusOutlined />}>
                                        Thêm Cá Thể
                                    </Button>
                                </Col> */}
                                <Col span={2}>
                                    <Button type="primary" onClick={showAddNewPigImport} icon={<PlusOutlined />}>
                                        Import File Excel
                                    </Button>
                                </Col>
                            </Row>

                            {/* {viewAddDialog ? (
                            <Dialog open={showAddNewPig} onClose={handleCloseAddDialog}>
                                <DialogTitle>{"Thêm Cá Thể Mới Bằng"}</DialogTitle>
                                <DialogContent>
                                    <Button onClick={showAddNewPig}>Nhập Dữ Liệu</Button> <Button>Form Excel</Button>
                                </DialogContent>
                            </Dialog>
                        ) : null} */}
                            {viewPigDetail ? (
                                <>
                                    <PigDetail
                                        pigById={pigById}
                                        viewPigDetail={viewPigDetail}
                                        closeDrawer={() => {
                                            setPigById([]);
                                            setViewPigDetail(false);
                                        }}
                                    />
                                </>
                            ) : null}

                            {viewAddNewPig ? (
                                <AddNewPig
                                    fetchData={() => getAllPigAPI()}
                                    closeDrawer={() => setViewAddNewPig(false)}
                                    viewAddNewPig={viewAddNewPig}
                                />
                            ) : null}
                            {viewAddNewPigImport ? (
                                <AddNewPigImport
                                    fetchData={() => getAllPigAPI()}
                                    closeDrawer={() => setViewAddNewPigImport(false)}
                                    viewAddNewPigImport={viewAddNewPigImport}
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
        </>
    );
};

export default AdminPigs;
