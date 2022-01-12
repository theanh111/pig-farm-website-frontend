import { Navigation } from "../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JsonData from "../../data/data.json";
import { Contact } from "../Contact/contact";
import { getPigById } from "../../api/pig";
import { Carousel, Image, Row, Col, Table, Tag, Space, Card } from "antd";
import ImageGallery from "react-image-gallery";
import LeftNav from "../Header/LeftNav";
import RightNav from "../Header/RightNav";
import News from "../News/News";

const images = [
    {
        original: "dhttps://picsum.photos/id/1018/1000/600/",
        thumbnail: "shttps://picsum.photos/id/1018/250/150/",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?export=view&id=1yDS1uhrkM_vbU547DAA02Z2BJckrcLi0",
        thumbnail: "https://drive.google.com/uc?export=view&id=1yDS1uhrkM_vbU547DAA02Z2BJckrcLi0",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?export=view&id=1fiKk2zg1OdFXf8oKi2NoCit669dPdYW-",
        thumbnail: "https://drive.google.com/uc?export=view&id=1fiKk2zg1OdFXf8oKi2NoCit669dPdYW-",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
];

export const Detail = () => {
    const [pigDetail, setPigDetail] = useState({});
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const getDataPigById = async (id) => {
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
    };
    const params = useParams();
    const [landingPageData, setLandingPageData] = useState({});

    useEffect(() => {
        getDataPigById(params.id);
        setLandingPageData(JsonData);
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
            <div style={{ paddingTop: 50 }}>
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
                        <Table bordered columns={columns} dataSource={data} pagination={false} />
                    </Col>
                </Row>
            </div>

            <Contact data={landingPageData.Contact} />
        </>
    );
};
