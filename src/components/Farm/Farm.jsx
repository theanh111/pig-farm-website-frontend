import React, { useEffect, useState } from "react";
import { FarmImage } from "../FarmImage";
import { Navigation } from "../Navigation/navigation";
import { Contact } from "../Contact/contact";
import JsonData from "../../data/data.json";
import { getAllFarm } from "../../api/farm";
import { Layout, Row, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const { Content } = Layout;

export const Farm = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [farm, setFarm] = useState([]);
    const [landingPageData, setLandingPageData] = useState({});

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
        setLandingPageData(JsonData);
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
                    <div id="wrapper">
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
                    </div>
                </>
            )}
        </>
    );
};
