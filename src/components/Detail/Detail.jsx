import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Contact } from "../Contact/contact";
import { getPigById } from "../../api/pig";
import { Carousel, Image, Row, Col, Table, Tag, Space, Card, Breadcrumb, Layout } from "antd";
import ImageGallery from "react-image-gallery";
import LeftNav from "../Gallery/LeftNav";
import RightNav from "../Gallery/RightNav";
import Loader from "../Loader/Loader";

const { Content } = Layout;

export const Detail = () => {
    const [viewLoader, setViewLoader] = useState(false);
    const [pigDetail, setPigDetail] = useState({});
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const getDataPigById = async (id) => {
        setViewLoader(true);
        setItems([]);
        setData([]);
        await getPigById(id)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    setPigDetail(result[0]);
                    let data = result[0];

                    let obj = {
                        original: data.hinh_anh_1,
                        thumbnail: data.hinh_anh_1,
                        originalHeight: 300,
                        originalWidth: 200,
                        thumbnailHeight: 55,
                        thumbnailWidth: 55,
                    };
                    let obj2 = {
                        original: data.hinh_anh_2,
                        thumbnail: data.hinh_anh_2,
                        originalHeight: 300,
                        originalWidth: 200,
                        thumbnailHeight: 55,
                        thumbnailWidth: 55,
                    };
                    let arr = [];
                    arr.push(obj);
                    arr.push(obj2);
                    setItems(arr);
                    let arrData = [];
                    arrData.push(data);
                    setData(arrData);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };
    const params = useParams();

    useEffect(() => {
        getDataPigById(params.id);
    }, []);

    const columns = [
        {
            title: "Người Đánh Giá",
            key: "nguoi_danh_gia",
            dataIndex: "nguoi_danh_gia",
        },
        {
            title: "Nhân Trung Trắng",
            dataIndex: "nhan_trung_trang",
            key: "nhan_trung_trang",
        },
        {
            title: "Tai Mèo",
            dataIndex: "tai_meo",
            key: "tai_meo",
        },
        {
            title: "Mõm",
            key: "mom",
            dataIndex: "mom",
        },
        {
            title: "Vành Trắng Quanh Mõm",
            key: "vanh_trang_quanh_mom",
            dataIndex: "vanh_trang_quanh_mom",
        },
        {
            title: "Khoang Đen Phụ",
            key: "khoang_den_phu",
            dataIndex: "khoang_den_phu",
        },
        {
            title: "Kiểu Lưng Bụng",
            key: "kieu_lung_bung",
            dataIndex: "kieu_lung_bung",
        },
        {
            title: "Chân",
            key: "chan",
            dataIndex: "chan",
        },
        {
            title: "Kiểu Đuôi",
            key: "kieu_duoi",
            dataIndex: "kieu_duoi",
        },
        {
            title: "Dấu Thời Gian",
            key: "dau_thoi_gian",
            dataIndex: "dau_thoi_gian",
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
                                    <Breadcrumb.Item className="txt">
                                        <Link to={"/ca-the/" + pigDetail.id}>{pigDetail.ma_so_ca_the}</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row justify="center" gutter={[20, 20]}>
                                <Col xs={5} style={{ boxShadow: "0 0 2px black", borderRadius: "2%" }}>
                                    <ImageGallery
                                        renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                                        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                                        slideDuration={800}
                                        autoPlay={true}
                                        showPlayButton={false}
                                        showFullscreenButton={false}
                                        onErrorImageURL="/images/user/imageerror.png"
                                        items={items}
                                    />
                                </Col>
                                <Col xs={8}>
                                    <Card
                                        title={
                                            <>
                                                <span>Mã Số Cá Thể: </span>
                                                <span style={{ color: "blue", fontSize: 25 }}>{pigDetail.ma_so_ca_the}</span>
                                            </>
                                        }
                                        bordered={true}
                                        style={{ width: 600, height: 380, boxShadow: "0 0 2px black", borderRadius: "2%" }}
                                    >
                                        <span>
                                            - Tuổi: <span style={{ fontWeight: 500 }}>{pigDetail.tuoi}</span>
                                        </span>
                                        <br></br>
                                        <span>
                                            - Giới Tính: <span style={{ fontWeight: 500 }}>{pigDetail.gioi_tinh}</span>
                                        </span>
                                        <br></br>
                                        <span>
                                            - Trọng Lượng (kg): <span style={{ fontWeight: 500 }}>{pigDetail.trong_luong_co_the_kg}</span>
                                        </span>
                                        <br></br>
                                        <span>
                                            - Địa Điểm Đánh Giá: <span style={{ fontWeight: 500 }}>{pigDetail.dia_diem_danh_gia}</span>
                                        </span>
                                    </Card>
                                </Col>
                            </Row>
                            <Row justify="center" gutter={[20, 20]} style={{ paddingTop: 50, paddingBottom: 80 }}>
                                <Col xs={16}>
                                    <Table size="small" bordered columns={columns} dataSource={data} pagination={false} />
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
