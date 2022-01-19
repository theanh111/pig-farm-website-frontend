import React, { useEffect, useState } from "react";
import { FarmImage } from "./FarmImage";
import { Navigation } from "../Navigation/navigation";
import { Contact } from "../Contact/contact";
import { getAllFarm } from "../../api/farm";
import { Layout, Row, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const { Content } = Layout;

export const FarmPage = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [farm, setFarm] = useState([]);

    const getData = async () => {
        setViewLoader(true);
        await getAllFarm()
            .then((res) => {
                let result = res.data.data;
                setFarm(result);
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cơ Sở Chăn Nuôi";
    }, []);

    return (
        <>
            <Navigation />
            {viewLoader ? (
                <Loader />
            ) : (
                <>
                    <div style={{ overflow: "auto" }}>
                        <div className="menu">
                            <Link className="link" to="/" style={{ fontSize: 22, fontWeight: 600 }}>
                                Trang Chủ
                            </Link>
                            <Link className="link" to="/ca-the" style={{ fontSize: 22, fontWeight: 600 }}>
                                Cá Thể
                            </Link>
                            <Link className="link" to="/co-so-chan-nuoi" style={{ fontSize: 22, fontWeight: 600 }}>
                                Cơ Sở Chăn Nuôi
                            </Link>
                            <Link className="link" to="/thong-tin-du-an" style={{ fontSize: 22, fontWeight: 600 }}>
                                Thông Tin Dự Án
                            </Link>
                            <Link className="link" to="/tin-tuc" style={{ fontSize: 22, fontWeight: 600 }}>
                                Tin Tức
                            </Link>
                            <Link className="link" to="/lien-he" style={{ fontSize: 22, fontWeight: 600 }}>
                                Liên Hệ
                            </Link>
                        </div>

                        <div className="main">
                            <h2>Lorum Ipsum</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                                dolore magna aliquam erat volutpat.
                            </p>
                        </div>

                        <div className="right">
                            <h2>About</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#e5e5e5", textAlign: "center", padding: "10px", marginTop: "7px" }}>
                        © copyright w3schools.com
                    </div>
                    {/* <div id="wrapper">
                        <div id="content-fix">
                            <Content style={{ padding: "0px 400px 0px" }}>
                                <Breadcrumb style={{ margin: "8px 0" }}>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/">Trang Chủ</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row align="middle" justify="center">
                                <Col xs={15}>
                                    <div style={{ textAlign: "center", paddingBottom: 50 }}>
                                        <Row justify="center">
                                            <Col>
                                                <h3 style={{ fontFamily: "Open Sans", fontSize: 30 }}>Danh Sách Trang Trại</h3>
                                                <p style={{ fontFamily: "Open Sans" }}>Các trang trại lợn móng cái</p>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: 0 }} justify="center">
                                            <Col>
                                                <hr className="line"></hr>
                                            </Col>
                                        </Row>

                                        <Row>
                                            {farm
                                                ? farm.map((d, i) => (
                                                      <Col span={8}>
                                                          <FarmImage
                                                              title={d.ten_trang_trai}
                                                              id={d.id}
                                                              farmcode={d.ma_trang_trai}
                                                              smallImage={d.hinh_anh}
                                                          />
                                                      </Col>
                                                  ))
                                                : "Loading..."}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Contact />
                    </div> */}
                </>
            )}
        </>
    );
};
