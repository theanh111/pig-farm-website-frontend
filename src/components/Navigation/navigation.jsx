import { Route, Router, Routes, Link } from "react-router-dom";
import { Farm } from "../Farm/Farm";
import { Login } from "../Login/login";
import { ExportOutlined } from "@ant-design/icons";

export const Navigation = () => {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top" style={{ position: "sticky", top: 0 }}>
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>
                        <span className="icon-bar"></span> <span className="icon-bar"></span>
                    </button>
                    <Link to="/">
                        <a className="navbar-brand page-scroll">MONGCAIPIG</a>
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/co-so-chan-nuoi" className="page-scroll">
                                Cơ Sở Chăn Nuôi
                            </Link>
                        </li>
                        <li>
                            <Link to="/lien-he" className="page-scroll">
                                Liên Hệ
                            </Link>
                        </li>

                        <li>
                            <Link to="/dang-nhap" className="page-scroll">
                                <ExportOutlined style={{ paddingTop: 2 }} />
                            </Link>
                        </li>

                        <Routes>
                            <Route exact path="/dang-nhap" component={Login} />
                            <Route exact path="/co-so-chan-nuoi" component={Farm} />
                        </Routes>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
