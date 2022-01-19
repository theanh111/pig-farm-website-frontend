import { Col, Row, Menu, Space, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
export const Navigation = () => {
    const onSearch = (value) => console.log(value);

    return (
        <>
            <Row align="middle" justify="center" style={{ height: 70, backgroundColor: "#006544" }}>
                <Col>
                    <a href="/" style={{ color: "white", fontSize: 35, fontWeight: 900, cursor: "pointer" }}>
                        <img title="mongcaipig.vn" src="/images/icon-pig.jpg" style={{ height: 50, width: 50 }} /> DỰ ÁN NGHIÊN CỨU NGUỒN
                        GEN GIỐNG LỢN MÓNG CÁI
                    </a>
                </Col>
                <Col xs={1}></Col>
                <Col xs={6}>
                    <Search
                        title="Tìm kiếm"
                        placeholder="Nhập nội dung tìm kiếm..."
                        allowClear
                        onSearch={onSearch}
                        style={{ paddingRight: 20 }}
                    />
                </Col>

                <Space>
                    <Col>
                        <span className="vietnam-flag-button">
                            <img
                                title="Vietnamese"
                                className="vietnam-flag"
                                style={{ height: 40, width: 40, cursor: "pointer" }}
                                src="/images/vietnam-flag.png"
                            />
                        </span>

                        {/* <span style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, color: "white", fontWeight: 700, fontSize: 22 }}>
                            |
                        </span> */}
                        {/* <span style={{ paddingLeft: 10, paddingTop: 5, color: "white", fontWeight: 700, fontSize: 22 }}>VIE | </span> */}
                        {/* <span style={{ paddingTop: 5, color: "white", fontWeight: 700, fontSize: 22 }}>ENG</span> */}
                        <span> </span>
                        <img
                            title="English"
                            className="england-flag"
                            style={{ height: 40, width: 40, cursor: "pointer" }}
                            src="/images/england-flag.png"
                        />
                        {/* <span style={{ paddingTop: 5, paddingRight: 5, color: "white", fontWeight: 700, fontSize: 22 }}> | </span> */}
                    </Col>
                    <Col>
                        <Link to="/dang-nhap">
                            <ExportOutlined title="Đăng Nhập" style={{ color: "white", fontSize: 30 }} />
                        </Link>
                    </Col>
                </Space>
            </Row>
            <Menu className="navbar" mode="horizontal" style={{ paddingLeft: 380 }}>
                <Menu.Item key="trang-chu">
                    <Link to="/" style={{ fontSize: 22, fontWeight: 600 }}>
                        Trang Chủ
                    </Link>
                </Menu.Item>
                <Menu.Item key="ca-the">
                    <Link to="/ca-the" style={{ fontSize: 22, fontWeight: 600 }}>
                        Cá Thể
                    </Link>
                </Menu.Item>
                <Menu.Item key="co-so-chan-nuoi">
                    <Link to="/co-so-chan-nuoi" style={{ fontSize: 22, fontWeight: 600 }}>
                        Cơ Sở Chăn Nuôi
                    </Link>
                </Menu.Item>
                <Menu.Item key="thong-tin-du-an">
                    <Link to="/thong-tin-du-an" style={{ fontSize: 22, fontWeight: 600 }}>
                        Thông Tin Dự Án
                    </Link>
                </Menu.Item>
                <Menu.Item key="tin-tuc">
                    <Link to="/tin-tuc" style={{ fontSize: 22, fontWeight: 600 }}>
                        Tin Tức
                    </Link>
                </Menu.Item>
                <Menu.Item key="lien-he">
                    <Link to="/lien-he" style={{ fontSize: 22, fontWeight: 600 }}>
                        Liên Hệ
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    );
};
