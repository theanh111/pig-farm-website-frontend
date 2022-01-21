import { Col, Row, Menu, Space, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
const { Search } = Input;
export const Navigation = () => {
    const onSearch = (value) => console.log(value);

    return (
        <>
            {/* <div style={{ backgroundColor: "#006544", padding: "5px", textAlign: "center" }}>
                <a href="/" className="title-web" style={{ color: "white", fontSize: 25, fontWeight: 800, cursor: "pointer" }}>
                    <img title="mongcaipig.vn" src="/images/icon-pig.jpg" style={{ height: 40, width: 40 }} /> DỰ ÁN NGHIÊN CỨU NGUỒN GEN
                    GIỐNG LỢN MÓNG CÁI
                </a>
                <div style={{ textAlign: "center" }}>
                    <Search
                        style={{ width: "50%" }}
                        title="Tìm kiếm"
                        placeholder="Nhập nội dung tìm kiếm..."
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <span className="vietnam-flag-button">
                    <img title="Vietnamese" className="vietnam-flag" style={{ cursor: "pointer" }} src="/images/vi-vn.gif" />
                </span>
                <span> </span>
                <span className="england-flag-button">
                    <img title="English" className="england-flag" style={{ cursor: "pointer" }} src="/images/en-GB.gif" />
                </span>
                <span> </span>
                <span className="england-flag-button">
                    <Link to="/dang-nhap">
                        <img title="Đăng nhập" className="england-flag" style={{ cursor: "pointer" }} src="/images/en-GB.gif" />
                    </Link>
                </span>
            </div> */}

            <div class="w3-bar  w3-large" style={{ backgroundColor: "#006544" }}>
                <a
                    href="/"
                    style={{ color: "white", fontSize: 23, fontWeight: 800, cursor: "pointer", backgroundColor: "#006544" }}
                    class="w3-bar-item w3-button w3-mobile"
                >
                    <img title="mongcaipig.vn" src="/images/icon-pig.jpg" style={{ height: 35, width: 35 }} /> DỰ ÁN NGHIÊN CỨU NGUỒN GEN
                    GIỐNG LỢN MÓNG CÁI
                </a>
            </div>
            <div class="w3-bar w3-green w3-small" style={{ backgroundColor: "#006544" }}>
                <Link to="/" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Trang Chủ
                </Link>

                <Link to="/ca-the" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Cá Thể
                </Link>
                <Link to="/co-so-chan-nuoi" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Cơ Sở Chăn Nuôi
                </Link>
                <Link to="/thong-tin-du-an" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Thông Tin Dự Án
                </Link>
                <Link to="/tin-tuc" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Tin Tức
                </Link>
                <Link to="/lien-he" style={{ fontSize: 16, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile">
                    Liên Hệ
                </Link>
                <a href="#contact" class="w3-bar-item w3-button w3-right w3-green w3-mobile" style={{ fontSize: 16, fontWeight: 600 }}>
                    Book Now
                </a>
            </div>

            {/* <Row align="middle" justify="center" style={{ height: 60, backgroundColor: "#006544" }}>
                <Col>
                    <a href="/" style={{ color: "white", fontSize: 25, fontWeight: 800, cursor: "pointer" }}>
                        <img title="mongcaipig.vn" src="/images/icon-pig.jpg" style={{ height: 40, width: 40 }} /> DỰ ÁN NGHIÊN CỨU NGUỒN
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
                            <img title="Vietnamese" className="vietnam-flag" style={{ cursor: "pointer" }} src="/images/vi-vn.gif" />
                        </span>
                        <span> </span>
                        <span className="england-flag-button">
                            <img title="English" className="england-flag" style={{ cursor: "pointer" }} src="/images/en-GB.gif" />
                        </span>
                    </Col>
                    <Col>
                        <Link to="/dang-nhap" className="login-button">
                            <ExportOutlined
                                title="Đăng Nhập"
                                className="login-icon"
                                style={{ color: "white", fontSize: 22, paddingTop: 3 }}
                            />
                        </Link>
                    </Col>
                </Space>
            </Row>
            <Menu className="navbar" mode="horizontal" style={{ paddingLeft: 360 }}>
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
            </Menu> */}
        </>
    );
};
