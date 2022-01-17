import { Col, Row, Menu, Space, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
export const Navigation = () => {
    const onSearch = (value) => console.log(value);

    return (
        <>
            <Row align="middle" justify="center" style={{ height: 50, backgroundColor: "#006544" }}>
                <Col>
                    <a href="/" style={{ color: "white", fontSize: 18, fontWeight: 500, cursor: "pointer" }}>
                        <img src="/images/icon-pig.jpg" style={{ height: 20, width: 20 }} /> DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI
                    </a>
                </Col>
                <Col xs={2}></Col>
                <Col xs={5}>
                    <Search placeholder="Nhập nội dung tìm kiếm..." allowClear onSearch={onSearch} />
                </Col>

                <Space>
                    <Col>
                        <span style={{ paddingLeft: 10, paddingTop: 6, color: "white" }}>VIE | </span>{" "}
                        <span style={{ paddingTop: 6, color: "white" }}>ENG</span>
                    </Col>
                    <Col>
                        <div>
                            <Link to="/dang-nhap" style={{ color: "white" }}>
                                <ExportOutlined />
                            </Link>
                        </div>
                    </Col>
                </Space>
            </Row>
            <Menu className="navbar" mode="horizontal" style={{ paddingLeft: 380 }}>
                <Menu.Item key="trang-chu">
                    <Link to="/">Trang Chủ</Link>
                </Menu.Item>
                <Menu.Item key="ca-the">
                    <Link to="/ca-the">Cá Thể</Link>
                </Menu.Item>
                <Menu.Item key="co-so-chan-nuoi">
                    <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                </Menu.Item>
                <Menu.Item key="thong-tin-du-an">
                    <Link to="/thong-tin-du-an">Thông Tin Dự Án</Link>
                </Menu.Item>
                <Menu.Item key="tin-tuc">
                    <Link to="/tin-tuc">Tin Tức</Link>
                </Menu.Item>
                <Menu.Item key="lien-he">
                    <Link to="/lien-he">Liên Hệ</Link>
                </Menu.Item>
            </Menu>
        </>
    );
};
