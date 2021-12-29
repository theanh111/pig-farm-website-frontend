import { Image, Col, Row, Space } from "antd";

export const ContentDetail = (props) => {
    const pigDetail = props.data;
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-12">
                        <div className="about-text">
                            <h2>Mô Tả</h2>
                            {/* <p style={{ display: "inline-block" }}>{pigDetail.ma_so_ca_the}</p> */}
                            <p>
                                - Người đánh giá: <span style={{ fontWeight: 500 }}>{pigDetail.nguoi_danh_gia}</span>
                            </p>
                            <p>
                                - Nhân trung trắng: <span style={{ fontWeight: 500 }}>{pigDetail.nhan_trung_trang}</span>
                            </p>
                            <p>
                                - Tai mèo: <span style={{ fontWeight: 500 }}>{pigDetail.tai_meo}</span>
                            </p>
                            <p>
                                - Mõm: <span style={{ fontWeight: 500 }}>{pigDetail.mom}</span>
                            </p>
                            <p>
                                - Vành trắng quanh mõm: <span style={{ fontWeight: 500 }}>{pigDetail.vanh_trang_quanh_mom}</span>
                            </p>
                            <p>
                                - Khoang đen phụ: <span style={{ fontWeight: 500 }}>{pigDetail.khoang_den_phu}</span>
                            </p>
                            <p>
                                - Kiểu lưng bụng: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_lung_bung}</span>
                            </p>
                            <p>
                                - Chân: <span style={{ fontWeight: 500 }}>{pigDetail.chan}</span>
                            </p>
                            <p>
                                - Kiểu đuôi: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_duoi}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
                        <Col align="middle" span={12} offset={6}>
                            <Image
                                style={{ width: "584px", height: "389px", objectFit: "cover", display: "inline-block" }}
                                className="active"
                                src={pigDetail.hinh_anh_2}
                                alt={pigDetail.ma_so_ca_the}
                            />
                        </Col>
                    </Row>

                    {/* <a href={pigDetail.hinh_anh_2} target="_blank">
                        <img
                            style={{ display: "block", margin: "0 auto", width: "50%" }}
                            data-image="red"
                            src={pigDetail.hinh_anh_2}
                            alt={pigDetail.ma_so_ca_the}
                        />
                    </a> */}
                </div>
            </div>
        </div>
    );
};
