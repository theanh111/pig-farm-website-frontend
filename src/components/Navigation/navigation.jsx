import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Layout, Menu } from "antd";

const { Search } = Input;

export const Navigation = () => {
    const onSearch = (value) => console.log(value);

    return (
        <>
            <Layout className="header-fix">
                <div>
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
                        <Menu.Item key={0}>
                            <span style={{ fontSize: 18, fontWeight: 500 }}>DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI</span>
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

                        <div style={{ paddingTop: 6 }}>
                            <Search
                                placeholder="Tìm kiếm..."
                                allowClear
                                onSearch={onSearch}
                                style={{ right: 50, position: "absolute", width: "20%" }}
                            />
                        </div>
                    </Menu>
                </div>
            </Layout>
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
