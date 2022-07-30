import React, { useEffect, useState } from "react";
import { FarmImage } from "./FarmImage";
import { Navigation } from "../Navigation/navigation";
import { getAllFarm } from "../../api/farm";
import { Layout, Row, Col, Breadcrumb, Image, Empty } from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Footer } from "../Footer/Footer";
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
                    <div id="wrapper">
                        <div id="content-fix">
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-row-padding">
                                    <div class="w3-col m12">
                                        <Content style={{ padding: 10 }}>
                                            <Breadcrumb>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/">Trang Chủ</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi ({farm ? farm.length : 0})</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-container " id="rooms">
                                    <h1 style={{ textAlign: "center" }}>Danh Sách Cơ Sở Chăn Nuôi</h1>
                                </div>
                                <div class="w3-row-padding w3-padding-16">
                                    {farm ? (
                                        farm.map((item, index) => (
                                            <div class="w3-third w3-margin-bottom" style={{ cursor: "pointer" }}>
                                                <Link to={"/co-so-chan-nuoi/" + item.ma_trang_trai}>
                                                    <div class="img-hover-zoom">
                                                        <img
                                                            className="pig-image"
                                                            src={item.hinh_anh}
                                                            alt={item.ten_trang_trai}
                                                            style={{
                                                                width: "100%",
                                                                height: "350px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    </div>
                                                    <div class="w3-container w3-green" style={{ height: 60 }}>
                                                        <h4
                                                            style={{
                                                                textAlign: "center",
                                                                color: "white",
                                                                paddingTop: 8,
                                                            }}
                                                        >
                                                            {item.ten_trang_trai}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <Empty description="No Data" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};
