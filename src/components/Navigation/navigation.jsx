import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { Switch, Menu } from "antd";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const { Search } = Input;

export const Navigation = () => {
    const onSearch = (value) => console.log(value);

    return (
        <>
            {/* <div className="header-fix"> */}

            <Row align="middle" justify="center" style={{ height: 50, backgroundColor: "#006544" }}>
                <Col>
                    <span style={{ color: "white", fontSize: 18, fontWeight: 500 }}>DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI</span>
                </Col>
                <Col xs={12}></Col>
                <Col>
                    <span style={{ paddingTop: 6, color: "white" }}>VIE | </span> <span style={{ paddingTop: 6, color: "white" }}>ENG</span>
                </Col>
            </Row>
            {/* <Menu mode="horizontal">
                <Menu.Item key="mail" icon={<img src="/images/icon-pig.jpg" style={{ height: 20, width: 20 }}></img>}></Menu.Item>
            </Menu> */}
            <Menu mode="horizontal" style={{ paddingLeft: 220, position: "sticky", top: 0, zIndex: 1000 }}>
                <Menu.Item key="trang-chu">
                    <Link to="/">Trang Chủ</Link>
                </Menu.Item>
                <Menu.Item key="co-so-chan-nuoi">
                    <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                </Menu.Item>
                <Menu.Item key="blog">
                    <Link to="/blog">Blog</Link>
                </Menu.Item>
                <Menu.Item key="lien-he">
                    <Link to="/lien-he">Liên Hệ</Link>
                </Menu.Item>
            </Menu>
            {/* <div>
                <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item>
                        <Row>
                            <Col>
                                <img src="/images/icon-pig.jpg" style={{ height: 20, width: 20 }}></img>
                                <span style={{ color: "black", fontSize: 18, fontWeight: 500 }}>
                                    Dự án nghiên cứu nguồn gen giống lợn Móng Cái
                                </span>
                            </Col>
                        </Row>
                    </Menu.Item>
                    <Menu.Item key={1}>
                        <Link to="/" className="page-scroll">
                            Trang Chủ
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Link to="/co-so-chan-nuoi" className="page-scroll">
                            Cơ Sở Chăn Nuôi
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Link to="/blog" className="page-scroll">
                            Blog
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={4}>
                        <Link to="/lien-he" className="page-scroll">
                            Liên Hệ
                        </Link>
                    </Menu.Item>
                    <Search style={{ paddingTop: 6, width: "50%" }} placeholder="Tìm kiếm..." allowClear onSearch={onSearch} />
                </Menu>
            </div> */}
            {/* </div> */}
        </>
        // <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{ position: "sticky", top: 0 }}>
        //     <div className="container">
        //         <div className="navbar-header">
        //             <button
        //                 type="button"
        //                 className="navbar-toggle collapsed"
        //                 data-toggle="collapse"
        //                 data-target="#bs-example-navbar-collapse-1"
        //             >
        //                 <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>
        //                 <span className="icon-bar"></span> <span className="icon-bar"></span>
        //             </button>
        //             <Link to="/">
        //                 <a className="navbar-brand page-scroll">MONGCAIPIG</a>
        //             </Link>
        //         </div>

        //         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        //             <ul className="nav navbar-nav navbar-right">
        //                 <li>
        //                     <Link to="/co-so-chan-nuoi" className="page-scroll">
        //                         Cơ Sở Chăn Nuôi
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/blog" className="page-scroll">
        //                         Blog
        //                     </Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/lien-he" className="page-scroll">
        //                         Liên Hệ
        //                     </Link>
        //                 </li>

        //                 <li>
        //                     <Link to="/dang-nhap" className="page-scroll">
        //                         <ExportOutlined style={{ paddingTop: 2 }} />
        //                     </Link>
        //                 </li>

        //                 <Routes>
        //                     <Route exact path="/dang-nhap" component={Login} />
        //                     <Route exact path="/co-so-chan-nuoi" component={Farm} />
        //                 </Routes>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
};
