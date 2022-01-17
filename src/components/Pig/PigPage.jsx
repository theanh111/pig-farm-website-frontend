import React, { useEffect, useState } from "react";
import { PigImage } from "../PigImage";
import { getAllPig } from "../../api/pig";
import { Row, Col, Breadcrumb, Layout, Select, Image, Table } from "antd";
import { Navigation } from "../Navigation/navigation";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Contact } from "../Contact/contact";
import { PigFilter } from "./PigFilter";

const { Option } = Select;
const { Content } = Layout;

export const PigPage = () => {
    const [pig, setPig] = useState([]);
    const [viewLoader, setViewLoader] = useState(false);

    const getAllPigAPI = async () => {
        setViewLoader(true);
        await getAllPig()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    setPig(result);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    useEffect(() => {
        getAllPigAPI();
    }, []);

    const columns = [
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mã Số Cá Thể</span>,
            key: "ma_so_ca_the",
            width: "100px",
            render: (record) => (
                <>
                    <Link to={"/ca-the/" + record.id}>
                        <div style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{record.ma_so_ca_the}</div>
                    </Link>
                </>
            ),
            fixed: "left",
            height: "100px",
            align: "center",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Giới Tính</span>,
            dataIndex: "gioi_tinh",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Nhân Trung Trắng</span>,
            dataIndex: "nhan_trung_trang",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Tai Mèo</span>,
            dataIndex: "tai_meo",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Mõm</span>,
            dataIndex: "mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Vành Trắng Quanh Mõm</span>,
            dataIndex: "vanh_trang_quanh_mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Mắt</span>,
            dataIndex: "mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Da Có Khoang Đen</span>,
            dataIndex: "da_co_khoang_den",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Khoang Đen Phụ</span>,
            dataIndex: "khoang_den_phu",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Kiểu Lưng Bụng</span>,
            dataIndex: "kieu_lung_bung",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Chân</span>,
            dataIndex: "chan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Da Mặt</span>,
            dataIndex: "da_mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Kiểu Đuôi</span>,
            dataIndex: "kieu_duoi",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Kiểu Tai</span>,
            dataIndex: "kieu_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Hướng Tai</span>,
            dataIndex: "huong_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Kiểu Lông</span>,
            dataIndex: "kieu_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Loại Màu Lông</span>,
            dataIndex: "loai_mau_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Hình Dạng Đầu</span>,
            dataIndex: "hinh_dang_dau",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Hình Ảnh 1</span>,
            key: "hinh_anh_1",
            height: "100px",
            width: "100px",
            render: (record) => {
                return (
                    <Image style={{ width: "70px", height: "70px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh_1} />
                );
            },
        },
    ];

    return (
        <>
            <Navigation />
            {viewLoader ? (
                <Loader />
            ) : (
                <>
                    <div id="wrapper">
                        <div id="content-fix">
                            <Content style={{ padding: "0px 400px 0px" }}>
                                <Breadcrumb style={{ margin: "8px 0" }}>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/">Trang Chủ</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/ca-the">Cá Thể</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>

                            <Row align="middle" justify="center">
                                <Col xs={18}>
                                    <Table
                                        className="table-view-data"
                                        size="small"
                                        bordered
                                        dataSource={pig}
                                        title={() => (
                                            <>
                                                <PigFilter />
                                            </>
                                        )}
                                        columns={columns}
                                        pagination={{
                                            pageSizeOptions: [5, 10, 20],
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Contact />
                    </div>
                </>
            )}
        </>
    );
};
