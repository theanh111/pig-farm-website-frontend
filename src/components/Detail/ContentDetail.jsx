import { Layout, Row, Col } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export const ContentDetail = (props) => {
    const pigDetail = props.data;
    return (
        <>
            <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
                <h2>Mô Tả</h2>
                <Col align="middle" span={12} offset={6}>
                    <span>
                        - Người đánh giá: <span style={{ fontWeight: 500 }}>{pigDetail.nguoi_danh_gia}</span>
                    </span>
                    <br></br>
                    <span>
                        - Nhân trung trắng: <span style={{ fontWeight: 500 }}>{pigDetail.nhan_trung_trang}</span>
                    </span>
                    <br></br>
                    <span>
                        - Tai mèo: <span style={{ fontWeight: 500 }}>{pigDetail.tai_meo}</span>
                    </span>
                    <br></br>
                    <span>
                        - Mõm: <span style={{ fontWeight: 500 }}>{pigDetail.mom}</span>
                    </span>
                    <br></br>
                    <span>
                        - Vành trắng quanh mõm: <span style={{ fontWeight: 500 }}>{pigDetail.vanh_trang_quanh_mom}</span>
                    </span>
                    <br></br>
                    <span>
                        - Khoang đen phụ: <span style={{ fontWeight: 500 }}>{pigDetail.khoang_den_phu}</span>
                    </span>
                    <br></br>
                    <span>
                        - Kiểu lưng bụng: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_lung_bung}</span>
                    </span>
                    <br></br>
                    <span>
                        - Chân: <span style={{ fontWeight: 500 }}>{pigDetail.chan}</span>
                    </span>
                    <br></br>
                    <span>
                        - Kiểu đuôi: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_duoi}</span>
                    </span>
                </Col>
            </Row>
        </>
        // <div id="about">
        //     <div className="container">
        //         <div>
        //             <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
        //                 <h2>Mô Tả</h2>
        //                 <Col align="middle" span={12} offset={6}>
        //                     {/* <p style={{ display: "inline-block" }}>{pigDetail.ma_so_ca_the}</p> */}
        //                     <span>
        //                         - Người đánh giá: <span style={{ fontWeight: 500 }}>{pigDetail.nguoi_danh_gia}</span>
        //                     </span>
        //                     <span>
        //                         - Nhân trung trắng: <span style={{ fontWeight: 500 }}>{pigDetail.nhan_trung_trang}</span>
        //                     </span>
        //                     <span>
        //                         - Tai mèo: <span style={{ fontWeight: 500 }}>{pigDetail.tai_meo}</span>
        //                     </span>
        //                     <span>
        //                         - Mõm: <span style={{ fontWeight: 500 }}>{pigDetail.mom}</span>
        //                     </span>
        //                     <span>
        //                         - Vành trắng quanh mõm: <span style={{ fontWeight: 500 }}>{pigDetail.vanh_trang_quanh_mom}</span>
        //                     </span>
        //                     <span>
        //                         - Khoang đen phụ: <span style={{ fontWeight: 500 }}>{pigDetail.khoang_den_phu}</span>
        //                     </span>
        //                     <span>
        //                         - Kiểu lưng bụng: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_lung_bung}</span>
        //                     </span>
        //                     <span>
        //                         - Chân: <span style={{ fontWeight: 500 }}>{pigDetail.chan}</span>
        //                     </span>
        //                     <span>
        //                         - Kiểu đuôi: <span style={{ fontWeight: 500 }}>{pigDetail.kieu_duoi}</span>
        //                     </span>
        //                 </Col>
        //             </Row>
        //             <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
        //                 <Col align="middle" span={12} offset={6}>
        //                     <Image
        //                         style={{ width: "584px", height: "389px", objectFit: "cover", display: "inline-block" }}
        //                         className="active"
        //                         src={pigDetail.hinh_anh_2}
        //                         alt={pigDetail.ma_so_ca_the}
        //                     />
        //                 </Col>
        //             </Row>

        //             {/* <a href={pigDetail.hinh_anh_2} target="_blank">
        //                 <img
        //                     style={{ display: "block", margin: "0 auto", width: "50%" }}
        //                     data-image="red"
        //                     src={pigDetail.hinh_anh_2}
        //                     alt={pigDetail.ma_so_ca_the}
        //                 />
        //             </a> */}
        //         </div>
        //     </div>
        // </div>
    );
};
