import React, { useEffect, useState } from "react";
import { FarmImage } from "./FarmImage";
import { NavigationENG } from "../Navigation/NavigationENG";
import { getAllFarm } from "../../api/farm";
import { Layout, Row, Col, Breadcrumb, Image, Empty } from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FooterENG } from "../Footer/FooterENG";
const { Content } = Layout;

export const FarmPageENG = (props) => {
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
        document.title = "Livestock Farms";
    }, []);

    return (
        <>
            <NavigationENG />
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
                                                    <Link to="/homepage">Homepage</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/livestock-farms">Livestock Farms ({farm ? farm.length : 0})</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-container " id="rooms">
                                    <h1 style={{ textAlign: "center" }}>Lists Of Livestock Farms</h1>
                                </div>
                                <div class="w3-row-padding w3-padding-16">
                                    {farm ? (
                                        farm.map((item, index) => (
                                            <div class="w3-third w3-margin-bottom" style={{ cursor: "pointer" }}>
                                                <Link to={"/livestock-farms/" + item.ma_trang_trai}>
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
                        <FooterENG />
                    </div>
                </>
            )}
        </>
    );
};
