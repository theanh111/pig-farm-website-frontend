import React, { useState, useEffect } from "react";
import { Drawer, Button, Space, Descriptions, Badge, Image, Card, Row, Col } from "antd";

const { Meta } = Card;

const PigDetail = (props) => {
    const [pig, setPig] = useState({});
    const { pigById, viewPigDetail, closeDrawer, fetchData } = props;
    const onCloseDrawer = () => {
        closeDrawer();
    };

    const handleCloseDrawer = () => {
        onCloseDrawer();
    };

    const setData = () => {
        if (pigById) {
            if (pigById.length > 0) {
                setPig(pigById[0]);
            }
        }
    };

    useEffect(() => {
        setData();
    }, []);

    return (
        <>
            <>
                <Drawer
                    title={
                        <>
                            <span>Xem Chi Tiết Cá Thể: </span>
                            <span style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{pig.ma_so_ca_the}</span>
                        </>
                    }
                    width="85%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewPigDetail}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>
                        </Space>
                    }
                >
                    {pig ? (
                        <Descriptions labelStyle={{ fontWeight: 500, fontSize: 15 }} layout="vertical" bordered>
                            <Descriptions.Item span={3} label="Hình Ảnh">
                                <Row justify="center" gutter={[20, 10]}>
                                    <Col xs={12}>
                                        <Card
                                            hoverable
                                            style={{ width: 500 }}
                                            cover={
                                                <Image
                                                    style={{ width: 500, height: 260, objectFit: "cover", display: "inline-block" }}
                                                    alt="Hinh Anh 1"
                                                    src={pig.hinh_anh_1 ? pig.hinh_anh_1 : "/images/user/preview.png"}
                                                />
                                            }
                                        >
                                            <Meta
                                                title="Hình Ảnh 1"
                                                description={pig.hinh_anh_1 ? "- Link: " + pig.hinh_anh_1 : "- Link: " + "Chưa Có Link Ảnh"}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={8}>
                                        <Card
                                            hoverable
                                            style={{ width: 500 }}
                                            cover={
                                                <Image
                                                    style={{ width: 500, height: 260, objectFit: "cover", display: "inline-block" }}
                                                    alt="Hinh Anh 2"
                                                    src={pig.hinh_anh_2 ? pig.hinh_anh_2 : "/images/user/preview.png"}
                                                />
                                            }
                                        >
                                            <Meta
                                                title="Hình Ảnh 2"
                                                description={pig.hinh_anh_2 ? "- Link: " + pig.hinh_anh_2 : "- Link: " + "Chưa Có Link Ảnh"}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng Thái" span={3}>
                                {pig.trang_thai === 1 ? (
                                    <Badge status="success" text="Active" />
                                ) : (
                                    <Badge status="warning" text="Inactive" />
                                )}
                            </Descriptions.Item>

                            <Descriptions.Item label="Mã Số Cá Thể">
                                <span style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{pig.ma_so_ca_the}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Tuổi">{pig.tuoi}</Descriptions.Item>
                            <Descriptions.Item label="Người Đánh Giá">{pig.nguoi_danh_gia}</Descriptions.Item>
                            <Descriptions.Item label="Địa Điểm Đánh Giá">{pig.dia_diem_danh_gia}</Descriptions.Item>
                            <Descriptions.Item label="Ngày Đánh Giá">{pig.ngay_danh_gia}</Descriptions.Item>
                            <Descriptions.Item label="Giới Tính">{pig.gioi_tinh}</Descriptions.Item>
                            <Descriptions.Item label="Nhân Trung Trắng">{pig.nhan_trung_trang}</Descriptions.Item>
                            <Descriptions.Item label="Tai Mèo">{pig.tai_meo}</Descriptions.Item>
                            <Descriptions.Item label="Mõm">{pig.mom}</Descriptions.Item>
                            <Descriptions.Item label="Vành Trắng Quanh Mõm">{pig.vanh_trang_quanh_mom}</Descriptions.Item>
                            <Descriptions.Item label="Mắt">{pig.mat}</Descriptions.Item>
                            <Descriptions.Item label="Da Có Khoang Đen">{pig.da_co_khoang_den}</Descriptions.Item>
                            <Descriptions.Item label="Khoang Đen Phụ">{pig.khoang_den_phu}</Descriptions.Item>
                            <Descriptions.Item label="Kiểu Lưng Bụng">{pig.kieu_lung_bung}</Descriptions.Item>
                            <Descriptions.Item label="Chân">{pig.chan}</Descriptions.Item>
                            <Descriptions.Item label="Da Mắt">{pig.da_mat}</Descriptions.Item>
                            <Descriptions.Item label="Kiểu Đuổi">{pig.kieu_duoi}</Descriptions.Item>
                            <Descriptions.Item label="Kiểu Tai">{pig.kieu_tai}</Descriptions.Item>
                            <Descriptions.Item label="Hướng Tai">{pig.huong_tai}</Descriptions.Item>
                            <Descriptions.Item label="Kiểu Lông">{pig.kieu_long}</Descriptions.Item>
                            <Descriptions.Item label="Loại Màu Lông">{pig.loai_mau_long}</Descriptions.Item>
                            <Descriptions.Item label="Hình Dạng Đầu">{pig.hinh_dang_dau}</Descriptions.Item>
                            <Descriptions.Item label="Trọng Lượng Cơ Thể (kg)">{pig.trong_luong_co_the_kg}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Dài Đầu (cm)">{pig.chieu_dai_dau_cm}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Dài Đuôi (cm)">{pig.chieu_dai_duoi_cm}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Rộng Ngực (cm)">{pig.chieu_rong_nguc_cm}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Cao Thân Tại Chân Trước (cm)">
                                {pig.chieu_cao_than_tai_chan_truoc_cm}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chiều Dài Cơ Thể (cm)">{pig.chieu_dai_co_the_cm}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Dài Tai (cm)">{pig.chieu_dai_tai_cm}</Descriptions.Item>
                            <Descriptions.Item label="Chiều Rộng Thân Tại Xương Chậu (cm)">
                                {pig.chieu_rong_than_tai_xuong_chau_cm}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chu Vi Cổ Chân (cm)">{pig.chu_vi_co_chan_cm}</Descriptions.Item>
                            <Descriptions.Item label="Độ Rộng Dải Trắng Vắt Vai (cm)">{pig.do_rong_dai_trang_vat_vai_cm}</Descriptions.Item>
                            <Descriptions.Item label="Số Bầu Vú">{pig.so_bau_vu}</Descriptions.Item>
                            <Descriptions.Item label="Loại Con Giống">{pig.loai_con_giong}</Descriptions.Item>
                            <Descriptions.Item label="Số Con Trong Đàn">{pig.so_con_trong_dan}</Descriptions.Item>
                            <Descriptions.Item label="Số Con Đực Trong Đàn">{pig.so_con_duc_trong_dan}</Descriptions.Item>
                            <Descriptions.Item label="Số Con Cái Trong Đàn">{pig.so_con_cai_trong_dan}</Descriptions.Item>
                            <Descriptions.Item label="Hình Dạng Lông">{pig.hinh_dang_long}</Descriptions.Item>
                            <Descriptions.Item label="Độ Dài Lông">{pig.do_dai_long}</Descriptions.Item>
                            <Descriptions.Item label="Độ Dày Lông">{pig.do_day_long}</Descriptions.Item>
                            <Descriptions.Item label="Phả Hệ">{pig.pha_he}</Descriptions.Item>
                            <Descriptions.Item label="Người Cập Nhật">{pig.nguoi_cap_nhat}</Descriptions.Item>
                            <Descriptions.Item label="Ngày Cập Nhật">{pig.ngay_cap_nhat}</Descriptions.Item>
                        </Descriptions>
                    ) : null}
                </Drawer>
            </>
        </>
    );
};

export default PigDetail;
